"use client"

import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"
import Image from "next/image"

const STATS = [
  { value:"500+", en:"Students",        ar:"طالب"         },
  { value:"9",    en:"Courses",         ar:"دورة"         },
  { value:"2",    en:"Expert Teachers", ar:"مدرّس خبير"   },
  { value:"3",    en:"Countries",       ar:"دول"          },
]

const VALUES = [
  { icon:"🎯", en:"Excellence",    ar:"التميّز",       desc_en:"We deliver the highest quality music education, combining academic knowledge with practical experience.", desc_ar:"نقدّم أعلى جودة في تعليم الموسيقى، بجمع المعرفة الأكاديمية مع التجربة العملية." },
  { icon:"🌍", en:"Accessibility", ar:"إمكانية الوصول", desc_en:"Music education should be available to everyone, anywhere. Our online platform breaks geographic barriers.", desc_ar:"يجب أن يكون تعليم الموسيقى متاحاً للجميع في كل مكان. منصتنا تكسر الحواجز الجغرافية." },
  { icon:"🤝", en:"Community",     ar:"المجتمع",        desc_en:"Learning music is a journey best shared. We build a warm, supportive community of musicians.", desc_ar:"تعلّم الموسيقى رحلة أجمل ما فيها المشاركة. نبني مجتمعاً دافئاً وداعماً من الموسيقيين." },
  { icon:"💡", en:"Innovation",    ar:"الابتكار",       desc_en:"We combine traditional musical heritage with modern teaching methods and technology.", desc_ar:"نجمع بين التراث الموسيقي الأصيل وأساليب التدريس الحديثة والتكنولوجيا." },
]

const TIMELINE = [
  { year:"2020", en:"Pianoud Founded",         ar:"تأسيس Pianoud",           desc_en:"Started as a small online tutoring project in Tunis.", desc_ar:"بدأت كمشروع تدريس صغير عبر الإنترنت في تونس." },
  { year:"2021", en:"First 100 Students",      ar:"أول 100 طالب",            desc_en:"Reached our first milestone of 100 enrolled students.", desc_ar:"وصلنا إلى أول 100 طالب مسجّل." },
  { year:"2022", en:"Oud Program Launched",    ar:"إطلاق برنامج العود",       desc_en:"Omar Algour joined and we launched our Oud curriculum.", desc_ar:"انضم عمر الغور وأطلقنا منهج العود." },
  { year:"2023", en:"Expanded to Saudi Arabia",ar:"التوسع للسعودية",          desc_en:"Opened enrollment to students across the Arab world.", desc_ar:"فتحنا التسجيل للطلاب في جميع أنحاء العالم العربي." },
  { year:"2024", en:"500+ Students",           ar:"أكثر من 500 طالب",         desc_en:"Grew to a community of over 500 active music learners.", desc_ar:"نمونا لمجتمع يضم أكثر من 500 متعلّم موسيقى نشط." },
  { year:"2025", en:"New Platform Launch",     ar:"إطلاق المنصة الجديدة",     desc_en:"Launched our fully redesigned bilingual platform.", desc_ar:"أطلقنا منصتنا ثنائية اللغة المُعاد تصميمها بالكامل." },
]

