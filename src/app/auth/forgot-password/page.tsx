"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

type Step = "email" | "code" | "password" | "done"

export default function ForgotPasswordPage() {
  const router  = useRouter()
  const [step, setStep]         = useState<Step>("email")
  const [email, setEmail]       = useState("")
  const [code, setCode]         = useState("")
  const [newPwd, setNewPwd]     = useState("")
  const [confirmPwd, setConfirm] = useState("")
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState("")

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s", textAlign:"center",
  }

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true); setError("")
    const res  = await fetch("/api/auth/forgot-password", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    setStep("code")
  }

  async function handleCodeSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (code.length !== 6) { setError("Enter the 6-digit code"); return }
    setError("")
    setStep("password")
  }

  async function handlePasswordSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (newPwd.length < 8) { setError("Password must be at least 8 characters"); return }
    if (newPwd !== confirmPwd) { setError("Passwords do not match"); return }
    setLoading(true); setError("")
    const res  = await fetch("/api/auth/reset-password", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ email, code, newPassword: newPwd }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.error); return }
    setStep("done")
    setTimeout(() => router.push("/auth/signin"), 3000)
  }

  return (
    <main style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", padding:24,
      background:"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), var(--ink)",
    }}>
      <div style={{ width:"100%", maxWidth:420 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <Link href="/" style={{ textDecoration:"none" }}>
            <span className="font-display gradient-text" style={{ fontSize:32, fontWeight:700 }}>Pianoud</span>
          </Link>
        </div>

        <div className="card" style={{ padding:36 }}>

          {/* Step indicators */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:28 }}>
            {["email","code","password"].map((s, i) => (
              <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{
                  width:28, height:28, borderRadius:"50%",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:12, fontWeight:700,
                  background: ["email","code","password","done"].indexOf(step) >= i ? "var(--gold)" : "var(--ink-soft)",
                  color: ["email","code","password","done"].indexOf(step) >= i ? "#0A0A0A" : "var(--text-muted)",
                  border: `1px solid ${["email","code","password","done"].indexOf(step) >= i ? "var(--gold)" : "var(--border)"}`,
                }}>
                  {["email","code","password","done"].indexOf(step) > i ? "✓" : i+1}
                </div>
                {i < 2 && <div style={{ width:24, height:1, background: ["email","code","password","done"].indexOf(step) > i ? "var(--gold)" : "var(--border)" }}/>}
              </div>
            ))}
          </div>

          {/* ── Step 1: Email ── */}
          {step === "email" && (
            <>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                Forgot Password?
              </h1>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24, lineHeight:1.6 }}>
                Enter your email and we'll send you a 6-digit reset code.
              </p>
              <form onSubmit={handleEmailSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Email Address</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com" style={{ ...inputStyle, textAlign:"left" }}
                    onFocus={e => e.target.style.borderColor="var(--gold)"}
                    onBlur={e  => e.target.style.borderColor="var(--border)"} />
                </div>
                {error && <p style={{ fontSize:13, color:"#f87171", padding:"10px 14px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)" }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15, opacity:loading?0.7:1 }}>
                  {loading ? "Sending..." : "Send Reset Code →"}
                </button>
              </form>
            </>
          )}

          {/* ── Step 2: Code ── */}
          {step === "code" && (
            <>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                Check your email
              </h1>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24, lineHeight:1.6 }}>
                We sent a 6-digit code to <strong style={{ color:"var(--gold)" }}>{email}</strong>
              </p>
              <form onSubmit={handleCodeSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>6-Digit Code</label>
                  <input
                    type="text" value={code}
                    onChange={e => setCode(e.target.value.replace(/\D/g,"").slice(0,6))}
                    placeholder="000000" maxLength={6}
                    style={{ ...inputStyle, fontSize:32, fontWeight:800, letterSpacing:10, color:"var(--gold)" }}
                    onFocus={e => e.target.style.borderColor="var(--gold)"}
                    onBlur={e  => e.target.style.borderColor="var(--border)"} />
                </div>
                {error && <p style={{ fontSize:13, color:"#f87171", padding:"10px 14px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)" }}>{error}</p>}
                <button type="submit" className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15 }}>
                  Verify Code →
                </button>
                <button type="button" onClick={() => { setStep("email"); setError("") }}
                  style={{ background:"none", border:"none", color:"var(--text-muted)", fontSize:13, cursor:"pointer" }}>
                  ← Resend code
                </button>
              </form>
            </>
          )}

          {/* ── Step 3: New password ── */}
          {step === "password" && (
            <>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                New Password
              </h1>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24 }}>
                Choose a strong password for your account.
              </p>
              <form onSubmit={handlePasswordSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                {[
                  { label:"New Password",     value:newPwd,     set:setNewPwd     },
                  { label:"Confirm Password", value:confirmPwd, set:setConfirm    },
                ].map(f => (
                  <div key={f.label}>
                    <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>{f.label}</label>
                    <input type="password" value={f.value} onChange={e => f.set(e.target.value)}
                      placeholder="••••••••" minLength={8}
                      style={{ ...inputStyle, textAlign:"left" }}
                      onFocus={e => e.target.style.borderColor="var(--gold)"}
                      onBlur={e  => e.target.style.borderColor="var(--border)"} />
                  </div>
                ))}
                {error && <p style={{ fontSize:13, color:"#f87171", padding:"10px 14px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)" }}>{error}</p>}
                <button type="submit" disabled={loading} className="btn-gold" style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15, opacity:loading?0.7:1 }}>
                  {loading ? "Saving..." : "Reset Password →"}
                </button>
              </form>
            </>
          )}

          {/* ── Step 4: Done ── */}
          {step === "done" && (
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <div style={{ fontSize:60, marginBottom:20 }}>🎉</div>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:12 }}>
                Password Reset!
              </h1>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:24, lineHeight:1.6 }}>
                Your password has been reset successfully. Redirecting to sign in...
              </p>
              <div style={{ width:"100%", height:3, background:"var(--ink-soft)", borderRadius:2, overflow:"hidden" }}>
                <div style={{ height:"100%", background:"var(--gold)", borderRadius:2, animation:"progress 3s linear forwards" }}/>
              </div>
            </div>
          )}

          {step !== "done" && (
            <div style={{ textAlign:"center", marginTop:24 }}>
              <Link href="/auth/signin" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
                ← Back to Sign In
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </main>
  )
}
