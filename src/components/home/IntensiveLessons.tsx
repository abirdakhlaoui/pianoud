"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function IntensiveLessons() {
  const { isAr } = useLang()

  return (
    <section style={{ padding: "90px 0", background: "var(--ink-soft)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div className="reveal" style={{ maxWidth: 1000, margin: "0 auto", borderRadius: 24, overflow: "hidden", border: "2px solid var(--gold)", background: "linear-gradient(135deg, rgba(184,137,59,0.10), rgba(19,181,166,0.06))", boxShadow: "0 20px 60px rgba(184,137,59,0.15)" }}>
          <div className="intensive-inner" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", alignItems: "center" }}>
            <div style={{ padding: "48px 44px" }}>
              <span style={{ display: "inline-block", fontSize: 12, fontWeight: 800, color: "#fff", background: "var(--gold)", padding: "6px 16px", borderRadius: 999, letterSpacing: 1, textTransform: "uppercase", marginBottom: 18 }}>
                {isAr ? "⚡ عرض مكثّف" : "⚡ Intensive Program"}
              </span>
              <h2 className="font-display" style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 400, color: "var(--cream)", lineHeight: 1.2, marginBottom: 16 }}>
                {isAr ? <>تعلّم <span className="gradient-text" style={{ fontWeight: 800 }}>أسرع</span> بدورات مكثّفة</> : <>Learn <span className="gradient-text" style={{ fontWeight: 800 }}>Faster</span> with Intensive Lessons</>}
              </h2>
              <p style={{ fontSize: 16, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 24 }}>
                {isAr
                  ? "هل تريد إتقان آلتك بسرعة؟ دوراتنا المكثّفة تقدّم حصصاً أكثر في الأسبوع لتطوّر مهاراتك في وقت أقصر — مثالية للطلاب المتفرّغين أو المستعدّين لأداء قريب."
                  : "Want to master your instrument quickly? Our intensive courses pack more classes per week so you progress in less time — perfect for dedicated students or upcoming performances."}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {(isAr
                  ? ["حصص متعددة في الأسبوع", "متابعة شخصية مكثّفة", "تقدّم سريع وملموس"]
                  : ["Multiple classes per week", "Intensive personal follow-up", "Fast, tangible progress"]
                ).map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "var(--cream)" }}>
                    <span style={{ color: "var(--gold)", fontWeight: 800, fontSize: 18 }}>✓</span>
                    <span>{p}</span>
                  </div>
                ))}
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding: "14px 38px", fontSize: 16, fontWeight: 700 }}>
                {isAr ? "احجز استشارة مجانية" : "Book a Free Consultation"}
              </Link>
            </div>
            <div style={{ alignSelf: "stretch", position: "relative", minHeight: 280, overflow: "hidden" }} className="intensive-img">
              <img src="/course-piano.jpeg" alt="Intensive lessons" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(184,137,59,0.2), transparent)" }} />
            </div>
          </div>
        </div>
      </div>
      <style>{"@media(max-width:800px){.intensive-inner{grid-template-columns:1fr !important}.intensive-img{min-height:200px !important;order:-1}}"}</style>
    </section>
  )
}
