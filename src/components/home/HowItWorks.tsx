"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const STEPS = [
  { num: "1", icon: "🎯", title_en: "Book Free Assessment", title_ar: "احجز تقييماً مجانياً", desc_en: "Take a free 20-minute session so we can understand your level and goals.", desc_ar: "خذ جلسة مجانية 20 دقيقة لنفهم مستواك وأهدافك.", color: "#34d399" },
  { num: "2", icon: "📦", title_en: "Choose Your Package", title_ar: "اختر باقتك", desc_en: "Pick the hours package that fits you — 4, 8, or 16 hours.", desc_ar: "اختر باقة الساعات التي تناسبك — 4 أو 8 أو 16 ساعة.", color: "#fbbf24" },
  { num: "3", icon: "🎶", title_en: "Start Learning", title_ar: "ابدأ التعلّم", desc_en: "Begin your one-on-one journey with a professional instructor.", desc_ar: "ابدأ رحلتك الفردية مع مدرّس محترف.", color: "#60a5fa" },
]

export default function HowItWorks() {
  const { isAr } = useLang()

  return (
    <section style={{ padding: "100px 0", background: "var(--ink)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
              {isAr ? "كيف تبدأ" : "How It Works"}
            </span>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 400, color: "var(--cream)", marginBottom: 14 }}>
            {isAr ? <>ابدأ في <span className="gradient-text" style={{ fontWeight: 800 }}>ثلاث خطوات</span></> : <>Get Started in <span className="gradient-text" style={{ fontWeight: 800 }}>Three Steps</span></>}
          </h2>
        </div>

        <div className="steps-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28, maxWidth: 980, margin: "0 auto 48px" }}>
          {STEPS.map((s, i) => (
            <div key={s.num} className="reveal" style={{ position: "relative", padding: "36px 28px", borderRadius: 18, background: "var(--ink-card)", border: "1px solid var(--border)", textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
              <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", width: 44, height: 44, borderRadius: "50%", background: s.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, boxShadow: "0 4px 12px " + s.color + "66" }}>
                {s.num}
              </div>
              <div style={{ fontSize: 44, marginTop: 14, marginBottom: 16 }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontSize: 21, fontWeight: 700, color: "var(--cream)", marginBottom: 10 }}>
                {isAr ? s.title_ar : s.title_en}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {isAr ? s.desc_ar : s.desc_en}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding: "15px 44px", fontSize: 16, fontWeight: 700 }}>
            {isAr ? "🎯 ابدأ بتقييم مجاني" : "🎯 Start with a Free Assessment"}
          </Link>
        </div>
      </div>
      <style>{"@media(max-width:760px){.steps-grid{grid-template-columns:1fr !important;gap:40px !important}}"}</style>
    </section>
  )
}
