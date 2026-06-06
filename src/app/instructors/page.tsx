"use client"

import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"
import Image from "next/image"

const INSTRUCTORS = [
  {
    name_en:"Ons Wafa Romdhani", name_ar:"أنس وفاء رمضاني",
    role_en:"Piano Instructor",   role_ar:"أستاذة البيانو",
    photo:"/ons.jpeg",
    rating:4.9, students:2042, totalCourses:5,
    instrument:"PIANO",
    bio_en:"Piano teacher and performer, graduate of the Higher Institute of Music — specialization: Music and Musicology. Holder of a professional performance card in piano. Holder of a diploma in Arabic Music. Holder of a training certificate in Music Therapy. Former accompanying pianist for the Symphony Orchestra of Tunisia. Experienced in teaching all age groups across various institutes in Tunisia.",
    bio_ar:"أستاذة وعازفة بيانو خريجة المعهد العالي للموسيقى – اختصاص: موسيقى وعلوم موسيقية. متحصّلة على بطاقة احتراف في العزف على آلة البيانو. متحصّلة على ديبلوم الموسيقى العربية. متحصّلة على شهادة تدريب في العلاج بالموسيقى (Music Therapy). عازفة بيانو مرافقة للأوركسترا السمفونيّة بتونس سابقاً. خبرة تدريس جميع الفئات العمريّة بمختلف المعاهد في تونس.",
    specialties_en:["Classical Piano","Arabic Music","Music Theory","Piano for Kids","Music Reading"],
    specialties_ar:["البيانو الكلاسيكي","الموسيقى العربية","نظرية الموسيقى","بيانو الأطفال","قراءة النوتة"],
    courses:[
      { slug:"piano-fundamentals", title_en:"Piano Fundamentals",  title_ar:"أساسيات البيانو",         level:"BEGINNER",     price:184 },
      { slug:"classical-piano",    title_en:"Classical Piano",      title_ar:"البيانو الكلاسيكي",       level:"ADVANCED",     price:334 },
      { slug:"arabic-piano",       title_en:"Arabic Piano",         title_ar:"البيانو العربي",           level:"INTERMEDIATE", price:296 },
      { slug:"piano-kids",         title_en:"Piano KIDS",           title_ar:"البيانو للأطفال",         level:"BEGINNER",     price:120 },
      { slug:"music-reading",      title_en:"Music Reading",        title_ar:"قراءة النوتة الموسيقية",  level:"BEGINNER",     price:99  },
    ],
    achievements_en:["Tunisian Symphony Orchestra accompanist","Music Therapy diploma","500+ students taught","Expert in Arabic-Western fusion"],
    achievements_ar:["عازفة مرافقة مع الأوركسترا التونسية","دبلوم العلاج بالموسيقى","أكثر من 500 طالب درّستهم","خبيرة في الدمج العربي الغربي"],
  },
  {
    name_en:"Omar Algour",       name_ar:"عمر الغور",
    role_en:"Oud Instructor",     role_ar:"أستاذ العود",
    photo:"/omar.jpeg",
    rating:4.8, students:1315, totalCourses:4,
    instrument:"OUD",
    bio_en:"Omar Algour is a professional Oud player, composer, and instructor with over 15 years of experience. He has performed in Germany, Switzerland, Norway and Iceland, bringing the beauty of Arabic music to international audiences. He teaches at Rawaee Academy and specializes in Arabic Maqam, Andalusian music traditions, and music composition using Sibelius notation software.",
    bio_ar:"عمر الغور عازف عود محترف ومؤلف موسيقي ومدرّس بأكثر من 15 سنة من الخبرة. قدّم عروضاً في ألمانيا وسويسرا والنرويج وآيسلندا، ليحمل جمال الموسيقى العربية للجماهير الدولية. يدرّس في أكاديمية روائع ومتخصص في المقامات العربية والموسيقى الأندلسية وتأليف الموسيقى باستخدام برنامج Sibelius.",
    specialties_en:["Arabic Maqam","Andalusian Music","Oud Technique","Music Composition","Harmony"],
    specialties_ar:["المقامات العربية","الموسيقى الأندلسية","تقنية العود","التأليف الموسيقي","الهارموني"],
    courses:[
      { slug:"arabic-maqam-oud", title_en:"Arabic Maqam & Oud",  title_ar:"المقامات العربية والعود", level:"INTERMEDIATE", price:259 },
      { slug:"oud-beginners",    title_en:"Oud for Beginners",    title_ar:"العود للمبتدئين",         level:"BEGINNER",     price:146 },
      { slug:"oud-advanced",     title_en:"Oud Advanced",         title_ar:"العود المتقدم",           level:"ADVANCED",     price:371 },
      { slug:"oud-harmony",      title_en:"Harmony for Oud",      title_ar:"الهارموني للعود",         level:"INTERMEDIATE", price:220 },
    ],
    achievements_en:["Performed in 4 European countries","Rawaee Academy instructor","Sibelius-certified composer","Arabic Maqam specialist"],
    achievements_ar:["عروض في 4 دول أوروبية","مدرّس أكاديمية روائع","مؤلف معتمد على Sibelius","متخصص في المقامات العربية"],
  },
]

