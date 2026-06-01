import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  submissionId: z.string().min(1),
  grade:        z.string().min(1).max(10),
  feedback:     z.string().max(500).optional(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any
    if (user.role !== "INSTRUCTOR" && user.role !== "ADMIN") {
      return NextResponse.json({ error:"Not authorized" }, { status:403 })
    }

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { submissionId, grade, feedback } = result.data

    const submission = await prisma.homeworkSubmission.update({
      where: { id: submissionId },
      data:  { grade, feedback: feedback || null },
      include: { student: { select:{ name:true, email:true } } }
    })

    return NextResponse.json({ success:true, submission })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
