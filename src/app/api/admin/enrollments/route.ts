import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  userId:   z.string().min(1),
  courseId: z.string().min(1),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error:"Not authorized" }, { status:403 })

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { userId, courseId } = result.data

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where:{ userId_courseId:{ userId, courseId } }
    })
    if (existing) {
      return NextResponse.json({ error:"Student already enrolled in this course." }, { status:400 })
    }

    const enrollment = await prisma.enrollment.create({
      data:{
        userId,
        courseId,
        status:     "ACTIVE",
        paidAmount: 0,
      },
      include:{
        user:   { select:{ name:true, email:true } },
        course: { select:{ title_en:true } },
      }
    })

    return NextResponse.json({ success:true, enrollment }, { status:201 })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error:"Not authorized" }, { status:403 })

    const { searchParams } = new URL(req.url)
    const userId   = searchParams.get("userId")
    const courseId = searchParams.get("courseId")

    if (!userId || !courseId) {
      return NextResponse.json({ error:"userId and courseId required" }, { status:400 })
    }

    await prisma.enrollment.delete({
      where:{ userId_courseId:{ userId, courseId } }
    })

    return NextResponse.json({ success:true })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
