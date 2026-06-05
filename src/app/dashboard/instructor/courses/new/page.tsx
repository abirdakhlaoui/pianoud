"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function NewCoursePage() {
  const router   = useRouter()
  const { isAr } = useLang()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")
  const [form, setForm] = useState({
    title_en: "", title_ar: "",
    description_en: "", description_ar: "",
    instrument: "PIANO", level: "BEGINNER", price: "",
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res  = await fetch("/api/instructor/courses", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ ...form, price: Number(form.price) }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || "Something went wrong.")
    } else {
      router.push("/dashboard/instructor/courses")
    }
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container" style={{ maxWidth:760 }}>

        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard/instructor/courses" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr ? "العودة لدوراتي" : "Back to My Courses"}
          </Link>
          <h1 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr ? "إنشاء دورة جديدة" : "Create New Course"}
          </h1>
        </div>

        {error && (
          <div style={{ padding:"12px 16px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:14, marginBottom:24 }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:24 }}>

          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              {isAr ? "المعلومات الأساسية" : "Basic Info"}
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "الآلة" : "Instrument"}
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
                <input type="number" value={form.price} onChange={e => update("price", e.target.value)} min="0" placeholder="199" style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding:28 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>English Content</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Title (English)</label>
                <input type="text" value={form.title_en} onChange={e => update("title_en", e.target.value)} required
                  placeholder="e.g. Piano Fundamentals for Beginners" style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Description (English)</label>
                <textarea value={form.description_en} onChange={e => update("description_en", e.target.value)} required rows={4}
                  placeholder="Describe your course..." style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          <div className="card" style={{ padding:28 }} dir="rtl">
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>المحتوى بالعربية</h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>العنوان بالعربية</label>
                <input type="text" value={form.title_ar} onChange={e => update("title_ar", e.target.value)} required
                  placeholder="مثال: أساسيات البيانو للمبتدئين" style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>الوصف بالعربية</label>
                <textarea value={form.description_ar} onChange={e => update("description_ar", e.target.value)} required rows={4}
                  placeholder="صف دورتك بالعربية..." style={{ ...inputStyle, resize:"vertical" }}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
            </div>
          </div>

          <div style={{ display:"flex", gap:12 }}>
            <button type="submit" disabled={loading} className="btn-gold" style={{ padding:"14px 32px", fontSize:15, opacity:loading?0.7:1 }}>
              {loading ? (isAr?"جاري الإنشاء...":"Creating...") : (isAr?"إنشاء الدورة":"Create Course")}
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
