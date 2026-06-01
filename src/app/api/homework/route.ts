import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { notifyHomeworkAssigned } from "@/lib/notifications"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    if (user.role === "INSTRUCTOR" || user.role === "ADMIN") {
      // Instructor sees their own homework + all submissions
      const homeworks = await prisma.homework.findMany({
        where:   { instructorId: user.id },
        orderBy: { createdAt:"desc" },
        include: {
          submissions: {
            include: {
              student: { select:{ id:true, name:true, email:true } }
            }
          }
        }
      })
      return NextResponse.json({ homeworks })
    }

    // Student — find enrolled course slugs first
    const enrollments = await prisma.enrollment.findMany({
      where:  { userId: user.id, status: "ACTIVE" },
      select: { course: { select: { slug:true } } }
    })

    const enrolledSlugs = enrollments.map((e: any) => e.course.slug)

    if (enrolledSlugs.length === 0) {
      return NextResponse.json({ homeworks: [] })
    }

    // Get homework for enrolled courses only
    const homeworks = await prisma.homework.findMany({
      where:   { courseSlug: { in: enrolledSlugs } },
      orderBy: { createdAt:"desc" },
      include: {
        submissions: {
          where: { studentId: user.id },
        }
      }
    })

    return NextResponse.json({ homeworks })
  } catch(err) {
    console.error(err)
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

    const { title, description, courseSlug, dueDate } = await req.json()

    if (!title || !courseSlug) {
      return NextResponse.json({ error:"Title and course are required" }, { status:400 })
    }

    // Count how many students are enrolled in this course
    const enrolledCount = await prisma.enrollment.count({
      where: {
        course: { slug: courseSlug },
        status: "ACTIVE",
      }
    })

    const homework = await prisma.homework.create({
      data: {
        title,
        description,
        courseSlug,
        instructorId: user.id,
        dueDate: dueDate ? new Date(dueDate) : null,
      }
    })

    // Send email notifications to enrolled students (async, don't await)
    prisma.enrollment.findMany({
      where: { course:{ slug: courseSlug }, status:"ACTIVE" },
      include: { user:{ select:{ name:true, email:true } } }
    }).then((enrollments: any[]) => {
      for (const e of enrollments) {
        notifyHomeworkAssigned(
          e.user.email,
          e.user.name,
          title,
          courseSlug,
          dueDate || undefined
        )
      }
    }).catch(console.error)

    return NextResponse.json({
      success: true,
      homework,
      assignedTo: enrolledCount,
    }, { status:201 })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
