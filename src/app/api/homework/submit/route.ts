import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any
    const { homeworkId, answer } = await req.json()
    if (!homeworkId || !answer) {
      return NextResponse.json({ error:"All fields required" }, { status:400 })
    }
    const submission = await prisma.homeworkSubmission.upsert({
      where: { studentId_homeworkId: { studentId: user.id, homeworkId } },
      update: { answer, submittedAt: new Date() },
      create: { studentId: user.id, homeworkId, answer }
    })
    return NextResponse.json({ success:true, submission })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
