import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    const meetings = user.role === "STUDENT"
      ? await prisma.meeting.findMany({
          where:   { studentId: user.id },
          orderBy: { createdAt:"desc" },
          include: { instructor:{ select:{ id:true, name:true } } },
        })
      : await prisma.meeting.findMany({
          where:   { instructorId: user.id },
          orderBy: { createdAt:"desc" },
          include: { student:{ select:{ id:true, name:true } } },
        })

    return NextResponse.json({ meetings })
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

    const { studentId, platform, date, time, link, note } = await req.json()
    if (!studentId || !platform || !date || !time || !link) {
      return NextResponse.json({ error:"All fields required" }, { status:400 })
    }

    const meeting = await prisma.meeting.create({
      data: { instructorId: user.id, studentId, platform, date, time, link, note: note || null },
      include: { student:{ select:{ id:true, name:true } } }
    })

    return NextResponse.json({ success:true, meeting }, { status:201 })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
