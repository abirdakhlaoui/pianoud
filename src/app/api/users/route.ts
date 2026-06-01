import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any

    const users = await prisma.user.findMany({
      where: { id: { not: me.id } },
      select: { id:true, name:true, email:true, role:true },
      orderBy: [{ role:"asc" }, { name:"asc" }],
    })

    return NextResponse.json({ users })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
