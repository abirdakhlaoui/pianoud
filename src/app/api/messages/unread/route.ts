import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ count:0 })
    const user = session.user as any

    const count = await prisma.message.count({
      where:{ receiverId: user.id, read: false }
    })

    return NextResponse.json({ count })
  } catch {
    return NextResponse.json({ count:0 })
  }
}
