import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = session.user as any

    const instructor = await prisma.instructor.findUnique({ where: { userId: user.id } })
    if (!instructor) return NextResponse.json({ assessments: [] })

    const assessments = await prisma.assessmentBooking.findMany({
      where: { instrument: instructor.instrument },
      orderBy: [{ date: "asc" }, { time: "asc" }],
    })

    return NextResponse.json({ assessments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
