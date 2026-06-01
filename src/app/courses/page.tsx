"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

function OudIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <ellipse cx="40" cy="52" rx="22" ry="26" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      <ellipse cx="40" cy="52" rx="14" ry="17" fill="none" stroke="#C9A84C" strokeWidth="1" opacity="0.4"/>
      <circle cx="40" cy="52" r="5" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
      <line x1="18" y1="52" x2="62" y2="52" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
      <line x1="18" y1="44" x2="62" y2="44" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
      <line x1="19" y1="60" x2="61" y2="60" stroke="#C9A84C" strokeWidth="0.8" opacity="0.3"/>
      <path d="M40 26 C40 26 38 18 36 12 C34 6 36 4 40 4 C44 4 46 6 44 12 C42 18 40 26 40 26Z" fill="none" stroke="#C9A84C" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="37" y="4" width="6" height="3" rx="1.5" fill="#C9A84C" opacity="0.8"/>
      <circle cx="34" cy="8" r="1.5" fill="#C9A84C" opacity="0.7"/>
      <circle cx="46" cy="8" r="1.5" fill="#C9A84C" opacity="0.7"/>
      <line x1="34" y1="8" x2="40" y2="26" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5"/>
      <line x1="46" y1="8" x2="40" y2="26" stroke="#C9A84C" strokeWidth="0.7" opacity="0.5"/>
    </svg>
  )
}

function PianoIcon({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="8" y="24" width="64" height="36" rx="4" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      {[14,22,30,38,46,54,62].map((x: any, i: any) => (
        <rect key={i} x={x} y="30" width="6" height="24" rx="1" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.7"/>
      ))}
      {[18,26,42,50,58].map((x: any, i: any) => (
        <rect key={i} x={x} y="30" width="4" height="15" rx="1" fill="#C9A84C" opacity="0.6"/>
      ))}
    </svg>
  )
}

