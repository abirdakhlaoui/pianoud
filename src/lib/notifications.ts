import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST,
  port:   Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function notifyHomeworkAssigned(
  studentEmail: string,
  studentName:  string,
  homeworkTitle: string,
  courseName:   string,
  dueDate?:     string
) {
  try {
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      studentEmail,
      subject: `📚 New Homework: ${homeworkTitle} — Pianoud`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:36px;border-radius:16px;border:1px solid rgba(201,168,76,0.2)">
          <h1 style="background:linear-gradient(135deg,#E8CB7E,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:26px;margin-bottom:4px">Pianoud</h1>
          <p style="color:#5A5A4A;font-size:11px;letter-spacing:3px;text-transform:uppercase;margin-bottom:28px">Online Music Academy</p>

          <h2 style="color:#F5F0E8;font-size:18px;margin-bottom:8px">Hi ${studentName}! 📚</h2>
          <p style="color:#8A8A7A;line-height:1.7;margin-bottom:20px">
            Your instructor has assigned new homework for your course <strong style="color:#C9A84C">${courseName}</strong>.
          </p>

          <div style="background:#161616;border:1px solid rgba(201,168,76,0.15);border-radius:10px;padding:20px;margin-bottom:24px">
            <p style="font-size:11px;color:#5A5A4A;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px">Homework</p>
            <p style="font-size:18px;font-weight:700;color:#F5F0E8;margin-bottom:8px">${homeworkTitle}</p>
            ${dueDate ? `<p style="font-size:13px;color:#C9A84C">📅 Due: ${dueDate}</p>` : ""}
          </div>

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/homework"
            style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#E8CB7E,#C9A84C);color:#0A0A0A;font-weight:700;border-radius:8px;text-decoration:none;font-size:14px">
            View Homework →
          </a>

          <p style="color:#3A3A3A;font-size:11px;margin-top:28px">© 2025 Pianoud — Online Music Academy</p>
        </div>
      `,
    })
  } catch(err) {
    console.error("Email notification error:", err)
  }
}

export async function notifyMessageReceived(
  receiverEmail: string,
  receiverName:  string,
  senderName:    string,
  preview:       string
) {
  try {
    await transporter.sendMail({
      from:    process.env.EMAIL_FROM,
      to:      receiverEmail,
      subject: `💬 New message from ${senderName} — Pianoud`,
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;background:#0A0A0A;color:#F5F0E8;padding:36px;border-radius:16px;border:1px solid rgba(201,168,76,0.2)">
          <h1 style="background:linear-gradient(135deg,#E8CB7E,#C9A84C);-webkit-background-clip:text;-webkit-text-fill-color:transparent;font-size:26px;margin-bottom:28px">Pianoud</h1>

          <h2 style="color:#F5F0E8;font-size:18px;margin-bottom:8px">Hi ${receiverName}! 💬</h2>
          <p style="color:#8A8A7A;line-height:1.7;margin-bottom:20px">
            You have a new message from <strong style="color:#C9A84C">${senderName}</strong>.
          </p>

          <div style="background:#161616;border:1px solid rgba(201,168,76,0.15);border-radius:10px;padding:20px;margin-bottom:24px">
            <p style="font-size:14px;color:#8A8A7A;line-height:1.7;font-style:italic">"${preview}"</p>
          </div>

          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/messages"
            style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#E8CB7E,#C9A84C);color:#0A0A0A;font-weight:700;border-radius:8px;text-decoration:none;font-size:14px">
            Reply →
          </a>
        </div>
      `,
    })
  } catch(err) {
    console.error("Email notification error:", err)
  }
}
