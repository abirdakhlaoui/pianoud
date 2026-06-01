import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { authLimiter } from "@/lib/ratelimit"
import { z } from "zod"
import nodemailer from "nodemailer"

const schema = z.object({ email: z.string().email() })

function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

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
      return NextResponse.json({ error:"Invalid email" }, { status:400 })
    }

    const { email } = result.data
    const user = await prisma.user.findUnique({ where:{ email } })

    // Always return success — don't reveal if email exists
    if (!user) return NextResponse.json({ success:true })

    const code      = generateCode()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15 min

    // Store in DB (upsert in case they request again)
    await prisma.passwordResetCode.upsert({
      where:  { email },
      update: { code, expiresAt },
      create: { email, code, expiresAt },
    })

    // Send email
    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT),
      secure: false,
      auth:   { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })

    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: "Pianoud — Reset your password | إعادة تعيين كلمة المرور",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:40px;border-radius:16px;border:1px solid rgba(201,168,76,0.2)">
          <div style="text-align:center;margin-bottom:32px">
            <h1 style="font-size:28px;font-weight:700;background:linear-gradient(135deg,#E8CB7E,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Pianoud</h1>
            <p style="color:#5A5A4A;font-size:12px;letter-spacing:3px;text-transform:uppercase">Online Music Academy</p>
          </div>
          <h2 style="font-size:20px;font-weight:600;margin-bottom:8px">Hello, ${user.name} 👋</h2>
          <p style="color:#8A8A7A;margin-bottom:28px;line-height:1.6">
            We received a request to reset your password.<br/>
            تلقّينا طلبًا لإعادة تعيين كلمة مرورك.
          </p>
          <div style="background:#161616;border:1px solid rgba(201,168,76,0.2);border-radius:12px;padding:24px;text-align:center;margin-bottom:28px">
            <p style="font-size:12px;color:#5A5A4A;margin-bottom:8px;letter-spacing:2px;text-transform:uppercase">Your reset code</p>
            <p style="font-size:42px;font-weight:800;letter-spacing:10px;color:#C9A84C;margin:0">${code}</p>
            <p style="font-size:12px;color:#5A5A4A;margin-top:8px">Valid for 15 minutes • صالح لمدة 15 دقيقة</p>
          </div>
          <p style="color:#5A5A4A;font-size:13px;line-height:1.6">
            If you didn't request this, ignore this email.<br/>
            إذا لم تطلب ذلك، تجاهل هذه الرسالة.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success:true })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error" }, { status:500 })
  }
}
