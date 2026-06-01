"use client"

import { useState } from "react"
import { signIn, getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignInPage() {
  const router = useRouter()
  const [email, setEmail]       = useState("")
  const [password, setPassword] = useState("")
  const [error, setError]       = useState("")
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await signIn("credentials", { email, password, redirect: false })

    if (res?.error) {
      setError("Invalid email or password.")
      setLoading(false)
      return
    }

    const session = await getSession()
    const role = (session?.user as any)?.role

    if (role === "ADMIN")            router.push("/dashboard/admin")
    else if (role === "INSTRUCTOR")  router.push("/dashboard/instructor")
    else                             router.push("/dashboard")
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "12px 16px", borderRadius: 8,
    border: "1px solid var(--border)", background: "var(--ink)",
    color: "var(--cream)", fontSize: 14, outline: "none",
    transition: "border-color 0.2s",
  }

  return (
    <main style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: 24,
      background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), var(--ink)",
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>

        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span className="font-display gradient-text" style={{ fontSize: 32, fontWeight: 700 }}>Pianoud</span>
          </Link>
          <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 8 }}>Welcome back</p>
        </div>

        <div className="card" style={{ padding: 36 }}>
          <h1 className="font-display" style={{ fontSize: 26, fontWeight: 600, color: "var(--cream)", marginBottom: 28 }}>
            Sign In
          </h1>

          {error && (
            <div style={{ background: "rgba(248,113,113,0.1)", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 8, padding: "12px 16px", fontSize: 14, color: "#f87171", marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)", display: "block", marginBottom: 8 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="you@example.com" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "var(--border)"} />
            </div>

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "var(--text-muted)" }}>Password</label>
                <Link href="/auth/forgot-password" style={{ fontSize: 12, color: "var(--gold)", textDecoration: "none", fontWeight: 500 }}>
                  Forgot password?
                </Link>
              </div>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                placeholder="••••••••" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "var(--gold)"}
                onBlur={e  => e.target.style.borderColor = "var(--border)"} />
            </div>

            <button type="submit" disabled={loading} className="btn-gold"
              style={{ width: "100%", justifyContent: "center", padding: 14, fontSize: 15, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0" }}>
            <div className="gold-line" style={{ flex: 1 }} />
            <span style={{ fontSize: 12, color: "var(--text-muted)" }}>new here?</span>
            <div className="gold-line" style={{ flex: 1 }} />
          </div>

          <Link href="/auth/signup" className="btn-outline"
            style={{ width: "100%", justifyContent: "center", padding: 13, fontSize: 14 }}>
            Create Account
          </Link>
        </div>
      </div>
    </main>
  )
}
