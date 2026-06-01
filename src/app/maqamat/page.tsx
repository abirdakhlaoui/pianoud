"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const TOPICS = [
  {
    id: "maqamat",
    icon: "🎼",
    title_en: "Arabic Maqamat (Scales)",
    title_ar: "المقامات الموسيقية",
    desc_en: "Study of all Arabic maqamat — their structure, characteristics, emotional qualities, and how they are used in classical and contemporary Arabic music. Covers Rast, Bayati, Hijaz, Saba, Nahawand, Kurd, Ajam, and more.",
    desc_ar: "دراسة جميع المقامات الموسيقية العربية — بنيتها وخصائصها وصفاتها العاطفية. تشمل: راست، بياتي، حجاز، صبا، نهاوند، كرد، عجم وغيرها.",
  },
  {
    id: "ouqoud",
    icon: "🔗",
    title_en: "Ouqoud (Maqam Connections)",
    title_ar: "العقود الموسيقية",
    desc_en: "How maqamat are connected and built from each other. Understanding the internal logic of Arabic modal system and how ouqoud form the backbone of maqam construction.",
    desc_ar: "كيف ترتبط المقامات ببعضها وتُبنى من بعضها. فهم المنطق الداخلي للنظام المقامي العربي وكيف تشكّل العقود العمود الفقري لبناء المقام.",
  },
  {
    id: "ajnas",
    icon: "🔬",
    title_en: "Ajnas (Tetrachords & Genera)",
    title_ar: "الأجناس الموسيقية",
    desc_en: "The building blocks of Arabic maqamat — the ajnas (tetrachords), their combinations, and how they create different modal colors and emotional expressions.",
    desc_ar: "لبنات المقامات العربية الأساسية — الأجناس وتركيباتها وكيف تخلق ألواناً مقامية وتعبيرات عاطفية مختلفة.",
  },
  {
    id: "abaad",
    icon: "📐",
    title_en: "Abaad (Intervals & Distances)",
    title_ar: "الأبعاد الموسيقية",
    desc_en: "The unique intervals of Arabic music including quarter-tones, their measurement, and how they differ from Western intervals. Essential for understanding maqam color.",
    desc_ar: "الفترات الفريدة للموسيقى العربية بما فيها ربع التون وقياسها. ضرورية لفهم لون المقام وتمييزه.",
  },
  {
    id: "awaEl",
    icon: "🌐",
    title_en: "Awa'el (Maqam Families)",
    title_ar: "عوائل المقامات",
    desc_en: "How maqamat are grouped into families based on their jins and structure. Understanding modulation (intiqal) between related maqamat within the same family.",
    desc_ar: "كيف تتجمّع المقامات في عوائل بحسب جنسها وبنيتها. فهم الانتقال بين المقامات المتقاربة داخل نفس العائلة.",
  },
  {
    id: "amthela",
    icon: "🎵",
    title_en: "Amthela Musiqi'a Ghina'ia (Song Examples)",
    title_ar: "الأمثلة الموسيقية الغنائية",
    desc_en: "Practical examples from iconic Arabic songs illustrating each maqam — from Oum Kalthoum to Fairouz, from Abdel Halim Hafez to Warda. Hear the maqam live in classic recordings.",
    desc_ar: "أمثلة عملية من أغاني عربية أيقونية توضّح كل مقام — من أم كلثوم إلى فيروز، من عبد الحليم إلى وردة. اسمع المقام حياً في تسجيلات كلاسيكية.",
  },
  {
    id: "ertijal",
    icon: "🎭",
    title_en: "Ertijal (Improvisation / Taqsim)",
    title_ar: "الارتجال الموسيقي (التقسيم)",
    desc_en: "The art of free improvisation within maqamat. How to express emotions freely while respecting the rules of a maqam. The heart of Arabic musical performance.",
    desc_ar: "فن الارتجال الحر في المقامات. كيف تعبّر عن المشاعر بحرية مع احترام قواعد المقام. قلب الأداء الموسيقي العربي.",
  },
]