const COURSES = [
  { id:"1", slug:"piano-fundamentals", instrument:"PIANO", level:"BEGINNER",     price:184, rating:4.9, students:842,  lessons:36, duration:"12h 30m", bestseller:true,  title_en:"Piano Fundamentals: From Zero to Advanced", title_ar:"أساسيات البيانو: من الصفر إلى المتقدم",  instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"2", slug:"arabic-maqam-oud",   instrument:"OUD",   level:"INTERMEDIATE", price:259, rating:4.8, students:631,  lessons:48, duration:"18h 00m", bestseller:true,  title_en:"Arabic Maqam & Oud Mastery",                title_ar:"المقامات العربية وإتقان العود",           instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"3", slug:"classical-piano",    instrument:"PIANO", level:"ADVANCED",     price:334, rating:4.7, students:412,  lessons:54, duration:"22h 15m", bestseller:false, title_en:"Classical Piano",                           title_ar:"البيانو الكلاسيكي",                       instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"4", slug:"oud-beginners",      instrument:"OUD",   level:"BEGINNER",     price:146, rating:4.9, students:1205, lessons:28, duration:"9h 45m",  bestseller:true,  title_en:"Oud for Beginners: First Steps",            title_ar:"العود للمبتدئين: الخطوات الأولى",         instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"5", slug:"arabic-piano",       instrument:"PIANO", level:"INTERMEDIATE", price:296, rating:4.6, students:318,  lessons:42, duration:"16h 00m", bestseller:false, title_en:"Arabic Piano",                              title_ar:"البيانو العربي",                          instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"6", slug:"oud-advanced",       instrument:"OUD",   level:"ADVANCED",     price:371, rating:4.8, students:204,  lessons:60, duration:"25h 30m", bestseller:false, title_en:"Oud Advanced",                              title_ar:"العود المتقدم",                           instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"7", slug:"piano-kids",         instrument:"PIANO", level:"BEGINNER",     price:120, rating:5.0, students:530,  lessons:20, duration:"7h 00m",  bestseller:true,  title_en:"Piano KIDS",                                title_ar:"البيانو للأطفال",                         instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"8", slug:"music-reading",      instrument:"PIANO", level:"BEGINNER",     price:99,  rating:4.8, students:720,  lessons:18, duration:"6h 30m",  bestseller:false, title_en:"Music Reading",                             title_ar:"قراءة النوتة الموسيقية",                  instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"10", slug:"music-theory-abrsm", instrument:"OUD", level:"INTERMEDIATE", price:245, rating:4.9, students:190, lessons:24, duration:"8h 30m", bestseller:false, title_en:"Music Theory ABRSM", title_ar:"نظرية الموسيقى ABRSM", instructor_en:"Omar Algour", instructor_ar:"عمر الغور" },
  { id:"9", slug:"oud-harmony",        instrument:"OUD",   level:"INTERMEDIATE", price:220, rating:4.7, students:280,  lessons:32, duration:"11h 00m", bestseller:false, title_en:"Harmony for Oud",                           title_ar:"الهارموني للعود",                         instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
]

const LEVEL_COLOR: Record<string,{bg:string;color:string;en:string;ar:string}> = {
  BEGINNER:     { bg:"rgba(52,211,153,0.1)",  color:"#34d399", en:"Beginner",     ar:"مبتدئ" },
  INTERMEDIATE: { bg:"rgba(251,191,36,0.1)",  color:"#fbbf24", en:"Intermediate", ar:"متوسط" },
  ADVANCED:     { bg:"rgba(248,113,113,0.1)", color:"#f87171", en:"Advanced",     ar:"متقدم" },
}

type Instrument = "ALL"|"PIANO"|"OUD"
type Level      = "ALL"|"BEGINNER"|"INTERMEDIATE"|"ADVANCED"
type Sort       = "popular"|"rating"|"price-low"|"price-high"

export default function CoursesPage() {
  const { isAr }                    = useLang()
  const [instrument, setInstrument] = useState<Instrument>("ALL")
  const [level, setLevel]           = useState<Level>("ALL")
  const [sort, setSort]             = useState<Sort>("popular")
  const [search, setSearch]         = useState("")

  let filtered = COURSES.filter((c: any) => {
    if (instrument !== "ALL" && c.instrument !== instrument) return false
    if (level !== "ALL" && c.level !== level)               return false
    if (search) {
      const q = search.toLowerCase()
      if (!c.title_en.toLowerCase().includes(q) && !c.title_ar.includes(q)) return false
    }
    return true
  })

  filtered = [...filtered].sort((a,b) => {
    if (sort==="popular")    return b.students - a.students
    if (sort==="rating")     return b.rating   - a.rating
    if (sort==="price-low")  return a.price    - b.price
    if (sort==="price-high") return b.price    - a.price
    return 0
  })

  const selectStyle: React.CSSProperties = {
    background:"var(--ink-card)", border:"1px solid var(--border)",
    borderRadius:8, color:"var(--cream)", fontSize:14,
    outline:"none", padding:"10px 14px", cursor:"pointer",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container">

        <div style={{ marginBottom:48 }}>
          <p style={{ fontSize:12, fontWeight:600, color:"var(--gold)", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>
            {isAr ? "جميع الدورات" : "All Courses"}
          </p>
          <h1 className="font-display" style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:400, color:"var(--cream)", marginBottom:8 }}>
            {isAr ? "تصفّح " : "Browse "}
            <span className="gradient-text" style={{ fontWeight:700 }}>{isAr ? "دوراتنا" : "our courses"}</span>
          </h1>
          <p style={{ color:"var(--text-muted)", fontSize:15 }}>
            {filtered.length} {isAr ? "دورة متاحة" : "courses available"}
          </p>
        </div>

        {/* Filters */}
        <div style={{ display:"flex", flexWrap:"wrap", gap:12, marginBottom:40, padding:20, background:"var(--ink-soft)", border:"1px solid var(--border)", borderRadius:12 }}>
          <input type="text" placeholder={isAr?"ابحث عن دورة...":"Search courses..."} value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ ...selectStyle, flex:1, minWidth:200 }}
            onFocus={e => e.target.style.borderColor="var(--gold)"}
            onBlur={e  => e.target.style.borderColor="var(--border)"} />
          <select value={instrument} onChange={e => setInstrument(e.target.value as Instrument)} style={selectStyle}>
            <option value="ALL">{isAr?"كل الآلات":"All Instruments"}</option>
            <option value="PIANO">{isAr?"بيانو":"Piano"}</option>
            <option value="OUD">{isAr?"عود":"Oud"}</option>
          </select>
          <select value={level} onChange={e => setLevel(e.target.value as Level)} style={selectStyle}>
            <option value="ALL">{isAr?"كل المستويات":"All Levels"}</option>
            <option value="BEGINNER">{isAr?"مبتدئ":"Beginner"}</option>
            <option value="INTERMEDIATE">{isAr?"متوسط":"Intermediate"}</option>
            <option value="ADVANCED">{isAr?"متقدم":"Advanced"}</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value as Sort)} style={selectStyle}>
            <option value="popular">{isAr?"الأكثر شعبية":"Most Popular"}</option>
            <option value="rating">{isAr?"الأعلى تقييماً":"Highest Rated"}</option>
            <option value="price-low">{isAr?"السعر: الأقل":"Price: Low to High"}</option>
            <option value="price-high">{isAr?"السعر: الأعلى":"Price: High to Low"}</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0" }}>
            <p style={{ fontSize:18, color:"var(--text-muted)" }}>{isAr?"لا توجد دورات.":"No courses found."}</p>
            <button onClick={() => { setSearch(""); setInstrument("ALL"); setLevel("ALL") }} className="btn-outline" style={{ marginTop:20 }}>
              {isAr?"إعادة تعيين":"Reset filters"}
            </button>
          </div>
        ) : (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
            {filtered.map((course: any) => {
              const lc = LEVEL_COLOR[course.level]
              return (
                <Link key={course.id} href={`/courses/${course.slug}`} style={{ textDecoration:"none" }}>
                  <article style={{
                    background:"var(--ink-card)", border:"1px solid var(--border)", borderRadius:20,
                    overflow:"hidden", height:"100%", display:"flex", flexDirection:"column",
                    transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)",
                  }}
                    onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="rgba(201,168,76,0.35)"; el.style.transform="translateY(-6px)"; el.style.boxShadow="0 24px 60px rgba(0,0,0,0.5)" }}
                    onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--border)"; el.style.transform="translateY(0)"; el.style.boxShadow="none" }}>

                    <div style={{
                      aspectRatio:"16/9",
                      background: course.instrument==="PIANO" ? "linear-gradient(135deg,#0d1117,#1a1a2e,#0d1117)" : "linear-gradient(135deg,#0d1117,#1a0a00,#0d1117)",
                      display:"flex", alignItems:"center", justifyContent:"center", position:"relative",
                    }}>
                      {course.instrument==="PIANO" ? <PianoIcon size={64}/> : <OudIcon size={64}/>}
                      <div style={{ position:"absolute", top:12, left:12 }}>
                        {course.bestseller && <span style={{ fontSize:10, fontWeight:800, padding:"4px 10px", borderRadius:6, background:"var(--gold)", color:"#0A0A0A" }}>{isAr?"الأكثر مبيعاً":"BESTSELLER"}</span>}
                      </div>
                      <div style={{ position:"absolute", top:12, right:12 }}>
                        <span style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:6, background:lc.bg, color:lc.color }}>{isAr?lc.ar:lc.en}</span>
                      </div>
                    </div>

                    <div style={{ padding:"22px 24px 20px", display:"flex", flexDirection:"column", flex:1 }}>
                      <p style={{ fontSize:10, fontWeight:700, color: course.instrument==="PIANO"?"#60a5fa":"var(--gold)", letterSpacing:3, textTransform:"uppercase", marginBottom:10 }}>
                        {course.instrument==="PIANO"?(isAr?"بيانو":"Piano"):(isAr?"عود":"Oud")}
                      </p>
                      <h3 className="font-display" style={{ fontSize:19, fontWeight:600, color:"var(--cream)", lineHeight:1.3, marginBottom:8, flex:1 }}>
                        {isAr?course.title_ar:course.title_en}
                      </h3>
                      <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:12 }}>
                        {isAr?course.instructor_ar:course.instructor_en}
                      </p>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                        {[1,2,3,4,5].map(s=>(
                          <span key={s} style={{ fontSize:12, color:s<=Math.floor(course.rating)?"var(--gold)":"var(--border)" }}>★</span>
                        ))}
                        <span style={{ fontSize:13, fontWeight:700, color:"var(--gold)" }}>{course.rating}</span>
                        <span style={{ fontSize:12, color:"var(--text-muted)" }}>({course.students.toLocaleString()})</span>
                      </div>
                      <div style={{ display:"flex", gap:16, fontSize:12, color:"var(--text-muted)", marginBottom:16 }}>
                        <span>📹 {course.lessons} {isAr?"درس":"lessons"}</span>
                        <span>⏱ {course.duration}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:14, borderTop:"1px solid var(--border)" }}>
                        <div>
                          <span className="font-display" style={{ fontSize:24, fontWeight:800, color:"var(--cream)" }}>{course.price}</span>
                          <span style={{ fontSize:13, color:"var(--text-muted)", marginLeft:4 }}>SAR</span>
                        </div>
                        <span style={{ fontSize:13, color:"var(--gold)", fontWeight:500 }}>{isAr?"عرض ←":"View →"}</span>
                      </div>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </main>
  )
}
