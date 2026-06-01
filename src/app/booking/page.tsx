"use client"

import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

const BOOKING_OPTIONS = [
  {
    id: "assessment",
    icon: "🎯",
    title_en: "Know Your Level — Free Assessment",
    title_ar: "اعرف مستواك — جلسة تقييم مجانية",
    desc_en: "20-minute free session to assess your level and recommend the right plan for you.",
    desc_ar: "جلسة مجانية 20 دقيقة لتقييم مستواك واقتراح الخطة المناسبة لك.",
    price: 0,
    duration_en: "20 minutes",
    duration_ar: "20 دقيقة",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    free: true,
  },
  {
    id: "beginner-session",
    icon: "🌱",
    title_en: "Beginner — Single Session",
    title_ar: "مبتدئ — جلسة واحدة",
    desc_en: "45-minute individual Oud lesson for complete beginners.",
    desc_ar: "درس عود فردي 45 دقيقة للمبتدئين الكاملين.",
    price: 25,
    duration_en: "45 minutes",
    duration_ar: "45 دقيقة",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    free: false,
  },
  {
    id: "beginner-month",
    icon: "🌱",
    title_en: "Beginner — 1 Month (8 sessions)",
    title_ar: "مبتدئ — شهر واحد (8 جلسات)",
    desc_en: "2 sessions/week × 4 weeks. Includes free assessment session.",
    desc_ar: "جلستان أسبوعياً × 4 أسابيع. يشمل جلسة تقييم مجانية.",
    price: 200,
    duration_en: "45 min/session",
    duration_ar: "45 دقيقة/جلسة",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    free: false,
    badge_en: "Save 20%",
    badge_ar: "وفّر 20%",
  },
  {
    id: "beginner-pack",
    icon: "🌱",
    title_en: "Beginner — 16 Sessions Pack",
    title_ar: "مبتدئ — باقة 16 جلسة",
    desc_en: "Best value pack for beginners. Includes free assessment session.",
    desc_ar: "أفضل باقة للمبتدئين. تشمل جلسة تقييم مجانية.",
    price: 375,
    duration_en: "45 min/session",
    duration_ar: "45 دقيقة/جلسة",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    free: false,
    badge_en: "Most Popular",
    badge_ar: "الأكثر طلباً",
  },
  {
    id: "intermediate-session",
    icon: "🌿",
    title_en: "Intermediate — Single Session",
    title_ar: "متوسط — جلسة واحدة",
    desc_en: "60-minute individual Oud lesson for intermediate players.",
    desc_ar: "درس عود فردي 60 دقيقة للمستوى المتوسط.",
    price: 50,
    duration_en: "60 minutes",
    duration_ar: "60 دقيقة",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.3)",
    free: false,
  },
  {
    id: "intermediate-month",
    icon: "🌿",
    title_en: "Intermediate — 1 Month (4 sessions)",
    title_ar: "متوسط — شهر واحد (4 جلسات)",
    desc_en: "1 session/week × 4 weeks. Includes free assessment session.",
    desc_ar: "جلسة أسبوعياً × 4 أسابيع. يشمل جلسة تقييم مجانية.",
    price: 200,
    duration_en: "60 min/session",
    duration_ar: "60 دقيقة/جلسة",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.3)",
    free: false,
    badge_en: "Save 25%",
    badge_ar: "وفّر 25%",
  },
  {
    id: "intermediate-pack",
    icon: "🌿",
    title_en: "Intermediate — 8 Sessions Pack",
    title_ar: "متوسط — باقة 8 جلسات",
    desc_en: "Best value for intermediate level. Includes free assessment.",
    desc_ar: "أفضل قيمة للمستوى المتوسط. يشمل تقييماً مجانياً.",
    price: 375,
    duration_en: "60 min/session",
    duration_ar: "60 دقيقة/جلسة",
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.3)",
    free: false,
    badge_en: "Best Value",
    badge_ar: "أفضل قيمة",
  },
  {
    id: "advanced-session",
    icon: "🌳",
    title_en: "Advanced — Single Session",
    title_ar: "متقدم — جلسة واحدة",
    desc_en: "60-minute individual Oud lesson for advanced players.",
    desc_ar: "درس عود فردي 60 دقيقة للمستوى المتقدم.",
    price: 75,
    duration_en: "60 minutes",
    duration_ar: "60 دقيقة",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.3)",
    free: false,
  },
  {
    id: "advanced-month",
    icon: "🌳",
    title_en: "Advanced — 1 Month (4 sessions)",
    title_ar: "متقدم — شهر واحد (4 جلسات)",
    desc_en: "1 session/week × 4 weeks. Includes free assessment session.",
    desc_ar: "جلسة أسبوعياً × 4 أسابيع. يشمل جلسة تقييم مجانية.",
    price: 300,
    duration_en: "60 min/session",
    duration_ar: "60 دقيقة/جلسة",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.3)",
    free: false,
    badge_en: "Save 20%",
    badge_ar: "وفّر 20%",
  },
  {
    id: "advanced-2months",
    icon: "🌳",
    title_en: "Advanced — 2 Months (8 sessions)",
    title_ar: "متقدم — شهران (8 جلسات)",
    desc_en: "Best deal for advanced level. Includes free assessment session.",
    desc_ar: "أفضل عرض للمستوى المتقدم. يشمل جلسة تقييم مجانية.",
    price: 575,
    duration_en: "60 min/session",
    duration_ar: "60 دقيقة/جلسة",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.3)",
    free: false,
    badge_en: "Best Deal",
    badge_ar: "أفضل عرض",
  },
  {
    id: "bundle-2levels",
    icon: "⭐",
    title_en: "Bundle — Beginner + Intermediate",
    title_ar: "باقة — مبتدئ + متوسط",
    desc_en: "Complete 2-level journey · 4 months · Includes 2 free assessment sessions.",
    desc_ar: "رحلة مستويين · 4 أشهر · يشمل جلستَي تقييم مجانيتَين.",
    price: 650,
    duration_en: "4 months",
    duration_ar: "4 أشهر",
    color: "var(--gold)",
    bg: "rgba(201,168,76,0.08)",
    border: "rgba(201,168,76,0.3)",
    free: false,
    badge_en: "Save $75",
    badge_ar: "وفّر 75$",
  },
  {
    id: "bundle-3levels",
    icon: "🏆",
    title_en: "Complete Package — All 3 Levels",
    title_ar: "الباقة الشاملة — المستويات الثلاثة",
    desc_en: "Full musical journey · 6 months · Beginner → Intermediate → Advanced · 3 free assessments.",
    desc_ar: "رحلة موسيقية كاملة · 6 أشهر · مبتدئ → متوسط → متقدم · 3 جلسات تقييم مجانية.",
    price: 975,
    duration_en: "6 months",
    duration_ar: "6 أشهر",
    color: "var(--gold)",
    bg: "rgba(201,168,76,0.1)",
    border: "rgba(201,168,76,0.4)",
    free: false,
    badge_en: "Best Value — Save $125",
    badge_ar: "أفضل قيمة — وفّر 125$",
  },
]

