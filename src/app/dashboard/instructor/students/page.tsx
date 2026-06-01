"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

export default function InstructorStudentsPage() {
  const { data: session } = useSession()
  const { isAr }          = useLang()
  const [students, setStudents] = useState<any[]>([])
  const [loading, setLoading]   = useState(true)
  const [search, setSearch]     = useState("")

  useEffect(() => { fetchStudents() }, [])

  async function fetchStudents() {
    const res  = await fetch("/api/instructor/students")
    const data = await res.json()
    setStudents(data.students || [])
    setLoading(false)
  }

  const filtered = students.filter((s: any) =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard/instructor" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr?"لوحة التحكم":"Dashboard"}
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr?"طلابي":"My Students"}
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:6 }}>
            {students.length} {isAr?"طالب مسجّل":"enrolled students"}
          </p>
        </div>

        {/* Search */}
        <div style={{ marginBottom:24 }}>
          <input type="text" placeholder={isAr?"ابحث عن طالب...":"Search student..."} value={search}
            onChange={e=>setSearch(e.target.value)}
            style={{ width:"100%", maxWidth:400, padding:"11px 16px", borderRadius:8, border:"1px solid var(--border)", background:"var(--ink-card)", color:"var(--cream)", fontSize:14, outline:"none" }}
            onFocus={e=>e.target.style.borderColor="var(--gold)"}
            onBlur={e =>e.target.style.borderColor="var(--border)"} />
        </div>

        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>
            {isAr?"جاري التحميل...":"Loading..."}
          </div>
        ) : filtered.length === 0 ? (
          <div className="card" style={{ padding:48, textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>👥</div>
            <p style={{ fontSize:16, color:"var(--text-muted)" }}>
              {isAr?"لا يوجد طلاب بعد":"No students yet"}
            </p>
          </div>
        ) : (
          <div className="card" style={{ overflow:"hidden" }}>
            {/* Header */}
            <div style={{ display:"grid", gridTemplateColumns:"2fr 2fr 2fr 1fr 120px", gap:16, padding:"12px 24px", background:"var(--ink-soft)", borderBottom:"1px solid var(--border)" }}>
              {["STUDENT","EMAIL","COURSE","PROGRESS","ACTIONS"].map((h: any) =>(
                <span key={h} style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", letterSpacing:1.5 }}>{h}</span>
              ))}
            </div>
            {filtered.map((s:any, i:number) => (
              <div key={s.enrollmentId} style={{ display:"grid", gridTemplateColumns:"2fr 2fr 2fr 1fr 120px", gap:16, padding:"16px 24px", alignItems:"center", borderBottom:i<filtered.length-1?"1px solid var(--border)":"none" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                    {s.name[0].toUpperCase()}
                  </div>
                  <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                    {s.name}
                  </div>
                </div>
                <div style={{ fontSize:13, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {s.email}
                </div>
                <div style={{ fontSize:13, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                  {s.courseTitle}
                </div>
                <div>
                  <div style={{ height:6, background:"var(--border)", borderRadius:3, overflow:"hidden", marginBottom:4 }}>
                    <div style={{ height:"100%", background:"var(--gold)", borderRadius:3, width:`${s.progress || 0}%` }}/>
                  </div>
                  <span style={{ fontSize:11, color:"var(--text-muted)" }}>{s.progress || 0}%</span>
                </div>
                <div style={{ display:"flex", gap:6 }}>
                  <Link href={`/dashboard/messages?with=${s.id}`} className="btn-outline" style={{ padding:"6px 12px", fontSize:11 }}>
                    💬 {isAr?"رسالة":"Message"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