export default function AboutPage() {
  const { isAr } = useLang()

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr?"rtl":"ltr"}>

      {/* ── HERO ── */}
      <section style={{
        padding:"100px 0 80px",
        background:"linear-gradient(135deg,#080808 0%,#0d1117 40%,#1a1a2e 70%,#080808 100%)",
        borderBottom:"1px solid var(--border)",
        textAlign:"center",
      }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:20 }}>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "قصتنا" : "Our Story"}
            </span>
            <div style={{ width:40, height:1, background:"var(--gold)", opacity:0.5 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(40px,7vw,80px)", fontWeight:300, color:"var(--cream)", lineHeight:1.1, marginBottom:24 }}>
            {isAr
              ? <>نحن <span className="gradient-text" style={{fontWeight:800}}>Pianoud</span></>
              : <>We are <span className="gradient-text" style={{fontWeight:800}}>Pianoud</span></>}
          </h1>
          <p style={{ fontSize:18, color:"var(--text-muted)", maxWidth:640, margin:"0 auto 48px", lineHeight:1.9 }}>
            {isAr
              ? "منصة تعليم الموسيقى الأولى عربياً — نجمع بين أصالة الموسيقى العربية وأساليب التدريس الحديثة لنقدّم تجربة تعلّم استثنائية."
              : "The leading online music academy for Arabic and English speakers — bridging authentic Arabic musical tradition with modern teaching methods for an exceptional learning experience."}
          </p>

          {/* Stats */}
          <div style={{ display:"flex", gap:48, justifyContent:"center", flexWrap:"wrap" }}>
            {STATS.map((stat: any, i: any) => (
              <div key={i} style={{ textAlign:"center" }}>
                <div className="font-display gradient-text" style={{ fontSize:48, fontWeight:800, lineHeight:1 }}>{stat.value}</div>
                <div style={{ fontSize:14, color:"var(--text-muted)", marginTop:6, fontWeight:500 }}>
                  {isAr ? stat.ar : stat.en}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MISSION ── */}
      <section style={{ padding:"80px 0", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:64, alignItems:"center" }} className="about-grid">
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
                {isAr ? "مهمتنا" : "Our Mission"}
              </p>
              <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:400, color:"var(--cream)", lineHeight:1.2, marginBottom:24 }}>
                {isAr
                  ? <>جعل الموسيقى <span className="gradient-text" style={{fontWeight:800}}>في متناول الجميع</span></>
                  : <>Making music <span className="gradient-text" style={{fontWeight:800}}>accessible to all</span></>}
              </h2>
              <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.9, marginBottom:16 }}>
                {isAr
                  ? "وُلدت Pianoud من شغف عميق بالموسيقى ورغبة صادقة في مشاركة هذا الجمال مع العالم. نؤمن بأن كل شخص — بغض النظر عن عمره أو موقعه أو مستواه — يستحق أن يتعلّم الموسيقى."
                  : "Pianoud was born from a deep passion for music and a genuine desire to share this beauty with the world. We believe that everyone — regardless of age, location, or level — deserves to learn music."}
              </p>
              <p style={{ fontSize:16, color:"var(--text-muted)", lineHeight:1.9 }}>
                {isAr
                  ? "من خلال منصتنا ثنائية اللغة، نقدّم دروس البيانو والعود بأعلى جودة أكاديمية، مع الحفاظ على دفء التعليم الشخصي وأصالة التراث الموسيقي العربي."
                  : "Through our bilingual platform, we deliver Piano and Oud lessons at the highest academic quality, while maintaining the warmth of personal teaching and the authenticity of Arabic musical heritage."}
              </p>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
              {VALUES.map((v: any, i: any) => (
                <div key={i} className="card" style={{ padding:24 }}>
                  <span style={{ fontSize:32, display:"block", marginBottom:12 }}>{v.icon}</span>
                  <h3 style={{ fontSize:15, fontWeight:700, color:"var(--cream)", marginBottom:8 }}>
                    {isAr ? v.ar : v.en}
                  </h3>
                  <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>
                    {isAr ? v.desc_ar : v.desc_en}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding:"80px 0", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
              {isAr ? "فريقنا" : "Our Team"}
            </p>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:400, color:"var(--cream)" }}>
              {isAr
                ? <>تعرّف على <span className="gradient-text" style={{fontWeight:800}}>مدرّسينا</span></>
                : <>Meet our <span className="gradient-text" style={{fontWeight:800}}>instructors</span></>}
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:32 }} className="team-grid">
            {[
              {
                name_en:"Ons Wafa Romdhani", name_ar:"أنس وفاء رمضاني",
                role_en:"Piano Instructor",   role_ar:"أستاذة البيانو",
                photo:"/ons.jpeg",
                bio_en:"Former accompanist with the Tunisian Symphony Orchestra. Holds a diploma in Music Therapy and extensive experience teaching piano to students of all ages and levels across Tunisia and Saudi Arabia.",
                bio_ar:"عازفة مرافقة سابقة مع الأوركسترا السيمفونية التونسية. حاملة دبلوم العلاج بالموسيقى وخبرة واسعة في تدريس البيانو لطلاب من جميع الأعمار والمستويات في تونس والمملكة العربية السعودية.",
                courses:["Piano Fundamentals","Classical Piano","Arabic Piano","Piano KIDS","Music Reading"],
                facts_en:["12+ years experience","Tunisian Symphony Orchestra","Music Therapy certified","Bilingual teaching (AR/EN)"],
                facts_ar:["أكثر من 12 سنة خبرة","أوركسترا تونسية سيمفونية","شهادة العلاج بالموسيقى","تدريس ثنائي اللغة"],
                instrument:"PIANO",
              },
              {
                name_en:"Omar Algour",         name_ar:"عمر الغور",
                role_en:"Oud Instructor",       role_ar:"أستاذ العود",
                photo:"/omar.jpeg",
                bio_en:"Professional Oud player and instructor with experience performing in Germany, Switzerland, Norway and Iceland. Teaches at Rawaee Academy and specializes in Arabic Maqam, Andalusian music, and music composition using Sibelius.",
                bio_ar:"عازف عود محترف ومدرّس بخبرة أداء في ألمانيا وسويسرا والنرويج وآيسلندا. يدرّس في أكاديمية روائع ومتخصص في المقامات العربية والموسيقى الأندلسية وتأليف الموسيقى باستخدام Sibelius.",
                courses:["Oud Beginners","Arabic Maqam & Oud","Oud Advanced","Harmony for Oud"],
                facts_en:["15+ years experience","Performed across Europe","Sibelius composer","Arabic Maqam specialist"],
                facts_ar:["أكثر من 15 سنة خبرة","عروض في أوروبا","مؤلف على Sibelius","متخصص في المقامات العربية"],
                instrument:"OUD",
              },
            ].map((instructor: any, i: any) => (
              <div key={i} className="card" style={{ overflow:"hidden" }}>
                {/* Header */}
                <div style={{
                  padding:32,
                  background: instructor.instrument==="PIANO"
                    ? "linear-gradient(135deg,#0d1117,#1a1a2e)"
                    : "linear-gradient(135deg,#0d1117,#1a0a00)",
                  display:"flex", gap:24, alignItems:"flex-start",
                }}>
                  <div style={{ width:100, height:100, borderRadius:"50%", overflow:"hidden", border:"3px solid var(--gold)", flexShrink:0 }}>
                    <Image src={instructor.photo} alt={instructor.name_en} width={100} height={100} style={{ objectFit:"cover", objectPosition:"top" }}/>
                  </div>
                  <div style={{ flex:1 }}>
                    <h3 className="font-display" style={{ fontSize:22, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                      {isAr ? instructor.name_ar : instructor.name_en}
                    </h3>
                    <p style={{ fontSize:14, color:"var(--gold-light)", marginBottom:16 }}>
                      {isAr ? instructor.role_ar : instructor.role_en}
                    </p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {(isAr ? instructor.facts_ar : instructor.facts_en).map((fact: any, fi: any) => (
                        <span key={fi} style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(201,168,76,0.1)", color:"var(--gold)", border:"1px solid rgba(201,168,76,0.2)" }}>
                          {fact}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div style={{ padding:28 }}>
                  <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.9, marginBottom:20 }}>
                    {isAr ? instructor.bio_ar : instructor.bio_en}
                  </p>

                  <p style={{ fontSize:12, fontWeight:700, color:"var(--cream)", marginBottom:12, textTransform:"uppercase", letterSpacing:1 }}>
                    {isAr ? "الدورات:" : "Courses:"}
                  </p>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:20 }}>
                    {instructor.courses.map((c: any, ci: any) => (
                      <span key={ci} style={{ fontSize:12, padding:"4px 12px", borderRadius:6, background:"var(--ink)", border:"1px solid var(--border)", color:"var(--text-muted)" }}>
                        {c}
                      </span>
                    ))}
                  </div>

                  <Link href="/instructors" className="btn-outline" style={{ fontSize:13, padding:"9px 20px" }}>
                    {isAr ? "عرض الملف الكامل" : "View Full Profile"}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section style={{ padding:"80px 0", borderBottom:"1px solid var(--border)" }}>
        <div className="container" style={{ maxWidth:800 }}>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
              {isAr ? "رحلتنا" : "Our Journey"}
            </p>
            <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:400, color:"var(--cream)" }}>
              {isAr
                ? <>من البداية <span className="gradient-text" style={{fontWeight:800}}>إلى اليوم</span></>
                : <>From the beginning <span className="gradient-text" style={{fontWeight:800}}>to today</span></>}
            </h2>
          </div>

          <div style={{ position:"relative" }}>
            {/* Vertical line */}
            <div style={{ position:"absolute", left: isAr?"auto":"24px", right: isAr?"24px":"auto", top:0, bottom:0, width:2, background:"linear-gradient(to bottom, var(--gold), transparent)", opacity:0.3 }}/>

            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              {TIMELINE.map((item: any, i: any) => (
                <div key={i} style={{ display:"flex", gap:24, alignItems:"flex-start", paddingLeft: isAr?0:64, paddingRight: isAr?64:0, position:"relative" }}>
                  {/* Dot */}
                  <div style={{
                    position:"absolute", left: isAr?"auto":"16px", right: isAr?"16px":"auto",
                    width:18, height:18, borderRadius:"50%",
                    background:"linear-gradient(135deg,#E8CB7E,#C9A84C)",
                    border:"3px solid var(--ink)",
                    top:4, flexShrink:0,
                  }}/>

                  <div className="card" style={{ padding:24, flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:8 }}>
                      <span style={{ fontSize:13, fontWeight:800, color:"var(--gold)", fontFamily:"var(--font-display)" }}>{item.year}</span>
                      <h3 style={{ fontSize:16, fontWeight:600, color:"var(--cream)" }}>
                        {isAr ? item.ar : item.en}
                      </h3>
                    </div>
                    <p style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.7 }}>
                      {isAr ? item.desc_ar : item.desc_en}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding:"80px 0", textAlign:"center" }}>
        <div className="container">
          <h2 className="font-display" style={{ fontSize:"clamp(28px,4vw,52px)", fontWeight:400, color:"var(--cream)", marginBottom:16 }}>
            {isAr
              ? <>هل أنت مستعد لبدء <span className="gradient-text" style={{fontWeight:800}}>رحلتك الموسيقية؟</span></>
              : <>Ready to start your <span className="gradient-text" style={{fontWeight:800}}>musical journey?</span></>}
          </h2>
          <p style={{ fontSize:16, color:"var(--text-muted)", maxWidth:500, margin:"0 auto 36px", lineHeight:1.8 }}>
            {isAr
              ? "انضم إلى مئات الطلاب الذين يتعلّمون البيانو والعود مع Pianoud."
              : "Join hundreds of students learning Piano and Oud with Pianoud."}
          </p>
          <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
            <Link href="/courses" className="btn-gold" style={{ padding:"16px 40px", fontSize:16 }}>
              {isAr ? "استعرض الدورات" : "Browse Courses"}
            </Link>
            <Link href="/contact" className="btn-outline" style={{ padding:"16px 32px", fontSize:15 }}>
              {isAr ? "تواصل معنا" : "Contact Us"}
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .about-grid { grid-template-columns: 1fr 1fr; }
        .team-grid  { grid-template-columns: 1fr 1fr; }
        @media(max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; }
          .team-grid  { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  )
}
