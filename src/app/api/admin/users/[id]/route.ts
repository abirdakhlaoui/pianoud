import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const me = session.user as any
    if (me.role !== "ADMIN") return NextResponse.json({ error:"Not authorized" }, { status:403 })
    if (me.id === id) return NextResponse.json({ error:"Cannot delete yourself" }, { status:400 })

    await prisma.user.delete({ where:{ id: id } })
    return NextResponse.json({ success:true })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
