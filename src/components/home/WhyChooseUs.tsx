"use client"

import { useLang } from "@/components/providers/LangProvider"

const FEATURES = [
  { icon: "🎯", title_en: "Free Level Assessment", title_ar: "تقييم مجاني للمستوى", desc_en: "Start with a free 20-min session to find your perfect starting point.", desc_ar: "ابدأ بجلسة مجانية 20 دقيقة لتحديد نقطة انطلاقك المثالية.", color: "#34d399" },
  { icon: "👨‍🏫", title_en: "Certified Instructors", title_ar: "مدرّسون معتمدون", desc_en: "Learn from professional musicians with internationally recognized methods.", desc_ar: "تعلّم من موسيقيين محترفين بمناهج معترف بها دولياً.", color: "#60a5fa" },
  { icon: "🌍", title_en: "Bilingual Teaching", title_ar: "تدريس ثنائي اللغة", desc_en: "All courses available in both Arabic and English for your comfort.", desc_ar: "جميع الدورات متاحة بالعربية والإنجليزية لراحتك.", color: "#f87171" },
  { icon: "💻", title_en: "Live & Recorded", title_ar: "مباشر ومسجّل", desc_en: "Flexible learning — live one-on-one classes plus recorded lessons.", desc_ar: "تعلّم مرن — حصص مباشرة فردية مع دروس مسجّلة.", color: "#fbbf24" },
  { icon: "📜", title_en: "Certificate of Completion", title_ar: "شهادة إتمام", desc_en: "Earn a certificate to showcase your musical achievement.", desc_ar: "احصل على شهادة لإبراز إنجازك الموسيقي.", color: "#a78bfa" },
  { icon: "🎁", title_en: "Free Classes & Discounts", title_ar: "حصص مجانية وخصومات", desc_en: "Get up to 2 free classes and 20% discount codes on packages.", desc_ar: "احصل على حصتين مجانيتين وأكواد خصم 20% على الباقات.", color: "#13B5A6" },
]

export default function WhyChooseUs() {
  const { isAr } = useLang()

  return (
    <section style={{ padding: "100px 0", background: "var(--ink-soft)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }} dir={isAr ? "rtl" : "ltr"}>
      <div className="container">
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
              {isAr ? "لماذا بيانود" : "Why Pianoud"}
            </span>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }} />
          </div>
          <h2 className="font-display" style={{ fontSize: "clamp(30px,4.5vw,46px)", fontWeight: 400, color: "var(--cream)", marginBottom: 14 }}>
            {isAr ? <>تجربة تعليمية <span className="gradient-text" style={{ fontWeight: 800 }}>متكاملة</span></> : <>A Complete <span className="gradient-text" style={{ fontWeight: 800 }}>Learning Experience</span></>}
          </h2>
          <p style={{ fontSize: 16, color: "var(--text-muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.8 }}>
            {isAr ? "كل ما تحتاجه لتتعلّم الموسيقى باحترافية في مكان واحد." : "Everything you need to learn music professionally, all in one place."}
          </p>
        </div>

        <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, maxWidth: 1080, margin: "0 auto" }}>
          {FEATURES.map((f) => (
            <div key={f.title_en} className="card reveal" style={{ padding: "32px 28px", borderRadius: 18, background: "var(--ink-card)", border: "1px solid var(--border)", textAlign: isAr ? "right" : "left" }}>
              <div style={{ width: 56, height: 56, borderRadius: 14, background: f.color + "1A", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 18 }}>
                {f.icon}
              </div>
              <h3 className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--cream)", marginBottom: 10 }}>
                {isAr ? f.title_ar : f.title_en}
              </h3>
              <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {isAr ? f.desc_ar : f.desc_en}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{"@media(max-width:900px){.why-grid{grid-template-columns:1fr 1fr !important}}@media(max-width:560px){.why-grid{grid-template-columns:1fr !important}}"}</style>
    </section>
  )
}
