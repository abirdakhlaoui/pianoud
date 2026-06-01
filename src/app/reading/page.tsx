"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const TOPICS = [
  { icon:"🎼", title_en:"Clefs (Do, Fa, Sol)", title_ar:"المفاتيح الموسيقية (دو، فا، صول)", desc_en:"Master reading the three main clefs — Treble (Sol), Bass (Fa), and C (Do). Essential for reading any sheet music.", desc_ar:"إتقان قراءة المفاتيح الثلاثة الرئيسية — صول، فا، ودو. ضروري لقراءة أي نوتة موسيقية." },
  { icon:"🎵", title_en:"Solfège (Sight Singing)", title_ar:"السولفيج (الغناء بالقراءة)", desc_en:"Learn to sing notes by name (Do Re Mi Fa Sol La Si) at sight. Train your ear and voice.", desc_ar:"تعلّم غناء النوتات بأسمائها من النظرة الأولى. درّب أذنك وصوتك." },
  { icon:"✍️", title_en:"Musical Dictation (Written)", title_ar:"الإملاء الموسيقي الكتابي", desc_en:"Listen to melodies and write them in proper notation. Transcribe what you hear into written music.", desc_ar:"استمع إلى الألحان واكتبها بالنوتة الصحيحة. دوّن ما تسمعه إلى موسيقى مكتوبة." },
  { icon:"👂", title_en:"Oral & Ear Training", title_ar:"التدريب السمعي والشفهي", desc_en:"Recognize intervals, chords, and melodies by ear. Sharpen your musical hearing.", desc_ar:"التعرّف على الفترات والأوتار والألحان بالأذن. اشحذ سمعك الموسيقي." },
  { icon:"🎹", title_en:"Piano Dictation", title_ar:"الإملاء على البيانو", desc_en:"Apply dictation directly on the piano. Hear a passage and reproduce it on the keyboard.", desc_ar:"طبّق الإملاء مباشرة على البيانو. اسمع مقطعاً وأعد إنتاجه على لوحة المفاتيح." },
  { icon:"🥁", title_en:"Rhythm (Iqa'at)", title_ar:"الإيقاع", desc_en:"Master rhythmic reading and Arabic iqa'at. Read, count, and perform complex rhythmic patterns.", desc_ar:"إتقان القراءة الإيقاعية والإيقاعات العربية. اقرأ وعدّ وأدِّ الأنماط الإيقاعية." },
]

const LEVELS = [
  { num:1, en:"Level 1 — Foundation",          ar:"المستوى 1 — الأساس",        color:"#34d399" },
  { num:2, en:"Level 2 — Elementary",          ar:"المستوى 2 — ابتدائي",       color:"#22c55e" },
  { num:3, en:"Level 3 — Intermediate",        ar:"المستوى 3 — متوسط",         color:"#fbbf24" },
  { num:4, en:"Level 4 — Upper Intermediate",  ar:"المستوى 4 — متوسط متقدم",   color:"#f97316" },
  { num:5, en:"Level 5 — Advanced",            ar:"المستوى 5 — متقدم",         color:"#f87171" },
  { num:6, en:"Level 6 — Mastery",             ar:"المستوى 6 — الإتقان",       color:"#a78bfa" },
]

