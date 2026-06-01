"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLang } from "@/components/providers/LangProvider"

export default function OudPage() {
  const { isAr } = useLang()
  const [activeTab, setActiveTab] = useState<"individual"|"group"|"theory">("individual")

  const PLANS = {
    individual: [
      {
        level_en: "Beginner",
        level_ar: "مبتدئ",
        icon: "🌱",
        color: "#34d399",
        bg: "rgba(52,211,153,0.08)",
        border: "rgba(52,211,153,0.3)",
        session_en: "45 min / session",
        session_ar: "45 دقيقة / جلسة",
        frequency_en: "2 sessions / week",
        frequency_ar: "جلستان / أسبوع",
        options: [
          { label_en:"Per session",  label_ar:"جلسة واحدة",    price:25,   note_en:"Pay as you go",        note_ar:"ادفع عند الحجز" },
          { label_en:"1 month",      label_ar:"شهر واحد",      price:200,  note_en:"8 sessions",           note_ar:"8 جلسات",        badge_en:"Save 20%", badge_ar:"وفّر 20%" },
          { label_en:"16 sessions",  label_ar:"16 جلسة",       price:375,  note_en:"Best value pack",      note_ar:"أفضل قيمة",      badge_en:"Popular",  badge_ar:"الأكثر طلباً" },
        ],
        combos: [
          { label_en:"Beginner + Intermediate (2 levels)", label_ar:"مبتدئ + متوسط (مستويان)",              price:650,  months:4  },
          { label_en:"All 3 levels (Beginner → Advanced)", label_ar:"المستويات الثلاثة (مبتدئ → متقدم)",   price:975,  months:6  },
        ],
      },
      {
        level_en: "Intermediate",
        level_ar: "متوسط",
        icon: "🌿",
        color: "#fbbf24",
        bg: "rgba(251,191,36,0.08)",
        border: "rgba(251,191,36,0.3)",
        session_en: "60 min / session",
        session_ar: "60 دقيقة / جلسة",
        frequency_en: "1 session / week",
        frequency_ar: "جلسة / أسبوع",
        options: [
          { label_en:"Per session", label_ar:"جلسة واحدة", price:50,  note_en:"Pay as you go",   note_ar:"ادفع عند الحجز" },
          { label_en:"1 month",     label_ar:"شهر واحد",   price:200, note_en:"4 sessions",      note_ar:"4 جلسات",        badge_en:"Save 25%", badge_ar:"وفّر 25%" },
          { label_en:"8 sessions",  label_ar:"8 جلسات",    price:375, note_en:"Best value pack", note_ar:"أفضل قيمة",      badge_en:"Popular",  badge_ar:"الأكثر طلباً" },
        ],
        combos: [],
      },
      {
        level_en: "Advanced",
        level_ar: "متقدم",
        icon: "🌳",
        color: "#f87171",
        bg: "rgba(248,113,113,0.08)",
        border: "rgba(248,113,113,0.3)",
        session_en: "60 min / session",
        session_ar: "60 دقيقة / جلسة",
        frequency_en: "1 session / week",
        frequency_ar: "جلسة / أسبوع",
        options: [
          { label_en:"Per session", label_ar:"جلسة واحدة", price:75,  note_en:"Pay as you go",     note_ar:"ادفع عند الحجز" },
          { label_en:"1 month",     label_ar:"شهر واحد",   price:300, note_en:"4 sessions",        note_ar:"4 جلسات",        badge_en:"Save 20%", badge_ar:"وفّر 20%" },
          { label_en:"2 months",    label_ar:"شهران",      price:575, note_en:"8 sessions",        note_ar:"8 جلسات",        badge_en:"Best Deal", badge_ar:"أفضل عرض" },
        ],
        combos: [],
      },
    ],
  }

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr?"rtl":"ltr"}>

      {/* ── HERO ── */}
      <section style={{ padding:"80px 0 64px", background:"linear-gradient(135deg,#080808 0%,#1a0a00 50%,#080808 100%)", borderBottom:"1px solid var(--border)", textAlign:"center" }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr?"تعلّم العود":"Learn Oud"}
            </span>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(40px,7vw,80px)", fontWeight:300, color:"var(--cream)", marginBottom:16, lineHeight:1.1 }}>
            {isAr ? <>أكاديمية <span className="gradient-text" style={{fontWeight:800}}>العود</span></> : <>The <span className="gradient-text" style={{fontWeight:800}}>Oud</span> Academy</>}
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", maxWidth:580, margin:"0 auto 40px", lineHeight:1.8 }}>
            {isAr
              ? "تعلّم العود مع مدرّسين محترفين. دروس فردية مخصّصة لكل مستوى — مبتدئ، متوسط، أو متقدم."
              : "Learn Oud with professional instructors. Individual lessons tailored to every level — beginner, intermediate, or advanced."}
          </p>

          {/* Know your level CTA */}
          <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:8, padding:"24px 40px", borderRadius:16, background:"rgba(201,168,76,0.08)", border:"2px solid rgba(201,168,76,0.3)" }}>
            <div style={{ fontSize:32 }}>🎯</div>
            <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
              {isAr?"لا تعرف مستواك؟":"Don't know your level?"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:12 }}>
              {isAr?"احجز جلسة تقييم مجانية (20 دقيقة) مع مدرّسنا":"Book a free 20-min assessment session with our instructor"}
            </p>
            <Link href="/booking" className="btn-gold" style={{ padding:"12px 32px", fontSize:15 }}>
              🎵 {isAr?"احجز جلسة تقييم مجانية":"Book Free Assessment Session"}
            </Link>
            <p style={{ fontSize:11, color:"var(--text-muted)" }}>
              {isAr?"مجاني تماماً — 20 دقيقة — بدون التزام":"Completely free · 20 minutes · No commitment"}
            </p>
          </div>
        </div>
      </section>

      {/* ── TABS ── */}
      <div style={{ background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", position:"sticky", top:56, zIndex:10 }}>
        <div className="container">
          <div style={{ display:"flex", gap:0 }}>
            {[
              { key:"individual", en:"Individual Lessons", ar:"دروس فردية" },
              { key:"theory",     en:"Arabic Music Theory", ar:"نظرية الموسيقى العربية" },
              { key:"group",      en:"Curriculum (Manhej)", ar:"المنهج الدراسي" },
            ].map((t: any) => (
              <button key={t.key} onClick={() => setActiveTab(t.key as any)} style={{
                padding:"16px 24px", fontSize:14, fontWeight:600, cursor:"pointer",
                background:"transparent", border:"none",
                color: activeTab===t.key ? "var(--gold)" : "var(--text-muted)",
                borderBottom: activeTab===t.key ? "2px solid var(--gold)" : "2px solid transparent",
                transition:"all 0.2s", whiteSpace:"nowrap",
              }}>
                {isAr?t.ar:t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop:48, paddingBottom:80 }}>

        {/* ── INDIVIDUAL LESSONS TAB ── */}
        {activeTab === "individual" && (
          <div>
            {/* Know your level banner */}
            <div style={{ padding:"20px 28px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", marginBottom:48, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <span style={{ fontSize:28 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                  {isAr?"جلسة 'اعرف مستواك' — مجانية لكل مستوى":"'Know Your Level' session — FREE with every level"}
                </p>
                <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                  {isAr?"تشمل كل خطة جلسة تقييم أولية مجانية مدتها 20 دقيقة.":"Every plan includes a free 20-minute initial assessment session."}
                </p>
              </div>
              <Link href="/booking" className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0 }}>
                {isAr?"احجز الآن":"Book Now"}
              </Link>
            </div>

            {/* Plans */}
            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
              {PLANS.individual.map((plan) => (
                <div key={plan.level_en}>
                  {/* Level header */}
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                    <span style={{ fontSize:32 }}>{plan.icon}</span>
                    <div>
                      <h2 className="font-display" style={{ fontSize:28, fontWeight:700, color:plan.color, marginBottom:2 }}>
                        {isAr?plan.level_ar:plan.level_en}
                      </h2>
                      <p style={{ fontSize:14, color:"var(--text-muted)" }}>
                        {isAr?plan.session_ar:plan.session_en} · {isAr?plan.frequency_ar:plan.frequency_en}
                      </p>
                    </div>
                  </div>

                  {/* Pricing options */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom: plan.combos.length>0?24:0 }} className="pricing-grid">
                    {plan.options.map((opt: any, oi: any) => (
                      <div key={oi} style={{
                        padding:24, borderRadius:14,
                        background: oi===2 ? plan.bg : "var(--ink-card)",
                        border:`1.5px solid ${oi===2 ? plan.border : "var(--border)"}`,
                        position:"relative", display:"flex", flexDirection:"column",
                      }}>
                        {opt.badge_en && (
                          <span style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", fontSize:10, fontWeight:800, padding:"3px 12px", borderRadius:999, background:plan.color, color:"#0A0A0A", whiteSpace:"nowrap", letterSpacing:0.5 }}>
                            {isAr?opt.badge_ar:opt.badge_en}
                          </span>
                        )}
                        <p style={{ fontSize:13, fontWeight:600, color:"var(--text-muted)", marginBottom:8 }}>
                          {isAr?opt.label_ar:opt.label_en}
                        </p>
                        <div className="font-display" style={{ fontSize:36, fontWeight:800, color:"var(--cream)", marginBottom:4 }}>
                          ${opt.price}
                        </div>
                        <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:16, flex:1 }}>
                          {isAr?opt.note_ar:opt.note_en}
                        </p>
                        <Link href="/booking" style={{
                          display:"flex", alignItems:"center", justifyContent:"center",
                          padding:"10px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none",
                          background: oi===2 ? plan.color : "transparent",
                          color: oi===2 ? "#0A0A0A" : plan.color,
                          border: `1px solid ${plan.border}`,
                          transition:"all 0.2s",
                        }}>
                          {isAr?"احجز الآن":"Book Now"}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {/* Combo offers */}
                  {plan.combos.length > 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", letterSpacing:2, textTransform:"uppercase" }}>
                        {isAr?"عروض الباقات":"Bundle Offers"}
                      </p>
                      {plan.combos.map((combo: any, ci: any) => (
                        <div key={ci} style={{ padding:"18px 24px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                          <div>
                            <p style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                              {isAr?combo.label_ar:combo.label_en}
                            </p>
                            <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                              {combo.months} {isAr?"أشهر":"months"} · {isAr?"يشمل جلسة تقييم مجانية":"Includes free assessment session"}
                            </p>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                            <div className="font-display" style={{ fontSize:28, fontWeight:800, color:"var(--gold)" }}>
                              ${combo.price}
                            </div>
                            <Link href="/booking" className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0 }}>
                              {isAr?"احجز":"Book"}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Divider */}
                  <div className="gold-line" style={{ marginTop:40 }}/>
                </div>
              ))}
            </div>

            {/* Special offer banner */}
            <div style={{ marginTop:48, padding:"32px 36px", borderRadius:16, background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.05))", border:"1px solid rgba(201,168,76,0.25)", textAlign:"center" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>⭐</div>
              <h3 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                {isAr?"عرض خاص — الباقة الشاملة":"Special Offer — Complete Package"}
              </h3>
              <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:8, lineHeight:1.8 }}>
                {isAr
                  ? "المستويات الثلاثة كاملة (مبتدئ + متوسط + متقدم) — رحلة موسيقية متكاملة مدتها 6 أشهر"
                  : "All 3 levels complete (Beginner + Intermediate + Advanced) — a 6-month complete musical journey"}
              </p>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap", marginBottom:20 }}>
                <div className="font-display gradient-text" style={{ fontSize:48, fontWeight:800 }}>$975</div>
                <div style={{ textAlign: isAr?"right":"left" }}>
                  <div style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"line-through" }}>$1,100</div>
                  <div style={{ fontSize:13, color:"#34d399", fontWeight:700 }}>
                    {isAr?"وفّر $125":"Save $125"}
                  </div>
                </div>
              </div>
              <Link href="/booking" className="btn-gold" style={{ padding:"14px 48px", fontSize:16 }}>
                {isAr?"احجز الباقة الشاملة":"Book Complete Package"}
              </Link>
              <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:12 }}>
                {isAr?"يشمل جلسة تقييم مجانية لكل مستوى":"Includes free assessment session for each level"}
              </p>
            </div>
          </div>
        )}

        {/* ── ARABIC MUSIC THEORY TAB ── */}
        {activeTab === "theory" && (
          <div style={{ maxWidth:760 }}>
            <div style={{ marginBottom:48 }}>
              <h2 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)", marginBottom:12 }}>
                {isAr ? <>نظرية <span className="gradient-text" style={{fontWeight:800}}>الموسيقى العربية</span></> : <>Arabic <span className="gradient-text" style={{fontWeight:800}}>Music Theory</span></>}
              </h2>
              <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.8 }}>
                {isAr
                  ? "دراسة أكاديمية معمّقة في نظرية الموسيقى العربية — مخصّصة لطلاب العود والموسيقى العربية."
                  : "In-depth academic study of Arabic music theory — designed for Oud students and Arabic music lovers."}
              </p>
            </div>

            {/* Theory topics */}
            <div style={{ display:"flex", flexDirection:"column", gap:16, marginBottom:48 }}>
              {[
                {
                  title_en:"Arabic Maqamat (Scales)",
                  title_ar:"المقامات الموسيقية",
                  desc_en:"Study of all Arabic maqamat — their structure, characteristics, emotional qualities, and how they are used in classical and contemporary Arabic music.",
                  desc_ar:"دراسة جميع المقامات الموسيقية العربية — بنيتها وخصائصها وصفاتها العاطفية وكيفية استخدامها في الموسيقى العربية الكلاسيكية والمعاصرة.",
                  icon:"🎼",
                },
                {
                  title_en:"Ajnas (Tetrachords & Genera)",
                  title_ar:"الأجناس الموسيقية",
                  desc_en:"Understanding the building blocks of Arabic maqamat — the ajnas (tetrachords), their combinations, and how they create different modal colors.",
                  desc_ar:"فهم اللبنات الأساسية للمقامات العربية — الأجناس وتركيباتها وكيف تخلق ألواناً مقامية مختلفة.",
                  icon:"🔬",
                },
                {
                  title_en:"Intervals & Distances (Abaad)",
                  title_ar:"الأبعاد الموسيقية",
                  desc_en:"The unique intervals of Arabic music including quarter-tones, their measurement, and how they differ from Western intervals.",
                  desc_ar:"الفترات الفريدة للموسيقى العربية بما فيها ربع التون وقياسها وكيف تختلف عن الفترات الغربية.",
                  icon:"📐",
                },
                {
                  title_en:"Families & Relationships (Awa'el)",
                  title_ar:"العوائل والعلاقات المقامية",
                  desc_en:"How maqamat are related to each other, grouped into families, and how modulation (intiqal) works between related maqamat.",
                  desc_ar:"كيف ترتبط المقامات ببعضها وتتجمع في عوائل وكيف يعمل الانتقال بين المقامات المتقاربة.",
                  icon:"🌐",
                },
                {
                  title_en:"Musical Examples (Amthela)",
                  title_ar:"الأمثلة الموسيقية",
                  desc_en:"Practical examples from classical Arabic songs and compositions illustrating each maqam — from Oum Kalthoum to Fairouz.",
                  desc_ar:"أمثلة عملية من الأغاني والمقطوعات العربية الكلاسيكية — من أم كلثوم إلى فيروز.",
                  icon:"🎵",
                },
                {
                  title_en:"Improvisation (Ertijal)",
                  title_ar:"الارتجال الموسيقي",
                  desc_en:"The art of free improvisation (taqsim) within maqamat — how to express emotions freely within the rules of a maqam.",
                  desc_ar:"فن الارتجال الحر (التقسيم) في المقامات — كيف تعبّر عن المشاعر بحرية ضمن قواعد المقام.",
                  icon:"🎭",
                },
              ].map((topic: any, i: any) => (
                <div key={i} className="card" style={{ padding:24, display:"flex", gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:10, background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                      {isAr?topic.title_ar:topic.title_en}
                    </h3>
                    <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>
                      {isAr?topic.desc_ar:topic.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Theory pricing */}
            <div style={{ padding:"32px", borderRadius:16, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)" }}>
              <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                {isAr?"الأسعار — نظرية الموسيقى العربية":"Pricing — Arabic Music Theory"}
              </h3>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24 }}>
                {isAr
                  ? "جلستان أسبوعياً · 45 دقيقة · يشمل جلسة تقييم مجانية"
                  : "2 sessions/week · 45 min each · Includes free assessment session"}
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }} className="pricing-grid">
                {[
                  { label_en:"2 months",  label_ar:"شهران",        price:325, note_en:"8 sessions/month × 2 months",     note_ar:"8 جلسات/شهر × شهرين",      badge_en:"Minimum",  badge_ar:"الحد الأدنى" },
                  { label_en:"Beginner + Intermediate", label_ar:"مبتدئ + متوسط", price:650, note_en:"2 levels · 4 months", note_ar:"مستويان · 4 أشهر",            badge_en:"Recommended", badge_ar:"موصى به" },
                  { label_en:"All 3 levels", label_ar:"المستويات الثلاثة", price:975, note_en:"Complete journey · 6 months", note_ar:"رحلة كاملة · 6 أشهر", badge_en:"Best Value", badge_ar:"أفضل قيمة" },
                ].map((opt: any, i: any) => (
                  <div key={i} style={{ padding:20, borderRadius:12, background:"var(--ink-card)", border:`1.5px solid ${i===2?"rgba(201,168,76,0.3)":"var(--border)"}`, position:"relative" }}>
                    <span style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", fontSize:10, fontWeight:800, padding:"3px 12px", borderRadius:999, background: i===2?"var(--gold)":i===1?"#34d399":"var(--text-muted)", color:"#0A0A0A", whiteSpace:"nowrap" }}>
                      {isAr?opt.badge_ar:opt.badge_en}
                    </span>
                    <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:6, marginTop:8 }}>{isAr?opt.label_ar:opt.label_en}</p>
                    <div className="font-display" style={{ fontSize:30, fontWeight:800, color:"var(--cream)", marginBottom:4 }}>${opt.price}</div>
                    <p style={{ fontSize:11, color:"var(--text-muted)", marginBottom:14 }}>{isAr?opt.note_ar:opt.note_en}</p>
                    <Link href="/booking" className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:"9px", fontSize:12 }}>
                      {isAr?"احجز":"Book"}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── MANHEJ TAB ── */}
        {activeTab === "group" && (
          <div style={{ maxWidth:760 }}>
            <div style={{ marginBottom:40 }}>
              <h2 className="font-display" style={{ fontSize:36, fontWeight:400, color:"var(--cream)", marginBottom:12 }}>
                {isAr ? <>المنهج <span className="gradient-text" style={{fontWeight:800}}>المعتمد</span></> : <>Official <span className="gradient-text" style={{fontWeight:800}}>Curriculum</span></>}
              </h2>
              <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.8 }}>
                {isAr
                  ? "المنهج المعتمد لتعليم العود — من إعداد الأستاذ طارق الجندي. 8 مستويات متدرّجة من المبتدئ إلى المحترف."
                  : "The official Oud teaching curriculum — prepared by Professor Tareq Jundi. 8 progressive levels from beginner to professional."}
              </p>
            </div>

            {/* Manhej book photo */}
            <div className="card" style={{ overflow:"hidden", marginBottom:40 }}>
              <div style={{ position:"relative", width:"100%", aspectRatio:"4/3" }}>
                <Image
                  src="/manhej-oud.jpg"
                  alt="Oud Method by Tareq Jundi"
                  fill
                  style={{ objectFit:"cover" }}
onError={(e) => { (e.target as HTMLImageElement).src = "" }}
                />
                <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,#0d1117,#1a0a00)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:80, marginBottom:16 }}>🪘</div>
                    <p className="font-display" style={{ fontSize:22, color:"var(--gold)", marginBottom:4 }}>OUD METHOD</p>
                    <p style={{ fontSize:14, color:"var(--text-muted)" }}>منهج آلة العود</p>
                    <p style={{ fontSize:13, color:"var(--cream)", marginTop:8 }}>Tareq Jundi · طارق الجندي</p>
                    <div style={{ display:"flex", gap:6, justifyContent:"center", marginTop:16, flexWrap:"wrap" }}>
                      {[1,2,3,4,5,6,7,8].map((g: any) => (
                        <span key={g} style={{ fontSize:10, fontWeight:800, width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center",
                          background: g<=2?"#ef4444":g<=4?"#f97316":g<=6?"#22c55e":"#3b82f6",
                          color:"#fff"
                        }}>
                          {g}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ padding:24 }}>
                <h3 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                  {isAr?"OUD METHOD — منهج آلة العود":"OUD METHOD — منهج آلة العود"}
                </h3>
                <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7, marginBottom:16 }}>
                  {isAr
                    ? "المنهج الرسمي المعتمد لتعليم العود من إعداد الأستاذ طارق الجندي. يضم 8 مستويات متدرّجة تشمل التقنية والمقامات والأجناس والارتجال والمقطوعات الكلاسيكية."
                    : "The official certified Oud curriculum by Professor Tareq Jundi. 8 progressive grades covering technique, maqamat, ajnas, improvisation, and classical pieces."}
                </p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[
                    { en:"8 progressive grades",                ar:"8 مستويات متدرّجة"           },
                    { en:"Certified international curriculum",  ar:"منهج دولي معتمد"              },
                    { en:"Covers technique to mastery",         ar:"من التقنية إلى الإتقان"       },
                    { en:"Classical & contemporary pieces",     ar:"مقطوعات كلاسيكية ومعاصرة"    },
                    { en:"Arabic maqamat & theory",             ar:"مقامات عربية ونظرية موسيقية" },
                    { en:"Used in academies worldwide",         ar:"مستخدم في أكاديميات عالمية"  },
                  ].map((item: any, i: any) => (
                    <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", fontSize:13, color:"var(--text-muted)" }}>
                      <span style={{ color:"var(--gold)", flexShrink:0 }}>✓</span>
                      <span>{isAr?item.ar:item.en}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 8 Grades */}
            <h3 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:20 }}>
              {isAr?"المستويات الثمانية":"The 8 Grades"}
            </h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:40 }} className="grades-grid">
              {[
                { grade:1, color:"#ef4444", en:"Foundation",    ar:"الأساس",       desc_en:"Basic technique, posture, first notes",    desc_ar:"التقنية الأساسية والوضعية والنوتات الأولى" },
                { grade:2, color:"#f97316", en:"Elementary",    ar:"ابتدائي",      desc_en:"Scales, simple melodies, right hand patterns", desc_ar:"السلالم والألحان البسيطة وأنماط اليد اليمنى" },
                { grade:3, color:"#fbbf24", en:"Pre-Beginner",  ar:"ما قبل المتوسط",  desc_en:"First maqamat, simple improvisation",  desc_ar:"أولى المقامات والارتجال البسيط" },
                { grade:4, color:"#22c55e", en:"Beginner+",     ar:"مبتدئ متقدم",  desc_en:"Maqam depth, classical pieces",           desc_ar:"عمق المقامات والمقطوعات الكلاسيكية" },
                { grade:5, color:"#14b8a6", en:"Intermediate",  ar:"متوسط",        desc_en:"Advanced maqamat, ornaments, expression",  desc_ar:"مقامات متقدمة وزخارف وتعبير" },
                { grade:6, color:"#3b82f6", en:"Intermediate+", ar:"متوسط متقدم",  desc_en:"Free taqsim, modal modulation",            desc_ar:"التقسيم الحر والانتقال المقامي" },
                { grade:7, color:"#8b5cf6", en:"Advanced",      ar:"متقدم",        desc_en:"Professional repertoire, composition",     desc_ar:"ريبرتوار احترافي وتأليف موسيقي" },
                { grade:8, color:"#ec4899", en:"Mastery",       ar:"الإتقان",      desc_en:"Concert performance, original compositions", desc_ar:"الأداء الاحترافي والمقطوعات الأصلية" },
              ].map((g: any) => (
                <div key={g.grade} className="card" style={{ padding:16, borderTop:`3px solid ${g.color}` }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:g.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:"#fff", flexShrink:0 }}>
                      {g.grade}
                    </div>
                    <span style={{ fontSize:13, fontWeight:700, color:"var(--cream)" }}>
                      {isAr?g.ar:g.en}
                    </span>
                  </div>
                  <p style={{ fontSize:11, color:"var(--text-muted)", lineHeight:1.6 }}>
                    {isAr?g.desc_ar:g.desc_en}
                  </p>
                </div>
              ))}
            </div>

            {/* Manhej CTA */}
            <div style={{ padding:"28px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", textAlign:"center" }}>
              <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:20 }}>
                {isAr
                  ? "ابدأ رحلتك مع منهج طارق الجندي — احجز جلسة تقييم مجانية لتحديد مستواك"
                  : "Start your journey with Tareq Jundi's curriculum — book a free assessment to determine your level"}
              </p>
              <Link href="/booking" className="btn-gold" style={{ padding:"13px 36px", fontSize:15 }}>
                🎯 {isAr?"احجز جلسة التقييم المجانية":"Book Free Assessment Session"}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .pricing-grid { grid-template-columns: repeat(3,1fr); }
        .grades-grid  { grid-template-columns: repeat(4,1fr); }
        @media(max-width:900px) {
          .pricing-grid { grid-template-columns: 1fr !important; }
          .grades-grid  { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media(max-width:600px) {
          .grades-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
