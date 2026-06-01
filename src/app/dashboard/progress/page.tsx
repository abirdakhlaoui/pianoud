"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

const COURSE_LESSON_IDS: Record<string, string[]> = {
  "piano-fundamentals": ["pf-l1","pf-l2","pf-l3","pf-l4","pf-l5","pf-l6","pf-l7","pf-l8","pf-l9"],
  "classical-piano":    ["cp-l1","cp-l2","cp-l3"],
  "arabic-piano":       ["ap-l1","ap-l2","ap-l3"],
  "piano-kids":         ["pk-l1","pk-l2","pk-l3","pk-l4"],
  "music-reading":      ["mr-l1","mr-l2","mr-l3","mr-l4"],
  "arabic-maqam-oud":   ["am-l1","am-l2","am-l3","am-l4","am-l5"],
  "oud-beginners":      ["ob-l1","ob-l2","ob-l3"],
  "oud-advanced":       ["oa-l1","oa-l2","oa-l3"],
  "oud-harmony":        ["oh-l1","oh-l2","oh-l3"],
}

export default function ProgressPage() {
  const { data: session, status } = useSession()
  const { isAr } = useLang()
  const [enrollments, setEnrollments]   = useState<any[]>([])
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    if (status === "authenticated") fetchData()
    if (status === "unauthenticated") setLoading(false)
  }, [status])

  async function fetchData() {
    try {
      const [enrRes, progRes] = await Promise.all([
        fetch("/api/student/enrollments"),
        fetch("/api/progress"),
      ])
      const enrData  = await enrRes.json()
      const progData = await progRes.json()
      setEnrollments(enrData.enrollments || [])
      const ids = new Set<string>(
        (progData.progress || [])
          .filter((p: any) => p.completed)
          .map((p: any) => p.lessonId as string)
      )
      setCompletedIds(ids)
    } catch(err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function getCourseProgress(slug: string) {
    const lessonIds = COURSE_LESSON_IDS[slug] || []
    const total     = lessonIds.length || 1
    const completed = lessonIds.filter(id => completedIds.has(id)).length
    const pct       = Math.round((completed / total) * 100)
    return { completed, total, pct }
  }

  if (loading) return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <div style={{ fontSize:40, marginBottom:16 }}>🎵</div>
      <p style={{ color:"var(--text-muted)" }}>{isAr?"جاري التحميل...":"Loading..."}</p>
    </main>
  )

  if (status === "unauthenticated") return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <p style={{ color:"var(--text-muted)", marginBottom:20 }}>Please sign in</p>
      <Link href="/auth/signin" className="btn-gold">Sign In</Link>
    </main>
  )

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:800 }}>

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr?"لوحة التحكم":"Dashboard"}
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr?"تقدّمي":"My Progress"}
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:6 }}>
            {isAr?"تتبّع تقدّمك في جميع الدورات المسجّلة":"Track your progress across all enrolled courses"}
          </p>
        </div>

        {/* Summary stats */}
        {enrollments.length > 0 && (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:36 }}>
            {[
              { label_en:"Enrolled",          label_ar:"الدورات",          value: enrollments.length,                                                             icon:"📚" },
              { label_en:"Lessons Done",      label_ar:"دروس مكتملة",      value: completedIds.size,                                                              icon:"✅" },
              { label_en:"Certificates",      label_ar:"شهادات",           value: enrollments.filter(e => getCourseProgress(e.course?.slug).pct===100).length,    icon:"🎓" },
            ].map((s,i) => (
              <div key={i} className="card" style={{ padding:20, textAlign:"center" }}>
                <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
                <div className="font-display" style={{ fontSize:28, fontWeight:700, color:"var(--gold)", marginBottom:4 }}>{s.value}</div>
                <div style={{ fontSize:12, color:"var(--text-muted)" }}>{isAr?s.label_ar:s.label_en}</div>
              </div>
            ))}
          </div>
        )}

        {/* No enrollments */}
        {enrollments.length === 0 ? (
          <div className="card" style={{ padding:56, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📚</div>
            <h3 className="font-display" style={{ fontSize:22, color:"var(--cream)", marginBottom:12 }}>
              {isAr?"لم تسجّل في أي دورة بعد":"No courses yet"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24 }}>
              {isAr?"سجّل في دورة لتبدأ رحلتك الموسيقية":"Enroll in a course to start your musical journey"}
            </p>
            <Link href="/courses" className="btn-gold" style={{ display:"inline-flex" }}>
              {isAr?"استعرض الدورات":"Browse Courses"}
            </Link>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {enrollments.map((enrollment: any) => {
              const slug       = enrollment.course?.slug
              const { completed, total, pct } = getCourseProgress(slug)
              const isComplete = pct === 100

              return (
                <div key={enrollment.id} className="card" style={{
                  padding:28,
                  borderLeft:`3px solid ${isComplete?"#34d399":pct>0?"var(--gold)":"var(--border)"}`,
                }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:16, marginBottom:20 }}>
                    <div style={{
                      width:56, height:56, borderRadius:12, flexShrink:0,
                      background: enrollment.course?.instrument==="PIANO"
                        ? "linear-gradient(135deg,#0d1117,#1a1a2e)"
                        : "linear-gradient(135deg,#0d1117,#1a0a00)",
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
                    }}>
                      {enrollment.course?.instrument==="PIANO"?"🎹":"🪘"}
                    </div>

                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:17, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                        {isAr ? enrollment.course?.title_ar : enrollment.course?.title_en}
                      </div>
                      <div style={{ fontSize:13, color:"var(--text-muted)", marginBottom:6 }}>
                        {enrollment.course?.level} • {isAr?"سجّل:":"Enrolled:"} {new Date(enrollment.enrolledAt).toLocaleDateString()}
                      </div>
                      {isComplete && (
                        <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:700 }}>
                          🎉 {isAr?"مكتمل!":"Completed!"}
                        </span>
                      )}
                    </div>

                    <div style={{ textAlign:"center", flexShrink:0 }}>
                      <div className="font-display" style={{ fontSize:32, fontWeight:800, color: isComplete?"#34d399":pct>0?"var(--gold)":"var(--text-muted)" }}>
                        {pct}%
                      </div>
                      <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr?"مكتمل":"complete"}</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ height:8, background:"var(--border)", borderRadius:4, overflow:"hidden", marginBottom:14 }}>
                    <div style={{
                      height:"100%", borderRadius:4, transition:"width 0.6s ease",
                      width:`${pct}%`,
                      background: isComplete
                        ? "linear-gradient(90deg,#34d399,#059669)"
                        : "linear-gradient(90deg,#E8CB7E,#C9A84C)",
                    }}/>
                  </div>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                    <span style={{ fontSize:13, color:"var(--text-muted)" }}>
                      {completed}/{total} {isAr?"دروس":"lessons"}
                    </span>
                    <div style={{ display:"flex", gap:10 }}>
                      {isComplete && (
                        <Link href={`/dashboard/certificate?slug=${slug}`} className="btn-gold" style={{ padding:"8px 18px", fontSize:13 }}>
                          🎓 {isAr?"الشهادة":"Certificate"}
                        </Link>
                      )}
                      <Link href={`/courses/${slug}/learn`}
                        className={isComplete?"btn-outline":"btn-gold"}
                        style={{ padding:"8px 18px", fontSize:13 }}>
                        {isComplete?(isAr?"مراجعة":"Review"):pct===0?(isAr?"ابدأ →":"Start →"):(isAr?"متابعة →":"Continue →")}
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
