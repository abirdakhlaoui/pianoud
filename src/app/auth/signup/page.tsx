"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep]             = useState<1|2>(1)
  const [name, setName]             = useState("")
  const [email, setEmail]           = useState("")
  const [password, setPassword]     = useState("")
  const [instrument, setInstrument] = useState<string>("")
  const [level, setLevel]           = useState<"BEGINNER"|"INTERMEDIATE"|"ADVANCED"|"">("")
  const [error, setError]           = useState("")
  const [loading, setLoading]       = useState(false)

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email || !password) return
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }
    setError("")
    setStep(2)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!instrument || !level) { setError("Please select your instrument and level"); return }
    setLoading(true)
    setError("")

    const res  = await fetch("/api/auth/register", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ name, email, password, instrument, level }),
    })
    const data = await res.json()
    setLoading(false)

    if (!res.ok) {
      setError(data.error || "Something went wrong.")
      setStep(1)
    } else {
      const redirect = "/dashboard"
      router.push(`/auth/signin?registered=true&redirect=${redirect}`)
    }
  }

  return (
    <main style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      justifyContent:"center", padding:24,
      background:"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 60%), var(--ink)",
    }}>
      <div style={{ width:"100%", maxWidth: step===2 ? 560 : 420 }}>

        {/* Logo */}
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <Link href="/" style={{ textDecoration:"none" }}>
            <span className="font-display gradient-text" style={{ fontSize:32, fontWeight:700 }}>Pianoud</span>
          </Link>
          <p style={{ color:"var(--text-muted)", fontSize:14, marginTop:8 }}>
            {step===1 ? "Start your musical journey today" : "What do you want to learn?"}
          </p>
        </div>

        {/* Step indicators */}
        <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, marginBottom:28 }}>
          {[1,2].map((s) => (
            <div key={s} style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:32, height:32, borderRadius:"50%",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:13, fontWeight:700,
                background: step >= s ? "var(--gold)" : "var(--ink-soft)",
                color: step >= s ? "#0A0A0A" : "var(--text-muted)",
                border:`1px solid ${step >= s ? "var(--gold)" : "var(--border)"}`,
              }}>
                {step > s ? "✓" : s}
              </div>
              {s < 2 && <div style={{ width:40, height:1, background: step > s ? "var(--gold)" : "var(--border)" }}/>}
            </div>
          ))}
        </div>

        <div className="card" style={{ padding:36 }}>

          {error && (
            <div style={{ background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", borderRadius:8, padding:"12px 16px", fontSize:14, color:"#f87171", marginBottom:20 }}>
              {error}
            </div>
          )}

          {/* Step 1 — Account info */}
          {step === 1 && (
            <>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
                Create Account
              </h1>
              <form onSubmit={handleStep1} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Full Name</label>
                  <input type="text" value={name} onChange={e=>setName(e.target.value)} required
                    placeholder="Your name" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Email</label>
                  <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required
                    placeholder="you@example.com" style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
                <div>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>Password</label>
                  <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required
                    placeholder="At least 8 characters" minLength={8} style={inputStyle}
                    onFocus={e=>e.target.style.borderColor="var(--gold)"}
                    onBlur={e =>e.target.style.borderColor="var(--border)"} />
                </div>
                <button type="submit" className="btn-gold"
                  style={{ width:"100%", justifyContent:"center", padding:14, fontSize:15, marginTop:4 }}>
                  Continue →
                </button>
              </form>
            </>
          )}

          {/* Step 2 — Instrument & level */}
          {step === 2 && (
            <>
              <h1 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                Choose your path
              </h1>
              <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:28 }}>
                This helps us personalise your learning experience.
              </p>

              <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:24 }}>

                {/* Instrument selection */}
                <div>
                  <label style={{ fontSize:13, fontWeight:600, color:"var(--cream)", display:"block", marginBottom:14 }}>
                    Which instrument do you want to learn?
                  </label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {[
                      { key:"PIANO",   icon:"🎹", label:"Piano",                    desc:"Classical, Arabic, Jazz" },
                      { key:"OUD",     icon:"🪘", label:"Oud",                      desc:"Arabic, Maqam, Andalusian" },
                      { key:"MAQAMAT", icon:"🎶", label:"Arabic Music Theory",      desc:"Maqamat & theory" },
                      { key:"ABRSM",   icon:"📘", label:"Music Theory ABRSM",       desc:"Western theory exams" },
                      { key:"HARMONY", icon:"🎼", label:"Harmony & Counterpoint",   desc:"For musicians only" },
                    ].map((opt: any) => (
                      <button key={opt.key} type="button" onClick={() => setInstrument(opt.key as any)} style={{
                        padding:"18px 12px", borderRadius:12, cursor:"pointer",
                        border:"2px solid",
                        borderColor: instrument===opt.key ? "var(--gold)" : "var(--border)",
                        background: instrument===opt.key ? "rgba(201,168,76,0.08)" : "var(--ink)",
                        transition:"all 0.2s",
                        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                      }}>
                        <span style={{ fontSize:32 }}>{opt.icon}</span>
                        <span style={{ fontSize:14, fontWeight:700, color: instrument===opt.key ? "var(--gold)" : "var(--cream)" }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize:11, color:"var(--text-muted)", textAlign:"center", lineHeight:1.4 }}>
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level selection */}
                <div>
                  <label style={{ fontSize:13, fontWeight:600, color:"var(--cream)", display:"block", marginBottom:14 }}>
                    What is your current level?
                  </label>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                    {[
                      { key:"BEGINNER",     icon:"🌱", label:"Beginner",     desc:"No experience yet" },
                      { key:"INTERMEDIATE", icon:"🌿", label:"Intermediate", desc:"Some basics known" },
                      { key:"ADVANCED",     icon:"🌳", label:"Advanced",     desc:"Looking to master" },
                    ].map((opt: any) => (
                      <button key={opt.key} type="button" onClick={() => setLevel(opt.key as any)} style={{
                        padding:"18px 12px", borderRadius:12, cursor:"pointer",
                        border:"2px solid",
                        borderColor: level===opt.key ? "var(--gold)" : "var(--border)",
                        background: level===opt.key ? "rgba(201,168,76,0.08)" : "var(--ink)",
                        transition:"all 0.2s",
                        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                      }}>
                        <span style={{ fontSize:28 }}>{opt.icon}</span>
                        <span style={{ fontSize:13, fontWeight:700, color: level===opt.key ? "var(--gold)" : "var(--cream)" }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize:11, color:"var(--text-muted)", textAlign:"center", lineHeight:1.4 }}>
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                {/* Don't know your level? — free assessment */}
                <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 20px", borderRadius:12, background:"rgba(201,168,76,0.06)", border:"1px solid rgba(201,168,76,0.25)", flexWrap:"wrap" }}>
                  <span style={{ fontSize:26 }}>🎯</span>
                  <div style={{ flex:1, minWidth:180 }}>
                    <p style={{ fontSize:14, fontWeight:700, color:"var(--cream)", marginBottom:2 }}>
                      Not sure about your level?
                    </p>
                    <p style={{ fontSize:12, color:"var(--text-muted)" }}>
                      Book a free 20-min assessment session — no commitment.
                    </p>
                  </div>
                  <a href="/booking?plan=assessment" className="btn-gold" style={{ padding:"10px 20px", fontSize:13, flexShrink:0, textDecoration:"none" }}>
                    Book Free Assessment
                  </a>
                </div>

                <div style={{ display:"flex", gap:12 }}>
                  <button type="button" onClick={() => setStep(1)} className="btn-outline"
                    style={{ padding:"13px 24px", fontSize:14 }}>
                    ← Back
                  </button>
                  <button type="submit" disabled={!instrument || !level || loading} className="btn-gold"
                    style={{ flex:1, justifyContent:"center", padding:14, fontSize:15,
                      opacity: !instrument || !level || loading ? 0.6 : 1 }}>
                    {loading ? "Creating account..." : "Start Learning 🎵"}
                  </button>
                </div>

              </form>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ display:"flex", alignItems:"center", gap:12, margin:"24px 0" }}>
                <div className="gold-line" style={{ flex:1 }}/>
                <span style={{ fontSize:12, color:"var(--text-muted)" }}>already have an account?</span>
                <div className="gold-line" style={{ flex:1 }}/>
              </div>
              <Link href="/auth/signin" className="btn-outline"
                style={{ width:"100%", justifyContent:"center", padding:13, fontSize:14 }}>
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
