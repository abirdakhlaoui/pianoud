import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { progressSchema } from "@/lib/validations"
import { apiLimiter } from "@/lib/ratelimit"

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const ip    = req.headers.get("x-forwarded-for") ?? "unknown"
    const limit = apiLimiter(ip)
    if (!limit.success) {
      return NextResponse.json({ error: "Too many requests." }, { status: 429 })
    }

    const body   = await req.json()
    const result = progressSchema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status: 400 })
    }

    const userId = (session.user as any).id
    const { lessonId, completed, watchedSeconds } = result.data

    await prisma.progress.upsert({
      where:  { userId_lessonId: { userId, lessonId } },
      update: { completed: completed ?? false, watchedSeconds: watchedSeconds ?? 0 },
      create: { userId, lessonId, completed: completed ?? false, watchedSeconds: watchedSeconds ?? 0 },
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const userId   = (session.user as any).id
    const progress = await prisma.progress.findMany({
      where:  { userId },
      select: { lessonId: true, completed: true, watchedSeconds: true },
    })

    return NextResponse.json({ progress })
  } catch {
    return NextResponse.json({ error: "Server error." }, { status: 500 })
  }
}
