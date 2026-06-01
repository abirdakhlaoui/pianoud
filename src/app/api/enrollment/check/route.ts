import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ enrolled: false })

    const userId = (session.user as any).id
    const { searchParams } = new URL(req.url)
    const slug = searchParams.get("slug")

    if (!slug) return NextResponse.json({ enrolled: false })

    // Admin and instructors always have access
    const user = session.user as any
    if (user.role === "ADMIN" || user.role === "INSTRUCTOR") {
      return NextResponse.json({ enrolled: true })
    }

    // Check real enrollment in DB
    const course = await prisma.course.findUnique({
      where: { slug },
      select: { id: true }
    })

    if (!course) return NextResponse.json({ enrolled: false })

    const enrollment = await prisma.enrollment.findUnique({
      where: { userId_courseId: { userId, courseId: course.id } }
    })

    return NextResponse.json({ enrolled: !!enrollment })
  } catch {
    return NextResponse.json({ enrolled: false })
  }
}
