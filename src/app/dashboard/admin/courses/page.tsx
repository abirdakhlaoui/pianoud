"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/courses/list")
      .then((r) => r.json())
      .then((d) => setCourses(d.courses || []))
      .finally(() => setLoading(false))
  }, [])

  async function togglePublish(id: string, current: boolean) {
    await fetch(`/api/admin/courses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !current }),
    })
    setCourses((cs) => cs.map((c) => (c.id === id ? { ...c, isPublished: !current } : c)))
  }

  async function deleteCourse(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
    await fetch(`/api/admin/courses/${id}`, { method: "DELETE" })
    setCourses((cs) => cs.filter((c) => c.id !== id))
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 60, background: "var(--ink)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <Link href="/dashboard/admin" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 400, color: "var(--cream)", margin: "12px 0 32px" }}>
          All Courses ({courses.length})
        </h1>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading...</p>
        ) : courses.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>No courses found</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {courses.map((c) => (
              <div key={c.id} className="card" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontSize: 24 }}>{c.instrument === "PIANO" ? "🎹" : "🪕"}</span>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--cream)" }}>{c.title_en}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      {c.instructor?.user?.name || "Unknown"} · {c._count?.enrollments || 0} students · {c.level}
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999,
                    background: c.isPublished ? "rgba(52,211,153,0.15)" : "rgba(248,113,113,0.15)",
                    color: c.isPublished ? "#34d399" : "#f87171",
                  }}>
                    {c.isPublished ? "Published" : "Draft"}
                  </span>
                  <button onClick={() => togglePublish(c.id, c.isPublished)} className="btn-outline" style={{ padding: "6px 12px", fontSize: 12 }}>
                    {c.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button onClick={() => deleteCourse(c.id, c.title_en)} style={{
                    padding: "6px 12px", fontSize: 12, borderRadius: 8, border: "1px solid rgba(248,113,113,0.3)",
                    background: "rgba(248,113,113,0.08)", color: "#f87171", cursor: "pointer",
                  }}>
                    Delete
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
