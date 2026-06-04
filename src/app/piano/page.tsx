"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const PLANS = [
  {
    level_en: "Beginner",
    level_ar: "مبتدئ",
    icon: "🌱",
    color: "#f87171",
    bg: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.3)",
    session_en: "45 min / session",
    session_ar: "45 دقيقة / جلسة",
    frequency_en: "2 sessions / week",
    frequency_ar: "جلستان / أسبوع",
    options: [
      { label_en:"Per session", label_ar:"جلسة واحدة", price:25,  note_en:"Pay as you go",  note_ar:"ادفع عند الحجز", badge_en:"", badge_ar:"" },
      { label_en:"1 month",     label_ar:"شهر واحد",   price:200, note_en:"8 sessions",     note_ar:"8 جلسات",       badge_en:"Save 20%", badge_ar:"وفر 20%" },
      { label_en:"16 sessions", label_ar:"16 جلسة",    price:375, note_en:"Best value",     note_ar:"افضل قيمة",     badge_en:"Popular",  badge_ar:"الاكثر طلبا" },
    ],
    combos: [],
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
      { label_en:"Per session", label_ar:"جلسة واحدة", price:50,  note_en:"Pay as you go",  note_ar:"ادفع عند الحجز", badge_en:"", badge_ar:"" },
      { label_en:"1 month",     label_ar:"شهر واحد",   price:200, note_en:"4 sessions",     note_ar:"4 جلسات",       badge_en:"Save 25%", badge_ar:"وفر 25%" },
      { label_en:"8 sessions",  label_ar:"8 جلسات",    price:375, note_en:"Best value",     note_ar:"افضل قيمة",     badge_en:"Popular",  badge_ar:"الاكثر طلبا" },
    ],
    combos: [],
  },
  {
    level_en: "Advanced",
    level_ar: "متقدم",
    icon: "🌳",
    color: "#60a5fa",
    bg: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.3)",
    session_en: "60 min / session",
    session_ar: "60 دقيقة / جلسة",
    frequency_en: "1 session / week",
    frequency_ar: "جلسة / أسبوع",
    options: [
      { label_en:"Per session", label_ar:"جلسة واحدة", price:75,  note_en:"Pay as you go",  note_ar:"ادفع عند الحجز", badge_en:"", badge_ar:"" },
      { label_en:"1 month",     label_ar:"شهر واحد",   price:300, note_en:"4 sessions",     note_ar:"4 جلسات",       badge_en:"Save 20%", badge_ar:"وفر 20%" },
      { label_en:"2 months",    label_ar:"شهران",      price:575, note_en:"8 sessions",     note_ar:"8 جلسات",       badge_en:"Best Deal",badge_ar:"افضل عرض" },
    ],
    combos: [],
  },
]

