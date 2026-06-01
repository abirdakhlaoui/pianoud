import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"
import { roleSchema } from "@/lib/validations"
import { apiLimiter } from "@/lib/ratelimit"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })

    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const ip    = req.headers.get("x-forwarded-for") ?? "unknown"
    const limit = apiLimiter(ip)
    if (!limit.success) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 })
    }

    const body   = await req.json()
    const result = roleSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status: 400 })
    }

    const { userId, role } = result.data

    await prisma.user.update({
      where: { id: userId },
      data:  { role },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
