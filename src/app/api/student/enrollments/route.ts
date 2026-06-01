import { NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error:"Not authenticated" }, { status:401 })
    const user = session.user as any

    const enrollments = await prisma.enrollment.findMany({
      where:   { userId: user.id },
      orderBy: { enrolledAt:"desc" },
      include: {
        course: {
          select:{
            id:         true,
            title_en:   true,
            title_ar:   true,
            slug:       true,
            instrument: true,
            level:      true,
          }
        }
      }
    })

    return NextResponse.json({ enrollments })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