const LEVEL_COLOR: Record<string,{bg:string;color:string;en:string;ar:string}> = {
  BEGINNER:     { bg:"rgba(52,211,153,0.1)",  color:"#34d399", en:"Beginner",     ar:"مبتدئ" },
  INTERMEDIATE: { bg:"rgba(251,191,36,0.1)",  color:"#fbbf24", en:"Intermediate", ar:"متوسط" },
  ADVANCED:     { bg:"rgba(248,113,113,0.1)", color:"#f87171", en:"Advanced",     ar:"متقدم" },
}

export default function InstructorsPage() {
  const { isAr } = useLang()

  return (
    <main style={{ minHeight:"100vh", background:"var(--ink)", paddingTop:80 }} dir={isAr?"rtl":"ltr"}>

      {/* Hero */}
      <section style={{ padding:"80px 0 64px", textAlign:"center", background:"linear-gradient(135deg,#080808,#0d1117,#080808)", borderBottom:"1px solid var(--border)" }}>
        <div className="container">
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.5 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "مدرّسونا" : "Our Instructors"}
            </span>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.5 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(36px,6vw,68px)", fontWeight:300, color:"var(--cream)", marginBottom:20 }}>
            {isAr
              ? <>تعلّم من <span className="gradient-text" style={{fontWeight:800}}>أفضل المدرّسين</span></>
              : <>Learn from the <span className="gradient-text" style={{fontWeight:800}}>finest</span></>}
          </h1>
          <p style={{ fontSize:17, color:"var(--text-muted)", maxWidth:560, margin:"0 auto", lineHeight:1.8 }}>
            {isAr
              ? "مدرّسونا محترفون حقيقيون — عازفون وملحّنون ومربّون بتجارب دولية واسعة."
              : "Our instructors are real professionals — performers, composers, and educators with extensive international experience."}
          </p>
        </div>
      </section>

      {/* Instructor profiles */}
      <div className="container" style={{ paddingTop:64, paddingBottom:80 }}>
        <div style={{ display:"flex", flexDirection:"column", gap:64 }}>
          {INSTRUCTORS.map((inst: any, idx: any) => (
            <div key={idx} style={{ display:"grid", gap:40, alignItems:"start" }} className="instructor-grid">

              {/* Left — Profile card */}
              <div className="card" style={{ overflow:"hidden", position:"sticky", top:100 }}>
                {/* Cover */}
                <div style={{
                  height:140,
                  background: inst.instrument==="PIANO"
                    ? "linear-gradient(135deg,#0d1117,#1a1a2e)"
                    : "linear-gradient(135deg,#0d1117,#1a0a00)",
                  position:"relative",
                }}>
                  <div style={{ position:"absolute", bottom:-40, left:"50%", transform:"translateX(-50%)" }}>
                    <div style={{ width:80, height:80, borderRadius:"50%", overflow:"hidden", border:"4px solid var(--gold)", background:"var(--ink)" }}>
                      <Image src={inst.photo} alt={inst.name_en} width={80} height={80} style={{ objectFit:"cover", objectPosition:"top" }}/>
                    </div>
                  </div>
                </div>

                <div style={{ paddingTop:52, padding:"52px 24px 24px", textAlign:"center" }}>
                  <h2 className="font-display" style={{ fontSize:22, fontWeight:700, color:"var(--cream)", marginBottom:4 }}>
                    {isAr ? inst.name_ar : inst.name_en}
                  </h2>
                  <p style={{ fontSize:14, color:"var(--gold-light)", marginBottom:16 }}>
                    {isAr ? inst.role_ar : inst.role_en}
                  </p>

                  {/* Stats */}
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:20, padding:"16px 0", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
                    {[
                      { value:inst.rating+"⭐", label_en:"Rating",   label_ar:"تقييم"  },
                      { value:inst.students,    label_en:"Students", label_ar:"طالب"   },
                      { value:inst.courses.length, label_en:"Courses",  label_ar:"دورات"  },
                    ].map((s: any, si: any) => (
                      <div key={si} style={{ textAlign:"center" }}>
                        <div className="font-display" style={{ fontSize:20, fontWeight:700, color:"var(--cream)" }}>{s.value}</div>
                        <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr?s.label_ar:s.label_en}</div>
                      </div>
                    ))}
                  </div>

                  {/* Specialties */}
                  <div style={{ display:"flex", gap:6, flexWrap:"wrap", justifyContent:"center", marginBottom:20 }}>
                    {(isAr?inst.specialties_ar:inst.specialties_en).map((s: any, si: any) => (
                      <span key={si} style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"var(--gold-pale)", color:"var(--gold)", border:"1px solid var(--border)" }}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <Link href="/courses" className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:"12px" }}>
                    {isAr ? "عرض الدورات" : "View Courses"}
                  </Link>
                </div>
              </div>

              {/* Right — Details */}
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>

                {/* Bio */}
                <div>
                  <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:16 }}>
                    {isAr ? "نبذة عن المدرّس" : "About the Instructor"}
                  </h3>
                  <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.9 }}>
                    {isAr ? inst.bio_ar : inst.bio_en}
                  </p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="font-display" style={{ fontSize:18, fontWeight:600, color:"var(--cream)", marginBottom:16 }}>
                    {isAr ? "الإنجازات" : "Achievements"}
                  </h3>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {(isAr?inst.achievements_ar:inst.achievements_en).map((a: any, ai: any) => (
                      <div key={ai} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"12px 16px", borderRadius:10, background:"var(--ink-soft)", border:"1px solid var(--border)" }}>
                        <span style={{ color:"var(--gold)", flexShrink:0, marginTop:1 }}>✓</span>
                        <span style={{ fontSize:13, color:"var(--text-muted)", lineHeight:1.5 }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Courses */}
                <div>
                  <h3 className="font-display" style={{ fontSize:18, fontWeight:600, color:"var(--cream)", marginBottom:16 }}>
                    {isAr ? "دوراتي" : "My Courses"}
                  </h3>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {inst.courses.map((c: any, ci: any) => {
                      const lc = LEVEL_COLOR[c.level]
                      return (
                        <Link key={ci} href={`/courses/${c.slug}`} style={{ textDecoration:"none" }}>
                          <div className="card" style={{ padding:"16px 20px", display:"flex", alignItems:"center", gap:16, transition:"all 0.2s" }}
                            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(201,168,76,0.3)"; (e.currentTarget as HTMLElement).style.transform="translateX(4px)" }}
                            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.transform="translateX(0)" }}>
                            <span style={{ fontSize:28, flexShrink:0 }}>
                              {inst.instrument==="PIANO"?"🎹":"🪕"}
                            </span>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                                {isAr ? c.title_ar : c.title_en}
                              </div>
                              <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:lc.bg, color:lc.color, fontWeight:600 }}>
                                {isAr ? lc.ar : lc.en}
                              </span>
                            </div>
                            <div style={{ textAlign: isAr?"left":"right", flexShrink:0 }}>
                              <div className="font-display" style={{ fontSize:18, fontWeight:700, color:"var(--cream)" }}>{c.price}</div>
                              <div style={{ fontSize:11, color:"var(--text-muted)" }}>USD</div>
                            </div>
                            <span style={{ color:"var(--gold)", fontSize:16 }}>→</span>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Join CTA */}
      <div style={{ background:"var(--ink-soft)", borderTop:"1px solid var(--border)", padding:"60px 0", textAlign:"center" }}>
        <div className="container">
          <h2 className="font-display" style={{ fontSize:32, fontWeight:600, color:"var(--cream)", marginBottom:12 }}>
            {isAr ? "هل أنت مدرّس موسيقى؟" : "Are you a music teacher?"}
          </h2>
          <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:28, maxWidth:480, margin:"0 auto 28px" }}>
            {isAr
              ? "انضم إلى فريق Pianoud وشارك شغفك مع طلاب من جميع أنحاء العالم."
              : "Join the Pianoud team and share your passion with students from around the world."}
          </p>
          <Link href="/contact" className="btn-gold" style={{ padding:"14px 36px", fontSize:15 }}>
            {isAr ? "تواصل معنا" : "Get in Touch"}
          </Link>
        </div>
      </div>

      <style>{`
        .instructor-grid { grid-template-columns: 320px 1fr; }
        @media(max-width: 900px) { .instructor-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
