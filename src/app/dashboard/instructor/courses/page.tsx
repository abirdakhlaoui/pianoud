"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

type Course = {
  id: string
  title_en: string
  title_ar: string
  instrument: string
  level: string
  price: number
  isPublished: boolean
  totalStudents: number
  rating: number
  slug: string
}

export default function InstructorCoursesPage() {
  const { data: session, status } = useSession()
  const router  = useRouter()
  const { isAr } = useLang()
  const user    = session?.user as any

  const [courses, setCourses]   = useState<Course[]>([])
  const [loading, setLoading]   = useState(true)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/signin")
    if (status === "authenticated") fetchCourses()
  }, [status])

  async function fetchCourses() {
    setLoading(true)
    const res  = await fetch("/api/instructor/courses")
    const data = await res.json()
    setCourses(data.courses || [])
    setLoading(false)
  }

  async function deleteCourse(id: string) {
    if (!confirm(isAr ? "هل أنت متأكد من حذف هذه الدورة؟" : "Are you sure you want to delete this course?")) return
    setDeleting(id)
    const res = await fetch(`/api/instructor/courses/${id}`, { method: "DELETE" })
    if (res.ok) {
      setCourses(prev => prev.filter((c: any) => c.id !== id))
    }
    setDeleting(null)
  }

  async function togglePublish(id: string, current: boolean) {
    const res = await fetch(`/api/instructor/courses/${id}/publish`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !current }),
    })
    if (res.ok) {
      setCourses(prev => prev.map((c: any) => c.id === id ? { ...c, isPublished: !current } : c))
    }
  }

  if (loading) return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <p style={{ color:"var(--text-muted)" }}>{isAr ? "جاري التحميل..." : "Loading..."}</p>
    </main>
  )

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container">
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:40, flexWrap:"wrap", gap:16 }}>
          <div>
            <Link href="/dashboard/instructor" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
              ← {isAr ? "لوحة التحكم" : "Dashboard"}
            </Link>
            <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:8 }}>
              {isAr ? "دوراتي" : "My Courses"}
            </h1>
            <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:4 }}>
              {courses.length} {isAr ? "دورة" : "courses"}
            </p>
          </div>
          <Link href="/dashboard/instructor/courses/new" className="btn-gold">
            + {isAr ? "إنشاء دورة جديدة" : "Create New Course"}
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="card" style={{ padding:48, textAlign:"center" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🎓</div>
            <p style={{ fontSize:18, color:"var(--text-muted)", marginBottom:24 }}>
              {isAr ? "لم تقم بإنشاء أي دورة بعد." : "You haven't created any courses yet."}
            </p>
            <Link href="/dashboard/instructor/courses/new" className="btn-gold">
              + {isAr ? "أنشئ دورتك الأولى" : "Create your first course"}
            </Link>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {courses.map((course: any) => (
              <div key={course.id} className="card" style={{ padding:24, display:"flex", alignItems:"center", gap:20, flexWrap:"wrap" }}>
                <div style={{ width:56, height:56, borderRadius:12, background:"var(--ink)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, flexShrink:0 }}>
                  {course.instrument === "PIANO" ? "🎹" : "🪘"}
                </div>

                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>
                    {isAr ? course.title_ar : course.title_en}
                  </div>
                  <div style={{ display:"flex", gap:12, fontSize:12, color:"var(--text-muted)", flexWrap:"wrap" }}>
                    <span>{course.instrument === "PIANO" ? (isAr?"بيانو":"Piano") : (isAr?"عود":"Oud")}</span>
                    <span>•</span>
                    <span>{course.level === "BEGINNER" ? (isAr?"مبتدئ":"Beginner") : course.level === "INTERMEDIATE" ? (isAr?"متوسط":"Intermediate") : (isAr?"متقدم":"Advanced")}</span>
                    <span>•</span>
                    <span>{course.price} SAR</span>
                  </div>
                </div>

                <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:700, color:"var(--cream)" }}>{course.totalStudents}</div>
                    <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr?"طالب":"students"}</div>
                  </div>
                  <div style={{ textAlign:"center" }}>
                    <div style={{ fontSize:20, fontWeight:700, color:"var(--gold)" }}>{course.rating > 0 ? `${course.rating}★` : "—"}</div>
                    <div style={{ fontSize:11, color:"var(--text-muted)" }}>{isAr?"تقييم":"rating"}</div>
                  </div>
                </div>

                {/* Published toggle */}
                <button onClick={() => togglePublish(course.id, course.isPublished)} style={{
                  fontSize:12, fontWeight:700, padding:"6px 14px", borderRadius:999,
                  border:"1px solid",
                  borderColor: course.isPublished ? "rgba(52,211,153,0.4)" : "var(--border)",
                  background:  course.isPublished ? "rgba(52,211,153,0.1)" : "transparent",
                  color:       course.isPublished ? "#34d399" : "var(--text-muted)",
                  cursor:"pointer", transition:"all 0.2s",
                }}>
                  {course.isPublished ? (isAr?"✓ منشور":"✓ Published") : (isAr?"مسودة":"Draft")}
                </button>

                {/* Actions */}
                <div style={{ display:"flex", gap:8 }}>
                  <Link href={`/dashboard/instructor/courses/${course.id}/videos`} className="btn-outline" style={{ padding:"8px 16px", fontSize:13 }}>🎬</Link>
                  <Link href={`/dashboard/instructor/courses/${course.id}/edit`} className="btn-outline" style={{ padding:"8px 16px", fontSize:13 }}>
                    {isAr ? "تعديل" : "Edit"}
                  </Link>
                  <Link href={`/courses/${course.slug}`} className="btn-outline" style={{ padding:"8px 16px", fontSize:13 }}>
                    {isAr ? "عرض" : "View"}
                  </Link>
                  <button
                    onClick={() => deleteCourse(course.id)}
                    disabled={deleting === course.id}
                    style={{ padding:"8px 16px", borderRadius:8, border:"1px solid rgba(248,113,113,0.3)", background:"rgba(248,113,113,0.05)", color:"#f87171", fontSize:13, cursor:"pointer", opacity: deleting===course.id ? 0.5 : 1 }}>
                    {deleting === course.id ? "..." : (isAr?"حذف":"Delete")}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
