"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

const COURSES: Record<string, any> = {
  "piano-fundamentals": {
    title_en:"Piano Fundamentals: From Zero to Advanced",
    title_ar:"أساسيات البيانو: من الصفر إلى المتقدم",
    sections:[
      { title_en:"Getting Started", title_ar:"البداية", lessons:[
        { id:"pf-l1", title_en:"Welcome & Course Overview", title_ar:"مرحباً ونظرة عامة",    duration:"5:00",  videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"pf-l2", title_en:"Understanding the Piano",   title_ar:"فهم البيانو",           duration:"12:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"pf-l3", title_en:"Hand Position & Posture",   title_ar:"وضع اليدين والجلسة",    duration:"15:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"pf-l4", title_en:"Your First Notes",          title_ar:"أولى نوتاتك",           duration:"18:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
      { title_en:"Music Reading", title_ar:"قراءة النوتة", lessons:[
        { id:"pf-l5", title_en:"The Musical Staff",         title_ar:"المدرج الموسيقي",       duration:"18:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"pf-l6", title_en:"Note Names & Values",       title_ar:"أسماء وقيم النوتات",    duration:"20:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
      { title_en:"Scales & Chords", title_ar:"السلالم والأوتار", lessons:[
        { id:"pf-l7", title_en:"C Major Scale",             title_ar:"سلّم دو الكبير",        duration:"16:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"pf-l8", title_en:"Basic Chords",              title_ar:"الأوتار الأساسية",      duration:"24:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"pf-l9", title_en:"Chord Progressions",        title_ar:"تسلسل الأوتار",         duration:"28:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "arabic-maqam-oud": {
    title_en:"Arabic Maqam & Oud Mastery",
    title_ar:"المقامات العربية وإتقان العود",
    sections:[
      { title_en:"Maqam Fundamentals", title_ar:"أساسيات المقام", lessons:[
        { id:"am-l1", title_en:"What is a Maqam?",          title_ar:"ما هو المقام؟",         duration:"10:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"am-l2", title_en:"Maqam Rast",                title_ar:"مقام الراست",           duration:"25:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"am-l3", title_en:"Maqam Bayati",              title_ar:"مقام البياتي",          duration:"28:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
      { title_en:"Advanced Maqamat", title_ar:"المقامات المتقدمة", lessons:[
        { id:"am-l4", title_en:"Maqam Hijaz",               title_ar:"مقام الحجاز",           duration:"30:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"am-l5", title_en:"Maqam Saba",                title_ar:"مقام الصبا",            duration:"32:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "oud-beginners": {
    title_en:"Oud for Beginners: First Steps",
    title_ar:"العود للمبتدئين: الخطوات الأولى",
    sections:[
      { title_en:"Introduction", title_ar:"مقدمة", lessons:[
        { id:"ob-l1", title_en:"About the Oud",             title_ar:"عن العود",              duration:"8:00",  videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"ob-l2", title_en:"Holding & Posture",         title_ar:"الإمساك والوضعية",      duration:"14:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"ob-l3", title_en:"Right Hand Basics",         title_ar:"أساسيات اليد اليمنى",  duration:"18:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "classical-piano": {
    title_en:"Classical Piano",
    title_ar:"البيانو الكلاسيكي",
    sections:[
      { title_en:"Advanced Technique", title_ar:"التقنية المتقدمة", lessons:[
        { id:"cp-l1", title_en:"Finger Independence",       title_ar:"استقلالية الأصابع",    duration:"20:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"cp-l2", title_en:"Octave Technique",          title_ar:"تقنية الأوكتاف",        duration:"22:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"cp-l3", title_en:"Trills & Ornaments",        title_ar:"الزخارف الموسيقية",     duration:"25:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "arabic-piano": {
    title_en:"Arabic Piano",
    title_ar:"البيانو العربي",
    sections:[
      { title_en:"Arabic Music on Piano", title_ar:"الموسيقى العربية على البيانو", lessons:[
        { id:"ap-l1", title_en:"Arabic Scales on Piano",    title_ar:"السلالم العربية على البيانو", duration:"20:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"ap-l2", title_en:"Maqam Rast on Piano",       title_ar:"مقام الراست على البيانو",    duration:"25:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"ap-l3", title_en:"First Arabic Song",         title_ar:"أول أغنية عربية",            duration:"30:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "piano-kids": {
    title_en:"Piano KIDS",
    title_ar:"البيانو للأطفال",
    sections:[
      { title_en:"Hello Piano!", title_ar:"أهلاً بالبيانو!", lessons:[
        { id:"pk-l1", title_en:"Meet the Piano",            title_ar:"تعرّف على البيانو",     duration:"8:00",  videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"pk-l2", title_en:"My First Notes",            title_ar:"أولى نوتاتي",           duration:"10:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"pk-l3", title_en:"Play a Kids Song",          title_ar:"عزف أغنية أطفال",       duration:"12:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "music-reading": {
    title_en:"Music Reading",
    title_ar:"قراءة النوتة الموسيقية",
    sections:[
      { title_en:"The Basics", title_ar:"الأساسيات", lessons:[
        { id:"mr-l1", title_en:"The Musical Staff & Clefs", title_ar:"المدرج وعلامات المفتاح", duration:"15:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"mr-l2", title_en:"Note Names",                title_ar:"أسماء النوتات",          duration:"18:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"mr-l3", title_en:"Note Values",               title_ar:"قيم النوتات",            duration:"20:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "oud-advanced": {
    title_en:"Oud Advanced",
    title_ar:"العود المتقدم",
    sections:[
      { title_en:"Advanced Techniques", title_ar:"التقنيات المتقدمة", lessons:[
        { id:"oa-l1", title_en:"Complex Ornamentation",     title_ar:"الزخرفة المعقدة",       duration:"25:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"oa-l2", title_en:"Advanced Taqsim",           title_ar:"التقسيم المتقدم",        duration:"35:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"oa-l3", title_en:"Andalusian Nawba",          title_ar:"النوبة الأندلسية",       duration:"40:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
  "oud-harmony": {
    title_en:"Harmony for Oud",
    title_ar:"الهارموني للعود",
    sections:[
      { title_en:"Harmony Foundations", title_ar:"أساسيات الهارموني", lessons:[
        { id:"oh-l1", title_en:"What is Harmony?",          title_ar:"ما هو الهارموني؟",      duration:"15:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:true  },
        { id:"oh-l2", title_en:"Basic Intervals",           title_ar:"الفترات الأساسية",      duration:"20:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
        { id:"oh-l3", title_en:"Harmonising a Melody",      title_ar:"مناغمة لحن",            duration:"25:00", videoUrl:"https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1", free:false },
      ]},
    ],
  },
}

export default function LearnPage() {
  const params              = useParams()
  const slug                = params.slug as string
  const { data: session, status } = useSession()
  const router              = useRouter()
  const { isAr }            = useLang()

  const course     = COURSES[slug]
  const allLessons = course?.sections.flatMap((s: any) => s.lessons) || []

  const [currentLesson, setCurrentLesson] = useState<any>(null)
  const [completed, setCompleted]         = useState<Set<string>>(new Set())
  const [sidebarOpen, setSidebarOpen]     = useState(true)
  const [isEnrolled, setIsEnrolled]       = useState(false)
  const [checkingEnrollment, setChecking] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/signin?redirect=/courses/${slug}/learn`)
      return
    }
    if (status === "authenticated") {
      checkEnrollment()
      loadProgress()
    }
  }, [status])

  useEffect(() => {
    if (allLessons.length > 0 && !currentLesson) {
      setCurrentLesson(allLessons[0])
    }
  }, [allLessons])

  async function checkEnrollment() {
    setChecking(true)
    const res  = await fetch(`/api/enrollment/check?slug=${slug}`)
    const data = await res.json()
    setIsEnrolled(data.enrolled)
    setChecking(false)
  }

  async function loadProgress() {
    const res  = await fetch("/api/progress")
    const data = await res.json()
    if (data.progress) {
      setCompleted(new Set(data.progress.filter((p: any) => p.completed).map((p: any) => p.lessonId)))
    }
  }

  async function markComplete(lessonId: string) {
    setCompleted(prev => new Set([...prev, lessonId]))
    await fetch("/api/progress", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ lessonId, completed:true }),
    })
  }

  function canAccessLesson(lesson: any) {
    return lesson.free || isEnrolled
  }

  if (!course) {
    return (
      <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
        <p style={{ color:"var(--text-muted)", fontSize:18 }}>Course not found.</p>
        <Link href="/courses" className="btn-gold" style={{ marginTop:24, display:"inline-flex" }}>← Back to Courses</Link>
      </main>
    )
  }

  if (status === "loading" || checkingEnrollment) {
    return (
      <div style={{ height:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--ink)" }}>
        <div style={{ textAlign:"center" }}>
          <div style={{ fontSize:40, marginBottom:16, animation:"pulse 1.5s ease infinite" }}>🎵</div>
          <p style={{ color:"var(--text-muted)" }}>{isAr ? "جاري التحميل..." : "Loading..."}</p>
        </div>
      </div>
    )
  }

  if (!currentLesson) return null

  const currentIndex   = allLessons.findIndex((l: any) => l.id === currentLesson.id)
  const nextLesson     = allLessons[currentIndex + 1]
  const prevLesson     = allLessons[currentIndex - 1]
  const totalCompleted = completed.size
  const progress       = Math.round((totalCompleted / allLessons.length) * 100)
  const canWatch       = canAccessLesson(currentLesson)

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>

      {/* Top bar */}
      <div style={{ height:56, background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", flexShrink:0, gap:12 }}>
        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          <Link href={`/courses/${slug}`} style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            {isAr ? "العودة" : "Back"}
          </Link>
          <div style={{ width:1, height:20, background:"var(--border)" }}/>
          <span className="font-display" style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>
            {isAr ? course.title_ar : course.title_en}
          </span>
          {!isEnrolled && (
            <span style={{ fontSize:11, padding:"3px 10px", borderRadius:6, background:"rgba(251,191,36,0.1)", color:"#fbbf24", fontWeight:600 }}>
              {isAr ? "وضع المعاينة" : "Preview Mode"}
            </span>
          )}
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:16 }}>
          {/* Progress */}
          {isEnrolled && (
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:100, height:5, background:"var(--border)", borderRadius:3, overflow:"hidden" }}>
                <div style={{ width:`${progress}%`, height:"100%", background:"var(--gold)", borderRadius:3, transition:"width 0.3s ease" }}/>
              </div>
              <span style={{ fontSize:12, color:"var(--text-muted)", fontWeight:600 }}>{progress}%</span>
            </div>
          )}

          {!isEnrolled && (
            <Link href={`/checkout/${slug}`} className="btn-gold" style={{ padding:"7px 16px", fontSize:12 }}>
              {isAr ? "سجّل للوصول الكامل" : "Enroll for Full Access"}
            </Link>
          )}

          <button onClick={() => setSidebarOpen(o=>!o)} style={{ padding:"5px 12px", borderRadius:6, border:"1px solid var(--border)", background:"transparent", color:"var(--text-muted)", fontSize:11, cursor:"pointer" }}>
            {sidebarOpen ? (isAr?"إخفاء":"Hide") : (isAr?"الدروس":"Lessons")}
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* Video area */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Video or lock screen */}
          <div style={{ position:"relative", background:"#000", aspectRatio:"16/9", maxHeight:"calc(100vh - 56px - 130px)" }}>
            {canWatch ? (
              <iframe
                key={currentLesson.id}
                src={currentLesson.videoUrl}
                style={{ width:"100%", height:"100%", border:"none" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              /* Lock screen for non-enrolled */
              <div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#0d1117,#1a1a2e)", gap:20 }}>
                <div style={{ fontSize:64, opacity:0.5 }}>🔒</div>
                <div style={{ textAlign:"center", maxWidth:360 }}>
                  <h3 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:10 }}>
                    {isAr ? "هذا الدرس مقفل" : "This lesson is locked"}
                  </h3>
                  <p style={{ fontSize:14, color:"var(--text-muted)", lineHeight:1.7, marginBottom:24 }}>
                    {isAr
                      ? "سجّل في الدورة للوصول إلى جميع الدروس وابدأ رحلتك الموسيقية."
                      : "Enroll in this course to access all lessons and start your musical journey."}
                  </p>
                  <Link href={`/checkout/${slug}`} className="btn-gold" style={{ display:"inline-flex", padding:"13px 32px", fontSize:15 }}>
                    {isAr ? "سجّل الآن" : "Enroll Now"}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Lesson info */}
          <div style={{ flex:1, padding:"20px 28px", overflow:"auto", background:"var(--ink)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16, marginBottom:16 }}>
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
                  {currentLesson.free && (
                    <span style={{ fontSize:11, padding:"2px 8px", borderRadius:4, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:700 }}>
                      {isAr ? "مجاني" : "FREE"}
                    </span>
                  )}
                  <span style={{ fontSize:12, color:"var(--text-muted)" }}>{currentLesson.duration}</span>
                </div>
                <h1 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)" }}>
                  {isAr ? currentLesson.title_ar : currentLesson.title_en}
                </h1>
              </div>

              {isEnrolled && canWatch && (
                completed.has(currentLesson.id) ? (
                  <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 18px", borderRadius:8, background:"rgba(52,211,153,0.1)", border:"1px solid rgba(52,211,153,0.3)" }}>
                    <span style={{ color:"#34d399" }}>✓</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"#34d399" }}>{isAr?"مكتمل":"Completed"}</span>
                  </div>
                ) : (
                  <button onClick={() => markComplete(currentLesson.id)} className="btn-gold" style={{ padding:"9px 22px", fontSize:13 }}>
                    ✓ {isAr ? "تحديد كمكتمل" : "Mark Complete"}
                  </button>
                )
              )}
            </div>

            {/* Navigation */}
            <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
              {prevLesson && (
                <button onClick={() => setCurrentLesson(prevLesson)} className="btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>
                  {isAr ? "← السابق" : "← Previous"}
                </button>
              )}
              {nextLesson && isEnrolled && (
                <button onClick={() => { if (canWatch) markComplete(currentLesson.id); setCurrentLesson(nextLesson) }}
                  className="btn-gold" style={{ fontSize:13, padding:"9px 18px" }}>
                  {isAr ? "التالي →" : "Next →"}
                </button>
              )}
              {nextLesson && !isEnrolled && canAccessLesson(nextLesson) && (
                <button onClick={() => setCurrentLesson(nextLesson)} className="btn-outline" style={{ fontSize:13, padding:"9px 18px" }}>
                  {isAr ? "التالي →" : "Next →"}
                </button>
              )}
              {!nextLesson && isEnrolled && (
                <div style={{ display:"flex", alignItems:"center", gap:8, padding:"9px 18px", borderRadius:8, background:"rgba(201,168,76,0.1)", border:"1px solid rgba(201,168,76,0.3)" }}>
                  <span>🎉</span>
                  <span style={{ fontSize:13, fontWeight:600, color:"var(--gold)" }}>
                    {isAr ? "أكملت الدورة!" : "Course Complete!"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        {sidebarOpen && (
          <div style={{ width:300, flexShrink:0, background:"var(--ink-soft)", borderLeft: isAr?"none":"1px solid var(--border)", borderRight: isAr?"1px solid var(--border)":"none", display:"flex", flexDirection:"column", overflow:"hidden" }}>

            <div style={{ padding:"14px 18px", borderBottom:"1px solid var(--border)", flexShrink:0 }}>
              <p style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:2, textTransform:"uppercase", marginBottom:2 }}>
                {isAr ? "محتوى الدورة" : "Course Content"}
              </p>
              {isEnrolled ? (
                <p style={{ fontSize:11, color:"var(--text-muted)" }}>
                  {totalCompleted}/{allLessons.length} {isAr?"مكتمل":"completed"}
                </p>
              ) : (
                <p style={{ fontSize:11, color:"#fbbf24" }}>
                  {isAr ? "وضع المعاينة — درسان مجانيان" : "Preview — free lessons only"}
                </p>
              )}
            </div>

            <div style={{ flex:1, overflowY:"auto" }}>
              {course.sections.map((section: any, si: number) => (
                <div key={si}>
                  <div style={{ padding:"10px 18px 6px", background:"var(--ink)", borderBottom:"1px solid var(--border)" }}>
                    <p style={{ fontSize:11, fontWeight:700, color:"var(--cream)", letterSpacing:0.5 }}>
                      {isAr ? section.title_ar : section.title_en}
                    </p>
                  </div>
                  {section.lessons.map((lesson: any) => {
                    const isActive  = currentLesson.id === lesson.id
                    const isDone    = completed.has(lesson.id)
                    const locked    = !canAccessLesson(lesson)
                    return (
                      <button key={lesson.id}
                        onClick={() => { if (!locked) setCurrentLesson(lesson) }}
                        style={{
                          width:"100%", textAlign: isAr?"right":"left",
                          padding:"11px 18px",
                          background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                          border:"none",
                          borderBottom:"1px solid var(--border)",
                          borderLeft: !isAr && isActive ? "3px solid var(--gold)" : "3px solid transparent",
                          borderRight: isAr && isActive ? "3px solid var(--gold)" : "3px solid transparent",
                          cursor: locked ? "not-allowed" : "pointer",
                          opacity: locked ? 0.5 : 1,
                          transition:"background 0.15s",
                        }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                          <div style={{
                            width:22, height:22, borderRadius:"50%", flexShrink:0,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            background: isDone ? "rgba(52,211,153,0.15)" : isActive ? "rgba(201,168,76,0.15)" : "var(--ink-card)",
                            border:`1px solid ${isDone?"rgba(52,211,153,0.4)":isActive?"rgba(201,168,76,0.4)":"var(--border)"}`,
                          }}>
                            {locked
                              ? <span style={{ fontSize:9 }}>🔒</span>
                              : isDone
                              ? <span style={{ fontSize:11, color:"#34d399" }}>✓</span>
                              : <span style={{ fontSize:9, color: isActive?"var(--gold)":"var(--text-muted)" }}>▶</span>}
                          </div>
                          <div style={{ flex:1, minWidth:0 }}>
                            <p style={{ fontSize:12, fontWeight: isActive?600:400, color: isActive?"var(--cream)":locked?"var(--text-muted)":"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginBottom:2 }}>
                              {isAr ? lesson.title_ar : lesson.title_en}
                            </p>
                            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                              <span style={{ fontSize:10, color:"var(--text-muted)" }}>{lesson.duration}</span>
                              {lesson.free && <span style={{ fontSize:9, padding:"1px 5px", borderRadius:3, background:"rgba(52,211,153,0.1)", color:"#34d399", fontWeight:700 }}>FREE</span>}
                            </div>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* Enroll CTA in sidebar */}
            {!isEnrolled && (
              <div style={{ padding:16, borderTop:"1px solid var(--border)", background:"var(--ink)" }}>
                <p style={{ fontSize:12, color:"var(--text-muted)", marginBottom:10, textAlign:"center" }}>
                  {isAr ? "سجّل للوصول لجميع الدروس" : "Enroll to unlock all lessons"}
                </p>
                <Link href={`/checkout/${slug}`} className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:"11px", fontSize:13 }}>
                  {isAr ? "سجّل الآن" : "Enroll Now"}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </div>
  )
}
