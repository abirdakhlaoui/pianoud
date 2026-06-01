import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const [students, courses, enrollments] = await Promise.all([
      prisma.user.count({ where:{ role:"STUDENT" } }),
      prisma.course.count({ where:{ isPublished:true } }),
      prisma.enrollment.count(),
    ])

    return NextResponse.json({
      students,
      courses,
      enrollments,
      countries: 3, // static for now
    })
  } catch {
    return NextResponse.json({
      students:    0,
      courses:     0,
      enrollments: 0,
      countries:   3,
    })
  }
}
