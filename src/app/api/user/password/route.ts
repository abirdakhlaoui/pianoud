import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword:     z.string().min(8).max(100),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })

    const userId = (session.user as any).id
    const user   = await prisma.user.findUnique({ where:{ id:userId } })
    if (!user?.password) return NextResponse.json({ error:"No password set" }, { status:400 })

    const valid = await bcrypt.compare(result.data.currentPassword, user.password)
    if (!valid) return NextResponse.json({ error: "Current password is incorrect" }, { status:400 })

    const hashed = await bcrypt.hash(result.data.newPassword, 12)
    await prisma.user.update({ where:{ id:userId }, data:{ password:hashed } })

    return NextResponse.json({ success:true })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