const PRICING = [
  {
    id: "level1",
    title_en: "Level 1 — Beginner",
    title_ar: "المستوى الأول — مبتدئ",
    duration_en: "2 months",
    duration_ar: "شهران",
    sessions_en: "2 sessions/week × 45 min",
    sessions_ar: "جلستان/أسبوع × 45 دقيقة",
    price: 325,
    note_en: "Minimum booking: 2 months",
    note_ar: "الحجز الأدنى: شهران",
    includes_en: ["Maqamat fundamentals", "Ajnas basics", "Musical intervals", "Song examples", "Free assessment session"],
    includes_ar: ["أساسيات المقامات", "أجناس موسيقية", "الأبعاد الموسيقية", "أمثلة غنائية", "جلسة تقييم مجانية"],
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.3)",
    badge_en: "Start Here",
    badge_ar: "ابدأ من هنا",
  },
  {
    id: "level1-2",
    title_en: "Levels 1 + 2 — Beginner & Intermediate",
    title_ar: "المستوى 1 + 2 — مبتدئ ومتوسط",
    duration_en: "4 months",
    duration_ar: "4 أشهر",
    sessions_en: "2 sessions/week × 45 min",
    sessions_ar: "جلستان/أسبوع × 45 دقيقة",
    price: 650,
    note_en: "Save $0 vs booking separately",
    note_ar: "رحلة متكاملة مستويين",
    includes_en: ["All Level 1 content", "Advanced maqamat", "Maqam families", "Modulation between maqamat", "2 free assessment sessions"],
    includes_ar: ["كل محتوى المستوى الأول", "مقامات متقدمة", "عوائل المقامات", "الانتقال بين المقامات", "جلستا تقييم مجانيتان"],
    color: "#fbbf24",
    bg: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.3)",
    badge_en: "Recommended",
    badge_ar: "موصى به",
  },
  {
    id: "level1-2-3",
    title_en: "All 3 Levels — Complete Journey",
    title_ar: "المستويات الثلاثة — الرحلة الكاملة",
    duration_en: "6 months",
    duration_ar: "6 أشهر",
    sessions_en: "2 sessions/week × 45 min",
    sessions_ar: "جلستان/أسبوع × 45 دقيقة",
    price: 975,
    note_en: "Complete Arabic music theory mastery",
    note_ar: "إتقان كامل لنظرية الموسيقى العربية",
    includes_en: ["All Levels 1 & 2 content", "Advanced improvisation (Taqsim)", "Composition in maqamat", "Professional performance", "3 free assessment sessions"],
    includes_ar: ["كل محتوى المستوى 1 و 2", "الارتجال المتقدم (تقسيم)", "التأليف في المقامات", "الأداء الاحترافي", "3 جلسات تقييم مجانية"],
    color: "#C9A84C",
    bg: "rgba(201,168,76,0.1)",
    border: "rgba(201,168,76,0.35)",
    badge_en: "Best Value",
    badge_ar: "أفضل قيمة",
  },
]

