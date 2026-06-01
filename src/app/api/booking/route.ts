import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

const schema = z.object({
  name:  z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(5),
  plan:  z.string().min(1),
  price: z.string(),
  date:  z.string(),
  time:  z.string(),
  note:  z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body   = await req.json()
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json({ error: result.error.issues[0]?.message }, { status:400 })
    }

    const { name, email, phone, plan, price, date, time, note } = result.data
    const isFree = price === "0" || price === "FREE"
    const displayPrice = isFree ? "FREE" : "$" + price

    const transporter = nodemailer.createTransport({
      host:   process.env.SMTP_HOST,
      port:   Number(process.env.SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })

    const rows = [
      ["Student Name",   name],
      ["Email",          email],
      ["Phone/WhatsApp", phone],
      ["Preferred Date", date],
      ["Preferred Time", time],
      ...(note ? [["Notes", note]] : []),
    ]

    const tableRows = rows.map(([label, value]) =>
      `<tr>
        <td style="padding:10px 12px;background:#161616;color:#8A8A7A;font-size:13px;border-bottom:1px solid #1E1E1E;width:40%">${label}</td>
        <td style="padding:10px 12px;background:#111111;color:#F5F0E8;font-size:13px;border-bottom:1px solid #1E1E1E;font-weight:600">${value}</td>
      </tr>`
    ).join("")

    const bookingHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:36px;border-radius:16px;border:1px solid rgba(201,168,76,0.2)">
        <h1 style="color:#C9A84C;font-size:26px">Pianoud</h1>
        <p style="color:#5A5A4A;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:28px">Online Music Academy</p>
        <div style="background:#161616;border-left:4px solid #C9A84C;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:24px">
          <p style="color:#C9A84C;font-size:12px;font-weight:700;letter-spacing:2px;margin-bottom:4px">
            ${isFree ? "NEW FREE ASSESSMENT REQUEST" : "NEW BOOKING REQUEST"}
          </p>
          <p style="color:#F5F0E8;font-size:18px;font-weight:700;margin:0">${plan}</p>
          <p style="color:#C9A84C;font-size:24px;font-weight:800;margin:8px 0 0">${displayPrice}</p>
        </div>
        <table style="width:100%;border-collapse:collapse">${tableRows}</table>
        <div style="margin-top:20px;padding:16px;background:#161616;border-radius:8px;border:1px solid rgba(201,168,76,0.15)">
          <p style="color:#C9A84C;font-size:13px;font-weight:700;margin-bottom:8px">Action Required:</p>
          <p style="color:#8A8A7A;font-size:13px;line-height:1.7;margin:0">
            Contact <strong style="color:#F5F0E8">${name}</strong> within 24 hours at ${email} or WhatsApp: ${phone}
            ${isFree ? "" : " and send the payment link (" + displayPrice + ")"}
          </p>
        </div>
      </div>
    `

    const studentHtml = `
      <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:36px;border-radius:16px;border:1px solid rgba(201,168,76,0.2)">
        <h1 style="color:#C9A84C;font-size:26px">Pianoud</h1>
        <h2 style="color:#F5F0E8;font-size:20px;margin-bottom:12px">Hi ${name}!</h2>
        <p style="color:#8A8A7A;line-height:1.8;margin-bottom:20px">
          We received your booking for <strong style="color:#C9A84C">${plan}</strong>.
          Our instructor <strong style="color:#F5F0E8">Omar Algour</strong> will contact you within 24 hours.
        </p>
        <div style="background:#161616;border:1px solid rgba(201,168,76,0.15);border-radius:10px;padding:20px;margin-bottom:20px">
          <p style="color:#5A5A4A;font-size:12px;margin-bottom:4px">Plan</p>
          <p style="color:#F5F0E8;font-size:16px;font-weight:700;margin-bottom:12px">${plan}</p>
          <p style="color:#5A5A4A;font-size:12px;margin-bottom:4px">Price</p>
          <p style="color:#C9A84C;font-size:22px;font-weight:800;margin-bottom:12px">${displayPrice}</p>
          <p style="color:#5A5A4A;font-size:12px;margin-bottom:4px">Preferred session</p>
          <p style="color:#F5F0E8;font-size:14px;font-weight:600">${date} at ${time}</p>
        </div>
        <p style="color:#3A3A3A;font-size:11px;margin-top:24px;text-align:center">Pianoud — Online Music Academy</p>
      </div>
    `

    // Email to Omar
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      "omar@pianoud.com",
      subject: (isFree ? "Free Assessment: " : "New Booking: ") + name + " — " + plan,
      html:    bookingHtml,
    })

    // Email to Admin
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      process.env.SMTP_USER,
      subject: "[Pianoud Booking] " + name + " — " + displayPrice,
      html:    bookingHtml,
    })

    // Email to Student
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      email,
      subject: "Pianoud — Booking Confirmed: " + plan,
      html:    studentHtml,
    })

    return NextResponse.json({ success: true })
  } catch(err) {
    console.error("Booking error:", err)
    return NextResponse.json({ error: "Server error" }, { status:500 })
  }
}
