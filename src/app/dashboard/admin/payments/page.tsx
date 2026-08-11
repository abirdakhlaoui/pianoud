"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [stats, setStats] = useState<any>(null)
  const [students, setStudents] = useState<any[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [studentId, setStudentId] = useState("")
  const [courseId, setCourseId] = useState("")
  const [amount, setAmount] = useState("")
  const [pkg, setPkg] = useState("")
  const [method, setMethod] = useState("Bank Transfer")

  function loadAll() {
    setLoading(true)
    Promise.all([
      fetch("/api/admin/payments").then((r) => r.json()),
      fetch("/api/admin/payments/stats").then((r) => r.json()),
      fetch("/api/admin/students").then((r) => r.json()),
    ]).then(([p, s, sc]) => {
      setPayments(p.payments || [])
      setStats(s)
      setStudents(sc.students || [])
      setCourses(sc.courses || [])
      setLoading(false)
    })
  }

  useEffect(() => { loadAll() }, [])

  async function handleAddPayment(e: React.FormEvent) {
    e.preventDefault()
    if (!studentId || !amount) return
    setSubmitting(true)
    await fetch("/api/admin/payments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId, courseId: courseId || undefined,
        amount: parseFloat(amount), currency: "SAR", package: pkg || undefined, method,
      }),
    })
    setStudentId(""); setCourseId(""); setAmount(""); setPkg(""); setMethod("Bank Transfer")
    setShowForm(false)
    setSubmitting(false)
    loadAll()
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--ink)",
    color: "var(--cream)", fontSize: 14, outline: "none",
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 60, background: "var(--ink)" }}>
      <div className="container" style={{ maxWidth: 900 }}>
        <Link href="/dashboard/admin" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
          ← Back to Dashboard
        </Link>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, margin: "12px 0 32px" }}>
          <h1 className="font-display" style={{ fontSize: 32, fontWeight: 400, color: "var(--cream)" }}>Payments</h1>
          <button onClick={() => setShowForm((s) => !s)} className="btn-gold" style={{ padding: "10px 20px", fontSize: 14 }}>
            {showForm ? "Cancel" : "+ Add Payment"}
          </button>
        </div>

        {/* Stats */}
        {stats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Total Revenue", value: `${stats.totalRevenue.toLocaleString()} SAR`, icon: "💰" },
              { label: "This Month", value: `${stats.monthRevenue.toLocaleString()} SAR`, icon: "📅" },
              { label: "Total Payments", value: stats.totalCount, icon: "🧾" },
              { label: "Paying Students", value: stats.uniqueStudents, icon: "👥" },
              { label: "Piano Revenue", value: `${stats.pianoRevenue.toLocaleString()} SAR`, icon: "🎹" },
              { label: "Oud Revenue", value: `${stats.oudRevenue.toLocaleString()} SAR`, icon: "🪕" },
            ].map((s) => (
              <div key={s.label} className="card" style={{ padding: 18 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "var(--cream)", marginTop: 6 }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Add payment form */}
        {showForm && (
          <form onSubmit={handleAddPayment} className="card" style={{ padding: 24, marginBottom: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Student</label>
                <select value={studentId} onChange={(e) => setStudentId(e.target.value)} required style={inputStyle}>
                  <option value="">Select student</option>
                  {students.map((s) => <option key={s.id} value={s.id}>{s.name} ({s.email})</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Course (optional)</label>
                <select value={courseId} onChange={(e) => setCourseId(e.target.value)} style={inputStyle}>
                  <option value="">No specific course</option>
                  {courses.map((c) => <option key={c.id} value={c.id}>{c.title_en}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Amount (SAR)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min={0} style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Package (optional)</label>
                <input value={pkg} onChange={(e) => setPkg(e.target.value)} placeholder="e.g. 8 Sessions" style={inputStyle} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Method</label>
                <select value={method} onChange={(e) => setMethod(e.target.value)} style={inputStyle}>
                  <option>Bank Transfer</option>
                  <option>Cash</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <button type="submit" disabled={submitting} className="btn-gold" style={{ justifyContent: "center", padding: 12 }}>
              {submitting ? "Saving..." : "Save Payment"}
            </button>
          </form>
        )}

        {/* Payments list */}
        {loading ? (
          <p style={{ color: "var(--text-muted)" }}>Loading...</p>
        ) : payments.length === 0 ? (
          <div className="card" style={{ padding: 40, textAlign: "center" }}>
            <p style={{ color: "var(--text-muted)" }}>No payments recorded yet</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {payments.map((p) => (
              <div key={p.id} className="card" style={{ padding: 16, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "var(--cream)" }}>{p.student?.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                    {p.course?.title_en || "General payment"}{p.package ? ` · ${p.package}` : ""} · {p.method}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div className="font-display" style={{ fontSize: 18, fontWeight: 800, color: "var(--gold)" }}>{p.amount} {p.currency}</div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
