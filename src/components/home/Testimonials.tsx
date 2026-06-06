"use client"

import { useLang } from "@/components/providers/LangProvider"

const REVIEWS = [
  { name_en: "Sarah M.", name_ar: "سارة م.", role_en: "Piano Student", role_ar: "طالبة بيانو", text_en: "I started from zero and now I can play my favorite songs. The instructors are patient and the bilingual lessons made everything so clear.", text_ar: "بدأت من الصفر والآن أستطيع عزف أغانيي المفضّلة. المدرّسون صبورون والدروس ثنائية اللغة جعلت كل شيء واضحاً.", color: "#60a5fa", rating: 5 },
  { name_en: "Ahmed K.", name_ar: "أحمد ك.", role_en: "Oud Student", role_ar: "طالب عود", text_en: "The academic method based on Tareq Al-Jundi's curriculum is excellent. I finally understand maqamat properly. Highly recommend!", text_ar: "المنهج الأكاديمي المبني على منهج طارق الجندي ممتاز. أخيراً أفهم المقامات بشكل صحيح. أنصح به بشدّة!", color: "var(--gold)", rating: 5 },
  { name_en: "Lina B.", name_ar: "لينا ب.", role_en: "Music Theory Student", role_ar: "طالبة نظرية موسيقى", text_en: "The free assessment helped me find the right level. The intensive package was perfect for preparing my ABRSM exam.", text_ar: "ساعدني التقييم المجاني في إيجاد المستوى المناسب. الباقة المكثّفة كانت مثالية للتحضير لامتحان ABRSM.", color: "#f87171", rating: 5 },
]

function Stars({ n }: { n: number }) {
  return <div style={{ color: "#fbbf24", fontSize: 16, letterSpacing: 2, marginBottom: 14 }}>{"★".repeat(n)}</div>
}

export default function Testimonials() {
  const { isAr } = useLang()

  return (
    <section style={{ padding: "100px 0", background: "var(--ink)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
              {isAr ? "آراء طلابنا" : "Student Reviews"}
            </span>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 400, color: "var(--cream)", marginBottom: 14 }}>
            {isAr ? <>ماذا يقول <span className="gradient-text" style={{ fontWeight: 800 }}>طلابنا</span></> : <>What Our <span className="gradient-text" style={{ fontWeight: 800 }}>Students Say</span></>}
          </h2>
        </div>

        <div className="reviews-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1080, margin: "0 auto" }}>
          {REVIEWS.map((r) => (
            <div key={r.name_en} className="card reveal" style={{ padding: "32px 28px", borderRadius: 18, background: "var(--ink-card)", border: "1px solid var(--border)", textAlign: isAr ? "right" : "left", display: "flex", flexDirection: "column" }}>
              <Stars n={r.rating} />
              <p style={{ fontSize: 15, color: "var(--cream)", lineHeight: 1.8, marginBottom: 24, flex: 1, fontStyle: "italic" }}>
                &ldquo;{isAr ? r.text_ar : r.text_en}&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: r.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 800, flexShrink: 0 }}>
                  {(isAr ? r.name_ar : r.name_en).charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)" }}>{isAr ? r.name_ar : r.name_en}</div>
                  <div style={{ fontSize: 13, color: r.color, fontWeight: 600 }}>{isAr ? r.role_ar : r.role_en}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{"@media(max-width:900px){.reviews-grid{grid-template-columns:1fr !important;max-width:480px !important}}"}</style>
    </section>
  )
}
