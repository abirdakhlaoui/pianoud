import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const course = await prisma.course.findUnique({ where:{ id: id } })
    if (!course) return NextResponse.json({ error:"Not found" }, { status:404 })

    return NextResponse.json({ course })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = session.user as any
    const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })
    if (!instructor) return NextResponse.json({ error:"Not found" }, { status:404 })

    const course = await prisma.course.findFirst({
      where:{ id: id, instructorId: instructor.id }
    })
    if (!course) return NextResponse.json({ error:"Not authorized" }, { status:403 })

    await prisma.course.delete({ where:{ id: id } })
    return NextResponse.json({ success:true })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = session.user as any
    const instructor = await prisma.instructor.findUnique({ where:{ userId: user.id } })
    if (!instructor) return NextResponse.json({ error:"Not found" }, { status:404 })

    const course = await prisma.course.findFirst({
      where:{ id: id, instructorId: instructor.id }
    })
    if (!course) return NextResponse.json({ error:"Not authorized" }, { status:403 })

    const body    = await req.json()
    const updated = await prisma.course.update({
      where: { id: id },
      data: {
        title_en:       body.title_en,
        title_ar:       body.title_ar,
        description_en: body.description_en,
        description_ar: body.description_ar,
        instrument:     body.instrument,
        level:          body.level,
        price:          Number(body.price),
      },
    })

    return NextResponse.json({ success:true, course: updated })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
