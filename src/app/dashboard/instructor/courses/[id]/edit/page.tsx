"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function EditCoursePage() {
  const params   = useParams()
  const id       = params.id as string
  const router   = useRouter()
  const { isAr } = useLang()

  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [error, setError]       = useState("")
  const [success, setSuccess]   = useState("")

  const [form, setForm] = useState({
    title_en:       "",
    title_ar:       "",
    description_en: "",
    description_ar: "",
    instrument:     "PIANO",
    level:          "BEGINNER",
    price:          0,
  })

  useEffect(() => {
    fetch(`/api/instructor/courses/${id}`)
      .then((r: any) => r.json())
      .then((data: any) => {
        if (data.course) {
          setForm({
            title_en:       data.course.title_en,
            title_ar:       data.course.title_ar,
            description_en: data.course.description_en,
            description_ar: data.course.description_ar,
            instrument:     data.course.instrument,
            level:          data.course.level,
            price:          data.course.price,
          })
        }
        setLoading(false)
      })
  }, [id])

  function update(field: string, value: string | number) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setError("")
    setSuccess("")

    const res  = await fetch(`/api/instructor/courses/${id}`, {
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    })
    const data = await res.json()
    setSaving(false)

    if (!res.ok) {
      setError(data.error || "Something went wrong")
    } else {
      setSuccess(isAr ? "تم تحديث الدورة بنجاح ✓" : "Course updated successfully ✓")
      setTimeout(() => router.push("/dashboard/instructor/courses"), 1500)
    }
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  if (loading) return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <p style={{ color:"var(--text-muted)" }}>Loading...</p>
    </main>
  )

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container" style={{ maxWidth:760 }}>

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard/instructor/courses" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr ? "العودة لدوراتي" : "Back to My Courses"}
          </Link>
          <h1 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr ? "تعديل الدورة" : "Edit Course"}
          </h1>
        </div>

        {error && (
          <div style={{ padding:"12px 16px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:14, marginBottom:24 }}>
            {error}
          </div>
        )}
        {success && (
          <div style={{ padding:"12px 16px", borderRadius:8, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)", color:"#34d399", fontSize:14, marginBottom:24 }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:24 }}>

          {/* Basic info */}
          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              {isAr ? "المعلومات الأساسية" : "Basic Info"}
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "الآلة الموسيقية" : "Instrument"}
                </label>
                <select value={form.instrument} onChange={e => update("instrument", e.target.value)} style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="PIANO">🎹 {isAr ? "بيانو" : "Piano"}</option>
                  <option value="OUD">🪕 {isAr ? "عود" : "Oud"}</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "المستوى" : "Level"}
                </label>
                <select value={form.level} onChange={e => update("level", e.target.value)} style={{ ...inputStyle, cursor:"pointer" }}>
                  <option value="BEGINNER">{isAr ? "مبتدئ" : "Beginner"}</option>
                  <option value="INTERMEDIATE">{isAr ? "متوسط" : "Intermediate"}</option>
                  <option value="ADVANCED">{isAr ? "متقدم" : "Advanced"}</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "السعر (دولار)" : "Price (USD)"}
                </label>
                <input type="number" value={form.price} onChange={e => update("price", e.target.value)} min="0" style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          {/* English */}
          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              English Content
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Title (English)</label>
                <input type="text" value={form.title_en} onChange={e => update("title_en", e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Description (English)</label>
                <textarea value={form.description_en} onChange={e => update("description_en", e.target.value)} required rows={4}
                  style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          {/* Arabic */}
          <div className="card" style={{ padding:28 }} dir="rtl">
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              المحتوى بالعربية
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>العنوان بالعربية</label>
                <input type="text" value={form.title_ar} onChange={e => update("title_ar", e.target.value)} required style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>الوصف بالعربية</label>
                <textarea value={form.description_ar} onChange={e => update("description_ar", e.target.value)} required rows={4}
                  style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:12 }}>
            <button type="submit" disabled={saving} className="btn-gold" style={{ padding:"14px 32px", fontSize:15, opacity:saving?0.7:1 }}>
              {saving ? (isAr?"جاري الحفظ...":"Saving...") : (isAr?"حفظ التغييرات":"Save Changes")}
            </button>
            <Link href="/dashboard/instructor/courses" className="btn-outline" style={{ padding:"14px 32px", fontSize:15 }}>
              {isAr ? "إلغاء" : "Cancel"}
            </Link>
          </div>

        </form>
      </div>
    </main>
  )
}
