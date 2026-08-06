"use client"
import { useState, useEffect, useMemo } from "react"
import { useLang } from "@/components/providers/LangProvider"
import { WHATSAPP_NUMBER } from "@/lib/whatsapp"

const TIMES = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00"]

const DAY_NAMES_EN = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const DAY_NAMES_AR = ["أحد","اثنين","ثلاثاء","أربعاء","خميس","جمعة","سبت"]

function toISODate(d: Date) {
  return d.toISOString().split("T")[0]
}

export default function AssessmentCalendar({ instrument, courseName }: { instrument: string, courseName: string }) {
  const { isAr } = useLang()
  const days = useMemo(() => {
    const arr = []
    for (let i = 0; i < 7; i++) {
      const d = new Date()
      d.setDate(d.getDate() + i)
      arr.push(d)
    }
    return arr
  }, [])

  const [selectedDate, setSelectedDate] = useState(toISODate(days[0]))
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [takenTimes, setTakenTimes] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true)
    setSelectedTime(null)
    fetch(`/api/assessment/availability?date=${selectedDate}&instrument=${instrument}`)
      .then((r) => r.json())
      .then((d) => setTakenTimes(d.takenTimes || []))
      .finally(() => setLoading(false))
  }, [selectedDate, instrument])

  async function handleConfirm() {
    if (!name || !phone || !selectedTime) return
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/assessment/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, instrument, date: selectedDate, time: selectedTime }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(isAr ? "هذا الموعد محجوز، اختر موعداً آخر" : "This slot was just taken, please pick another")
        setTakenTimes((t) => [...t, selectedTime])
        setSelectedTime(null)
        setSubmitting(false)
        return
      }
      const dateLabel = new Date(selectedDate + "T00:00:00").toLocaleDateString(isAr ? "ar" : "en-US", { weekday: "long", month: "long", day: "numeric" })
      const msg = isAr
        ? `مرحباً، اسمي ${name}. أرغب في تأكيد حجز جلسة التقييم المجانية لدورة ${courseName} يوم ${dateLabel} الساعة ${selectedTime}.`
        : `Hi! My name is ${name}. I'd like to confirm my free assessment session for ${courseName} on ${dateLabel} at ${selectedTime}.`
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank")
      setSubmitting(false)
    } catch {
      setError(isAr ? "حدث خطأ، حاول مرة أخرى" : "Something went wrong, try again")
      setSubmitting(false)
    }
  }

  return (
    <div style={{
      borderRadius: 20, border: "2px solid var(--gold)", background: "linear-gradient(135deg, rgba(201,168,76,0.1), rgba(201,168,76,0.03))",
      padding: "28px 24px", maxWidth: 560, margin: "0 auto", boxShadow: "0 0 40px rgba(201,168,76,0.15)",
    }}>
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <span style={{ display: "inline-block", padding: "5px 16px", borderRadius: 999, background: "var(--gold)", color: "#0A0A0A", fontSize: 11, fontWeight: 800, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
          {isAr ? "★ مجاني تماماً ★" : "★ 100% FREE ★"}
        </span>
        <h3 className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "var(--cream)", marginBottom: 6 }}>
          {isAr ? "احجز موعدك الآن" : "Pick Your Time"}
        </h3>
        <p style={{ fontSize: 13, color: "var(--text-muted)" }}>
          {isAr ? "20 دقيقة · بدون التزام" : "20 minutes · No commitment"}
        </p>
      </div>

      {/* Date strip */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 8, marginBottom: 16 }}>
        {days.map((d) => {
          const iso = toISODate(d)
          const isSelected = iso === selectedDate
          const dayName = isAr ? DAY_NAMES_AR[d.getDay()] : DAY_NAMES_EN[d.getDay()]
          return (
            <button key={iso} onClick={() => setSelectedDate(iso)} style={{
              flexShrink: 0, minWidth: 58, padding: "10px 6px", borderRadius: 12, cursor: "pointer",
              border: isSelected ? "2px solid var(--gold)" : "1px solid var(--border)",
              background: isSelected ? "var(--gold)" : "var(--ink-card)",
              color: isSelected ? "#0A0A0A" : "var(--cream)",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
              fontWeight: isSelected ? 800 : 500, transition: "all 0.2s",
            }}>
              <span style={{ fontSize: 11, opacity: 0.8 }}>{dayName}</span>
              <span style={{ fontSize: 17 }}>{d.getDate()}</span>
            </button>
          )
        })}
      </div>

      {/* Time slots */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: 8, marginBottom: 20, minHeight: 90 }}>
        {loading ? (
          <p style={{ gridColumn: "1/-1", textAlign: "center", color: "var(--text-muted)", fontSize: 13, padding: "20px 0" }}>
            {isAr ? "جارٍ التحميل..." : "Loading..."}
          </p>
        ) : TIMES.map((t) => {
          const isTaken = takenTimes.includes(t)
          const isSelected = selectedTime === t
          return (
            <button key={t} disabled={isTaken} onClick={() => setSelectedTime(t)} style={{
              padding: "10px 6px", borderRadius: 10, cursor: isTaken ? "not-allowed" : "pointer",
              border: isSelected ? "2px solid var(--gold)" : "1px solid var(--border)",
              background: isTaken ? "var(--ink-soft)" : isSelected ? "var(--gold)" : "var(--ink-card)",
              color: isTaken ? "var(--text-muted)" : isSelected ? "#0A0A0A" : "var(--cream)",
              fontSize: 13, fontWeight: isSelected ? 800 : 500,
              textDecoration: isTaken ? "line-through" : "none",
              opacity: isTaken ? 0.5 : 1, transition: "all 0.2s",
            }}>
              {t}
            </button>
          )
        })}
      </div>

      {/* Form reveal */}
      {selectedTime && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, animation: "fadeIn 0.3s ease" }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder={isAr ? "الاسم الكامل" : "Full name"}
            style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--ink)", color: "var(--cream)", fontSize: 14, outline: "none" }} />
          <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={isAr ? "رقم الهاتف" : "Phone number"}
            style={{ padding: "12px 16px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--ink)", color: "var(--cream)", fontSize: 14, outline: "none" }} />
          {error && <p style={{ color: "#f87171", fontSize: 13, textAlign: "center" }}>{error}</p>}
          <button onClick={handleConfirm} disabled={!name || !phone || submitting} className="btn-gold"
            style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15, opacity: (!name || !phone || submitting) ? 0.6 : 1 }}>
            {submitting ? (isAr ? "جارٍ التأكيد..." : "Confirming...") : (isAr ? "تأكيد والمتابعة عبر واتساب" : "Confirm & Continue on WhatsApp")}
          </button>
        </div>
      )}
      <style>{`@keyframes fadeIn { from { opacity:0; transform:translateY(8px);} to {opacity:1; transform:translateY(0);} }`}</style>
    </div>
  )
}
