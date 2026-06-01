import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error:"Not authorized" }, { status:403 })

    const enrollments = await prisma.enrollment.findMany({
      orderBy: { enrolledAt:"desc" },
      include:{
        user:   { select:{ id:true, name:true, email:true } },
        course: { select:{ id:true, title_en:true, instrument:true, price:true } },
      }
    })

    return NextResponse.json({ enrollments })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
