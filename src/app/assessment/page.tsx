"use client"
import { useState } from "react"
import { useLang } from "@/components/providers/LangProvider"
import AssessmentCalendar from "@/components/AssessmentCalendar"

export default function AssessmentPage() {
  const { isAr } = useLang()
  const [instrument, setInstrument] = useState<"PIANO" | "OUD">("PIANO")

  return (
    <main style={{ minHeight: "100vh", paddingTop: 120, paddingBottom: 80, background: "var(--ink)" }}>
      <div className="container" style={{ maxWidth: 620, textAlign: "center" }}>
        <p style={{ color: "var(--gold)", fontSize: 12, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
          {isAr ? "التقييم المجاني" : "Free Assessment"}
        </p>
        <h1 className="font-display" style={{ fontSize: "clamp(30px,4.5vw,44px)", fontWeight: 400, color: "var(--cream)", marginBottom: 16 }}>
          {isAr ? "احجز جلستك المجانية" : "Book Your Free Session"}
        </h1>
        <p style={{ fontSize: 16, color: "var(--text-muted)", marginBottom: 36 }}>
          {isAr ? "اختر الآلة، ثم التاريخ والوقت المناسب لك." : "Choose your instrument, then pick a date and time that works for you."}
        </p>

        {/* Instrument selector */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 32 }}>
          {[
            { key: "PIANO", label_en: "Piano", label_ar: "بيانو", emoji: "🎹" },
            { key: "OUD", label_en: "Oud", label_ar: "عود", emoji: "🪕" },
          ].map((opt) => (
            <button key={opt.key} onClick={() => setInstrument(opt.key as "PIANO" | "OUD")} style={{
              padding: "14px 28px", borderRadius: 14, cursor: "pointer",
              border: instrument === opt.key ? "2px solid var(--gold)" : "1px solid var(--border)",
              background: instrument === opt.key ? "var(--gold-pale)" : "var(--ink-card)",
              color: instrument === opt.key ? "var(--gold)" : "var(--cream)",
              fontSize: 15, fontWeight: 700, display: "flex", alignItems: "center", gap: 8,
              transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 20 }}>{opt.emoji}</span>
              {isAr ? opt.label_ar : opt.label_en}
            </button>
          ))}
        </div>

        <AssessmentCalendar instrument={instrument} courseName={instrument === "PIANO" ? "Piano" : "Oud"} />
      </div>
    </main>
  )
}
