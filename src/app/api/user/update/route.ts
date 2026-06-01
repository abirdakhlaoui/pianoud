import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2).max(50),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })

    const userId = (session.user as any).id
    await prisma.user.update({
      where: { id: userId },
      data:  { name: result.data.name },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
