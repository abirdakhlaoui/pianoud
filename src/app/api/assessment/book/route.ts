import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, instrument, date, time } = body
    if (!name || !phone || !instrument || !date || !time) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    const existing = await prisma.assessmentBooking.findUnique({
      where: { date_time_instrument: { date, time, instrument } },
    })
    if (existing) {
      return NextResponse.json({ error: "Slot already taken" }, { status: 409 })
    }

    await prisma.assessmentBooking.create({
      data: { name, phone, instrument, date, time },
    })

    return NextResponse.json({ success: true })
  } catch (err: any) {
    if (err?.code === "P2002") {
      return NextResponse.json({ error: "Slot already taken" }, { status: 409 })
    }
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
