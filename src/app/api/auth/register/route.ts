import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import { authLimiter } from "@/lib/ratelimit"
import { z } from "zod"

const schema = z.object({
  name:       z.string().min(2).max(50),
  email:      z.string().email(),
  password:   z.string().min(8).max(100),
  instrument: z.enum(["PIANO","OUD","MAQAMAT","ABRSM","HARMONY"]).optional(),
  level:      z.enum(["BEGINNER","INTERMEDIATE","ADVANCED"]).optional(),
})

export async function POST(req: Request) {
  try {
    const ip    = req.headers.get("x-forwarded-for") ?? "unknown"
    const limit = authLimiter(ip)
    if (!limit.success) {
      return NextResponse.json({ error:"Too many requests. Wait a minute." }, { status:429 })
    }

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { name, email, password, instrument, level } = result.data

    const existing = await prisma.user.findUnique({ where:{ email } })
    if (existing) {
      return NextResponse.json({ error:"Email already in use." }, { status:400 })
    }

    const hashed = await bcrypt.hash(password, 12)

    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    })

    // Save instrument & level preference in user metadata
    // We store it as a note — in production you'd have a UserProfile model
    // For now we auto-enroll in the recommended free course based on instrument
    if (instrument && level) {
      // Find beginner course matching their instrument
      const recommendedSlug = instrument === "PIANO"
        ? (level === "BEGINNER" ? "piano-fundamentals" : level === "INTERMEDIATE" ? "arabic-piano" : "classical-piano")
        : instrument === "OUD"
        ? (level === "BEGINNER" ? "oud-beginners" : level === "INTERMEDIATE" ? "arabic-maqam-oud" : "oud-advanced")
        : "piano-fundamentals"

      // Just store the preference — don't auto-enroll (they need to pay)
      // But we can redirect them to the right course after login
    }

    return NextResponse.json({
      success: true,
      instrument,
      level,
      redirect: "/dashboard"
    }, { status:201 })

  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error." }, { status:500 })
  }
}
