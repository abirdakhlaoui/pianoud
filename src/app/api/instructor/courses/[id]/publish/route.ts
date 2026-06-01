import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = session.user as any
    const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })
    if (!instructor) return NextResponse.json({ error:"Not found" }, { status:404 })

    const { isPublished } = await req.json()

    await prisma.course.update({
      where: { id: id },
      data:  { isPublished },
    })

    return NextResponse.json({ success:true })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
