"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const TOPICS = [
  { icon: "🎼", en: "Clefs (Do/Fa/Sol)", ar: "المفاتيح" },
  { icon: "🎵", en: "Solfège",            ar: "السولفيج" },
  { icon: "✍️", en: "Dictation",          ar: "الإملاء"  },
  { icon: "👂", en: "Ear Training",       ar: "السمع"    },
  { icon: "🎹", en: "Piano Dictation",    ar: "إملاء البيانو" },
  { icon: "🥁", en: "Rhythm (Iqa'at)",    ar: "الإيقاع"  },
]

export default function ReadingSection() {
  const { isAr } = useLang()

  return (
    <section style={{ background:"linear-gradient(135deg,#080808 0%,#0a0d14 50%,#080808 100%)", padding:"100px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">
        <div style={{ display:"grid", gap:64, alignItems:"center", gridTemplateColumns:"1fr 1fr" }} className="reading-section-grid">

          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
                {isAr ? "القراءة الموسيقية" : "Music Reading"}
              </span>
            </div>

            <h2 className="font-display" style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:300, color:"var(--cream)", lineHeight:1.15, marginBottom:16 }}>
              {isAr
                ? <><span className="gradient-text" style={{fontWeight:800}}>القراءة</span> الموسيقية</>
                : <>Music <span className="gradient-text" style={{fontWeight:800}}>Reading</span> & Solfège</>}
            </h2>

            <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.9, marginBottom:12 }}>
              {isAr
                ? "تعلّم قراءة وكتابة النوتة الموسيقية — المفاتيح، السولفيج، الإملاء، التدريب السمعي والإيقاع."
                : "Learn to read and write music — clefs, solfège, dictation, ear training, and rhythm."}
            </p>

            <p style={{ fontSize:14, color:"var(--gold)", marginBottom:28, lineHeight:1.7 }}>
              {isAr
                ? "6 مستويات · كل مستوى 3 أشهر · يبدأ من 200 دولار/شهر"
                : "1 hour/week · Packages from $220"}
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:10, marginBottom:28 }}>
              {[
                { label_en:"Per month",    label_ar:"شهرياً",      price:"$200", desc_en:"4 sessions", desc_ar:"4 جلسات",  color:"#34d399" },
                { label_en:"8 Hours", label_ar:"8 ساعات", price:"$400", desc_en:"2 months", desc_ar:"شهران", color:"#fbbf24" },
              ].map((p: any, i: any) => (
                <div key={i} style={{ padding:"14px 16px", borderRadius:10, background:"rgba(0,0,0,0.3)", border:"1px solid " + p.color + "30", textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:p.color, letterSpacing:1, textTransform:"uppercase", marginBottom:6 }}>
                    {isAr ? p.label_ar : p.label_en}
                  </div>
                  <div className="font-display" style={{ fontSize:24, fontWeight:800, color:"var(--cream)" }}>{p.price}</div>
                  <div style={{ fontSize:10, color:"var(--text-muted)" }}>{isAr ? p.desc_ar : p.desc_en}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link href="/reading" className="btn-gold" style={{ padding:"13px 28px", fontSize:15 }}>
                {isAr ? "استعرض المستويات والأسعار" : "Explore Levels & Pricing"}
              </Link>
              <Link href="/booking?plan=assessment" className="btn-outline" style={{ padding:"13px 20px", fontSize:13 }}>
                {isAr ? "جلسة تقييم مجانية" : "Free Assessment"}
              </Link>
            </div>
          </div>

          <div>
            <div style={{ padding:"28px", borderRadius:16, background:"rgba(201,168,76,0.04)", border:"1px solid rgba(201,168,76,0.15)", marginBottom:16 }}>
              <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", letterSpacing:2, textTransform:"uppercase", marginBottom:18, textAlign:"center" }}>
                {isAr ? "ماذا ستتعلم" : "What You Learn"}
              </p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {TOPICS.map((t: any, i: any) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:8, background:"rgba(0,0,0,0.3)", border:"1px solid var(--border)" }}>
                    <span style={{ fontSize:20 }}>{t.icon}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{isAr ? t.ar : t.en}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding:"18px 20px", borderRadius:12, background:"rgba(52,211,153,0.06)", border:"1px solid rgba(52,211,153,0.2)", display:"flex", gap:14, alignItems:"center" }}>
              <span style={{ fontSize:28, flexShrink:0 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:2 }}>
                  {isAr ? "جلسة تحديد المستوى — مجانية" : "Level Assessment — Free"}
                </p>
                <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                  {isAr ? "احجز لتحديد مستواك من بين 6 مستويات" : "Find your level among the 6 levels"}
                </p>
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"8px 16px", fontSize:12, flexShrink:0 }}>
                {isAr ? "احجز" : "Book"}
              </Link>
            </div>
          </div>

        </div>
      </div>
      <style>{".reading-section-grid { } @media(max-width:900px) { .reading-section-grid { grid-template-columns: 1fr !important; } }"}</style>
    </section>
  )
}
