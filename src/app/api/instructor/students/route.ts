import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })
    if (!instructor) return NextResponse.json({ students:[] })

    const enrollments = await prisma.enrollment.findMany({
      where: { course:{ instructorId: instructor.id } },
      include: {
        user:   { select:{ id:true, name:true, email:true } },
        course: { select:{ title_en:true, title_ar:true, slug:true } },
      },
      orderBy: { enrolledAt:"desc" },
    })

    const students = enrollments.map(e => ({
      enrollmentId: e.id,
      id:           e.user.id,
      name:         e.user.name,
      email:        e.user.email,
      courseTitle:  e.course.title_en,
      courseSlug:   e.course.slug,
      enrolledAt:   e.enrolledAt,
      progress:     0,
    }))

    return NextResponse.json({ students })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
