import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const date = searchParams.get("date")
    const instrument = searchParams.get("instrument") || "PIANO"
    if (!date) return NextResponse.json({ error: "date required" }, { status: 400 })

    const bookings = await prisma.assessmentBooking.findMany({
      where: { date, instrument },
      select: { time: true },
    })

    return NextResponse.json({ takenTimes: bookings.map((b) => b.time) })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ takenTimes: [] })
  }
}
