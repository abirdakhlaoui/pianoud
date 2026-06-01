import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any
    const { searchParams } = new URL(req.url)
    const withUserId = searchParams.get("with")

    if (withUserId) {
      // Get conversation with specific user
      const messages = await prisma.message.findMany({
        where: {
          OR: [
            { senderId: user.id, receiverId: withUserId },
            { senderId: withUserId, receiverId: user.id },
          ]
        },
        orderBy: { createdAt:"asc" },
        include: {
          sender:   { select:{ id:true, name:true, role:true } },
          receiver: { select:{ id:true, name:true, role:true } },
        }
      })
      // Mark messages as read
      await prisma.message.updateMany({
        where: { senderId: withUserId, receiverId: user.id, read: false },
        data:  { read: true }
      })
      return NextResponse.json({ messages })
    }

    // Get all conversations (last message per user)
    const sent     = await prisma.message.findMany({ where:{ senderId: user.id },   include:{ receiver:{ select:{ id:true, name:true, role:true } } }, orderBy:{ createdAt:"desc" } })
    const received = await prisma.message.findMany({ where:{ receiverId: user.id }, include:{ sender:{ select:{ id:true, name:true, role:true } } },   orderBy:{ createdAt:"desc" } })

    // Build conversations map
    const convMap = new Map<string, any>()
    for (const m of sent) {
      const other = m.receiver
      if (!convMap.has(other.id)) convMap.set(other.id, { user: other, lastMessage: m, unread: 0 })
    }
    for (const m of received) {
      const other = m.sender
      if (!convMap.has(other.id)) {
        convMap.set(other.id, { user: other, lastMessage: m, unread: m.read ? 0 : 1 })
      } else {
        const conv = convMap.get(other.id)
        if (!m.read) conv.unread++
      }
    }

    return NextResponse.json({ conversations: Array.from(convMap.values()) })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any
    const { receiverId, content } = await req.json()

    if (!receiverId || !content?.trim()) {
      return NextResponse.json({ error:"Receiver and content required" }, { status:400 })
    }
    if (content.length > 2000) {
      return NextResponse.json({ error:"Message too long" }, { status:400 })
    }

    const message = await prisma.message.create({
      data: { senderId: user.id, receiverId, content: content.trim() },
      include: {
        sender:   { select:{ id:true, name:true, role:true } },
        receiver: { select:{ id:true, name:true, role:true } },
      }
    })
    return NextResponse.json({ success:true, message }, { status:201 })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
