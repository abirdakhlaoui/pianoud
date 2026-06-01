"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

const COURSE_NAMES: Record<string, { en: string; ar: string }> = {
  "piano-fundamentals": { en:"Piano Fundamentals",       ar:"أساسيات البيانو"          },
  "arabic-maqam-oud":   { en:"Arabic Maqam & Oud",       ar:"المقامات العربية والعود"  },
  "classical-piano":    { en:"Classical Piano",           ar:"البيانو الكلاسيكي"        },
  "oud-beginners":      { en:"Oud for Beginners",         ar:"العود للمبتدئين"          },
  "arabic-piano":       { en:"Arabic Piano",              ar:"البيانو العربي"           },
  "oud-advanced":       { en:"Oud Advanced",              ar:"العود المتقدم"            },
  "piano-kids":         { en:"Piano KIDS",                ar:"البيانو للأطفال"          },
  "music-reading":      { en:"Music Reading",             ar:"قراءة النوتة الموسيقية"  },
  "oud-harmony":        { en:"Harmony for Oud",           ar:"الهارموني للعود"          },
}

export default function HomeworkPage() {
  const { data: session } = useSession()
  const { isAr }          = useLang()
  const user              = session?.user as any
  const isInstructor      = user?.role === "INSTRUCTOR" || user?.role === "ADMIN"

  const [homeworks, setHomeworks]   = useState<any[]>([])
  const [loading, setLoading]       = useState(true)
  const [submitting, setSubmitting] = useState<string|null>(null)
  const [grading, setGrading]       = useState<string|null>(null)
  const [answers, setAnswers]       = useState<Record<string,string>>({})
  const [submitted, setSubmitted]   = useState<Set<string>>(new Set())
  const [successMsg, setSuccessMsg] = useState("")
  const [grades, setGrades]         = useState<Record<string,{ grade:string; feedback:string }>>({})
  const [expandedHw, setExpandedHw] = useState<string|null>(null)

  // Create form
  const [showForm, setShowForm] = useState(false)
  const [creating, setCreating] = useState(false)
  const [form, setForm]         = useState({ title:"", description:"", courseSlug:"piano-fundamentals", dueDate:"" })

  useEffect(() => { fetchHomework() }, [])

  async function fetchHomework() {
    const res  = await fetch("/api/homework")
    const data = await res.json()
    setHomeworks(data.homeworks || [])
    setLoading(false)
  }

  async function submitHomework(homeworkId: string) {
    if (!answers[homeworkId]?.trim()) return
    setSubmitting(homeworkId)
    const res = await fetch("/api/homework/submit", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ homeworkId, answer: answers[homeworkId] }),
    })
    if (res.ok) {
      setSubmitted(prev => new Set([...prev, homeworkId]))
      setSuccessMsg(isAr ? "تم تسليم الواجب بنجاح ✓" : "Homework submitted successfully ✓")
      setTimeout(() => setSuccessMsg(""), 3000)
      fetchHomework()
    }
    setSubmitting(null)
  }

  async function gradeSubmission(submissionId: string) {
    const g = grades[submissionId]
    if (!g?.grade) return
    setGrading(submissionId)
    const res = await fetch("/api/homework/grade", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ submissionId, grade: g.grade, feedback: g.feedback }),
    })
    if (res.ok) {
      setSuccessMsg(isAr ? "تم تقييم الإجابة ✓" : "Submission graded ✓")
      setTimeout(() => setSuccessMsg(""), 3000)
      fetchHomework()
    }
    setGrading(null)
  }

  async function createHomework(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    const res  = await fetch("/api/homework", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form),
    })
    const data = await res.json()
    if (res.ok) {
      setSuccessMsg(isAr
        ? `تم إنشاء الواجب وإرساله لـ ${data.assignedTo} طالب ✓`
        : `Homework created & assigned to ${data.assignedTo} student(s) ✓`)
      setTimeout(() => setSuccessMsg(""), 4000)
      setForm({ title:"", description:"", courseSlug:"piano-fundamentals", dueDate:"" })
      setShowForm(false)
      fetchHomework()
    }
    setCreating(false)
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:860 }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:"var(--gold)", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>
              {isAr ? "الواجبات المنزلية" : "Homework"}
            </p>
            <h1 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)" }}>
              {isInstructor ? (isAr?"إدارة الواجبات":"Manage Homework") : (isAr?"واجباتي":"My Homework")}
            </h1>
          </div>
          {isInstructor && (
            <button onClick={() => setShowForm(!showForm)} className="btn-gold">
              {showForm ? (isAr?"إلغاء":"Cancel") : `+ ${isAr?"إضافة واجب":"Add Homework"}`}
            </button>
          )}
        </div>

        {/* Success */}
        {successMsg && (
          <div style={{ padding:"14px 20px", borderRadius:10, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:14, marginBottom:24, fontWeight:500 }}>
            {successMsg}
          </div>
        )}

        {/* Create form */}
        {isInstructor && showForm && (
          <div className="card" style={{ padding:32, marginBottom:32 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              {isAr ? "إنشاء واجب جديد" : "Create New Homework"}
            </h2>
            <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
              {isAr
                ? "سيُرسَل الواجب تلقائياً لجميع الطلاب المسجّلين في الدورة."
                : "Homework will be automatically assigned to all enrolled students."}
            </p>
            <form onSubmit={createHomework} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                    {isAr ? "الدورة" : "Course"}
                  </label>
                  <select value={form.courseSlug} onChange={e=>setForm(p=>({...p,courseSlug:e.target.value}))} style={{ ...inputStyle, cursor:"pointer" }}>
                    {Object.entries(COURSE_NAMES).map(([slug,name]) => (
                      <option key={slug} value={slug}>{isAr?name.ar:name.en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                    {isAr ? "تاريخ التسليم" : "Due Date"}
                  </label>
                  <input type="date" value={form.dueDate} onChange={e=>setForm(p=>({...p,dueDate:e.target.value}))}
                    style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "عنوان الواجب" : "Title"}
                </label>
                <input type="text" value={form.title} onChange={e=>setForm(p=>({...p,title:e.target.value}))}
                  required placeholder={isAr?"عنوان الواجب...":"Homework title..."} style={inputStyle}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e =>e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "التعليمات" : "Instructions"}
                </label>
                <textarea value={form.description} onChange={e=>setForm(p=>({...p,description:e.target.value}))}
                  rows={4} placeholder={isAr?"اشرح الواجب بالتفصيل...":"Describe the homework..."} style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e=>e.target.style.borderColor="var(--gold)"}
                  onBlur={e =>e.target.style.borderColor="var(--border)"} />
              </div>
              <div style={{ display:"flex", gap:12 }}>
                <button type="submit" disabled={creating} className="btn-gold" style={{ opacity:creating?0.7:1 }}>
                  {creating ? (isAr?"جاري الإنشاء...":"Creating...") : (isAr?"إنشاء وإرسال":"Create & Assign")}
                </button>
                <button type="button" onClick={()=>setShowForm(false)} className="btn-outline">
                  {isAr?"إلغاء":"Cancel"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Homework list */}
        {loading ? (
          <div style={{ textAlign:"center", padding:"60px 0", color:"var(--text-muted)" }}>
            {isAr?"جاري التحميل...":"Loading..."}
          </div>
        ) : homeworks.length === 0 ? (
          <div className="card" style={{ padding:56, textAlign:"center" }}>
            <div style={{ fontSize:56, marginBottom:16 }}>📚</div>
            <h3 className="font-display" style={{ fontSize:22, color:"var(--cream)", marginBottom:12 }}>
              {isAr?"لا توجد واجبات بعد":"No homework yet"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)" }}>
              {isInstructor
                ? (isAr?"أنشئ واجبك الأول أعلاه":"Create your first homework above")
                : (isAr?"ستظهر هنا واجبات مدرّسيك":"Your instructors' homework will appear here")}
            </p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
            {homeworks.map((hw: any) => {
              const mySubmission = hw.submissions?.[0]
              const isSubmitted  = submitted.has(hw.id) || !!mySubmission
              const isOverdue    = hw.dueDate && new Date(hw.dueDate) < new Date()
              const courseName   = COURSE_NAMES[hw.courseSlug]
              const daysLeft     = hw.dueDate ? Math.ceil((new Date(hw.dueDate).getTime()-Date.now())/86400000) : null
              const isExpanded   = expandedHw === hw.id

              return (
                <div key={hw.id} className="card" style={{ padding:28, borderLeft: isSubmitted?"3px solid #34d399":isOverdue?"3px solid #f87171":"3px solid var(--gold)" }}>

                  {/* Header */}
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, marginBottom:16 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:10 }}>
                        <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:6, background:"var(--gold-pale)", color:"var(--gold)" }}>
                          {isAr?courseName?.ar:courseName?.en}
                        </span>
                        {hw.dueDate && (
                          <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, fontWeight:600,
                            background: isOverdue?"rgba(248,113,113,0.1)":daysLeft&&daysLeft<=2?"rgba(251,191,36,0.1)":"rgba(52,211,153,0.1)",
                            color: isOverdue?"#f87171":daysLeft&&daysLeft<=2?"#fbbf24":"#34d399",
                          }}>
                            📅 {isOverdue?(isAr?"منتهي":"Overdue"):daysLeft===0?(isAr?"ينتهي اليوم":"Due today"):daysLeft===1?(isAr?"ينتهي غداً":"Due tomorrow"):`${new Date(hw.dueDate).toLocaleDateString()}`}
                          </span>
                        )}
                        {isSubmitted && !isInstructor && (
                          <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:800 }}>
                            ✓ {isAr?"تم التسليم":"Submitted"}
                          </span>
                        )}
                        {isInstructor && (
                          <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(96,165,250,0.1)", color:"#60a5fa", fontWeight:700 }}>
                            {hw.submissions?.length||0} {isAr?"إجابة":"submission(s)"}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:6 }}>
                        {hw.title}
                      </h3>
                      {hw.description && (
                        <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.8 }}>{hw.description}</p>
                      )}
                    </div>
                  </div>

                  {/* ── STUDENT: answer form ── */}
                  {!isInstructor && !isSubmitted && (
                    <div style={{ borderTop:"1px solid var(--border)", paddingTop:20 }}>
                      <label style={{ fontSize:13, fontWeight:600, color:"var(--cream)", display:"block", marginBottom:10 }}>
                        ✏️ {isAr?"إجابتك:":"Your Answer:"}
                      </label>
                      <textarea
                        value={answers[hw.id]||""}
                        onChange={e=>setAnswers(p=>({...p,[hw.id]:e.target.value}))}
                        rows={5}
                        placeholder={isAr?"اكتب إجابتك هنا...":"Write your answer here..."}
                        style={{ ...inputStyle, resize:"vertical", marginBottom:14 }}
                        onFocus={e=>e.target.style.borderColor="var(--gold)"}
                        onBlur={e =>e.target.style.borderColor="var(--border)"}
                      />
                      <button onClick={()=>submitHomework(hw.id)}
                        disabled={!answers[hw.id]?.trim()||submitting===hw.id}
                        className="btn-gold"
                        style={{ opacity:!answers[hw.id]?.trim()||submitting===hw.id?0.6:1 }}>
                        {submitting===hw.id?(isAr?"جاري الإرسال...":"Submitting..."):(isAr?"تسليم الواجب ✓":"Submit ✓")}
                      </button>
                    </div>
                  )}

                  {/* ── STUDENT: submitted + grade ── */}
                  {!isInstructor && isSubmitted && mySubmission && (
                    <div style={{ marginTop:16, padding:"16px 20px", borderRadius:10, background:"rgba(52,211,153,0.05)", border:"1px solid rgba(52,211,153,0.2)" }}>
                      <p style={{ fontSize:13, color:"#34d399", fontWeight:700, marginBottom:8 }}>
                        ✓ {isAr?"إجابتك:":"Your answer:"}
                      </p>
                      <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7, marginBottom: mySubmission.grade?12:0 }}>{mySubmission.answer}</p>
                      {mySubmission.grade && (
                        <div style={{ marginTop:12, padding:"12px 16px", borderRadius:8, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.25)" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                            <span style={{ fontSize:16 }}>🏆</span>
                            <span style={{ fontSize:15, fontWeight:700, color:"var(--gold)" }}>
                              {isAr?"درجتك:":"Grade:"} {mySubmission.grade}
                            </span>
                          </div>
                          {mySubmission.feedback && (
                            <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.6, marginTop:6 }}>
                              💬 {mySubmission.feedback}
                            </p>
                          )}
                        </div>
                      )}
                      {!mySubmission.grade && (
                        <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:8, fontStyle:"italic" }}>
                          ⏳ {isAr?"في انتظار تقييم المدرّس":"Waiting for instructor grade"}
                        </p>
                      )}
                    </div>
                  )}

                  {/* ── INSTRUCTOR: submissions + grading ── */}
                  {isInstructor && hw.submissions?.length > 0 && (
                    <div style={{ borderTop:"1px solid var(--border)", paddingTop:20, marginTop:8 }}>
                      <button
                        onClick={() => setExpandedHw(isExpanded ? null : hw.id)}
                        style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:"var(--gold)", fontWeight:600, marginBottom: isExpanded?16:0 }}>
                        {isExpanded
                          ? (isAr?"▲ إخفاء الإجابات":"▲ Hide Submissions")
                          : (isAr?`▼ عرض ${hw.submissions.length} إجابة`:`▼ View ${hw.submissions.length} Submission(s)`)}
                      </button>

                      {isExpanded && (
                        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                          {hw.submissions.map((sub: any) => (
                            <div key={sub.id} style={{ padding:"18px 20px", borderRadius:12, background:"var(--ink)", border:"1px solid var(--border)" }}>

                              {/* Student info */}
                              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:12 }}>
                                <div style={{ width:36, height:36, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                                  {sub.student?.name?.[0]?.toUpperCase()}
                                </div>
                                <div style={{ flex:1 }}>
                                  <span style={{ fontSize:14, fontWeight:600, color:"var(--gold)" }}>{sub.student?.name}</span>
                                  <span style={{ fontSize:11, color:"var(--text-muted)", marginLeft:10 }}>
                                    {new Date(sub.submittedAt).toLocaleDateString()}
                                  </span>
                                </div>
                                {sub.grade && (
                                  <span style={{ fontSize:13, fontWeight:700, padding:"4px 12px", borderRadius:6, background:"rgba(201,168,76,0.1)", color:"var(--gold)" }}>
                                    🏆 {sub.grade}
                                  </span>
                                )}
                              </div>

                              {/* Answer */}
                              <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7, marginBottom:16, padding:"12px 16px", background:"var(--ink-soft)", borderRadius:8 }}>
                                {sub.answer}
                              </p>

                              {/* Grade form */}
                              <div style={{ display:"grid", gridTemplateColumns:"120px 1fr auto", gap:10, alignItems:"flex-end" }}>
                                <div>
                                  <label style={{ fontSize:11, color:"var(--text-muted)", display:"block", marginBottom:6 }}>
                                    {isAr?"الدرجة":"Grade"}
                                  </label>
                                  <select
                                    value={grades[sub.id]?.grade || sub.grade || ""}
                                    onChange={e => setGrades(p=>({...p,[sub.id]:{...p[sub.id],grade:e.target.value}}))}
                                    style={{ ...inputStyle, padding:"9px 12px", fontSize:13, cursor:"pointer" }}>
                                    <option value="">{isAr?"اختر...":"Select..."}</option>
                                    {["A+","A","A-","B+","B","B-","C+","C","D","F","10/10","9/10","8/10","7/10","6/10","5/10"].map((g: any) =>(
                                      <option key={g} value={g}>{g}</option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label style={{ fontSize:11, color:"var(--text-muted)", display:"block", marginBottom:6 }}>
                                    {isAr?"ملاحظات (اختياري)":"Feedback (optional)"}
                                  </label>
                                  <input type="text"
                                    value={grades[sub.id]?.feedback || sub.feedback || ""}
                                    onChange={e => setGrades(p=>({...p,[sub.id]:{...p[sub.id],feedback:e.target.value}}))}
                                    placeholder={isAr?"ملاحظاتك للطالب...":"Your feedback for the student..."}
                                    style={{ ...inputStyle, padding:"9px 12px", fontSize:13 }}
                                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                                </div>
                                <button
                                  onClick={() => gradeSubmission(sub.id)}
                                  disabled={!grades[sub.id]?.grade||grading===sub.id}
                                  className="btn-gold"
                                  style={{ padding:"9px 18px", fontSize:13, opacity:!grades[sub.id]?.grade||grading===sub.id?0.6:1 }}>
                                  {grading===sub.id?(isAr?"...":"..."):(isAr?"حفظ":"Save")}
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