export default function PianoPage() {
  const { isAr } = useLang()
  const [activeTab, setActiveTab] = useState("individual")

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr ? "rtl" : "ltr"}>

      {/* HERO */}
      <section style={{ padding:"80px 0 64px", background:"linear-gradient(135deg,#080808 0%,#0d1117 50%,#080808 100%)", borderBottom:"1px solid var(--border)", textAlign:"center" }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "تعلم البيانو" : "Learn Piano"}
            </span>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(40px,7vw,80px)", fontWeight:300, color:"var(--cream)", marginBottom:16, lineHeight:1.1 }}>
            {isAr
              ? <><span className="gradient-text" style={{fontWeight:800}}>البيانو</span> الاكاديمي</>
              : <>The <span className="gradient-text" style={{fontWeight:800}}>Piano</span> Academy</>}
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", maxWidth:580, margin:"0 auto 40px", lineHeight:1.8 }}>
            {isAr
              ? "دروس بيانو فردية مخصصة لكل مستوى — مبتدئ او متوسط او متقدم. مع مدرسة محترفة."
              : "Individual Piano lessons tailored to every level — beginner, intermediate, or advanced. With a professional instructor."}
          </p>

          <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:8, padding:"24px 40px", borderRadius:16, background:"rgba(201,168,76,0.08)", border:"2px solid rgba(201,168,76,0.3)" }}>
            <div style={{ fontSize:32 }}>🎯</div>
            <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
              {isAr ? "لا تعرف مستواك؟" : "Don't know your level?"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:12 }}>
              {isAr ? "احجز جلسة تقييم مجانية (20 دقيقة) مع مدرستنا" : "Book a free 20-min assessment with our instructor"}
            </p>
            <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"12px 32px", fontSize:15 }}>
              🎵 {isAr ? "احجز جلسة التقييم المجانية" : "Book Free Assessment Session"}
            </Link>
            <p style={{ fontSize:11, color:"var(--text-muted)" }}>
              {isAr ? "مجاني — 20 دقيقة — بدون التزام" : "Completely free · 20 minutes · No commitment"}
            </p>
          </div>
        </div>
      </section>

      {/* TABS */}
      <div style={{ background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", position:"sticky", top:56, zIndex:10 }}>
        <div className="container">
          <div style={{ display:"flex" }}>
            {[
              { key:"individual", en:"One-by-One Lessons",    ar:"دروس فردية"        },
              { key:"courses",    en:"Online Courses",         ar:"الدورات الاونلاين"  },
              { key:"manhej",     en:"Piano Styles & Genres",  ar:"انواع البيانو"      },
            ].map((t: any) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding:"16px 24px", fontSize:14, fontWeight:600, cursor:"pointer", background:"transparent", border:"none", color: activeTab===t.key ? "var(--gold)" : "var(--text-muted)", borderBottom: activeTab===t.key ? "2px solid var(--gold)" : "2px solid transparent", transition:"all 0.2s", whiteSpace:"nowrap" }}>
                {isAr ? t.ar : t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop:48, paddingBottom:80 }}>

        {/* TAB 1 — INDIVIDUAL LESSONS */}
        {activeTab === "individual" && (
          <div>
            <div style={{ padding:"20px 28px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", marginBottom:48, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
              <span style={{ fontSize:28 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                  {isAr ? "جلسة اعرف مستواك — مجانية مع كل مستوى" : "Know Your Level session — FREE with every level"}
                </p>
                <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                  {isAr ? "تشمل كل خطة جلسة تقييم اولية مجانية 20 دقيقة." : "Every plan includes a free 20-minute initial assessment session."}
                </p>
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0 }}>
                {isAr ? "احجز الان" : "Book Now"}
              </Link>
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:48 }}>
              {PLANS.map((plan) => (
                <div key={plan.level_en}>
                  <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:24 }}>
                    <span style={{ fontSize:32 }}>{plan.icon}</span>
                    <div>
                      <h2 className="font-display" style={{ fontSize:28, fontWeight:700, color:plan.color, marginBottom:2 }}>
                        {isAr ? plan.level_ar : plan.level_en}
                      </h2>
                      <p style={{ fontSize:14, color:"var(--text-muted)" }}>
                        {isAr ? plan.session_ar : plan.session_en} · {isAr ? plan.frequency_ar : plan.frequency_en}
                      </p>
                    </div>
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom: plan.combos.length > 0 ? 24 : 0 }} className="pricing-grid">
                    {plan.options.map((opt: any, oi: any) => (
                      <div key={oi} style={{ padding:24, borderRadius:14, background: oi===2 ? plan.bg : "var(--ink-card)", border:"1.5px solid " + (oi===2 ? plan.border : "var(--border)"), position:"relative", display:"flex", flexDirection:"column" }}>
                        {opt.badge_en && (
                          <span style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", fontSize:10, fontWeight:800, padding:"3px 12px", borderRadius:999, background:plan.color, color:"#0A0A0A", whiteSpace:"nowrap" }}>
                            {isAr ? opt.badge_ar : opt.badge_en}
                          </span>
                        )}
                        <p style={{ fontSize:13, fontWeight:600, color:"var(--text-muted)", marginBottom:8 }}>
                          {isAr ? opt.label_ar : opt.label_en}
                        </p>
                        <div className="font-display" style={{ fontSize:36, fontWeight:800, color:"var(--cream)", marginBottom:4 }}>
                          {"$" + opt.price}
                        </div>
                        <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:16, flex:1 }}>
                          {isAr ? opt.note_ar : opt.note_en}
                        </p>
                        <Link href={"booking?plan=piano&price=" + opt.price} style={{ display:"flex", alignItems:"center", justifyContent:"center", padding:"10px", borderRadius:8, fontSize:13, fontWeight:600, textDecoration:"none", background: oi===2 ? plan.color : "transparent", color: oi===2 ? "#0A0A0A" : plan.color, border:"1px solid " + plan.border, transition:"all 0.2s" }}>
                          {isAr ? "احجز الان" : "Book Now"}
                        </Link>
                      </div>
                    ))}
                  </div>

                  {plan.combos.length > 0 && (
                    <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                      <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", letterSpacing:2, textTransform:"uppercase" }}>
                        {isAr ? "عروض الباقات" : "Bundle Offers"}
                      </p>
                      {plan.combos.map((combo: any, ci: any) => (
                        <div key={ci} style={{ padding:"18px 24px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
                          <div>
                            <p style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                              {isAr ? combo.label_ar : combo.label_en}
                            </p>
                            <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                              {combo.months} {isAr ? "اشهر" : "months"} · {isAr ? "يشمل تقييم مجاني" : "Includes free assessment"}
                            </p>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:16 }}>
                            <div className="font-display" style={{ fontSize:28, fontWeight:800, color:"var(--gold)" }}>
                              {"$" + combo.price}
                            </div>
                            <Link href={"booking?plan=piano-bundle&price=" + combo.price} className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0 }}>
                              {isAr ? "احجز" : "Book"}
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="gold-line" style={{ marginTop:40 }}/>
                </div>
              ))}
            </div>

            <div style={{ marginTop:48, padding:"32px 36px", borderRadius:16, background:"linear-gradient(135deg,rgba(201,168,76,0.1),rgba(201,168,76,0.05))", border:"1px solid rgba(201,168,76,0.25)", textAlign:"center" }}>
              <div style={{ fontSize:36, marginBottom:12 }}>⭐</div>
              <h3 className="font-display" style={{ fontSize:24, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                {isAr ? "عرض خاص — الباقة الشاملة" : "Special Offer — Complete Package"}
              </h3>
              <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:8, lineHeight:1.8 }}>
                {isAr ? "المستويات الثلاثة (مبتدئ + متوسط + متقدم) — 6 اشهر" : "All 3 levels (Beginner + Intermediate + Advanced) — 6-month journey"}
              </p>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:16, flexWrap:"wrap", marginBottom:20 }}>
                <div className="font-display gradient-text" style={{ fontSize:48, fontWeight:800 }}>$975</div>
                <div style={{ textAlign: isAr ? "right" : "left" }}>
                  <div style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"line-through" }}>$1,100</div>
                  <div style={{ fontSize:13, color:"#34d399", fontWeight:700 }}>{isAr ? "وفر 125 دولار" : "Save $125"}</div>
                </div>
              </div>
              <Link href="/booking?plan=piano-complete&price=975" className="btn-gold" style={{ padding:"14px 48px", fontSize:16 }}>
                {isAr ? "احجز الباقة الشاملة" : "Book Complete Package"}
              </Link>
              <p style={{ fontSize:12, color:"var(--text-muted)", marginTop:12 }}>
                {isAr ? "يشمل جلسة تقييم مجانية لكل مستوى" : "Includes free assessment session for each level"}
              </p>
            </div>
          </div>
        )}

        {/* TAB 2 — ONLINE COURSES */}
        {activeTab === "courses" && (
          <div>
            <h2 className="font-display" style={{ fontSize:28, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              {isAr ? "دورات البيانو الاونلاين" : "Online Piano Courses"}
            </h2>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:20 }}>
              {[
                { slug:"piano-fundamentals", en:"Piano Fundamentals",  ar:"اساسيات البيانو",     price:184, level:"BEGINNER",     icon:"🌱" },
                { slug:"classical-piano",    en:"Classical Piano",      ar:"البيانو الكلاسيكي",   price:334, level:"ADVANCED",     icon:"🎼" },
                { slug:"arabic-piano",       en:"Arabic Piano",         ar:"البيانو العربي",      price:296, level:"INTERMEDIATE", icon:"🌍" },
                { slug:"piano-kids",         en:"Piano KIDS",           ar:"البيانو للاطفال",     price:120, level:"BEGINNER",     icon:"🧒" },
                { slug:"music-reading",      en:"Music Reading",        ar:"قراءة النوتة",         price:99,  level:"BEGINNER",     icon:"📖" },
              ].map((course) => (
                <Link key={course.slug} href={"courses/" + course.slug} style={{ textDecoration:"none" }}>
                  <div className="card" style={{ padding:24, display:"flex", flexDirection:"column", gap:12, transition:"border-color 0.2s" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(201,168,76,0.4)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor="var(--border)"}>
                    <div style={{ fontSize:32 }}>{course.icon}</div>
                    <div style={{ fontSize:16, fontWeight:700, color:"var(--cream)" }}>
                      {isAr ? course.ar : course.en}
                    </div>
                    <div style={{ fontSize:12, color:"var(--text-muted)" }}>{course.level}</div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:"auto" }}>
                      <span className="font-display" style={{ fontSize:22, fontWeight:800, color:"var(--gold)" }}>${course.price}</span>
                      <span style={{ fontSize:12, color:"var(--gold)" }}>{isAr ? "عرض ←" : "View →"}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3 — PIANO STYLES */}
        {activeTab === "manhej" && (
          <div style={{ maxWidth:760 }}>
            <h2 className="font-display" style={{ fontSize:28, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              {isAr ? "انواع واساليب البيانو" : "Piano Styles & Genres"}
            </h2>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { icon:"🎼", en:"Classical Piano",          ar:"البيانو الكلاسيكي",       desc_en:"Bach, Mozart, Beethoven, Chopin — the foundation of all piano technique.",                         desc_ar:"باخ وموزارت وبيتهوفن وشوبان — اساس كل تقنيات البيانو." },
                { icon:"🌍", en:"Arabic Piano",             ar:"البيانو العربي",           desc_en:"Arabic maqamat applied to piano — play the music of Fairouz, Oum Kalthoum and more.",            desc_ar:"المقامات العربية على البيانو — العب موسيقى فيروز وام كلثوم وغيرهم." },
                { icon:"🎹", en:"Contemporary & Pop",      ar:"المعاصر والبوب",           desc_en:"Modern songs, film scores, and contemporary music — what you hear on the radio.",                  desc_ar:"الاغاني الحديثة والموسيقى التصويرية وما تسمعه يوميا." },
                { icon:"🧒", en:"Piano for Kids",          ar:"البيانو للاطفال",          desc_en:"Fun, engaging lessons designed specifically for children aged 5-12.",                              desc_ar:"دروس ممتعة مصممة خصيصا للاطفال من 5 الى 12 سنة." },
                { icon:"📖", en:"Music Reading (Solfege)", ar:"قراءة النوتة الموسيقية",   desc_en:"Learn to read and write sheet music — an essential skill for every serious musician.",             desc_ar:"تعلم قراءة النوتة الموسيقية وكتابتها — مهارة اساسية لكل موسيقي جاد." },
                { icon:"🎵", en:"Music Theory",            ar:"نظرية الموسيقى",           desc_en:"Harmony, scales, chords, and composition — understand how music works from the inside.",           desc_ar:"الهارموني والسلالم والاوتار والتأليف — افهم كيف تعمل الموسيقى من الداخل." },
              ].map((style: any, i: any) => (
                <div key={i} className="card" style={{ padding:24, display:"flex", gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:10, background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                    {style.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                      {isAr ? style.ar : style.en}
                    </h3>
                    <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>
                      {isAr ? style.desc_ar : style.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:32, textAlign:"center" }}>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"13px 40px", fontSize:15 }}>
                {isAr ? "احجز جلسة تقييم مجانية" : "Book Free Assessment Session"}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{".pricing-grid { grid-template-columns: repeat(3,1fr); } @media(max-width:900px) { .pricing-grid { grid-template-columns: 1fr !important; } }"}</style>
    </main>
  )
}
