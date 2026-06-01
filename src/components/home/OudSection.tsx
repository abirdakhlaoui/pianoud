"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function OudSection() {
  const { isAr } = useLang()

  return (
    <section style={{ background:"linear-gradient(135deg,#080808 0%,#1a0a00 40%,#0d0500 70%,#080808 100%)", padding:"100px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="oud-section-grid">

          {/* Left — text */}
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
              <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
                {isAr?"أكاديمية العود":"Oud Academy"}
              </span>
            </div>

            <h2 className="font-display" style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:300, color:"var(--cream)", lineHeight:1.15, marginBottom:20 }}>
              {isAr
                ? <>تعلّم <span className="gradient-text" style={{fontWeight:800}}>العود</span> مع محترفين</>
                : <>Learn <span className="gradient-text" style={{fontWeight:800}}>Oud</span> with professionals</>}
            </h2>

            <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.9, marginBottom:32, maxWidth:480 }}>
              {isAr
                ? "دروس فردية مخصّصة — مبتدئ أو متوسط أو متقدم. منهج معتمد دولياً من إعداد الأستاذ طارق الجندي. ابدأ بجلسة تقييم مجانية."
                : "Individual tailored lessons — beginner, intermediate, or advanced. Internationally certified curriculum by Prof. Tareq Jundi. Start with a free assessment session."}
            </p>

            {/* Pricing preview */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:32 }}>
              {[
                { level_en:"Beginner",     level_ar:"مبتدئ",  price:"$25",  desc_en:"/session",  desc_ar:"/جلسة", color:"#34d399" },
                { level_en:"Intermediate", level_ar:"متوسط",  price:"$50",  desc_en:"/session",  desc_ar:"/جلسة", color:"#fbbf24" },
                { level_en:"Advanced",     level_ar:"متقدم",  price:"$75",  desc_en:"/session",  desc_ar:"/جلسة", color:"#f87171" },
              ].map((p,i) => (
                <div key={i} style={{ padding:"16px 12px", borderRadius:12, background:"rgba(0,0,0,0.3)", border:`1px solid ${p.color}30`, textAlign:"center" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:p.color, letterSpacing:1, textTransform:"uppercase", marginBottom:8 }}>
                    {isAr?p.level_ar:p.level_en}
                  </div>
                  <div className="font-display" style={{ fontSize:26, fontWeight:800, color:"var(--cream)" }}>{p.price}</div>
                  <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr?p.desc_ar:p.desc_en}</div>
                </div>
              ))}
            </div>

            {/* Features */}
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:36 }}>
              {[
                { en:"Free 20-min 'Know Your Level' assessment",  ar:"جلسة تقييم مجانية 20 دقيقة 'اعرف مستواك'" },
                { en:"Official Manhej by Prof. Tareq Jundi (8 grades)", ar:"المنهج الرسمي للأستاذ طارق الجندي (8 مستويات)" },
                { en:"Arabic Music Theory (Maqamat & Ajnas)",     ar:"نظرية الموسيقى العربية (مقامات وأجناس)" },
                { en:"Bundle packages — save up to $125",         ar:"باقات مجمّعة — وفّر حتى 125 دولار" },
              ].map((f,i) => (
                <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:14, color:"var(--text-muted)" }}>
                  <span style={{ color:"var(--gold)", flexShrink:0, marginTop:1 }}>✓</span>
                  <span>{isAr?f.ar:f.en}</span>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
              <Link href="/oud" className="btn-gold" style={{ padding:"14px 32px", fontSize:15 }}>
                {isAr?"استعرض دروس العود":"Explore Oud Lessons"}
              </Link>
              <Link href="/booking" className="btn-outline" style={{ padding:"14px 24px", fontSize:14 }}>
                🎯 {isAr?"جلسة تقييم مجانية":"Free Assessment"}
              </Link>
            </div>
          </div>

          {/* Right — visual */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Main oud card */}
            <div style={{ padding:"36px", borderRadius:20, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.2)", textAlign:"center" }}>
              {/* Oud SVG */}
              <svg width="120" height="160" viewBox="0 0 80 100" fill="none" style={{ margin:"0 auto 20px" }}>
                <ellipse cx="40" cy="68" rx="28" ry="30" fill="none" stroke="#C9A84C" strokeWidth="2"/>
                <ellipse cx="40" cy="68" rx="18" ry="20" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
                <circle cx="40" cy="68" r="6" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                <line x1="12" y1="68" x2="68" y2="68" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
                <line x1="14" y1="56" x2="66" y2="56" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
                <line x1="14" y1="80" x2="66" y2="80" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
                <path d="M40 38 C40 38 38 26 36 18 C34 10 36 7 40 7 C44 7 46 10 44 18 C42 26 40 38 40 38Z" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"/>
                <rect x="37" y="7" width="6" height="4" rx="2" fill="#C9A84C" opacity="0.8"/>
                <circle cx="33" cy="13" r="2" fill="#C9A84C" opacity="0.7"/>
                <circle cx="47" cy="13" r="2" fill="#C9A84C" opacity="0.7"/>
                <circle cx="31" cy="20" r="2" fill="#C9A84C" opacity="0.6"/>
                <circle cx="49" cy="20" r="2" fill="#C9A84C" opacity="0.6"/>
                <line x1="33" y1="13" x2="40" y2="38" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5"/>
                <line x1="47" y1="13" x2="40" y2="38" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5"/>
                <line x1="31" y1="20" x2="40" y2="38" stroke="#C9A84C" strokeWidth="0.7" opacity="0.4"/>
                <line x1="49" y1="20" x2="40" y2="38" stroke="#C9A84C" strokeWidth="0.7" opacity="0.4"/>
              </svg>
              <p className="font-display" style={{ fontSize:22, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                {isAr?"العود — آلة الروح":"Oud — The Soul Instrument"}
              </p>
              <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>
                {isAr
                  ? "أقدم آلة وترية في التاريخ — جوهر الموسيقى العربية والشرقية"
                  : "One of the oldest string instruments — the heart of Arabic music"}
              </p>
            </div>

            {/* Manhej preview card */}
            <div style={{ padding:"24px", borderRadius:16, background:"rgba(0,0,0,0.4)", border:"1px solid var(--border)", display:"flex", gap:16, alignItems:"center" }}>
              <div style={{ width:56, height:56, borderRadius:10, background:"linear-gradient(135deg,#ef4444,#f97316)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24, flexShrink:0 }}>
                📚
              </div>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                  OUD METHOD — منهج آلة العود
                </p>
                <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:8 }}>
                  {isAr?"الأستاذ طارق الجندي · 8 مستويات":"Prof. Tareq Jundi · 8 Grades"}
                </p>
                <div style={{ display:"flex", gap:4 }}>
                  {[1,2,3,4,5,6,7,8].map(g => (
                    <div key={g} style={{
                      width:20, height:20, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:8, fontWeight:800, color:"#fff",
                      background: g<=2?"#ef4444":g<=4?"#f97316":g<=6?"#22c55e":"#3b82f6"
                    }}>
                      {g}
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/oud?tab=group" style={{ fontSize:12, color:"var(--gold)", textDecoration:"none", flexShrink:0, fontWeight:600 }}>
                {isAr?"عرض →":"View →"}
              </Link>
            </div>

            {/* Free assessment card */}
            <div style={{ padding:"20px 24px", borderRadius:14, background:"rgba(52,211,153,0.06)", border:"1px solid rgba(52,211,153,0.2)", display:"flex", gap:14, alignItems:"center" }}>
              <span style={{ fontSize:28, flexShrink:0 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:2 }}>
                  {isAr?"جلسة 'اعرف مستواك' — مجانية":"'Know Your Level' Session — Free"}
                </p>
                <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                  {isAr?"20 دقيقة · بدون التزام · احجز الآن":"20 minutes · No commitment · Book now"}
                </p>
              </div>
              <Link href="/booking" className="btn-gold" style={{ padding:"8px 16px", fontSize:12, flexShrink:0 }}>
                {isAr?"احجز":"Book"}
              </Link>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        .oud-section-grid { grid-template-columns: 1fr 1fr; }
        @media(max-width:900px) { .oud-section-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}
