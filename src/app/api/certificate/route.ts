import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    // If no slug, get first enrolled course
    if (!slug) {
      const firstEnrollment = await prisma.enrollment.findFirst({
        where: { userId: user.id },
        include: { course: { select:{ title_en:true, title_ar:true, slug:true } } }
      })
      if (!firstEnrollment) {
        return NextResponse.json({ error:"No enrollment found" }, { status:404 })
      }
      return NextResponse.json({
        eligible:       true,
        studentName:    user.name,
        courseTitle_en: firstEnrollment.course.title_en,
        courseTitle_ar: firstEnrollment.course.title_ar,
        courseSlug:     firstEnrollment.course.slug,
        date: new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }),
      })
    }

    const course = await prisma.course.findUnique({
      where:  { slug },
      select: { id:true, title_en:true, title_ar:true }
    })

    if (!course) return NextResponse.json({ error:"Course not found" }, { status:404 })

    // Check enrollment
    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId: user.id, courseId: course.id } }
    })

    if (!enrollment) {
      return NextResponse.json({ error:"Not enrolled" }, { status:403 })
    }

    return NextResponse.json({
      eligible:       true,
      studentName:    user.name,
      courseTitle_en: course.title_en,
      courseTitle_ar: course.title_ar,
      courseSlug:     slug,
      date: new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }),
    })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
