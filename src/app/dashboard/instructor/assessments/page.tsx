"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function InstructorAssessments() {
  const { isAr } = useLang()
  const [assessments, setAssessments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/instructor/assessments")
      .then((r) => r.json())
      .then((d) => setAssessments(d.assessments || []))
      .finally(() => setLoading(false))
  }, [])

  const today = new Date().toISOString().split("T")[0]
  const upcoming = assessments.filter((a) => a.date >= today)
  const past = assessments.filter((a) => a.date < today)

  function formatDate(dateStr: string) {
    return new Date(dateStr + "T00:00:00").toLocaleDateString(isAr ? "ar" : "en-US", {
      weekday: "long", month: "long", day: "numeric",
    })
  }

  function Row({ a }: { a: any }) {
    const dateLabel = formatDate(a.date)
    const waMsg = isAr
      ? `مرحباً ${a.name}، معك المدرّس من Pianoud بخصوص جلسة التقييم المجانية يوم ${dateLabel} الساعة ${a.time}.`
      : `Hi ${a.name}, this is your instructor from Pianoud regarding your free assessment session on ${dateLabel} at ${a.time}.`
    const cleanPhone = a.phone.replace(/[^0-9]/g, "")
    return (
      <div className="card" style={{ padding: 20, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: "var(--cream)", marginBottom: 4 }}>{a.name}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{a.phone}</div>
        </div>
        <div style={{ textAlign: isAr ? "left" : "right" }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--cream)" }}>{dateLabel}</div>
          <div style={{ fontSize: 13, color: "var(--text-muted)" }}>{a.time}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <a href={`tel:${a.phone}`} className="btn-outline" style={{ padding: "8px 14px", fontSize: 13, gap: 6 }}>
            📞 {isAr ? "اتصال" : "Call"}
          </a>
          <a href={`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMsg)}`} target="_blank" className="btn-gold" style={{ padding: "8px 14px", fontSize: 13, gap: 6 }}>
            💬 {isAr ? "واتساب" : "WhatsApp"}
          </a>
        </div>
      </div>
    )
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 60, background: "var(--ink)" }}>
      <div className="container" style={{ maxWidth: 700 }}>
        <Link href="/dashboard/instructor" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
          {isAr ? "← لوحة التحكم" : "← Dashboard"}
        </Link>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 400, color: "var(--cream)", margin: "12px 0 32px" }}>
          {isAr ? "طلبات التقييم المجاني" : "Free Assessment Requests"}
        </h1>

        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>{isAr ? "جارٍ التحميل..." : "Loading..."}</p>
        ) : assessments.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>🎯</span>
            <p style={{ color: "var(--text-muted)" }}>{isAr ? "لا توجد طلبات بعد" : "No requests yet"}</p>
          </div>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--gold)", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>
                  {isAr ? "القادمة" : "Upcoming"} ({upcoming.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {upcoming.map((a) => <Row key={a.id} a={a} />)}
                </div>
              </div>
            )}
            {past.length > 0 && (
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--text-muted)", marginBottom: 14, textTransform: "uppercase", letterSpacing: 1 }}>
                  {isAr ? "السابقة" : "Past"} ({past.length})
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, opacity: 0.6 }}>
                  {past.map((a) => <Row key={a.id} a={a} />)}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}
