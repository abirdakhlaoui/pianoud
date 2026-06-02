"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

const COURSES = [
  { id:"", title:"Select a course..." },
  { id:"piano-fundamentals", title:"Piano Fundamentals" },
  { id:"classical-piano",    title:"Classical Piano" },
  { id:"arabic-piano",       title:"Arabic Piano" },
  { id:"piano-kids",         title:"Piano KIDS" },
  { id:"music-reading",      title:"Music Reading" },
  { id:"arabic-maqam-oud",   title:"Arabic Maqam & Oud" },
  { id:"oud-beginners",      title:"Oud for Beginners" },
  { id:"oud-advanced",       title:"Oud Advanced" },
  { id:"oud-harmony",        title:"Harmony for Oud" },
]

export default function AdminEnrollmentsPage() {
  const { isAr } = useLang()

  const [users, setUsers]           = useState<any[]>([])
  const [courses, setCourses]       = useState<any[]>([])
  const [enrollments, setEnrollments] = useState<any[]>([])
  const [loading, setLoading]       = useState(true)

  const [selectedUser, setSelectedUser]     = useState("")
  const [selectedCourse, setSelectedCourse] = useState("")
  const [enrolling, setEnrolling]           = useState(false)
  const [msg, setMsg]                       = useState("")
  const [error, setError]                   = useState("")
  const [searchUser, setSearchUser]         = useState("")

  useEffect(() => {
    fetchAll()
  }, [])

  async function fetchAll() {
    setLoading(true)
    const [usersRes, coursesRes] = await Promise.all([
      fetch("/api/users"),
      fetch("/api/admin/courses"),
    ])
    const usersData   = await usersRes.json()
    const coursesData = await coursesRes.json()
    setUsers(usersData.users || [])
    setCourses(coursesData.courses || [])

    // Get all enrollments
    const enrollRes  = await fetch("/api/admin/enrollments/list")
    const enrollData = await enrollRes.json()
    setEnrollments(enrollData.enrollments || [])
    setLoading(false)
  }

  async function enroll(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedUser || !selectedCourse) return
    setEnrolling(true)
    setMsg(""); setError("")

    const res  = await fetch("/api/admin/enrollments", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ userId: selectedUser, courseId: selectedCourse }),
    })
    const data = await res.json()
    setEnrolling(false)

    if (res.ok) {
      const userName   = users.find((u: any) =>u.id===selectedUser)?.name
      const courseName = courses.find((c: any) =>c.id===selectedCourse)?.title_en
      setMsg(`✓ ${userName} enrolled in ${courseName}`)
      setTimeout(() => setMsg(""), 4000)
      setSelectedUser("")
      setSelectedCourse("")
      fetchAll()
    } else {
      setError(data.error || "Error")
    }
  }

  async function removeEnrollment(userId: string, courseId: string) {
    if (!confirm("Remove this enrollment?")) return
    const res = await fetch(`/api/admin/enrollments?userId=${userId}&courseId=${courseId}`, { method:"DELETE" })
    if (res.ok) {
      setMsg("Enrollment removed ✓")
      setTimeout(() => setMsg(""), 3000)
      fetchAll()
    }
  }

  const students = users.filter((u: any) => u.role === "STUDENT")
  const filtered = enrollments.filter((e: any) =>
    !searchUser ||
    e.user?.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
    e.user?.email?.toLowerCase().includes(searchUser.toLowerCase())
  )

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard/admin" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← Admin Panel
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            Manage Enrollments
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:4 }}>
            Manually enroll students in courses or remove enrollments.
          </p>
        </div>

        {msg && (
          <div style={{ padding:"12px 20px", borderRadius:10, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:14, marginBottom:24 }}>
            {msg}
          </div>
        )}
        {error && (
          <div style={{ padding:"12px 20px", borderRadius:10, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:14, marginBottom:24 }}>
            {error}
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"380px 1fr", gap:32, alignItems:"start" }} className="enroll-grid">

          {/* Enroll form */}
          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              Enroll a Student
            </h2>
            <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
              Manually enroll any student in any course. Useful for free access, scholarships, or testing.
            </p>

            <form onSubmit={enroll} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  Student
                </label>
                <select value={selectedUser} onChange={e=>setSelectedUser(e.target.value)} required
                  style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="">Select a student...</option>
                  {students.map((u: any) => (
                    <option key={u.id} value={u.id}>{u.name} — {u.email}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  Course
                </label>
                <select value={selectedCourse} onChange={e=>setSelectedCourse(e.target.value)} required
                  style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="">Select a course...</option>
                  {courses.map((c: any) => (
                    <option key={c.id} value={c.id}>{c.title_en}</option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={enrolling || !selectedUser || !selectedCourse}
                className="btn-gold"
                style={{ width:"100%", justifyContent:"center", padding:14, opacity: enrolling || !selectedUser || !selectedCourse ? 0.6 : 1 }}>
                {enrolling ? "Enrolling..." : "✓ Enroll Student"}
              </button>
            </form>
          </div>

          {/* Enrollments list */}
          <div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16, gap:12 }}>
              <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)" }}>
                All Enrollments ({enrollments.length})
              </h2>
              <input type="text" placeholder="Search student..." value={searchUser}
                onChange={e=>setSearchUser(e.target.value)}
                style={{ ...inputStyle, width:220 }}
                onFocus={e=>e.target.style.borderColor="var(--gold)"}
                onBlur={e =>e.target.style.borderColor="var(--border)"} />
            </div>

            {loading ? (
              <div style={{ textAlign:"center", padding:"40px 0", color:"var(--text-muted)" }}>Loading...</div>
            ) : filtered.length === 0 ? (
              <div className="card" style={{ padding:32, textAlign:"center" }}>
                <p style={{ color:"var(--text-muted)" }}>No enrollments found.</p>
              </div>
            ) : (
              <div className="card" style={{ overflow:"hidden" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1.5fr 2fr 1fr 80px", gap:16, padding:"12px 20px", background:"var(--ink-soft)", borderBottom:"1px solid var(--border)" }}>
                  {["STUDENT","COURSE","STATUS",""].map((h: any) =>(
                    <span key={h} style={{ fontSize:11, fontWeight:700, color:"var(--text-muted)", letterSpacing:1.5 }}>{h}</span>
                  ))}
                </div>
                {filtered.map((e: any, i: number) => (
                  <div key={e.id} style={{ display:"grid", gridTemplateColumns:"1.5fr 2fr 1fr 80px", gap:16, padding:"14px 20px", alignItems:"center", borderBottom: i<filtered.length-1?"1px solid var(--border)":"none" }}>
                    <div>
                      <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{e.user?.name}</div>
                      <div style={{ fontSize:11, color:"var(--text-muted)" }}>{e.user?.email}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:13, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {e.course?.instrument==="PIANO"?"🎹":"🪘"} {e.course?.title_en}
                      </div>
                      {e.paidAmount > 0 && (
                        <div style={{ fontSize:11, color:"var(--gold)" }}>${e.paidAmount} paid</div>
                      )}
                      {e.paidAmount === 0 && (
                        <div style={{ fontSize:11, color:"var(--text-muted)" }}>Free / Manual</div>
                      )}
                    </div>
                    <span style={{ fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:6, display:"inline-block",
                      background: e.status==="ACTIVE"?"rgba(52,211,153,0.1)":"rgba(248,113,113,0.1)",
                      color: e.status==="ACTIVE"?"#34d399":"#f87171",
                    }}>
                      {e.status}
                    </span>
                    <button onClick={() => removeEnrollment(e.userId, e.courseId)} style={{ padding:"6px 12px", fontSize:11, borderRadius:6, border:"1px solid rgba(248,113,113,0.3)", background:"transparent", color:"#f87171", cursor:"pointer" }}>
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .enroll-grid { grid-template-columns: 380px 1fr; }
        @media(max-width:900px) { .enroll-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
