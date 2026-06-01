import { NextResponse } from "next/server"
import { sendResetEmail } from "@/lib/email"
import { z } from "zod"
import { apiLimiter } from "@/lib/ratelimit"

const schema = z.object({
  name:    z.string().min(2).max(50),
  email:   z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(10).max(2000),
})

export async function POST(req: Request) {
  try {
    const ip    = req.headers.get("x-forwarded-for") ?? "unknown"
    const limit = apiLimiter(ip)
    if (!limit.success) {
      return NextResponse.json({ error:"Too many requests." }, { status:429 })
    }

    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { name, email, subject, message } = result.data

    // Send email to admin
    const nodemailer = await import("nodemailer")
    const transporter = nodemailer.default.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT),
      secure: false,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    })

    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      process.env.SMTP_USER,
      subject: `[Pianoud Contact] ${subject} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:32px;border-radius:12px">
          <h2 style="color:#C9A84C;margin-bottom:24px">New Contact Message — Pianoud</h2>
          <p><strong style="color:#C9A84C">Name:</strong> ${name}</p>
          <p><strong style="color:#C9A84C">Email:</strong> ${email}</p>
          <p><strong style="color:#C9A84C">Subject:</strong> ${subject}</p>
          <hr style="border-color:rgba(201,168,76,0.2);margin:20px 0"/>
          <p><strong style="color:#C9A84C">Message:</strong></p>
          <p style="color:#9A9A8A;line-height:1.8">${message.replace(/\n/g,"<br/>")}</p>
        </div>
      `,
    })

    // Send confirmation to user
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: "Pianoud — We received your message ✓",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:32px;border-radius:12px;border:1px solid rgba(201,168,76,0.2)">
          <h1 style="background:linear-gradient(135deg,#E8CB7E,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:28px">Pianoud</h1>
          <h2 style="color:#F5F0E8;margin-bottom:16px">Hi ${name}! 👋</h2>
          <p style="color:#8A8A7A;line-height:1.8;margin-bottom:20px">
            Thank you for contacting us. We have received your message and will reply within 24 hours.
          </p>
          <div style="background:#161616;border:1px solid rgba(201,168,76,0.15);border-radius:8px;padding:16px;margin-bottom:24px">
            <p style="color:#C9A84C;font-size:12px;margin-bottom:6px">YOUR MESSAGE:</p>
            <p style="color:#8A8A7A;line-height:1.6">${message.substring(0,200)}${message.length>200?"...":""}</p>
          </div>
          <p style="color:#5A5A4A;font-size:12px">© 2025 Pianoud — Online Music Academy</p>
        </div>
      `,
    })

    return NextResponse.json({ success:true })
  } catch(err) {
    console.error(err)
    return NextResponse.json({ error:"Server error." }, { status:500 })
  }
}
