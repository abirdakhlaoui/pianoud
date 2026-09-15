"use client"

import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"
import Image from "next/image"

const INSTRUCTORS = [
  {
    name_en:"Ons Wafa Romdhani", name_ar:"أنس الوفاء رمضاني",
    role_en:"Piano Instructor",   role_ar:"أستاذة البيانو",
    photo:"/ons.jpeg",
    rating:4.9, students:2042, totalCourses:5,
    instrument:"PIANO",
    bio_en:"Piano teacher and performer, graduate of the Higher Institute of Music — specialization: Music and Musicology. Holder of a professional performance card in piano. Holder of a diploma in Arabic Music. Holder of a training certificate in Music Therapy. Former accompanying pianist for the Symphony Orchestra. Experienced in teaching all age groups. Together, we started our online Piano and Oud project, and launched new subject programs to support students' musical development (Arabic music theory, music reading, and more) — and we are now expanding across the Gulf region.",
    bio_ar:"أستاذة وعازفة بيانو خريجة المعهد العالي للموسيقى – اختصاص: موسيقى وعلوم موسيقية. متحصّلة على بطاقة احتراف في العزف على آلة البيانو. متحصّلة على ديبلوم الموسيقى العربية. متحصّلة على شهادة تدريب في العلاج بالموسيقى (Music Therapy). خبرة تدريس جميع الفئات العمريّة. لنحكِ بصيغة الجمع: بدأنا مشروعنا أونلاين بيانو وعود، وأطلقنا برامج موادّ جديدة تفيد الطالب في تكوينه الموسيقي (نظريات موسيقى عربية، قراءة موسيقية، وغيرها)، ونعمل اليوم على التوسع نحو الخليج العربي.",
    specialties_en:["Classical Piano","Arabic Music","Music Theory","Piano for Kids","Music Reading"],
    specialties_ar:["البيانو الكلاسيكي","الموسيقى العربية","نظرية الموسيقى","بيانو الأطفال","قراءة النوتة"],
    courses:[
      { slug:"piano-fundamentals", title_en:"Piano",               title_ar:"البيانو",                  level:"BEGINNER",     price:220 },
      { slug:"classical-piano",    title_en:"Classical Piano",     title_ar:"البيانو الكلاسيكي",        level:"ADVANCED",     price:220 },
      { slug:"arabic-piano",       title_en:"Arabic Piano",        title_ar:"البيانو العربي",           level:"INTERMEDIATE", price:220 },
      { slug:"piano-kids",         title_en:"Piano for Kids",      title_ar:"البيانو للأطفال",          level:"BEGINNER",     price:220 },
      { slug:"music-reading",      title_en:"Reading & Rhythm",    title_ar:"القراءة والإيقاع",         level:"BEGINNER",     price:220 },
    ],
    achievements_en:["Graduate of the Higher Institute of Music","Professional piano performance card","Diploma in Arabic Music","Music Therapy training certificate","Former Symphony Orchestra of Tunisia accompanist"],
    achievements_ar:["خريجة المعهد العالي للموسيقى","بطاقة احتراف في العزف على البيانو","ديبلوم الموسيقى العربية","شهادة تدريب في العلاج بالموسيقى","عازفة مرافقة سابقاً للأوركسترا السمفونيّة بتونس"],
  },
  {
    name_en:"Omar Algour",       name_ar:"عمر القور",
    role_en:"Oud Instructor",     role_ar:"أستاذ العود",
    photo:"/omar.jpeg",
    rating:4.8, students:1315, totalCourses:4,
    instrument:"OUD",
    bio_en:"Omar Algour is a professional Oud player, composer, and instructor with over 15 years of experience. He has performed in Germany, Switzerland, Norway and Iceland, bringing the beauty of Arabic music to international audiences. He specializes in Arabic Maqam, Andalusian music traditions, and music composition using Sibelius notation software. Together, we started our online Piano and Oud project, and launched new subject programs to support students' musical development (Arabic music theory, music reading, and more) — and we are now expanding across the Gulf region.",
    bio_ar:"عمر القور عازف عود محترف ومؤلف موسيقي ومدرّس بأكثر من 15 سنة من الخبرة. قدّم عروضاً في ألمانيا وسويسرا والنرويج وآيسلندا، ليحمل جمال الموسيقى العربية للجماهير الدولية. متخصص في المقامات العربية والموسيقى الأندلسية وتأليف الموسيقى باستخدام برنامج Sibelius. لنحكِ بصيغة الجمع: بدأنا مشروعنا أونلاين بيانو وعود، وأطلقنا برامج موادّ جديدة تفيد الطالب في تكوينه الموسيقي (نظريات موسيقى عربية، قراءة موسيقية، وغيرها)، ونعمل اليوم على التوسع نحو الخليج العربي.",
    specialties_en:["Arabic Maqam","Andalusian Music","Oud Technique","Music Composition","Harmony"],
    specialties_ar:["المقامات العربية","الموسيقى الأندلسية","تقنية العود","التأليف الموسيقي","الهارموني"],
    courses:[
      { slug:"oud-beginners",    title_en:"Oud",                          title_ar:"العود",                       level:"BEGINNER",     price:220 },
      { slug:"music-theory-abrsm", title_en:"Music Theory ABRSM",            title_ar:"نظرية الموسيقى ABRSM",        level:"INTERMEDIATE", price:220 },
      { slug:"arabic-maqam-oud", title_en:"Arabic Music Theory / Maqamat", title_ar:"نظرية الموسيقى العربية / المقامات", level:"INTERMEDIATE", price:220 },
      { slug:"oud-advanced",     title_en:"Oud Advanced",                 title_ar:"العود المتقدم",               level:"ADVANCED",     price:220 },
      { slug:"oud-harmony",      title_en:"Harmony & Counterpoint",       title_ar:"الهارموني والكونتربوان",      level:"ADVANCED",     price:220 },
      { slug:"oud-kids",         title_en:"Oud for Kids",                 title_ar:"العود للأطفال",               level:"BEGINNER",     price:220 },
    ],
    achievements_en:["Performed in 4 European countries","Arab world instructor","Sibelius-certified composer","Arabic Maqam specialist"],
    achievements_ar:["عروض في 4 دول أوروبية","مدرّس العالم العربي","مؤلف معتمد على Sibelius","متخصص في المقامات العربية"],
  },
  {
    name_en:"Samer Haddad",      name_ar:"سامر حدّاد",
    role_en:"Classical Guitar Instructor", role_ar:"أستاذ الجيتار الكلاسيكي",
    photo:"/samer-haddad.jpeg",
    rating:4.9, students:0, totalCourses:0,
    instrument:"GUITAR",
    bio_en:"Samer Haddad is a classical guitar performer and instructor, holder of a Bachelor's degree in Music Science specializing in Classical Guitar, as well as a Master's degree in Guitar Teaching Methods. He has extensive experience teaching guitar at both academic and cultural levels, having taught at Yas Academy for two years, and worked for five years at the Princess Salma Center under the Jordanian Ministry of Culture. He was a specialized guitar instructor at the Academic University from 2011 to 2020, and a guitar instructor at the University of Jordan from 2012 to 2024. He has also taught guitar at numerous music institutes and centers, training students of all levels and age groups. Alongside his academic career, Samer has performed as a guitarist in many festivals, concerts, and musical events, and has collaborated with various bands and musicians on diverse artistic projects.",
    bio_ar:"سامر حدّاد عازف وأستاذ متخصص في آلة الجيتار الكلاسيكي، حاصل على درجة البكالوريوس في العلوم الموسيقية، تخصص الجيتار الكلاسيكي، بالإضافة إلى درجة الماجستير في أساليب تدريس آلة الجيتار. يمتلك خبرة طويلة في تدريس الجيتار على المستويين الأكاديمي والثقافي، حيث عمل أستاذًا للجيتار في أكاديمية ياس لمدة عامين، كما عمل في وزارة الثقافة الأردنية لمدة خمس سنوات في مركز الأميرة سلمى. وعمل أستاذًا متخصصًا في آلة الجيتار في الجامعة الأكاديمية من عام 2011 حتى عام 2020، بالإضافة إلى عمله أستاذًا للجيتار في الجامعة الأردنية من عام 2012 حتى عام 2024. كما عمل أستاذًا لآلة الجيتار في العديد من المعاهد والمراكز الموسيقية، وأسهم في تدريب وتعليم طلبة من مستويات وفئات عمرية مختلفة. وإلى جانب مسيرته الأكاديمية والتدريسية، شارك سامر حداد كعازف جيتار في العديد من المهرجانات والحفلات والفعاليات الموسيقية، كما تعاون وعزف مع عدد من الفرق والموسيقيين في مشاريع وتجارب فنية متنوعة.",
    specialties_en:["Classical Guitar","Guitar Teaching Methods","Performance","Music Education"],
    specialties_ar:["الجيتار الكلاسيكي","أساليب تدريس الجيتار","الأداء الموسيقي","التربية الموسيقية"],
    courses:[],
    achievements_en:["Bachelor's degree in Music Science — Classical Guitar","Master's degree in Guitar Teaching Methods","Guitar instructor at University of Jordan (2012–2024)","Guitar instructor at the Academic University (2011–2020)","Performed in numerous festivals and concerts"],
    achievements_ar:["بكالوريوس في العلوم الموسيقية — تخصص الجيتار الكلاسيكي","ماجستير في أساليب تدريس آلة الجيتار","أستاذ جيتار في الجامعة الأردنية (2012–2024)","أستاذ جيتار في الجامعة الأكاديمية (2011–2020)","شارك في العديد من المهرجانات والحفلات الموسيقية"],
  },
  {
    name_en:"Samer Al-Sayyed",   name_ar:"سامر السّيّد",
    role_en:"Clarinet Instructor", role_ar:"أستاذ الكلارينيت",
    photo:"/samer-sayyed.jpeg",
    rating:4.9, students:0, totalCourses:0,
    instrument:"CLARINET",
    bio_en:"A professional clarinet teacher and performer, holder of a Bachelor's and Master's degree in Music Performance, with academic and professional experience in orchestral teaching and performance. He offers specialized individual lessons aimed at developing technique, tone quality, sight-reading, and performance, while preparing and qualifying students for ABRSM exams at various levels, following a professional academic curriculum tailored to each student's goals.",
    bio_ar:"مدرّس وعازف كلارينيت محترف، حاصل على البكالوريوس والماجستير في الأداء الموسيقي، مع خبرة أكاديمية ومهنية في التعليم والأداء الأوركسترالي. يقدّم دروسًا فردية متخصصة تهدف إلى تطوير التقنية، جودة الصوت، القراءة الموسيقية والأداء، مع إعداد الطالب وتأهيله للتقدّم لامتحانات ABRSM بمختلف المستويات، وفق منهج أكاديمي احترافي ومناسب لأهداف كل طالب.",
    specialties_en:["Clarinet Performance","ABRSM Exam Preparation","Orchestral Performance","Sight-Reading"],
    specialties_ar:["أداء الكلارينيت","التحضير لامتحانات ABRSM","الأداء الأوركسترالي","القراءة الموسيقية"],
    courses:[],
    achievements_en:["Bachelor's degree in Music Performance","Master's degree in Music Performance","Academic and professional orchestral experience","ABRSM exam preparation specialist"],
    achievements_ar:["بكالوريوس في الأداء الموسيقي","ماجستير في الأداء الموسيقي","خبرة أكاديمية ومهنية في الأداء الأوركسترالي","متخصص في التحضير لامتحانات ABRSM"],
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
      <section style={{ padding:"80px 0 64px", textAlign:"center", background:"var(--ink-soft)", borderBottom:"1px solid var(--border)" }}>
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
                    ? "linear-gradient(135deg, rgba(96,165,250,0.12), rgba(96,165,250,0.04))"
                    : inst.instrument==="OUD"
                    ? "linear-gradient(135deg, rgba(184,137,59,0.12), rgba(184,137,59,0.04))"
                    : inst.instrument==="GUITAR"
                    ? "linear-gradient(135deg, rgba(52,211,153,0.12), rgba(52,211,153,0.04))"
                    : "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(167,139,250,0.04))",
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
                              {inst.instrument==="PIANO"?"🎹":inst.instrument==="OUD"?"🪕":inst.instrument==="GUITAR"?"🎸":"🎵"}
                            </span>
                            <div style={{ flex:1 }}>
                              <div style={{ fontSize:14, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                                {isAr ? c.title_ar : c.title_en}
                              </div>
                              <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:lc.bg, color:lc.color, fontWeight:600 }}>
                                {isAr ? lc.ar : lc.en}
                              </span>
                            </div>
                            <div style={{
                              flexShrink:0, display:"flex", alignItems:"center", gap:6,
                              padding:"6px 14px", borderRadius:999,
                              background:"var(--gold-pale)", border:"1px solid rgba(201,168,76,0.3)",
                            }}>
                              <span style={{ fontSize:12, fontWeight:700, color:"var(--gold)" }}>
                                {isAr ? "شاهد الدورة" : "View Course"}
                              </span>
                              <span style={{ color:"var(--gold)", fontSize:14 }}>{isAr ? "←" : "→"}</span>
                            </div>
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
