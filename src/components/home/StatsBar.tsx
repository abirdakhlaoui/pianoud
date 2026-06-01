"use client"

import { useEffect, useState } from "react"
import { useLang } from "@/components/providers/LangProvider"

export default function StatsBar() {
  const { isAr } = useLang()
  const [stats, setStats] = useState({ totalStudents: 0, totalCourses: 0, totalEnrollments: 0 })

  useEffect(() => {
    fetch("/api/stats")
      .then((r: any) => r.json())
      .then((d: any) => setStats(d))
  }, [])

  const items = [
    { value: stats.totalStudents > 0 ? `${stats.totalStudents}+` : "...", value_ar: stats.totalStudents > 0 ? `+${stats.totalStudents}` : "...", label: "Students", label_ar: "طالب" },
    { value: stats.totalCourses > 0 ? `${stats.totalCourses}` : "...",   value_ar: stats.totalCourses > 0 ? `${stats.totalCourses}` : "...",   label: "Courses",  label_ar: "دورة" },
    { value: stats.totalEnrollments > 0 ? `${stats.totalEnrollments}+` : "...", value_ar: stats.totalEnrollments > 0 ? `+${stats.totalEnrollments}` : "...", label: "Enrollments", label_ar: "تسجيل" },
  ]

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "clamp(24px, 6vw, 80px)", flexWrap: "wrap" }}>
      {items.map((stat: any, i: any) => (
        <div key={i} style={{ textAlign: "center" }}>
          <div className="gradient-text font-display" style={{ fontSize: "clamp(28px, 5vw, 42px)", fontWeight: 700 }}>
            {isAr ? stat.value_ar : stat.value}
          </div>
          <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4, fontWeight: 500 }}>
            {isAr ? stat.label_ar : stat.label}
          </div>
        </div>
      ))}
    </div>
  )
}
