import { NextResponse } from "next/server"
import Stripe from "stripe"
import { auth } from "@/lib/auth"
import { paymentLimiter } from "@/lib/ratelimit"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const COURSES: Record<string, { title: string; price_sar: number }> = {
  "piano-fundamentals": { title:"Piano Fundamentals: From Zero to Advanced", price_sar:18400 },
  "arabic-maqam-oud":   { title:"Arabic Maqam & Oud Mastery",                price_sar:25900 },
  "classical-piano":    { title:"Classical Piano",                            price_sar:33400 },
  "oud-beginners":      { title:"Oud for Beginners: First Steps",             price_sar:14600 },
  "arabic-piano":       { title:"Arabic Piano",                               price_sar:29600 },
  "oud-advanced":       { title:"Oud Advanced",                               price_sar:37100 },
  "piano-kids":         { title:"Piano KIDS",                                 price_sar:12000 },
  "music-reading":      { title:"Music Reading",                              price_sar:9900  },
  "oud-harmony":        { title:"Harmony for Oud",                            price_sar:22000 },
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    }

    const ip    = req.headers.get("x-forwarded-for") ?? "unknown"
    const limit = paymentLimiter(ip)
    if (!limit.success) {
      return NextResponse.json({ error:"Too many payment attempts. Please wait." }, { status:429 })
    }

    const { slug } = await req.json()
    if (!slug || typeof slug !== "string") {
      return NextResponse.json({ error:"Invalid course." }, { status:400 })
    }

    const course = COURSES[slug]
    if (!course) {
      return NextResponse.json({ error:"Course not found." }, { status:404 })
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount:   course.price_sar,
      currency: "sar",
      payment_method_types: ["card"],
      metadata: {
        courseSlug: slug,
        userId:     (session.user as any).id,
        userEmail:  session.user.email!,
      },
    })

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error:"Server error." }, { status:500 })
  }
}
