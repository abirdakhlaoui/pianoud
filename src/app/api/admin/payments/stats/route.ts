import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/lib/auth"

export async function GET() {
  try {
    const session = await auth()
    if (!session?.user) return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    const user = session.user as any
    if (user.role !== "ADMIN") return NextResponse.json({ error: "Not authorized" }, { status: 403 })

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

    const [allPayments, monthPayments, totalCount, uniqueStudents] = await Promise.all([
      prisma.payment.findMany({ select: { amount: true } }),
      prisma.payment.findMany({ where: { createdAt: { gte: startOfMonth } }, select: { amount: true } }),
      prisma.payment.count(),
      prisma.payment.findMany({ select: { studentId: true }, distinct: ["studentId"] }),
    ])

    const totalRevenue = allPayments.reduce((sum, p) => sum + p.amount, 0)
    const monthRevenue = monthPayments.reduce((sum, p) => sum + p.amount, 0)

    // Revenue by instrument
    const paymentsByInstrument = await prisma.payment.findMany({
      include: { course: { select: { instrument: true } } },
    })
    const pianoRevenue = paymentsByInstrument.filter(p => p.course?.instrument === "PIANO").reduce((s, p) => s + p.amount, 0)
    const oudRevenue = paymentsByInstrument.filter(p => p.course?.instrument === "OUD").reduce((s, p) => s + p.amount, 0)

    return NextResponse.json({
      totalRevenue,
      monthRevenue,
      totalCount,
      uniqueStudents: uniqueStudents.length,
      pianoRevenue,
      oudRevenue,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
