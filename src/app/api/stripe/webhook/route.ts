import { NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: Request) {
  const body = await req.text()
  const sig  = req.headers.get("stripe-signature")!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch(err: any) {
    console.error("Webhook signature failed:", err.message)
    return NextResponse.json({ error:`Webhook Error: ${err.message}` }, { status:400 })
  }

  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object as Stripe.PaymentIntent
    const { courseSlug, userId } = intent.metadata

    if (!courseSlug || !userId) {
      console.error("Missing metadata:", intent.metadata)
      return NextResponse.json({ received:true })
    }

    try {
      const course = await prisma.course.findUnique({
        where:  { slug: courseSlug },
        select: { id:true, price:true },
      })

      if (!course) {
        console.error("Course not found:", courseSlug)
        return NextResponse.json({ received:true })
      }

      // Upsert enrollment
      await prisma.enrollment.upsert({
        where:  { userId_courseId:{ userId, courseId: course.id } },
        update: { status:"ACTIVE" },
        create: {
          userId,
          courseId:   course.id,
          status:     "ACTIVE",
          paidAmount: (intent.amount / 100),
        },
      })

      console.log(`✅ Enrolled user ${userId} in course ${courseSlug}`)
    } catch(err) {
      console.error("Enrollment error:", err)
    }
  }

  return NextResponse.json({ received:true })
}
