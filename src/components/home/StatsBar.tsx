"use client"

import { useEffect, useState } from "react"
import { useLang } from "@/components/providers/LangProvider"

export default function StatsBar() {
  const { isAr } = useLang()
  const [stats, setStats] = useState({ students: 0, courses: 0, enrollments: 0 })

  useEffect(() => {
    fetch("/api/stats")
      .then((r: any) => r.json())
      .then((d: any) => setStats(d))
  }, [])

  const items = [
    { value: stats.students > 0 ? `${stats.students}+` : "...", value_ar: stats.students > 0 ? `+${stats.students}` : "...", label: "Students", label_ar: "طالب" },
    { value: stats.courses > 0 ? `${stats.courses}` : "...",   value_ar: stats.courses > 0 ? `${stats.courses}` : "...",   label: "Courses",  label_ar: "دورة" },
    { value: stats.enrollments > 0 ? `${stats.enrollments}+` : "...", value_ar: stats.enrollments > 0 ? `+${stats.enrollments}` : "...", label: "Enrollments", label_ar: "تسجيل" },
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
