"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const ALL_COURSES = [
  { slug:"piano-fundamentals", title_en:"Piano Fundamentals: From Zero to Advanced", title_ar:"أساسيات البيانو: من الصفر إلى المتقدم", instrument:"PIANO", level:"BEGINNER",     price:184, instructor:"Ons Wafa Romdhani" },
  { slug:"classical-piano",    title_en:"Classical Piano",                           title_ar:"البيانو الكلاسيكي",                       instrument:"PIANO", level:"ADVANCED",     price:334, instructor:"Ons Wafa Romdhani" },
  { slug:"arabic-piano",       title_en:"Arabic Piano",                              title_ar:"البيانو العربي",                          instrument:"PIANO", level:"INTERMEDIATE", price:296, instructor:"Ons Wafa Romdhani" },
  { slug:"piano-kids",         title_en:"Piano KIDS",                                title_ar:"البيانو للأطفال",                         instrument:"PIANO", level:"BEGINNER",     price:120, instructor:"Ons Wafa Romdhani" },
  { slug:"music-reading",      title_en:"Music Reading",                             title_ar:"قراءة النوتة الموسيقية",                  instrument:"PIANO", level:"BEGINNER",     price:99,  instructor:"Ons Wafa Romdhani" },
  { slug:"arabic-maqam-oud",   title_en:"Arabic Maqam & Oud Mastery",               title_ar:"المقامات العربية وإتقان العود",           instrument:"OUD",   level:"INTERMEDIATE", price:259, instructor:"Omar Algour" },
  { slug:"oud-beginners",      title_en:"Oud for Beginners",                         title_ar:"العود للمبتدئين",                         instrument:"OUD",   level:"BEGINNER",     price:146, instructor:"Omar Algour" },
  { slug:"oud-advanced",       title_en:"Oud Advanced",                              title_ar:"العود المتقدم",                           instrument:"OUD",   level:"ADVANCED",     price:371, instructor:"Omar Algour" },
  { slug:"oud-harmony",        title_en:"Harmony for Oud",                           title_ar:"الهارموني للعود",                         instrument:"OUD",   level:"INTERMEDIATE", price:220, instructor:"Omar Algour" },
]

function SearchContent() {
  const searchParams       = useSearchParams()
  const { isAr }           = useLang()
  const [query, setQuery]  = useState(searchParams.get("q") || "")
  const [results, setResults] = useState<typeof ALL_COURSES>([])

  useEffect(() => {
    if (!query.trim()) { setResults([]); return }
    const q   = query.toLowerCase()
    const res = ALL_COURSES.filter((c: any) =>
      c.title_en.toLowerCase().includes(q) ||
      c.title_ar.includes(q) ||
      c.instrument.toLowerCase().includes(q) ||
      c.level.toLowerCase().includes(q) ||
      c.instructor.toLowerCase().includes(q)
    )
    setResults(res)
  }, [query])

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:800 }}>

        <div style={{ marginBottom:40, textAlign:"center" }}>
          <h1 className="font-display" style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:400, color:"var(--cream)", marginBottom:24 }}>
            {isAr ? "ابحث في " : "Search "}
            <span className="gradient-text" style={{ fontWeight:800 }}>Pianoud</span>
          </h1>

          <div style={{ position:"relative", maxWidth:560, margin:"0 auto" }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder={isAr?"ابحث عن دورة، آلة، مستوى...":"Search for a course, instrument, level..."}
              autoFocus
              style={{ width:"100%", padding:"16px 24px", paddingRight:"50px", borderRadius:12, border:"2px solid var(--border)", background:"var(--ink-soft)", color:"var(--cream)", fontSize:16, outline:"none", transition:"border-color 0.2s" }}
              onFocus={e=>e.target.style.borderColor="var(--gold)"}
              onBlur={e =>e.target.style.borderColor="var(--border)"} />
            <span style={{ position:"absolute", right:18, top:"50%", transform:"translateY(-50%)", fontSize:20, opacity:0.5 }}>🔍</span>
          </div>
        </div>

        {/* Results */}
        {query.trim() === "" ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <p style={{ fontSize:15, color:"var(--text-muted)" }}>
              {isAr?"اكتب للبحث عن دوراتنا...":"Type to search our courses..."}
            </p>
            <div style={{ display:"flex", gap:10, justifyContent:"center", marginTop:20, flexWrap:"wrap" }}>
              {["Piano","Oud","Beginner","Advanced","Kids","Arabic"].map((tag: any) => (
                <button key={tag} onClick={() => setQuery(tag)} style={{ padding:"6px 16px", borderRadius:999, border:"1px solid var(--border)", background:"transparent", color:"var(--text-muted)", fontSize:13, cursor:"pointer" }}>
                  {tag}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div style={{ textAlign:"center", padding:"40px 0" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎵</div>
            <p style={{ fontSize:16, color:"var(--text-muted)" }}>
              {isAr?`لا نتائج لـ "${query}"`:`No results for "${query}"`}
            </p>
            <Link href="/courses" className="btn-outline" style={{ display:"inline-flex", marginTop:20 }}>
              {isAr?"تصفّح جميع الدورات":"Browse all courses"}
            </Link>
          </div>
        ) : (
          <>
            <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:20 }}>
              {results.length} {isAr?"نتيجة":"result(s)"} {isAr?"لـ":"for"} "{query}"
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              {results.map((course: any) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} style={{ textDecoration:"none" }}>
                  <div className="card" style={{ padding:22, display:"flex", alignItems:"center", gap:16 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor="rgba(201,168,76,0.3)" }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)" }}>
                    <div style={{ width:48, height:48, borderRadius:10, background: course.instrument==="PIANO"?"linear-gradient(135deg,#0d1117,#1a1a2e)":"linear-gradient(135deg,#0d1117,#1a0a00)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                      {course.instrument==="PIANO"?"🎹":"🪘"}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                        {isAr?course.title_ar:course.title_en}
                      </div>
                      <div style={{ fontSize:13, color:"var(--text-muted)" }}>
                        {course.instructor} • {course.level} • {course.instrument}
                      </div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <div className="font-display" style={{ fontSize:20, fontWeight:700, color:"var(--cream)" }}>{course.price}</div>
                      <div style={{ fontSize:11, color:"var(--text-muted)" }}>USD</div>
                    </div>
                    <span style={{ color:"var(--gold)", fontSize:16 }}>→</span>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  )
}