function BookingContent() {
  const { isAr }     = useLang()
  const searchParams = useSearchParams()
  const preSelected  = searchParams.get("plan") || ""

  const [selected, setSelected]   = useState(preSelected)
  const [step, setStep]           = useState<"select"|"details"|"confirm">("select")
  const [name, setName]           = useState("")
  const [email, setEmail]         = useState("")
  const [phone, setPhone]         = useState("")
  const [date, setDate]           = useState("")
  const [time, setTime]           = useState("")
  const [note, setNote]           = useState("")
  const [loading, setLoading]     = useState(false)
  const [done, setDone]           = useState(false)

  const selectedPlan = BOOKING_OPTIONS.find(o => o.id === selected)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    // Send booking request via contact API
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        subject: `Booking: ${selectedPlan?.title_en}`,
        message: `
New Booking Request:
━━━━━━━━━━━━━━━━━━━
Plan: ${selectedPlan?.title_en}
Price: ${selectedPlan?.free ? "FREE" : `$${selectedPlan?.price}`}
Name: ${name}
Email: ${email}
Phone: ${phone}
Preferred Date: ${date}
Preferred Time: ${time}
Notes: ${note || "None"}
        `.trim()
      })
    })
    setLoading(false)
    setDone(true)
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--ink)",
    color: "var(--cream)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s", fontFamily: "var(--font-body)",
  }

  if (done) return (
    <main style={{ minHeight: "100vh", paddingTop: 120, textAlign: "center", background: "var(--ink)" }}>
      <div style={{ maxWidth: 480, margin: "0 auto", padding: 24 }}>
        <div style={{ fontSize: 72, marginBottom: 20 }}>🎵</div>
        <h1 className="font-display" style={{ fontSize: 36, fontWeight: 600, color: "var(--cream)", marginBottom: 12 }}>
          {isAr ? "تم الحجز بنجاح!" : "Booking Request Sent!"}
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 12 }}>
          {isAr
            ? `شكراً ${name}! تلقّينا طلب حجزك لـ "${selectedPlan?.title_ar}". سنتواصل معك خلال 24 ساعة على بريدك الإلكتروني.`
            : `Thank you ${name}! We received your booking request for "${selectedPlan?.title_en}". We'll contact you within 24 hours.`}
        </p>
        <div style={{ padding: "16px 20px", borderRadius: 10, background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 28 }}>
          <p style={{ fontSize: 14, color: "var(--gold)", fontWeight: 600 }}>
            📧 {isAr ? "تحقّق من بريدك الإلكتروني" : "Check your email"}: {email}
          </p>
        </div>
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <Link href="/oud" className="btn-gold" style={{ padding: "12px 28px" }}>
            {isAr ? "العودة للعود" : "Back to Oud"}
          </Link>
          <Link href="/" className="btn-outline" style={{ padding: "12px 24px" }}>
            {isAr ? "الرئيسية" : "Home"}
          </Link>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 80, background: "var(--ink)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container" style={{ maxWidth: 900 }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <Link href="/oud" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
            ← {isAr ? "دروس العود" : "Oud Lessons"}
          </Link>
          <h1 className="font-display" style={{ fontSize: 40, fontWeight: 400, color: "var(--cream)", marginTop: 12 }}>
            {isAr ? "احجز " : "Book a "}
            <span className="gradient-text" style={{ fontWeight: 800 }}>
              {isAr ? "جلستك" : "Session"}
            </span>
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>
            {isAr
              ? "اختر الخطة المناسبة لك واملأ تفاصيل الحجز — سنتواصل معك خلال 24 ساعة."
              : "Choose your plan and fill in the booking details — we'll contact you within 24 hours."}
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 40 }}>
          {[
            { key: "select",  en: "Choose Plan",    ar: "اختر الخطة"    },
            { key: "details", en: "Your Details",   ar: "بياناتك"        },
            { key: "confirm", en: "Confirm",        ar: "تأكيد"          },
          ].map((s, i) => {
            const steps = ["select", "details", "confirm"]
            const isActive = steps.indexOf(step) >= i
            return (
              <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, background: isActive ? "var(--gold)" : "var(--ink-soft)", color: isActive ? "#0A0A0A" : "var(--text-muted)", border: `1px solid ${isActive ? "var(--gold)" : "var(--border)"}` }}>
                    {steps.indexOf(step) > i ? "✓" : i + 1}
                  </div>
                  <span style={{ fontSize: 13, color: isActive ? "var(--cream)" : "var(--text-muted)", fontWeight: isActive ? 600 : 400 }}>
                    {isAr ? s.ar : s.en}
                  </span>
                </div>
                {i < 2 && <div style={{ width: 32, height: 1, background: steps.indexOf(step) > i ? "var(--gold)" : "var(--border)" }}/>}
              </div>
            )
          })}
        </div>

        {/* Step 1 — Select plan */}
        {step === "select" && (
          <div>
            {/* Free assessment highlight */}
            <div style={{ padding: "20px 24px", borderRadius: 12, background: "rgba(52,211,153,0.06)", border: "2px solid rgba(52,211,153,0.3)", marginBottom: 32, display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap", cursor: "pointer" }}
              onClick={() => setSelected("assessment")}>
              <span style={{ fontSize: 28 }}>🎯</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#34d399", marginBottom: 4 }}>
                  {isAr ? "ابدأ هنا — جلسة 'اعرف مستواك' مجانية" : "Start here — Free 'Know Your Level' Session"}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
                  {isAr ? "20 دقيقة · مجاني تماماً · بدون التزام" : "20 minutes · Completely free · No commitment"}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span className="font-display" style={{ fontSize: 24, fontWeight: 800, color: "#34d399" }}>FREE</span>
                <div style={{ width: 20, height: 20, borderRadius: "50%", border: "2px solid #34d399", background: selected === "assessment" ? "#34d399" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {selected === "assessment" && <span style={{ fontSize: 10, color: "#0A0A0A", fontWeight: 800 }}>✓</span>}
                </div>
              </div>
            </div>

            {/* All plans grouped */}
            {[
              { group_en: "🌱 Beginner Plans", group_ar: "🌱 خطط المبتدئين", ids: ["beginner-session", "beginner-month", "beginner-pack"] },
              { group_en: "🌿 Intermediate Plans", group_ar: "🌿 خطط المتوسط", ids: ["intermediate-session", "intermediate-month", "intermediate-pack"] },
              { group_en: "🌳 Advanced Plans", group_ar: "🌳 خطط المتقدمين", ids: ["advanced-session", "advanced-month", "advanced-2months"] },
              { group_en: "⭐ Bundle Packages", group_ar: "⭐ باقات مجمّعة", ids: ["bundle-2levels", "bundle-3levels"] },
            ].map(group => (
              <div key={group.group_en} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)", marginBottom: 14, letterSpacing: 0.5 }}>
                  {isAr ? group.group_ar : group.group_en}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {BOOKING_OPTIONS.filter(o => group.ids.includes(o.id)).map(opt => (
                    <div key={opt.id}
                      onClick={() => setSelected(opt.id)}
                      style={{ padding: "18px 20px", borderRadius: 12, cursor: "pointer", display: "flex", alignItems: "center", gap: 16, transition: "all 0.2s", border: `1.5px solid ${selected === opt.id ? opt.border : "var(--border)"}`, background: selected === opt.id ? opt.bg : "var(--ink-card)", position: "relative" }}>
                      {opt.badge_en && (
                        <span style={{ position: "absolute", top: -9, right: isAr ? "auto" : 16, left: isAr ? 16 : "auto", fontSize: 10, fontWeight: 800, padding: "2px 10px", borderRadius: 999, background: opt.color === "var(--gold)" ? "#C9A84C" : opt.color, color: "#0A0A0A", whiteSpace: "nowrap" }}>
                          {isAr ? opt.badge_ar : opt.badge_en}
                        </span>
                      )}
                      <span style={{ fontSize: 24, flexShrink: 0 }}>{opt.icon}</span>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)", marginBottom: 4 }}>
                          {isAr ? opt.title_ar : opt.title_en}
                        </p>
                        <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                          {isAr ? opt.desc_ar : opt.desc_en}
                        </p>
                        <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 4 }}>
                          ⏱ {isAr ? opt.duration_ar : opt.duration_en}
                        </p>
                      </div>
                      <div style={{ textAlign: "center", flexShrink: 0 }}>
                        <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: opt.free ? "#34d399" : "var(--cream)" }}>
                          {opt.free ? "FREE" : `$${opt.price}`}
                        </div>
                      </div>
                      <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${opt.color}`, background: selected === opt.id ? opt.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {selected === opt.id && <span style={{ fontSize: 10, color: "#0A0A0A", fontWeight: 800 }}>✓</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button disabled={!selected} onClick={() => setStep("details")} className="btn-gold"
              style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15, marginTop: 8, opacity: !selected ? 0.5 : 1 }}>
              {isAr ? "التالي — بياناتك →" : "Next — Your Details →"}
            </button>
          </div>
        )}

        {/* Step 2 — Details */}
        {step === "details" && selectedPlan && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }} className="booking-grid">

            <form onSubmit={e => { e.preventDefault(); setStep("confirm") }} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: "var(--cream)", marginBottom: 8 }}>
                {isAr ? "بياناتك الشخصية" : "Your Details"}
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                    {isAr ? "الاسم الكامل" : "Full Name"} *
                  </label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} required
                    placeholder={isAr ? "اسمك الكامل" : "Your full name"} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                    {isAr ? "رقم الهاتف / واتساب" : "Phone / WhatsApp"} *
                  </label>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required
                    placeholder="+1 234 567 8900" style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                  {isAr ? "البريد الإلكتروني" : "Email"} *
                </label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  placeholder="you@example.com" style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "var(--gold)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                    {isAr ? "التاريخ المفضّل" : "Preferred Date"} *
                  </label>
                  <input type="date" value={date} onChange={e => setDate(e.target.value)} required
                    min={new Date().toISOString().split("T")[0]} style={inputStyle}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                    {isAr ? "الوقت المفضّل" : "Preferred Time"} *
                  </label>
                  <select value={time} onChange={e => setTime(e.target.value)} required
                    style={{ ...inputStyle, cursor: "pointer" }}>
                    <option value="">{isAr ? "اختر الوقت..." : "Select time..."}</option>
                    {["09:00","10:00","11:00","12:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00"].map(t => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>
                  {isAr ? "ملاحظات إضافية (اختياري)" : "Additional Notes (optional)"}
                </label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={3}
                  placeholder={isAr ? "مستواك الحالي، أسئلة، تفضيلات..." : "Your current level, questions, preferences..."}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "var(--gold)"}
                  onBlur={e => e.target.style.borderColor = "var(--border)"} />
              </div>

              <div style={{ display: "flex", gap: 12 }}>
                <button type="button" onClick={() => setStep("select")} className="btn-outline" style={{ padding: "13px 24px" }}>
                  {isAr ? "← رجوع" : "← Back"}
                </button>
                <button type="submit" className="btn-gold" style={{ flex: 1, justifyContent: "center", padding: 13 }}>
                  {isAr ? "التالي — مراجعة الحجز →" : "Next — Review Booking →"}
                </button>
              </div>
            </form>

            {/* Plan summary */}
            <div className="card" style={{ padding: 24, position: "sticky", top: 100 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                {isAr ? "ملخّص الحجز" : "Booking Summary"}
              </p>
              <div style={{ padding: "16px", borderRadius: 10, background: selectedPlan.bg, border: `1px solid ${selectedPlan.border}`, marginBottom: 16 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)", marginBottom: 6 }}>
                  {isAr ? selectedPlan.title_ar : selectedPlan.title_en}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 8 }}>
                  {isAr ? selectedPlan.desc_ar : selectedPlan.desc_en}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  ⏱ {isAr ? selectedPlan.duration_ar : selectedPlan.duration_en}
                </p>
              </div>
              <div className="font-display" style={{ fontSize: 36, fontWeight: 800, color: selectedPlan.free ? "#34d399" : "var(--cream)", marginBottom: 4 }}>
                {selectedPlan.free ? "FREE" : `$${selectedPlan.price}`}
              </div>
              {!selectedPlan.free && (
                <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 16 }}>
                  {isAr ? "الدفع يتم عند التأكيد" : "Payment collected upon confirmation"}
                </p>
              )}
              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
                {[
                  { en: "Free assessment session included", ar: "جلسة تقييم مجانية مشمولة" },
                  { en: "Confirmation within 24 hours",    ar: "تأكيد خلال 24 ساعة" },
                  { en: "Flexible rescheduling",           ar: "إمكانية إعادة الجدولة" },
                ].map((f, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                    <span style={{ color: "var(--gold)" }}>✓</span>
                    <span>{isAr ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3 — Confirm */}
        {step === "confirm" && selectedPlan && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 32, alignItems: "start" }} className="booking-grid">

            <div>
              <h2 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: "var(--cream)", marginBottom: 24 }}>
                {isAr ? "مراجعة وتأكيد الحجز" : "Review & Confirm Booking"}
              </h2>

              {/* Summary */}
              <div className="card" style={{ padding: 24, marginBottom: 24 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                  {isAr ? "تفاصيل حجزك" : "Your Booking Details"}
                </p>
                {[
                  { label_en: "Plan",           label_ar: "الخطة",        value: isAr ? selectedPlan.title_ar : selectedPlan.title_en },
                  { label_en: "Price",          label_ar: "السعر",        value: selectedPlan.free ? "FREE" : `$${selectedPlan.price}` },
                  { label_en: "Name",           label_ar: "الاسم",        value: name  },
                  { label_en: "Email",          label_ar: "البريد",       value: email },
                  { label_en: "Phone",          label_ar: "الهاتف",       value: phone },
                  { label_en: "Preferred Date", label_ar: "التاريخ",      value: date  },
                  { label_en: "Preferred Time", label_ar: "الوقت",        value: time  },
                  ...(note ? [{ label_en: "Notes", label_ar: "ملاحظات", value: note }] : []),
                ].map((row, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)", gap: 16 }}>
                    <span style={{ fontSize: 13, color: "var(--text-muted)", flexShrink: 0 }}>{isAr ? row.label_ar : row.label_en}</span>
                    <span style={{ fontSize: 13, color: "var(--cream)", fontWeight: 500, textAlign: "right" }}>{row.value}</span>
                  </div>
                ))}
              </div>

              {/* Payment note */}
              {!selectedPlan.free && (
                <div style={{ padding: "16px 20px", borderRadius: 10, background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 24 }}>
                  <p style={{ fontSize: 14, color: "var(--gold)", fontWeight: 600, marginBottom: 4 }}>
                    💳 {isAr ? "طريقة الدفع" : "Payment Method"}
                  </p>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", lineHeight: 1.7 }}>
                    {isAr
                      ? "بعد تأكيد الحجز، سنرسل لك رابط الدفع عبر البريد الإلكتروني أو واتساب. نقبل البطاقات الائتمانية وPayPal وتحويل بنكي."
                      : "After confirming your booking, we'll send you a payment link via email or WhatsApp. We accept credit cards, PayPal, and bank transfer."}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", gap: 12 }}>
                  <button type="button" onClick={() => setStep("details")} className="btn-outline" style={{ padding: "13px 24px" }}>
                    {isAr ? "← رجوع" : "← Back"}
                  </button>
                  <button type="submit" disabled={loading} className="btn-gold"
                    style={{ flex: 1, justifyContent: "center", padding: 14, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
                    {loading
                      ? (isAr ? "جاري الإرسال..." : "Sending...")
                      : selectedPlan.free
                      ? (isAr ? "🎯 تأكيد الجلسة المجانية" : "🎯 Confirm Free Session")
                      : (isAr ? "✓ تأكيد الحجز" : "✓ Confirm Booking")}
                  </button>
                </div>
              </form>
            </div>

            {/* Plan summary sticky */}
            <div className="card" style={{ padding: 24, position: "sticky", top: 100 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
                {isAr ? "ملخّص الحجز" : "Summary"}
              </p>
              <div style={{ padding: 16, borderRadius: 10, background: selectedPlan.bg, border: `1px solid ${selectedPlan.border}`, marginBottom: 16 }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>
                  {isAr ? selectedPlan.title_ar : selectedPlan.title_en}
                </p>
                <p style={{ fontSize: 12, color: "var(--text-muted)" }}>
                  ⏱ {isAr ? selectedPlan.duration_ar : selectedPlan.duration_en}
                </p>
              </div>
              <div className="font-display" style={{ fontSize: 40, fontWeight: 800, color: selectedPlan.free ? "#34d399" : "var(--cream)" }}>
                {selectedPlan.free ? "FREE" : `$${selectedPlan.price}`}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .booking-grid { grid-template-columns: 1fr 340px; }
        @media(max-width: 900px) { .booking-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: "100vh", paddingTop: 120, textAlign: "center", background: "var(--ink)" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </main>
    }>
      <BookingContent />
    </Suspense>
  )
}
