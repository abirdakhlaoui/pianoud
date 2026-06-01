import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error:"Not authorized" }, { status:403 })

    const courses = await prisma.course.findMany({
      orderBy: { createdAt:"desc" },
      select: { id:true, title_en:true, title_ar:true, instrument:true, level:true, price:true, isPublished:true },
    })

    return NextResponse.json({ courses })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
