"use client"

import Link from "next/link"
import { whatsappBookingLink, whatsappAssessmentLink } from "@/lib/whatsapp"
import AssessmentCalendar from "@/components/AssessmentCalendar"
import { useLang } from "@/components/providers/LangProvider"

const OPTIONS = [
  {
    id: "opt1", hours_en: "4 Hours", hours_ar: "4 ساعات",
    detail_en: "1 hour / week", detail_ar: "ساعة واحدة / أسبوع",
    duration_en: "1 month", duration_ar: "شهر واحد",
    price: 800, oldPrice: 1000, perks_en: ["Limited offer"], perks_ar: ["عرض محدود"], promo: false,
    color: "#f87171", bg: "rgba(248,113,113,0.08)", border: "rgba(248,113,113,0.3)",
    badge_en: "", badge_ar: "",
  },
  {
    id: "opt2", hours_en: "8 Hours", hours_ar: "8 ساعات",
    detail_en: "1 hour / week", detail_ar: "ساعة واحدة / أسبوع",
    duration_en: "2 months", duration_ar: "شهران",
    price: 1500, oldPrice: 2000, perks_en: ["Limited offer"], perks_ar: ["عرض محدود"], promo: false,
    color: "#fbbf24", bg: "rgba(251,191,36,0.08)", border: "rgba(251,191,36,0.3)",
    badge_en: "Popular", badge_ar: "الأكثر طلباً",
  },
  {
    id: "opt3", hours_en: "16 Hours", hours_ar: "16 ساعة",
    detail_en: "1 hour / week", detail_ar: "ساعة واحدة / أسبوع",
    duration_en: "4 months", duration_ar: "4 أشهر",
    price: 2900, oldPrice: 4000, perks_en: ["Limited offer"], perks_ar: ["عرض محدود"], promo: false,
    color: "#60a5fa", bg: "rgba(96,165,250,0.08)", border: "rgba(96,165,250,0.3)",
    badge_en: "Best Value", badge_ar: "أفضل قيمة",
  },
]

export default function OudKidsPage() {
  const { isAr } = useLang()

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr ? "rtl" : "ltr"}>

      <section style={{ padding:"80px 0 64px", background:"var(--ink)", borderBottom:"1px solid var(--border)", textAlign:"center" }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "للأطفال" : "For Kids"}
            </span>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(36px,6vw,72px)", fontWeight:300, color:"var(--cream)", marginBottom:16, lineHeight:1.1 }}>
            {isAr
              ? <>العود <span className="gradient-text" style={{fontWeight:800}}>للأطفال</span></>
              : <>Oud for <span className="gradient-text" style={{fontWeight:800}}>Kids</span></>}
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", maxWidth:600, margin:"0 auto 40px", lineHeight:1.8 }}>
            {isAr
              ? "دروس عود ممتعة ومصمّمة خصيصاً للأطفال مع مدرّس محترف. اختر الباقة التي تناسب طفلك."
              : "Fun Oud lessons designed especially for children with a professional instructor. Choose the package that fits your child."}
          </p>

          <AssessmentCalendar instrument="OUD" courseName="Oud for Kids" />
        </div>
      </section>

      <div className="container" style={{ paddingTop:64, paddingBottom:80 }}>
        <div style={{ textAlign:"center", marginBottom:48 }}>
          <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:400, color:"var(--cream)", marginBottom:12 }}>
            {isAr
              ? <>اختر <span className="gradient-text" style={{fontWeight:800}}>باقتك</span></>
              : <>Choose Your <span className="gradient-text" style={{fontWeight:800}}>Package</span></>}
          </h2>
          <p style={{ fontSize:15, color:"var(--text-muted)" }}>
            {isAr ? "ساعة واحدة لكل حصة · مدرّس محترف" : "1 hour per class · professional instructor"}
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, maxWidth:1000, margin:"0 auto" }} className="oudkids-pricing-grid">
          {OPTIONS.map((opt) => (
            <div key={opt.id} style={{ borderRadius:20, overflow:"hidden", border:"2px solid " + opt.border, background:"var(--ink-card)", display:"flex", flexDirection:"column", position:"relative" }}>
              {opt.badge_en && (
                <div style={{ padding:"8px 20px", background:opt.color, textAlign:"center" }}>
                  <span style={{ fontSize:12, fontWeight:800, color:"#0A0A0A", letterSpacing:1, textTransform:"uppercase" }}>
                    {isAr ? opt.badge_ar : opt.badge_en}
                  </span>
                </div>
              )}
              <div style={{ padding:"32px 28px", flex:1, display:"flex", flexDirection:"column", background: opt.bg }}>
                <h3 className="font-display" style={{ fontSize:28, fontWeight:800, color:opt.color, marginBottom:4 }}>
                  {isAr ? opt.hours_ar : opt.hours_en}
                </h3>
                <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:2 }}>
                  {isAr ? opt.detail_ar : opt.detail_en}
                </p>
                <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:20 }}>
                  {isAr ? "لمدة " + opt.duration_ar : "for " + opt.duration_en}
                </p>
                <div style={{ display:"flex", alignItems:"baseline", gap:10, marginBottom:20, flexWrap:"wrap" }}>
                  <span className="font-display" style={{ fontSize:40, fontWeight:800, color:"var(--cream)" }}>
                    {opt.price} <span style={{ fontSize:18, fontWeight:600 }}>{isAr ? "ر.س" : "SAR"}</span>
                  </span>
                  <span style={{ fontSize:18, color:"var(--text-muted)", textDecoration:"line-through" }}>
                    {opt.oldPrice} {isAr ? "ر.س" : "SAR"}
                  </span>
                </div>
                {opt.perks_en.length > 0 && (
                  <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:24 }}>
                    {(isAr ? opt.perks_ar : opt.perks_en).map((perk, pi) => (
                      <div key={pi} style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:"var(--cream)" }}>
                        <span style={{ color:opt.color, fontWeight:800 }}>✓</span>
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                )}
                {opt.promo && (
                  <div style={{ padding:"10px 14px", borderRadius:8, background:"rgba(201,168,76,0.1)", border:"1px dashed var(--gold)", marginBottom:24, textAlign:"center" }}>
                    <p style={{ fontSize:11, color:"var(--text-muted)", marginBottom:2 }}>
                      {isAr ? "كود الخصم" : "Discount code"}
                    </p>
                    <p className="font-display" style={{ fontSize:16, fontWeight:800, color:"var(--gold)", letterSpacing:1 }}>
                      oudsoloist
                    </p>
                  </div>
                )}
                <Link href={whatsappBookingLink("Oud for Kids", (isAr ? opt.hours_ar : opt.hours_en), opt.price, isAr)} target="_blank" style={{ marginTop:"auto", display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"14px", borderRadius:10, fontSize:15, fontWeight:700, textDecoration:"none", background:opt.color, color:"#0A0A0A" }}>
                  {isAr ? "احجز عبر واتساب" : "Book via WhatsApp"}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{".oudkids-pricing-grid { } @media(max-width:850px) { .oudkids-pricing-grid { grid-template-columns: 1fr !important; } }"}</style>
    </main>
  )
}
