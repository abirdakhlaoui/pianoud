import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = session.user as any
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const students = await prisma.user.findMany({
      where: { role: "STUDENT" },
      select: { id: true, name: true, email: true },
      orderBy: { name: "asc" },
    })

    const courses = await prisma.course.findMany({
      select: { id: true, title_en: true, instrument: true },
      orderBy: { title_en: "asc" },
    })

    return NextResponse.json({ students, courses })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
