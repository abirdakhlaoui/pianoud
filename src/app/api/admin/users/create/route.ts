import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  name:     z.string().min(2).max(100),
  email:    z.string().email(),
  password: z.string().min(6),
  role:     z.enum(["STUDENT", "INSTRUCTOR", "ADMIN"]),
  instrument: z.enum(["PIANO", "OUD"]).optional(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const admin = session.user as any
    if (admin.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const body = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status: 400 })
    }
    const { name, email, password, role, instrument } = result.data

    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return NextResponse.json({ error: "Email already exists" }, { status: 409 })

    const hashed = await bcrypt.hash(password, 10)
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role },
    })

    if (role === "INSTRUCTOR") {
      await prisma.instructor.create({
        data: {
          userId: user.id,
          bio_en: "",
          bio_ar: "",
          instrument: instrument || "PIANO",
          experience: 0,
        },
      })
    }

    return NextResponse.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