export default function ReadingPage() {
  const { isAr } = useLang()
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr?"rtl":"ltr"}>

      <section style={{ padding:"80px 0 64px", background:"linear-gradient(135deg,#080808 0%,#0a0d14 50%,#080808 100%)", borderBottom:"1px solid var(--border)", textAlign:"center" }}>
        <div className="container">
          <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
            {isAr ? "القراءة الموسيقية" : "Music Reading"}
          </p>
          <h1 className="font-display" style={{ fontSize:"clamp(40px,7vw,72px)", fontWeight:300, color:"var(--cream)", marginBottom:16, lineHeight:1.1 }}>
            {isAr
              ? <><span className="gradient-text" style={{fontWeight:800}}>القراءة</span> الموسيقية</>
              : <>Music <span className="gradient-text" style={{fontWeight:800}}>Reading</span></>}
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", maxWidth:600, margin:"0 auto 12px", lineHeight:1.9 }}>
            {isAr ? "تعلّم قراءة وكتابة النوتة الموسيقية — مهارة أساسية لكل موسيقي." : "Learn to read and write sheet music — an essential skill for every musician."}
          </p>
          <p style={{ fontSize:14, color:"var(--gold)", marginBottom:40 }}>
            {isAr ? "المفاتيح · السولفيج · الإملاء · التدريب السمعي · الإيقاع" : "Clefs · Solfège · Dictation · Ear Training · Rhythm"}
          </p>

          <div style={{ display:"inline-flex", flexDirection:"column", alignItems:"center", gap:10, padding:"24px 40px", borderRadius:16, background:"rgba(201,168,76,0.08)", border:"2px solid rgba(201,168,76,0.3)" }}>
            <div style={{ fontSize:32 }}>🎯</div>
            <h3 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
              {isAr ? "لا تعرف مستواك؟" : "Don't know your level?"}
            </h3>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:12 }}>
              {isAr ? "احجز جلسة تقييم مجانية" : "Book a free assessment session"}
            </p>
            <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"12px 32px", fontSize:15 }}>
              {isAr ? "احجز جلسة التقييم المجانية" : "Book Free Assessment Session"}
            </Link>
          </div>
        </div>
      </section>

      <div style={{ background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", position:"sticky", top:56, zIndex:10 }}>
        <div className="container">
          <div style={{ display:"flex" }}>
            {[
              { key:"overview", en:"What You Learn", ar:"ماذا ستتعلم" },
              { key:"levels",   en:"6 Levels",       ar:"6 مستويات"   },
              { key:"pricing",  en:"Pricing",        ar:"الأسعار"     },
            ].map((t: any) => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={{ padding:"16px 24px", fontSize:14, fontWeight:600, cursor:"pointer", background:"transparent", border:"none", color: activeTab===t.key ? "var(--gold)" : "var(--text-muted)", borderBottom: activeTab===t.key ? "2px solid var(--gold)" : "2px solid transparent", whiteSpace:"nowrap" }}>
                {isAr ? t.ar : t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop:48, paddingBottom:80 }}>

        {activeTab === "overview" && (
          <div style={{ maxWidth:760 }}>
            <h2 className="font-display" style={{ fontSize:28, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              {isAr ? "ماذا ستتعلم؟" : "What You'll Learn"}
            </h2>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:32, lineHeight:1.7 }}>
              {isAr ? "6 محاور أساسية في القراءة والكتابة الموسيقية." : "6 core pillars of music reading and writing."}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {TOPICS.map((topic: any, i: any) => (
                <div key={i} className="card" style={{ padding:24, display:"flex", gap:16 }}>
                  <div style={{ width:48, height:48, borderRadius:10, background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                    {topic.icon}
                  </div>
                  <div>
                    <h3 style={{ fontSize:17, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                      {isAr ? topic.title_ar : topic.title_en}
                    </h3>
                    <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7 }}>
                      {isAr ? topic.desc_ar : topic.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop:32, textAlign:"center" }}>
              <button onClick={() => setActiveTab("pricing")} className="btn-gold" style={{ padding:"13px 40px", fontSize:15 }}>
                {isAr ? "عرض الأسعار ←" : "View Pricing ←"}
              </button>
            </div>
          </div>
        )}

        {activeTab === "levels" && (
          <div style={{ maxWidth:760 }}>
            <h2 className="font-display" style={{ fontSize:28, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              {isAr ? "6 مستويات متدرّجة" : "6 Progressive Levels"}
            </h2>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:32, lineHeight:1.7 }}>
              {isAr ? "كل مستوى مدّته 3 أشهر · جلسة أسبوعياً · ساعة لكل جلسة." : "Each level lasts 3 months · 1 session/week · 1 hour each."}
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {LEVELS.map((level) => (
                <div key={level.num} className="card" style={{ padding:"20px 24px", display:"flex", alignItems:"center", gap:16, borderLeft:"3px solid " + level.color }}>
                  <div style={{ width:44, height:44, borderRadius:"50%", background:level.color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                    {level.num}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:16, fontWeight:700, color:"var(--cream)", marginBottom:2 }}>
                      {isAr ? level.ar : level.en}
                    </p>
                    <p style={{ fontSize:13, color:"var(--text-muted)" }}>
                      {isAr ? "3 أشهر · 12 جلسة · ساعة لكل جلسة" : "3 months · 12 sessions · 1 hour each"}
                    </p>
                  </div>
                  <Link href="/booking?plan=reading-level&price=575" className="btn-outline" style={{ padding:"8px 16px", fontSize:12, flexShrink:0 }}>
                    {isAr ? "احجز" : "Book"}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "pricing" && (
          <div>
            <div style={{ textAlign:"center", marginBottom:48 }}>
              <h2 className="font-display" style={{ fontSize:32, fontWeight:400, color:"var(--cream)", marginBottom:12 }}>
                {isAr
                  ? <><span className="gradient-text" style={{fontWeight:800}}>الأسعار</span> والخطط</>
                  : <>Pricing <span className="gradient-text" style={{fontWeight:800}}>& Plans</span></>}
              </h2>
              <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:6 }}>
                {isAr ? "6 مستويات · كل مستوى 3 أشهر · جلسة أسبوعياً · ساعة لكل جلسة" : "6 levels · Each level 3 months · 1 session/week · 1 hour each"}
              </p>
              <p style={{ fontSize:13, color:"var(--gold)" }}>
                {isAr ? "✓ كل خطة تشمل جلسة تقييم مجانية" : "✓ Every plan includes a free assessment session"}
              </p>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:20, maxWidth:720, margin:"0 auto 40px" }} className="reading-pricing">

              <div style={{ borderRadius:16, overflow:"hidden", border:"1.5px solid var(--border)", background:"var(--ink-card)", display:"flex", flexDirection:"column" }}>
                <div style={{ padding:"24px 24px 28px", flex:1, display:"flex", flexDirection:"column" }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>📅</div>
                  <h3 className="font-display" style={{ fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:6 }}>
                    {isAr ? "شهر واحد" : "1 Month"}
                  </h3>
                  <div className="font-display" style={{ fontSize:44, fontWeight:800, color:"var(--cream)", margin:"12px 0" }}>$200</div>
                  <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:6 }}>
                    {isAr ? "4 جلسات · ساعة لكل جلسة" : "4 sessions · 1 hour each"}
                  </p>
                  <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:20 }}>
                    {isAr ? "جلسة أسبوعياً" : "1 session per week"}
                  </p>
                  <Link href="/booking?plan=reading-month&price=200" className="btn-outline" style={{ justifyContent:"center", padding:"12px", fontSize:14, marginTop:"auto" }}>
                    {isAr ? "احجز الآن" : "Book Now"}
                  </Link>
                </div>
              </div>

              <div style={{ borderRadius:16, overflow:"hidden", border:"2px solid rgba(201,168,76,0.4)", background:"rgba(201,168,76,0.06)", display:"flex", flexDirection:"column", position:"relative" }}>
                <div style={{ padding:"8px 20px", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", textAlign:"center" }}>
                  <span style={{ fontSize:12, fontWeight:800, color:"#0A0A0A", letterSpacing:1 }}>
                    {isAr ? "أفضل قيمة — وفّر $25" : "Best Value — Save $25"}
                  </span>
                </div>
                <div style={{ padding:"24px 24px 28px", flex:1, display:"flex", flexDirection:"column" }}>
                  <div style={{ fontSize:32, marginBottom:12 }}>⭐</div>
                  <h3 className="font-display" style={{ fontSize:20, fontWeight:700, color:"var(--cream)", marginBottom:6 }}>
                    {isAr ? "باقة 3 أشهر (مستوى كامل)" : "3 Months Pack (Full Level)"}
                  </h3>
                  <div className="font-display" style={{ fontSize:44, fontWeight:800, color:"var(--cream)", margin:"12px 0" }}>$575</div>
                  <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:6 }}>
                    {isAr ? "12 جلسة · ساعة لكل جلسة" : "12 sessions · 1 hour each"}
                  </p>
                  <p style={{ fontSize:13, color:"var(--gold)", marginBottom:20 }}>
                    {isAr ? "مستوى كامل (3 أشهر)" : "One complete level (3 months)"}
                  </p>
                  <Link href="/booking?plan=reading-pack&price=575" className="btn-gold" style={{ justifyContent:"center", padding:"12px", fontSize:14, marginTop:"auto" }}>
                    {isAr ? "احجز الآن" : "Book Now"}
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ padding:"28px 32px", borderRadius:14, background:"rgba(52,211,153,0.06)", border:"1px solid rgba(52,211,153,0.25)", display:"flex", gap:20, alignItems:"center", flexWrap:"wrap", maxWidth:720, margin:"0 auto" }}>
              <span style={{ fontSize:36 }}>🎯</span>
              <div style={{ flex:1 }}>
                <p style={{ fontSize:16, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                  {isAr ? "جلسة تحديد المستوى — مجانية" : "Level Assessment Session — Free"}
                </p>
                <p style={{ fontSize:14, color:"var(--text-muted)" }}>
                  {isAr ? "احجز جلسة مجانية لتحديد مستواك المناسب." : "Book a free session to determine your level."}
                </p>
              </div>
              <Link href="/booking?plan=assessment" className="btn-gold" style={{ padding:"12px 24px", fontSize:14, flexShrink:0 }}>
                {isAr ? "احجز مجاناً" : "Book Free"}
              </Link>
            </div>
          </div>
        )}
      </div>

      <style>{".reading-pricing { } @media(max-width:700px) { .reading-pricing { grid-template-columns: 1fr !important; } }"}</style>
    </main>
  )
}
