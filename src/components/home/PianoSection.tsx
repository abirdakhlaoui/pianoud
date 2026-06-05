"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function PianoSection() {
  const { isAr } = useLang()

  return (
    <section style={{ background:"linear-gradient(135deg,#080808 0%,#0d1117 40%,#1a1a2e 70%,#080808 100%)", padding:"100px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">
        <div style={{ display:"grid", gap:64, alignItems:"center", gridTemplateColumns:"1fr 1fr" }} className="piano-section-grid">

          {/* Left */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
                {isAr ? "اكاديمية البيانو" : "Piano Academy"}
              </span>
            </div>

            <h2 className="font-display" style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:300, color:"var(--cream)", lineHeight:1.15, marginBottom:20 }}>
              {isAr
                ? <><span className="gradient-text" style={{fontWeight:800}}>البيانو</span> مع محترفين</>
                : <>Learn <span className="gradient-text" style={{fontWeight:800}}>Piano</span> with professionals</>}
            </h2>

            <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.9, marginBottom:32, maxWidth:480 }}>
              {isAr
                ? "دروس بيانو فردية مخصّصة — مبتدئ او متوسط او متقدم. ابدا بجلسة تقييم مجانية."
                : "Individual tailored Piano lessons — beginner, intermediate, or advanced. Start with a free assessment session."}
            </p>

            {/* Pricing preview */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:32 }}>
              {[
                { level_en:"4 Hours",  level_ar:"4 ساعات", price:"$220", desc_en:"1 month",  desc_ar:"شهر",   color:"#f87171" },
                { level_en:"8 Hours",  level_ar:"8 ساعات", price:"$400", desc_en:"2 months", desc_ar:"شهران", color:"#fbbf24" },
                { level_en:"16 Hours", level_ar:"16 ساعة", price:"$800", desc_en:"4 months", desc_ar:"4 أشهر", color:"#60a5fa" },
              ].map((p: any, i: any) => (
                <div key={i} style={{ padding:"16px 12px", borderRadius:12, background:"rgba(0,0,0,0.3)", border:"1px solid " + p.color + "30", textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:p.color, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>
                    {isAr ? p.level_ar : p.level_en}
                  </div>
                  <div className="font-display" style={{ fontSize:26, fontWeight:800, color:"var(--cream)" }}>{p.price}</div>
                  <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr ? p.desc_ar : p.desc_en}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:36 }}>
              {[
                { en:"Free 20-min assessment session",           ar:"جلسة تقييم مجانية 20 دقيقة"        },
                { en:"1-2 free classes + 20% promo code",        ar:"حصص مجانية + كود خصم 20%" },
                { en:"Classical, Arabic, Jazz & Kids Piano",     ar:"بيانو كلاسيكي وعربي وجاز وأطفال"  },
                { en:"Bilingual instruction (Arabic & English)", ar:"تدريس ثنائي اللغة"                  },
              ].map((f: any, i: any) => (
                <div key={i} style={{ display:"flex", gap:10, fontSize:14, color:"var(--text-muted)" }}>
                  <span style={{ color:"var(--gold)", flexShrink:0 }}>✓</span>
                  <span>{isAr ? f.ar : f.en}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link href="/piano" className="btn-gold" style={{ padding:"14px 32px", fontSize:15 }}>
                {isAr ? "استعرض دروس البيانو" : "Explore Piano Lessons"}
              </Link>
              <Link href="/booking?plan=assessment" className="btn-outline" style={{ padding:"14px 24px", fontSize:14 }}>
                {isAr ? "جلسة تقييم مجانية" : "Free Assessment"}
              </Link>
            </div>
          </div>

          {/* Right */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Piano visual card */}
            <div style={{ padding:"36px", borderRadius:20, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", textAlign:"center" }}>
              <svg width="160" height="100" viewBox="0 0 160 100" fill="none" style={{ margin:"0 auto 20px", display:"block" }}>
                <rect x="4" y="20" width="152" height="64" rx="6" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                {[12,32,52,72,92,112,132].map((x: any, i: any) => (
                  <rect key={i} x={x} y="26" width="16" height="52" rx="2" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.7"/>
                ))}
                {[22,42,82,102,122].map((x: any, i: any) => (
                  <rect key={i} x={x} y="26" width="10" height="32" rx="1.5" fill="#C9A84C" opacity="0.6"/>
                ))}
                <rect x="4" y="82" width="152" height="6" rx="2" fill="#C9A84C" opacity="0.15"/>
              </svg>
              <p className="font-display" style={{ fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                {isAr ? "البيانو — آلة الكلاسيكية" : "Piano — The Classical Instrument"}
              </p>
              <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>
                {isAr
                  ? "من الكلاسيكي إلى العربي والجاز — تعلّم البيانو بأسلوبك"
                  : "From classical to Arabic and Jazz — learn Piano your way"}
              </p>
            </div>

            {/* Courses types */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              {[
                { icon:"🎼", en:"Classical Piano",  ar:"بيانو كلاسيكي",  href:"/courses/classical-piano"    },
                { icon:"🌍", en:"Arabic Piano",     ar:"بيانو عربي",     href:"/courses/arabic-piano"        },
                { icon:"🎵", en:"Piano KIDS",       ar:"بيانو للأطفال",  href:"/courses/piano-kids"          },
                { icon:"📖", en:"Music Reading",    ar:"قراءة النوتة",   href:"/courses/music-reading"       },
              ].map((item: any, i: any) => (
                <Link key={i} href={item.href} style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 14px", borderRadius:10, background:"rgba(0,0,0,0.3)", border:"1px solid var(--border)", textDecoration:"none", transition:"all 0.2s" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor="rgba(201,168,76,0.3)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor="var(--border)"}>
                  <span style={{ fontSize:20 }}>{item.icon}</span>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{isAr ? item.ar : item.en}</span>
                </Link>
              ))}
            </div>

            {/* Free assessment card */}
            <div style={{ padding:"20px 24px", borderRadius:14, background:"rgba(52,211,153,0.06)", border:"1px solid rgba(52,211,153,0.2)", display:"flex", gap:14, alignItems:"center" }}>
              <span style={{ fontSize:28, flexShrink:0 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:2 }}>
                  {isAr ? "جلسة اعرف مستواك — مجانية" : "Know Your Level Session — Free"}
                </p>
                <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                  {isAr ? "20 دقيقة · بدون التزام · احجز الان" : "20 minutes · No commitment · Book now"}
                </p>
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"8px 16px", fontSize:12, flexShrink:0 }}>
                {isAr ? "احجز" : "Book"}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .piano-section-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:900px) { .piano-section-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
