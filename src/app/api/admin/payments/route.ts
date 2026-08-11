import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { z } from "zod"

const schema = z.object({
  studentId: z.string(),
  courseId:  z.string().optional(),
  amount:    z.number().min(0),
  currency:  z.string().default("SAR"),
  package:   z.string().optional(),
  method:    z.string().default("Bank Transfer"),
  note:      z.string().optional(),
})

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = session.user as any
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const payments = await prisma.payment.findMany({
      include: {
        student: { select: { name: true, email: true } },
        course: { select: { title_en: true, title_ar: true, instrument: true } },
      },
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json({ payments })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = session.user as any
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const body = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status: 400 })
    }

    const payment = await prisma.payment.create({ data: result.data })
    return NextResponse.json({ success: true, payment }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
