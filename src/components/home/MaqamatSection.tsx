"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const PILLARS = [
  { icon: "🎼", en: "Maqamat",  ar: "المقامات" },
  { icon: "🔗", en: "Ouqoud",   ar: "العقود"   },
  { icon: "🔬", en: "Ajnas",    ar: "الأجناس"  },
  { icon: "📐", en: "Abaad",    ar: "الأبعاد"  },
  { icon: "🌐", en: "Awa el",   ar: "العوائل"  },
  { icon: "🎵", en: "Amthela",  ar: "الأمثلة"  },
  { icon: "🎭", en: "Ertijal",  ar: "الارتجال" },
]

const PLANS = [
  { label_en: "4 Hours",  label_ar: "4 ساعات", price: "$220", months_en: "1 month",  months_ar: "شهر",   color: "#f87171" },
  { label_en: "8 Hours",  label_ar: "8 ساعات", price: "$400", months_en: "2 months", months_ar: "شهران", color: "#fbbf24" },
  { label_en: "16 Hours", label_ar: "16 ساعة", price: "$800", months_en: "4 months", months_ar: "4 أشهر", color: "#60a5fa" },
]

export default function MaqamatSection() {
  const { isAr } = useLang()

  return (
    <section style={{ background:"var(--ink-soft)", padding: "100px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div style={{ display: "grid", gap: 64, alignItems: "center", gridTemplateColumns: "1fr 1fr" }}>

          {/* Left */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: "var(--gold)", opacity: 0.6 }}/>
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
                {isAr ? "نظرية الموسيقى العربية" : "Arabic Music Theory"}
              </span>
            </div>

            <h2 className="font-display" style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.15, marginBottom: 16 }}>
              {isAr
                ? <><span className="gradient-text" style={{ fontWeight: 800 }}>المقامات</span> الموسيقية</>
                : <>Arabic <span className="gradient-text" style={{ fontWeight: 800 }}>Maqamat</span> Theory</>}
            </h2>

            <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 12 }}>
              {isAr
                ? "المنهج المعتمد للاستاذ طارق الجندي — دراسة اكاديمية شاملة في نظرية الموسيقى العربية."
                : "Certified curriculum by Prof. Tareq Jundi — comprehensive Arabic music theory."}
            </p>

            <p style={{ fontSize: 14, color: "var(--gold)", marginBottom: 28, lineHeight: 1.7 }}>
              {isAr
                ? "جلستان اسبوعيا · 45 دقيقة · يبدا من 325 دولار (شهران)"
                : "1 hour/week · Packages from $220"}
            </p>

            {/* Pricing preview */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 28 }}>
              {PLANS.map((p: any, i: any) => (
                <div key={i} style={{ padding: "14px 12px", borderRadius: 10, background:"var(--ink-card)", border: "1px solid " + p.color + "30", textAlign: "center" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: p.color, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>
                    {isAr ? p.label_ar : p.label_en}
                  </div>
                  <div className="font-display" style={{ fontSize: 22, fontWeight: 800, color: "var(--cream)", marginBottom: 2 }}>
                    {p.price}
                  </div>
                  <div style={{ fontSize: 10, color: "var(--text-muted)" }}>
                    {isAr ? p.months_ar : p.months_en}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href="/maqamat" className="btn-gold" style={{ padding: "13px 28px", fontSize: 15 }}>
                {isAr ? "استعرض المنهج والاسعار" : "Explore Curriculum & Pricing"}
              </Link>
              <Link href="/booking?plan=assessment" className="btn-outline" style={{ padding: "13px 20px", fontSize: 13 }}>
                {isAr ? "جلسة تقييم مجانية" : "Free Assessment"}
              </Link>
            </div>
          </div>

          {/* Right */}
          <div>
            <div style={{ padding: "28px", borderRadius: 16, background: "rgba(201,168,76,0.04)", border: "1px solid rgba(201,168,76,0.15)", marginBottom: 16 }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 18, textAlign: "center" }}>
                {isAr ? "7 محاور رئيسية" : "7 Main Pillars"}
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {PILLARS.map((p: any, i: any) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 8, background:"var(--ink-card)", border: "1px solid var(--border)" }}>
                    <span style={{ fontSize: 20 }}>{p.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "var(--cream)" }}>
                      {isAr ? p.ar : p.en}
                    </span>
                  </div>
                ))}
                <div style={{ gridColumn: "1/-1", display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderRadius: 8, background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.2)" }}>
                  <span style={{ fontSize: 20 }}>🎯</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#34d399" }}>
                    {isAr ? "جلسة تقييم مجانية مع كل خطة" : "Free assessment with every plan"}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ padding: "18px 20px", borderRadius: 12, background: "var(--ink-card)", border: "1px solid var(--border)", display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#E8CB7E,#C9A84C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                📚
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--cream)", marginBottom: 2 }}>
                  {isAr ? "منهج الاستاذ طارق الجندي" : "Prof. Tareq Jundi Curriculum"}
                </p>
                <p style={{ fontSize: 11, color: "var(--text-muted)" }}>
                  {isAr ? "منهج دولي معتمد · 3 مستويات" : "International certified curriculum · 3 levels"}
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