export default function MaqamatPage() {
  const { isAr } = useLang()
  const [activeTab, setActiveTab] = useState<"overview"|"curriculum"|"pricing">("overview")
  const [openTopic, setOpenTopic] = useState<string | null>("maqamat")

  return (
    <main style={{ minHeight: "100vh", background: "var(--ink)", paddingTop: 80 }} dir={isAr ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{
        padding: "80px 0 64px",
        background: "linear-gradient(135deg, #080808 0%, #0A0A00 30%, #1a1000 60%, #080808 100%)",
        borderBottom: "1px solid var(--border)",
        textAlign: "center",
      }}>
        <div className="container">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }}/>
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 4, textTransform: "uppercase" }}>
              {isAr ? "نظرية الموسيقى العربية" : "Arabic Music Theory"}
            </span>
            <div style={{ width: 40, height: 1, background: "var(--gold)", opacity: 0.5 }}/>
          </div>

          <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,72px)", fontWeight: 300, color: "var(--cream)", marginBottom: 16, lineHeight: 1.1 }}>
            {isAr
              ? <><span className="gradient-text" style={{ fontWeight: 800 }}>المقامات</span> الموسيقية</>
              : <>Arabic <span className="gradient-text" style={{ fontWeight: 800 }}>Maqamat</span></>}
          </h1>

          <p style={{ fontSize: 17, color: "var(--text-muted)", maxWidth: 620, margin: "0 auto 16px", lineHeight: 1.9 }}>
            {isAr
              ? "المنهج المعتمد للأستاذ طارق الجندي — دراسة أكاديمية شاملة في نظرية الموسيقى العربية"
              : "Certified curriculum by Prof. Tareq Jundi — comprehensive academic study of Arabic music theory"}
          </p>
          <p style={{ fontSize: 14, color: "var(--gold)", marginBottom: 40 }}>
            {isAr
              ? "المقامات الموسيقية · عقودها · أجناسها · أبعادها · عوائلها · أمثلة غنائية · ارتجال"
              : "Maqamat · Ouqoud · Ajnas · Abaad · Awa'el · Ghina'ia Examples · Ertijal"}
          </p>

          {/* Free assessment CTA */}
          <div style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "24px 40px", borderRadius: 16, background: "rgba(201,168,76,0.08)", border: "2px solid rgba(201,168,76,0.3)" }}>
            <span style={{ fontSize: 28 }}>🎯</span>
            <p style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>
              {isAr ? "لا تعرف مستواك؟ احجز جلسة تقييم مجانية" : "Don't know your level? Book a free assessment"}
            </p>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 12 }}>
              {isAr ? "20 دقيقة · مجاني · بدون التزام" : "20 minutes · Free · No commitment"}
            </p>
            <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding: "12px 32px", fontSize: 15 }}>
              {isAr ? "🎯 احجز جلسة التقييم المجانية" : "🎯 Book Free Assessment Session"}
            </Link>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div style={{ background: "var(--ink-soft)", borderBottom: "1px solid var(--border)", position: "sticky", top: 56, zIndex: 10 }}>
        <div className="container">
          <div style={{ display: "flex", gap: 0 }}>
            {[
              { key: "overview",   en: "What You Learn",  ar: "ماذا ستتعلم" },
              { key: "curriculum", en: "Curriculum",      ar: "المنهج الدراسي" },
              { key: "pricing",    en: "Pricing & Plans", ar: "الأسعار والخطط" },
            ].map((t: any) => (
              <button key={t.key} onClick={() => setActiveTab(t.key as any)} style={{
                padding: "16px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
                background: "transparent", border: "none",
                color: activeTab === t.key ? "var(--gold)" : "var(--text-muted)",
                borderBottom: activeTab === t.key ? "2px solid var(--gold)" : "2px solid transparent",
                transition: "all 0.2s", whiteSpace: "nowrap",
              }}>
                {isAr ? t.ar : t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 48, paddingBottom: 80 }}>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 48 }} className="overview-grid">
              <div>
                <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: "var(--cream)", marginBottom: 16 }}>
                  {isAr ? "عن هذه الدورة" : "About This Course"}
                </h2>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9, marginBottom: 16 }}>
                  {isAr
                    ? "دراسة أكاديمية معمّقة في نظرية الموسيقى العربية — مقرّر معتمد من إعداد الأستاذ طارق الجندي. مخصّص لطلاب العود والموسيقى العربية الراغبين في فهم أعمق للنظام المقامي."
                    : "An in-depth academic study of Arabic music theory — certified curriculum by Prof. Tareq Jundi. Designed for Oud students and Arabic music lovers who want a deeper understanding of the maqam system."}
                </p>
                <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.9 }}>
                  {isAr
                    ? "تشمل الدورة 7 محاور رئيسية: المقامات وعقودها وأجناسها وأبعادها وعوائلها والأمثلة الغنائية والارتجال. كل محور مدعوم بأمثلة موسيقية حيّة من أعظم الأغاني العربية."
                    : "The course covers 7 main pillars: Maqamat, Ouqoud, Ajnas, Abaad, Awa'el, Ghina'ia Examples, and Ertijal — each supported by live musical examples from the greatest Arabic songs."}
                </p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  { en: "7 comprehensive theory modules",            ar: "7 وحدات نظرية شاملة" },
                  { en: "2 sessions/week · 45 minutes each",        ar: "جلستان أسبوعياً · 45 دقيقة" },
                  { en: "Live examples from iconic Arabic songs",    ar: "أمثلة حية من أغاني عربية أيقونية" },
                  { en: "Certified curriculum by Prof. Tareq Jundi",ar: "منهج معتمد للأستاذ طارق الجندي" },
                  { en: "Covers Ertijal (free improvisation)",       ar: "يشمل الارتجال الحر (تقسيم)" },
                  { en: "Applies to Oud, Piano, and voice",          ar: "مطبّق على العود والبيانو والصوت" },
                  { en: "Free assessment session included",          ar: "جلسة تقييم مجانية مشمولة" },
                  { en: "Bilingual instruction (Arabic & English)",  ar: "تدريس ثنائي اللغة" },
                ].map((f: any, i: any) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14, color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>✓</span>
                    <span>{isAr ? f.ar : f.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Who is it for */}
            <div style={{ padding: "32px", borderRadius: 16, background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", marginBottom: 40 }}>
              <h3 className="font-display" style={{ fontSize: 22, fontWeight: 600, color: "var(--cream)", marginBottom: 20 }}>
                {isAr ? "لمن هذه الدورة؟" : "Who is this course for?"}
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }} className="for-who-grid">
                {[
                  { en: "Oud players who want to understand maqamat deeply",       ar: "عازفو العود الراغبون في فهم المقامات عمقاً" },
                  { en: "Piano students learning Arabic music",                     ar: "طلاب البيانو الذين يتعلّمون الموسيقى العربية" },
                  { en: "Singers who want to understand the maqam they sing in",   ar: "المغنّون الراغبون في فهم مقام ما يغنّون" },
                  { en: "Anyone passionate about Arabic musical heritage",          ar: "كل من يشغفه التراث الموسيقي العربي" },
                  { en: "Music teachers who want to deepen their theory knowledge", ar: "معلّمو الموسيقى الراغبون في تعميق معرفتهم النظرية" },
                  { en: "Beginners with no prior theory knowledge",                 ar: "المبتدئون بدون معرفة نظرية مسبقة" },
                ].map((item: any, i: any) => (
                  <div key={i} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-muted)", alignItems: "flex-start" }}>
                    <span style={{ color: "var(--gold)", flexShrink: 0 }}>→</span>
                    <span>{isAr ? item.ar : item.en}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ textAlign: "center" }}>
              <button onClick={() => setActiveTab("pricing")} className="btn-gold" style={{ padding: "14px 48px", fontSize: 16 }}>
                {isAr ? "عرض الأسعار والخطط ←" : "View Pricing & Plans ←"}
              </button>
            </div>
          </div>
        )}

        {/* CURRICULUM TAB */}
        {activeTab === "curriculum" && (
          <div style={{ maxWidth: 760 }}>
            <h2 className="font-display" style={{ fontSize: 28, fontWeight: 600, color: "var(--cream)", marginBottom: 8 }}>
              {isAr ? "المنهج الدراسي" : "Course Curriculum"}
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 32, lineHeight: 1.7 }}>
              {isAr
                ? "7 محاور رئيسية — كل محور يبنى على السابق لتكوين فهم متكامل للنظام المقامي العربي."
                : "7 main pillars — each builds on the previous to form a complete understanding of the Arabic maqam system."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TOPICS.map((topic: any, i: any) => (
                <div key={topic.id} style={{ border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
                  <button
                    onClick={() => setOpenTopic(openTopic === topic.id ? null : topic.id)}
                    style={{ width: "100%", padding: "18px 24px", display: "flex", alignItems: "center", gap: 14, background: openTopic === topic.id ? "rgba(201,168,76,0.06)" : "var(--ink-soft)", border: "none", cursor: "pointer", borderBottom: openTopic === topic.id ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--gold-pale)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                      {topic.icon}
                    </div>
                    <div style={{ flex: 1, textAlign: isAr ? "right" : "left" }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)", marginBottom: 2 }}>
                        {i + 1}. {isAr ? topic.title_ar : topic.title_en}
                      </div>
                    </div>
                    <span style={{ color: "var(--gold)", fontSize: 14 }}>{openTopic === topic.id ? "▲" : "▼"}</span>
                  </button>
                  {openTopic === topic.id && (
                    <div style={{ padding: "20px 24px", background: "var(--ink)" }}>
                      <p style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.8 }}>
                        {isAr ? topic.desc_ar : topic.desc_en}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, textAlign: "center" }}>
              <button onClick={() => setActiveTab("pricing")} className="btn-gold" style={{ padding: "13px 40px", fontSize: 15 }}>
                {isAr ? "عرض الأسعار والحجز ←" : "View Pricing & Book ←"}
              </button>
            </div>
          </div>
        )}

        {/* PRICING TAB */}
        {activeTab === "pricing" && (
          <div>
            {/* Header info */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <h2 className="font-display" style={{ fontSize: 32, fontWeight: 400, color: "var(--cream)", marginBottom: 12 }}>
                {isAr
                  ? <><span className="gradient-text" style={{ fontWeight: 800 }}>الأسعار</span> والخطط</>
                  : <>Pricing <span className="gradient-text" style={{ fontWeight: 800 }}>& Plans</span></>}
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 6 }}>
                {isAr
                  ? "جلستان أسبوعياً · 45 دقيقة · الحجز الأدنى شهران"
                  : "2 sessions/week · 45 minutes each · Minimum booking: 2 months"}
              </p>
              <p style={{ fontSize: 13, color: "var(--gold)" }}>
                {isAr
                  ? "✓ كل خطة تشمل جلسة تقييم مجانية"
                  : "✓ Every plan includes a free assessment session"}
              </p>
            </div>

            {/* Pricing cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }} className="pricing-cards">
              {PRICING.map((plan: any, i: any) => (
                <div key={plan.id} style={{
                  borderRadius: 16, overflow: "hidden",
                  border: `2px solid ${plan.border}`,
                  background: plan.bg,
                  display: "flex", flexDirection: "column",
                  position: "relative",
                  transform: i === 2 ? "scale(1.02)" : "none",
                  boxShadow: i === 2 ? "0 20px 60px rgba(201,168,76,0.15)" : "none",
                }}>
                  {/* Badge */}
                  <div style={{ padding: "8px 20px", background: plan.color === "#C9A84C" ? "linear-gradient(135deg,#E8CB7E,#C9A84C)" : plan.color, textAlign: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0A0A0A", letterSpacing: 1 }}>
                      {isAr ? plan.badge_ar : plan.badge_en}
                    </span>
                  </div>

                  <div style={{ padding: "24px 24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "var(--cream)", marginBottom: 6, lineHeight: 1.3 }}>
                      {isAr ? plan.title_ar : plan.title_en}
                    </h3>

                    <div style={{ display: "flex", alignItems: "baseline", gap: 6, margin: "16px 0" }}>
                      <span className="font-display" style={{ fontSize: 44, fontWeight: 800, color: "var(--cream)" }}>${plan.price}</span>
                    </div>

                    <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 6 }}>
                      ⏱ {isAr ? plan.sessions_ar : plan.sessions_en}
                    </div>
                    <div style={{ fontSize: 13, color: "var(--gold)", marginBottom: 6 }}>
                      📅 {isAr ? plan.duration_ar : plan.duration_en}
                    </div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 20, padding: "8px 12px", borderRadius: 6, background: "rgba(255,255,255,0.03)", border: "1px solid var(--border)" }}>
                      ⚠️ {isAr ? plan.note_ar : plan.note_en}
                    </div>

                    {/* What's included */}
                    <div style={{ flex: 1, marginBottom: 24 }}>
                      <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 10 }}>
                        {isAr ? "يشمل:" : "Includes:"}
                      </p>
                      {(isAr ? plan.includes_ar : plan.includes_en).map((item: any, idx: any) => (
                        <div key={idx} style={{ display: "flex", gap: 8, fontSize: 13, color: "var(--text-muted)", marginBottom: 7, alignItems: "flex-start" }}>
                          <span style={{ color: plan.color, flexShrink: 0, fontWeight: 700 }}>✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      href={"/booking?plan=" + plan.id + "&price=" + plan.price}
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        padding: "13px", borderRadius: 10, fontSize: 15, fontWeight: 700, textDecoration: "none",
                        background: i === 2 ? "linear-gradient(135deg,#E8CB7E,#C9A84C)" : "transparent",
                        color: i === 2 ? "#0A0A0A" : plan.color,
                        border: "2px solid " + plan.border,
                        transition: "all 0.2s",
                      }}>
                      {isAr ? "احجز الآن" : "Book Now"}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison table */}
            <div className="card" style={{ overflow: "hidden", marginBottom: 40 }}>
              <div style={{ padding: "16px 24px", background: "var(--ink-soft)", borderBottom: "1px solid var(--border)" }}>
                <h3 className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "var(--cream)" }}>
                  {isAr ? "مقارنة الخطط" : "Plan Comparison"}
                </h3>
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={{ padding: "12px 20px", textAlign: isAr ? "right" : "left", fontSize: 12, color: "var(--text-muted)", fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", borderBottom: "1px solid var(--border)", background: "var(--ink-soft)" }}>
                        {isAr ? "الميزة" : "Feature"}
                      </th>
                      {PRICING.map((p: any) => (
                        <th key={p.id} style={{ padding: "12px 20px", textAlign: "center", fontSize: 12, color: p.color, fontWeight: 700, borderBottom: "1px solid var(--border)", background: "var(--ink-soft)", whiteSpace: "nowrap" }}>
                          {isAr ? p.title_ar.split(" — ")[0] : p.title_en.split(" — ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature_en: "Price", feature_ar: "السعر", values: ["$325", "$650", "$975"] },
                      { feature_en: "Duration", feature_ar: "المدة", values: [isAr ? "شهران" : "2 months", isAr ? "4 أشهر" : "4 months", isAr ? "6 أشهر" : "6 months"] },
                      { feature_en: "Sessions/week", feature_ar: "جلسات/أسبوع", values: ["2", "2", "2"] },
                      { feature_en: "Session length", feature_ar: "مدة الجلسة", values: ["45 min", "45 min", "45 min"] },
                      { feature_en: "Free assessment", feature_ar: "تقييم مجاني", values: ["1", "2", "3"] },
                      { feature_en: "Maqamat Level 1", feature_ar: "مقامات المستوى 1", values: ["✓", "✓", "✓"] },
                      { feature_en: "Maqamat Level 2", feature_ar: "مقامات المستوى 2", values: ["—", "✓", "✓"] },
                      { feature_en: "Ertijal (Improv)", feature_ar: "الارتجال", values: ["Basic", "Intermediate", "Advanced"] },
                    ].map((row: any, i: any) => (
                      <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                        <td style={{ padding: "12px 20px", fontSize: 13, color: "var(--text-muted)", background: "var(--ink-soft)" }}>
                          {isAr ? row.feature_ar : row.feature_en}
                        </td>
                        {row.values.map((val: any, vi: any) => (
                          <td key={vi} style={{ padding: "12px 20px", textAlign: "center", fontSize: 13, color: val === "✓" ? "#34d399" : val === "—" ? "var(--text-muted)" : "var(--cream)", fontWeight: val === "✓" || val === "—" ? 700 : 500, background: "var(--ink)" }}>
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Free assessment reminder */}
            <div style={{ padding: "28px 32px", borderRadius: 14, background: "rgba(52,211,153,0.06)", border: "1px solid rgba(52,211,153,0.25)", display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              <span style={{ fontSize: 36 }}>🎯</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>
                  {isAr ? "غير متأكد من المستوى المناسب لك؟" : "Not sure which level is right for you?"}
                </p>
                <p style={{ fontSize: 14, color: "var(--text-muted)" }}>
                  {isAr
                    ? "احجز جلسة تقييم مجانية (20 دقيقة) مع أستاذنا لتحديد مستواك والخطة الأنسب."
                    : "Book a free 20-minute assessment with our instructor to determine your level and the best plan."}
                </p>
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding: "12px 24px", fontSize: 14, flexShrink: 0 }}>
                {isAr ? "احجز مجاناً" : "Book Free"}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .overview-grid  { grid-template-columns: 1fr 1fr; }
        .for-who-grid   { grid-template-columns: 1fr 1fr; }
        .pricing-cards  { grid-template-columns: repeat(3,1fr); }
        @media(max-width:900px) {
          .overview-grid  { grid-template-columns: 1fr !important; }
          .for-who-grid   { grid-template-columns: 1fr !important; }
          .pricing-cards  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
