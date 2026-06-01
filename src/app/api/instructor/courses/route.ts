import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const courseSchema = z.object({
  title_en:       z.string().min(5).max(200),
  title_ar:       z.string().min(5).max(200),
  description_en: z.string().min(20).max(2000),
  description_ar: z.string().min(20).max(2000),
  instrument:     z.enum(["PIANO", "OUD"]),
  level:          z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
  price:          z.number().min(0),
})

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = session.user as any
    const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })
    if (!instructor) return NextResponse.json({ courses:[] })

    const courses = await prisma.course.findMany({
      where:   { instructorId: instructor.id },
      orderBy: { createdAt:"desc" },
    })

    return NextResponse.json({ courses })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = session.user as any
    if (user.role !== "INSTRUCTOR" && user.role !== "ADMIN") {
      return NextResponse.json({ error:"Not authorized" }, { status:403 })
    }

    const body   = await req.json()
    const result = courseSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    let instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })

    // Auto-create instructor profile if missing
    if (!instructor) {
      instructor = await prisma.instructor.create({
        data: {
          userId:     user.id,
          bio_en:     "",
          bio_ar:     "",
          instrument: result.data.instrument,
          experience: 0,
        },
      })
    }

    const slug = result.data.title_en
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      + "-" + Date.now()

    const course = await prisma.course.create({
      data: {
        title_en:       result.data.title_en,
        title_ar:       result.data.title_ar,
        description_en: result.data.description_en,
        description_ar: result.data.description_ar,
        slug,
        thumbnail:      "",
        instrument:     result.data.instrument,
        level:          result.data.level,
        price:          result.data.price,
        isPublished:    false,
        instructorId:   instructor.id,
      },
    })

    return NextResponse.json({ success:true, course }, { status:201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
