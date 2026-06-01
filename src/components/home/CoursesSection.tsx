"use client"

import { useState } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

function OudIcon({ size = 56 }: { size?: number }) {
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

function PianoIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <rect x="8" y="24" width="64" height="36" rx="4" fill="none" stroke="#C9A84C" strokeWidth="2"/>
      {[14,22,30,38,46,54,62].map((x,i) => (
        <rect key={i} x={x} y="30" width="6" height="24" rx="1" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.7"/>
      ))}
      {[18,26,42,50,58].map((x,i) => (
        <rect key={i} x={x} y="30" width="4" height="15" rx="1" fill="#C9A84C" opacity="0.6"/>
      ))}
    </svg>
  )
}

const COURSES = [
  { id:"1", slug:"piano-fundamentals", instrument:"PIANO", level:"BEGINNER",     price:184, rating:4.9, students:842,  lessons:36, bestseller:true,  title_en:"Piano Fundamentals",       title_ar:"أساسيات البيانو",          instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"2", slug:"arabic-maqam-oud",   instrument:"OUD",   level:"INTERMEDIATE", price:259, rating:4.8, students:631,  lessons:48, bestseller:true,  title_en:"Arabic Maqam & Oud",        title_ar:"المقامات العربية والعود",  instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"3", slug:"classical-piano",    instrument:"PIANO", level:"ADVANCED",     price:334, rating:4.7, students:412,  lessons:54, bestseller:false, title_en:"Classical Piano",           title_ar:"البيانو الكلاسيكي",        instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"4", slug:"oud-beginners",      instrument:"OUD",   level:"BEGINNER",     price:146, rating:4.9, students:1205, lessons:28, bestseller:true,  title_en:"Oud for Beginners",         title_ar:"العود للمبتدئين",          instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"5", slug:"arabic-piano",       instrument:"PIANO", level:"INTERMEDIATE", price:296, rating:4.6, students:318,  lessons:42, bestseller:false, title_en:"Arabic Piano",              title_ar:"البيانو العربي",           instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"6", slug:"oud-advanced",       instrument:"OUD",   level:"ADVANCED",     price:371, rating:4.8, students:204,  lessons:60, bestseller:false, title_en:"Oud Advanced",              title_ar:"العود المتقدم",            instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
  { id:"7", slug:"piano-kids",         instrument:"PIANO", level:"BEGINNER",     price:120, rating:5.0, students:530,  lessons:20, bestseller:true,  title_en:"Piano KIDS",                title_ar:"البيانو للأطفال",          instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"8", slug:"music-reading",      instrument:"PIANO", level:"BEGINNER",     price:99,  rating:4.8, students:720,  lessons:18, bestseller:false, title_en:"Music Reading",             title_ar:"قراءة النوتة الموسيقية",   instructor_en:"Ons Wafa Romdhani", instructor_ar:"أنس وفاء رمضاني" },
  { id:"9", slug:"oud-harmony",        instrument:"OUD",   level:"INTERMEDIATE", price:220, rating:4.7, students:280,  lessons:32, bestseller:false, title_en:"Harmony for Oud",           title_ar:"الهارموني للعود",          instructor_en:"Omar Algour",       instructor_ar:"عمر الغور" },
]

const LEVEL: Record<string,{en:string;ar:string;color:string;bg:string}> = {
  BEGINNER:     { en:"Beginner",     ar:"مبتدئ", color:"#34d399", bg:"rgba(52,211,153,0.1)"  },
  INTERMEDIATE: { en:"Intermediate", ar:"متوسط", color:"#fbbf24", bg:"rgba(251,191,36,0.1)"  },
  ADVANCED:     { en:"Advanced",     ar:"متقدم", color:"#f87171", bg:"rgba(248,113,113,0.1)" },
}

type Filter = "ALL"|"PIANO"|"OUD"

export default function CoursesSection() {
  const { isAr }            = useLang()
  const [filter, setFilter] = useState<Filter>("ALL")

  const filtered = filter === "ALL" ? COURSES : COURSES.filter(c => c.instrument === filter)

  return (
    <section className="section" dir={isAr?"rtl":"ltr"} style={{ background:"var(--ink)" }}>
      <div className="container">

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginBottom:48, flexWrap:"wrap", gap:24 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
              <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
                {isAr ? "دوراتنا" : "Our Courses"}
              </span>
            </div>
            <h2 className="font-display" style={{ fontSize:"clamp(36px,5vw,60px)", fontWeight:300, color:"var(--cream)", lineHeight:1.1 }}>
              {isAr
                ? <><span style={{fontWeight:800}} className="gradient-text">تعلّم</span> مع أفضل المدرسين</>
                : <>Learn from <span style={{fontWeight:800}} className="gradient-text">the finest</span></>}
            </h2>
          </div>
          <Link href="/courses" className="btn-outline" style={{ fontSize:13 }}>
            {isAr ? "جميع الدورات ←" : "All Courses →"}
          </Link>
        </div>

        {/* Filter tabs */}
        <div style={{ display:"flex", gap:8, marginBottom:40 }}>
          {([["ALL","All","الكل"],["PIANO","Piano","بيانو"],["OUD","Oud","عود"]] as const).map(([key,en,ar]) => (
            <button key={key} onClick={() => setFilter(key)} style={{
              padding:"9px 24px", borderRadius:999, fontSize:13, fontWeight:600, cursor:"pointer",
              border:"1px solid",
              borderColor: filter===key ? "var(--gold)" : "var(--border)",
              background: filter===key ? "linear-gradient(135deg,#E8CB7E,#C9A84C)" : "transparent",
              color: filter===key ? "#0A0A0A" : "var(--text-muted)",
              transition:"all 0.25s ease",
              boxShadow: filter===key ? "0 4px 16px rgba(201,168,76,0.3)" : "none",
            }}>
              {isAr ? ar : en}
            </button>
          ))}
        </div>

        {/* Grid — show first 6 only on homepage */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:24 }}>
          {filtered.slice(0, 6).map((course) => {
            const lv = LEVEL[course.level]
            return (
              <Link key={course.id} href={`/courses/${course.slug}`} style={{ textDecoration:"none" }}>
                <article style={{
                  background:"var(--ink-card)", border:"1px solid var(--border)", borderRadius:20,
                  overflow:"hidden", height:"100%", display:"flex", flexDirection:"column",
                  transition:"all 0.4s cubic-bezier(0.16,1,0.3,1)", cursor:"pointer",
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor="rgba(201,168,76,0.35)"
                    el.style.transform="translateY(-6px)"
                    el.style.boxShadow="0 24px 60px rgba(0,0,0,0.5)"
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.borderColor="var(--border)"
                    el.style.transform="translateY(0)"
                    el.style.boxShadow="none"
                  }}>

                  {/* Thumbnail */}
                  <div style={{
                    position:"relative", aspectRatio:"16/9",
                    background: course.instrument==="PIANO"
                      ? "linear-gradient(135deg,#0d1117 0%,#1a1a2e 50%,#0d1117 100%)"
                      : "linear-gradient(135deg,#0d1117 0%,#1a0a00 50%,#0d1117 100%)",
                    display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                  }}>
                    <div style={{ position:"absolute", inset:0, opacity:0.1, background:"repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(201,168,76,0.05) 20px,rgba(201,168,76,0.05) 21px)" }}/>
                    {course.instrument==="PIANO" ? <PianoIcon size={72}/> : <OudIcon size={72}/>}

                    <div style={{ position:"absolute", top:12, left:12 }}>
                      {course.bestseller && (
                        <span style={{ fontSize:10, fontWeight:800, padding:"4px 10px", borderRadius:6, background:"var(--gold)", color:"#0A0A0A" }}>
                          {isAr?"الأكثر مبيعاً":"BESTSELLER"}
                        </span>
                      )}
                    </div>
                    <div style={{ position:"absolute", top:12, right:12 }}>
                      <span style={{ fontSize:10, fontWeight:700, padding:"4px 10px", borderRadius:6, background:lv.bg, color:lv.color }}>
                        {isAr?lv.ar:lv.en}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding:"20px 22px 18px", display:"flex", flexDirection:"column", flex:1 }}>
                    <p style={{ fontSize:10, fontWeight:700, color: course.instrument==="PIANO"?"#60a5fa":"var(--gold)", letterSpacing:3, textTransform:"uppercase", marginBottom:8 }}>
                      {course.instrument==="PIANO"?(isAr?"بيانو":"Piano"):(isAr?"عود":"Oud")}
                    </p>
                    <h3 className="font-display" style={{ fontSize:18, fontWeight:600, color:"var(--cream)", lineHeight:1.3, marginBottom:6, flex:1 }}>
                      {isAr?course.title_ar:course.title_en}
                    </h3>
                    <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:12 }}>
                      {isAr?course.instructor_ar:course.instructor_en}
                    </p>
                    <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:14 }}>
                      {[1,2,3,4,5].map(s=>(
                        <span key={s} style={{ fontSize:11, color:s<=Math.floor(course.rating)?"var(--gold)":"var(--border)" }}>★</span>
                      ))}
                      <span style={{ fontSize:12, fontWeight:700, color:"var(--gold)", marginLeft:2 }}>{course.rating}</span>
                      <span style={{ fontSize:11, color:"var(--text-muted)" }}>({course.students.toLocaleString()})</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:12, borderTop:"1px solid var(--border)" }}>
                      <div>
                        <span className="font-display" style={{ fontSize:22, fontWeight:800, color:"var(--cream)" }}>{course.price}</span>
                        <span style={{ fontSize:12, color:"var(--text-muted)", marginLeft:4 }}>SAR</span>
                      </div>
                      <span style={{ fontSize:11, color:"var(--text-muted)" }}>{course.lessons} {isAr?"درس":"lessons"}</span>
                    </div>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <div style={{ textAlign:"center", marginTop:40 }}>
          <Link href="/courses" className="btn-outline" style={{ padding:"13px 40px", fontSize:14 }}>
            {isAr ? `عرض جميع الدورات (${COURSES.length}) →` : `View All Courses (${COURSES.length}) →`}
          </Link>
        </div>

      </div>
    </section>
  )
}
