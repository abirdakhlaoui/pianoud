import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })

    const user = await prisma.user.findUnique({
      where: { id: id },
      select: { id:true, name:true, email:true, role:true },
    })

    return NextResponse.json({ user })
  } catch {
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
