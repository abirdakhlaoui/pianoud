"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

export default function StudentMeetingsPage() {
  const { data: session } = useSession()
  const { isAr }          = useLang()
  const [meetings, setMeetings] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    fetch("/api/meetings")
      .then(r => r.json())
      .then(data => { setMeetings(data.meetings || []); setLoading(false) })
  }, [])

  const upcoming = meetings.filter(m => new Date(`${m.date}T${m.time}`) >= new Date())
  const past     = meetings.filter(m => new Date(`${m.date}T${m.time}`) < new Date())

  function MeetingCard({ m, isPast }: { m: any; isPast: boolean }) {
    return (
      <div className="card" style={{ padding:24, borderLeft:`3px solid ${isPast?"var(--border)":"#34d399"}`, opacity:isPast?0.7:1 }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", gap:8, marginBottom:8, flexWrap:"wrap" }}>
              <span style={{ fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:6,
                background: m.platform==="meet"?"rgba(52,211,153,0.1)":"rgba(96,165,250,0.1)",
                color: m.platform==="meet"?"#34d399":"#60a5fa",
              }}>
                {m.platform==="meet"?"📹 Google Meet":"💻 Zoom"}
              </span>
              {!isPast && (
                <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(52,211,153,0.08)", color:"#34d399", fontWeight:600 }}>
                  {isAr?"قادم":"Upcoming"}
                </span>
              )}
            </div>
            <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:6 }}>
              🎓 {isAr?"مع المدرّس:":"With:"} {m.instructor?.name}
            </div>
            <div style={{ fontSize:14, color:"var(--text-muted)", marginBottom:4 }}>
              🗓 {m.date} · ⏰ {m.time}
            </div>
            {m.note && (
              <div style={{ fontSize:13, color:"var(--text-muted)", fontStyle:"italic", marginTop:6, padding:"8px 12px", background:"var(--ink-soft)", borderRadius:6 }}>
                📝 {m.note}
              </div>
            )}
          </div>
          {!isPast && (
            <a href={m.link} target="_blank" rel="noopener noreferrer"
              className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0 }}>
              {isAr?"انضم للجلسة":"Join Session"}
            </a>
          )}
        </div>
      </div>
    )
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:700 }}>

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr?"لوحة التحكم":"Dashboard"}
          </Link>
          <h1 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr?"جلساتي المباشرة":"My Live Sessions"}
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:6 }}>
            {isAr
              ? "الجلسات المباشرة التي جدولها مدرّسوك معك."
              : "Live sessions scheduled by your instructors with you."}
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>
            {isAr?"جاري التحميل...":"Loading..."}
          </div>
        ) : meetings.length === 0 ? (
          <div className="card" style={{ padding:48, textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>📅</div>
            <h3 className="font-display" style={{ fontSize:22, color:"var(--cream)", marginBottom:12 }}>
              {isAr?"لا توجد جلسات بعد":"No sessions yet"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:20 }}>
              {isAr
                ? "حين يجدول مدرّسك جلسة معك، ستظهر هنا وستصلك عبر الرسائل."
                : "When your instructor schedules a session with you, it will appear here and in your messages."}
            </p>
            <Link href="/dashboard/messages" className="btn-outline" style={{ padding:"10px 24px" }}>
              {isAr?"الرسائل":"Messages"}
            </Link>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {upcoming.length > 0 && (
              <div>
                <h2 style={{ fontSize:16, fontWeight:700, color:"var(--gold)", marginBottom:14, letterSpacing:1, textTransform:"uppercase" }}>
                  {isAr?"القادمة":"Upcoming"}
                </h2>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {upcoming.map((m,i) => <MeetingCard key={i} m={m} isPast={false}/>)}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h2 style={{ fontSize:16, fontWeight:700, color:"var(--text-muted)", marginBottom:14, letterSpacing:1, textTransform:"uppercase" }}>
                  {isAr?"المنتهية":"Past"}
                </h2>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {past.map((m,i) => <MeetingCard key={i} m={m} isPast={true}/>)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  )
}
