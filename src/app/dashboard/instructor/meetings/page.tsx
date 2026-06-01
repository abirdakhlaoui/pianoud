"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

type Student = {
  id:    string
  name:  string
  email: string
  course: string
  courseSlug: string
}

type Meeting = {
  id:        string
  platform:  string
  link:      string
  date:      string
  time:      string
  note:      string
  student:   { id:string; name:string }
  courseSlug: string
  createdAt: string
}

export default function MeetingsPage() {
  const { data: session } = useSession()
  const { isAr }          = useLang()
  const user              = session?.user as any

  const [students, setStudents]   = useState<Student[]>([])
  const [meetings, setMeetings]   = useState<Meeting[]>([])
  const [loading, setLoading]     = useState(true)
  const [sending, setSending]     = useState(false)
  const [success, setSuccess]     = useState("")

  const [platform, setPlatform]   = useState<"meet"|"zoom">("meet")
  const [studentId, setStudentId] = useState("")
  const [date, setDate]           = useState("")
  const [time, setTime]           = useState("")
  const [link, setLink]           = useState("")
  const [note, setNote]           = useState("")

  useEffect(() => {
    fetchStudents()
    fetchMeetings()
  }, [])

  async function fetchStudents() {
    // Get all users the instructor can message (enrolled students)
    const res  = await fetch("/api/users")
    const data = await res.json()
    const stds = (data.users || []).filter((u: any) => u.role === "STUDENT")
    setStudents(stds.map((u: any) => ({
      id:         u.id,
      name:       u.name,
      email:      u.email,
      course:     "Enrolled Course",
      courseSlug: "",
    })))
    setLoading(false)
  }

  async function fetchMeetings() {
    const res  = await fetch("/api/meetings")
    const data = await res.json()
    setMeetings(data.meetings || [])
  }

  async function handleSchedule(e: React.FormEvent) {
    e.preventDefault()
    if (!studentId || !date || !time || !link) return
    setSending(true)

    const selectedStudent = students.find((s: any) => s.id === studentId)

    // Send meeting as a message to the student
    const meetingMsg = platform === "meet"
      ? `📅 **Live Session Scheduled**\n\n🗓 Date: ${date}\n⏰ Time: ${time}\n📹 Platform: Google Meet\n🔗 Link: ${link}${note ? `\n📝 Note: ${note}` : ""}\n\nSee you there! 🎵`
      : `📅 **Live Session Scheduled**\n\n🗓 Date: ${date}\n⏰ Time: ${time}\n📹 Platform: Zoom\n🔗 Link: ${link}${note ? `\n📝 Note: ${note}` : ""}\n\nSee you there! 🎵`

    const res = await fetch("/api/messages", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        receiverId: studentId,
        content:    meetingMsg,
      }),
    })

    if (res.ok) {
      // Also save to meetings DB
      await fetch("/api/meetings", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ studentId, platform, date, time, link, note }),
      })

      setSuccess(isAr
        ? `تم إرسال رابط الجلسة لـ ${selectedStudent?.name} ✓`
        : `Meeting link sent to ${selectedStudent?.name} ✓`)
      setTimeout(() => setSuccess(""), 4000)
      setStudentId("")
      setDate("")
      setTime("")
      setLink("")
      setNote("")
      fetchMeetings()
    }
    setSending(false)
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:900 }}>

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard/instructor" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr?"لوحة التحكم":"Dashboard"}
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr ? "جدولة جلسة مباشرة" : "Schedule a Live Session"}
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:6 }}>
            {isAr
              ? "أنشئ جلسة Zoom أو Google Meet وأرسل الرابط مباشرة للطالب عبر الرسائل."
              : "Create a Zoom or Google Meet session and send the link directly to the student via messages."}
          </p>
        </div>

        {success && (
          <div style={{ padding:"14px 20px", borderRadius:10, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:14, marginBottom:24, fontWeight:500 }}>
            {success}
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:32, alignItems:"start" }} className="meetings-grid">

          {/* Schedule form */}
          <div className="card" style={{ padding:32 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              {isAr ? "جلسة جديدة" : "New Session"}
            </h2>

            <form onSubmit={handleSchedule} style={{ display:"flex", flexDirection:"column", gap:18 }}>

              {/* Platform */}
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:10 }}>
                  {isAr ? "المنصة" : "Platform"}
                </label>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[
                    { key:"meet", label:"Google Meet", icon:"📹", color:"#34d399" },
                    { key:"zoom", label:"Zoom",        icon:"💻", color:"#60a5fa" },
                  ].map((p: any) => (
                    <button key={p.key} type="button" onClick={() => setPlatform(p.key as any)} style={{
                      padding:"14px", borderRadius:10, cursor:"pointer",
                      border:"2px solid",
                      borderColor: platform===p.key ? p.color : "var(--border)",
                      background: platform===p.key ? `${p.color}15` : "var(--ink)",
                      display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                      transition:"all 0.2s",
                    }}>
                      <span style={{ fontSize:24 }}>{p.icon}</span>
                      <span style={{ fontSize:13, fontWeight:600, color: platform===p.key ? p.color : "var(--text-muted)" }}>
                        {p.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Student */}
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "الطالب" : "Student"} *
                </label>
                {loading ? (
                  <p style={{ fontSize:13, color:"var(--text-muted)", padding:"12px 16px" }}>
                    {isAr?"جاري التحميل...":"Loading students..."}
                  </p>
                ) : students.length === 0 ? (
                  <div style={{ padding:"12px 16px", borderRadius:8, background:"var(--ink-soft)", border:"1px solid var(--border)", fontSize:13, color:"var(--text-muted)" }}>
                    {isAr?"لا يوجد طلاب بعد":"No students yet"}
                  </div>
                ) : (
                  <select value={studentId} onChange={e=>setStudentId(e.target.value)} required
                    style={{ ...inputStyle, cursor:"pointer" }}>
                    <option value="">{isAr?"اختر الطالب...":"Select a student..."}</option>
                    {students.map((s: any) => (
                      <option key={s.id} value={s.id}>{s.name} — {s.email}</option>
                    ))}
                  </select>
                )}
              </div>

              {/* Date & Time */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                    {isAr ? "التاريخ" : "Date"} *
                  </label>
                  <input type="date" value={date} onChange={e=>setDate(e.target.value)} required
                    min={new Date().toISOString().split("T")[0]}
                    style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                    {isAr ? "الوقت" : "Time"} *
                  </label>
                  <input type="time" value={time} onChange={e=>setTime(e.target.value)} required
                    style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
              </div>

              {/* Meeting link */}
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {platform==="meet" ? "Google Meet" : "Zoom"} {isAr?"الرابط":"Link"} *
                </label>
                <input type="url" value={link} onChange={e=>setLink(e.target.value)} required
                  placeholder={platform==="meet"
                    ? "https://meet.google.com/xxx-yyyy-zzz"
                    : "https://zoom.us/j/123456789"}
                  style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e =>e.target.style.borderColor="var(--border)"} />
                <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:6 }}>
                  {platform==="meet"
                    ? (isAr?"أنشئ اجتماعاً على Google Meet وانسخ الرابط هنا":"Create a meeting on Google Meet and paste the link here")
                    : (isAr?"أنشئ اجتماعاً على Zoom وانسخ الرابط هنا":"Create a Zoom meeting and paste the link here")}
                </p>
              </div>

              {/* Note */}
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "ملاحظة للطالب (اختياري)" : "Note to Student (optional)"}
                </label>
                <textarea value={note} onChange={e=>setNote(e.target.value)} rows={3}
                  placeholder={isAr
                    ? "مثال: سنراجع معاً سلّم دو الكبير..."
                    : "e.g. We'll review the C Major scale together..."}
                  style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e =>e.target.style.borderColor="var(--border)"} />
              </div>

              <button type="submit" disabled={sending || !studentId || !date || !time || !link}
                className="btn-gold"
                style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15,
                  opacity: sending || !studentId || !date || !time || !link ? 0.6 : 1 }}>
                {sending
                  ? (isAr?"جاري الإرسال...":"Sending...")
                  : (isAr?"📨 إرسال رابط الجلسة للطالب":"📨 Send Session Link to Student")}
              </button>

              <p style={{ fontSize:12, color:"var(--text-muted)", textAlign:"center" }}>
                {isAr
                  ? "سيصل الرابط للطالب عبر نظام الرسائل مباشرة."
                  : "The link will be sent to the student via the messages system."}
              </p>
            </form>
          </div>

          {/* Scheduled sessions */}
          <div>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              {isAr ? "الجلسات المجدولة" : "Scheduled Sessions"}
            </h2>

            {meetings.length === 0 ? (
              <div className="card" style={{ padding:32, textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>📅</div>
                <p style={{ fontSize:14, color:"var(--text-muted)" }}>
                  {isAr ? "لا توجد جلسات مجدولة بعد" : "No sessions scheduled yet"}
                </p>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {meetings.map((m: any, i: any) => {
                  const isPast = new Date(`${m.date}T${m.time}`) < new Date()
                  return (
                    <div key={m.id || i} className="card" style={{ padding:20, borderLeft: isPast?"3px solid var(--border)":"3px solid #34d399", opacity:isPast?0.7:1 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", gap:8, alignItems:"center", marginBottom:6 }}>
                            <span style={{ fontSize:12, fontWeight:700, padding:"2px 10px", borderRadius:6,
                              background: m.platform==="meet"?"rgba(52,211,153,0.1)":"rgba(96,165,250,0.1)",
                              color: m.platform==="meet"?"#34d399":"#60a5fa",
                            }}>
                              {m.platform==="meet"?"📹 Google Meet":"💻 Zoom"}
                            </span>
                            {isPast && (
                              <span style={{ fontSize:11, color:"var(--text-muted)", fontStyle:"italic" }}>
                                {isAr?"منتهي":"Past"}
                              </span>
                            )}
                          </div>
                          <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                            👤 {m.student?.name || "Student"}
                          </div>
                          <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:8 }}>
                            🗓 {m.date} · ⏰ {m.time}
                          </div>
                          {m.note && (
                            <div style={{ fontSize:12, color:"var(--text-muted)", fontStyle:"italic", marginBottom:8 }}>
                              📝 {m.note}
                            </div>
                          )}
                        </div>
                        {!isPast && (
                          <a href={m.link} target="_blank" rel="noopener noreferrer"
                            className="btn-gold" style={{ padding:"8px 16px", fontSize:12, flexShrink:0 }}>
                            {isAr?"انضم":"Join"}
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* How it works */}
            <div className="card" style={{ padding:24, marginTop:20 }}>
              <h3 style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:14 }}>
                {isAr ? "كيف يعمل؟" : "How it works"}
              </h3>
              {[
                { step:"1", en:"Create a meeting on Google Meet or Zoom", ar:"أنشئ اجتماعاً على Google Meet أو Zoom" },
                { step:"2", en:"Copy the meeting link",                    ar:"انسخ رابط الاجتماع" },
                { step:"3", en:"Fill the form and click Send",             ar:"امل النموذج واضغط إرسال" },
                { step:"4", en:"Student receives the link in Messages",    ar:"يصل الرابط للطالب في الرسائل" },
                { step:"5", en:"Both join at the scheduled time",          ar:"ينضمان معاً في الوقت المحدد" },
              ].map((s: any) => (
                <div key={s.step} style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:10 }}>
                  <div style={{ width:22, height:22, borderRadius:"50%", background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:"var(--gold)", flexShrink:0 }}>
                    {s.step}
                  </div>
                  <span style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.5 }}>{isAr?s.ar:s.en}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .meetings-grid { grid-template-columns: 1.2fr 1fr; }
        @media(max-width: 900px) { .meetings-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
