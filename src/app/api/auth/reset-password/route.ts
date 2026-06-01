import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { z } from "zod"

const schema = z.object({
  email:       z.string().email(),
  code:        z.string().length(6),
  newPassword: z.string().min(8).max(100),
})

export async function POST(req: Request) {
  try {
    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { email, code, newPassword } = result.data

    // Get from DB
    const entry = await prisma.passwordResetCode.findUnique({ where:{ email } })

    if (!entry) {
      return NextResponse.json({ error:"No reset code found. Request a new one." }, { status:400 })
    }

    if (new Date() > entry.expiresAt) {
      await prisma.passwordResetCode.delete({ where:{ email } })
      return NextResponse.json({ error:"Code expired. Request a new one." }, { status:400 })
    }

    if (entry.code !== code) {
      return NextResponse.json({ error:"Incorrect code. Try again." }, { status:400 })
    }

    // Update password
    const hashed = await bcrypt.hash(newPassword, 12)
    await prisma.user.update({ where:{ email }, data:{ password: hashed } })

    // Delete the used code
    await prisma.passwordResetCode.delete({ where:{ email } })

    return NextResponse.json({ success:true })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
