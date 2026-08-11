"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function NewUserPage() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"STUDENT" | "INSTRUCTOR" | "ADMIN">("STUDENT")
  const [instrument, setInstrument] = useState<"PIANO" | "OUD">("PIANO")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--ink)",
    color: "var(--cream)", fontSize: 14, outline: "none",
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/users/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role, instrument: role === "INSTRUCTOR" ? instrument : undefined }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Something went wrong")
        setLoading(false)
        return
      }
      setSuccess(true)
      setTimeout(() => router.push("/dashboard/admin/users"), 1200)
    } catch {
      setError("Server error")
      setLoading(false)
    }
  }

  return (
    <main style={{ minHeight: "100vh", paddingTop: 100, paddingBottom: 60, background: "var(--ink)" }}>
      <div className="container" style={{ maxWidth: 500 }}>
        <Link href="/dashboard/admin/users" style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none" }}>
          ← Back to Users
        </Link>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 400, color: "var(--cream)", margin: "12px 0 32px" }}>
          Create New User
        </h1>

        {success ? (
          <div className="card" style={{ padding: 32, textAlign: "center" }}>
            <span style={{ fontSize: 40, display: "block", marginBottom: 10 }}>✅</span>
            <p style={{ color: "var(--cream)", fontWeight: 600 }}>User created successfully!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="card" style={{ padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
            {error && (
              <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, padding: "10px 14px", fontSize: 13, color: "#f87171" }}>
                {error}
              </div>
            )}
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} style={inputStyle} />
            </div>
            <div>
              <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value as any)} style={inputStyle}>
                <option value="STUDENT">Student</option>
                <option value="INSTRUCTOR">Instructor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            {role === "INSTRUCTOR" && (
              <div>
                <label style={{ fontSize: 13, color: "var(--text-muted)", display: "block", marginBottom: 6 }}>Instrument</label>
                <select value={instrument} onChange={(e) => setInstrument(e.target.value as any)} style={inputStyle}>
                  <option value="PIANO">Piano</option>
                  <option value="OUD">Oud</option>
                </select>
              </div>
            )}
            <button type="submit" disabled={loading} className="btn-gold" style={{ justifyContent: "center", padding: 14, marginTop: 8 }}>
              {loading ? "Creating..." : "Create User"}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
