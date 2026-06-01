import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  courseSlug: z.string().min(1),
  rating:     z.number().min(1).max(5),
  comment:    z.string().min(10).max(500),
})

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")
    if (!slug) return NextResponse.json({ reviews:[] })

    const course = await prisma.course.findUnique({ where:{ slug }, select:{ id:true } })
    if (!course) return NextResponse.json({ reviews:[] })

    const reviews = await prisma.review.findMany({
      where:   { courseId: course.id },
      orderBy: { createdAt:"desc" },
      include: { user: { select:{ name:true } } },
    })

    const avg = reviews.length
      ? reviews.reduce((a,r) => a + r.rating, 0) / reviews.length
      : 0

    return NextResponse.json({ reviews, avg: Math.round(avg*10)/10, total: reviews.length })
  } catch {
    return NextResponse.json({ reviews:[], avg:0, total:0 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { courseSlug, rating, comment } = result.data

    const course = await prisma.course.findUnique({ where:{ slug: courseSlug }, select:{ id:true } })
    if (!course) return NextResponse.json({ error:"Course not found" }, { status:404 })

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where:{ userId_courseId:{ userId: user.id, courseId: course.id } }
    })
    if (!enrollment) {
      return NextResponse.json({ error:"You must be enrolled to leave a review" }, { status:403 })
    }

    // Upsert review
    const review = await prisma.review.upsert({
      where:  { userId_courseId:{ userId: user.id, courseId: course.id } },
      update: { rating, comment },
      create: { userId: user.id, courseId: course.id, rating, comment },
    })

    // Update course rating
    const allReviews = await prisma.review.findMany({ where:{ courseId: course.id } })
    const newRating  = allReviews.reduce((a,r) => a + r.rating, 0) / allReviews.length

    await prisma.course.update({
      where: { id: course.id },
      data:  { rating: Math.round(newRating * 10) / 10 },
    })

    return NextResponse.json({ success:true, review })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
