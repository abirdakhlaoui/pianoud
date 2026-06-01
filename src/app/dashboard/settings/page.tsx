"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { useLang } from "@/components/providers/LangProvider"
import { useTheme } from "@/components/providers/ThemeProvider"
import Link from "next/link"

const THEMES = [
  { key:"dark",  icon:"🌙", en:"Dark",  ar:"داكن" },
  { key:"light", icon:"☀️", en:"Light", ar:"فاتح" },
  { key:"gold",  icon:"✨", en:"Gold",  ar:"ذهبي" },
] as const

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const { lang, setLang, isAr }   = useLang()
  const { theme, setTheme }       = useTheme()
  const user = session?.user as any

  const [name, setName]           = useState(user?.name || "")
  const [email]                   = useState(user?.email || "")
  const [currentPwd, setCurrentPwd] = useState("")
  const [newPwd, setNewPwd]       = useState("")
  const [confirmPwd, setConfirmPwd] = useState("")
  const [nameLoading, setNameLoading] = useState(false)
  const [pwdLoading, setPwdLoading]   = useState(false)
  const [nameMsg, setNameMsg]     = useState<{type:"success"|"error";text:string}|null>(null)
  const [pwdMsg, setPwdMsg]       = useState<{type:"success"|"error";text:string}|null>(null)

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"12px 16px", borderRadius:8,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
  }

  async function handleUpdateName(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || name.trim().length < 2) {
      setNameMsg({ type:"error", text: isAr ? "الاسم يجب أن يكون حرفين على الأقل" : "Name must be at least 2 characters" })
      return
    }
    setNameLoading(true)
    setNameMsg(null)
    try {
      const res = await fetch("/api/user/update", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name: name.trim() }),
      })
      const data = await res.json()
      if (res.ok) {
        await update({ name: name.trim() })
        setNameMsg({ type:"success", text: isAr ? "تم تحديث الاسم بنجاح ✓" : "Name updated successfully ✓" })
      } else {
        setNameMsg({ type:"error", text: data.error || "Error" })
      }
    } catch {
      setNameMsg({ type:"error", text: "Server error" })
    }
    setNameLoading(false)
  }

  async function handleUpdatePassword(e: React.FormEvent) {
    e.preventDefault()
    if (newPwd.length < 8) {
      setPwdMsg({ type:"error", text: isAr ? "كلمة المرور يجب أن تكون 8 أحرف على الأقل" : "Password must be at least 8 characters" })
      return
    }
    if (newPwd !== confirmPwd) {
      setPwdMsg({ type:"error", text: isAr ? "كلمتا المرور غير متطابقتين" : "Passwords do not match" })
      return
    }
    setPwdLoading(true)
    setPwdMsg(null)
    try {
      const res = await fetch("/api/user/password", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ currentPassword: currentPwd, newPassword: newPwd }),
      })
      const data = await res.json()
      if (res.ok) {
        setPwdMsg({ type:"success", text: isAr ? "تم تغيير كلمة المرور بنجاح ✓" : "Password changed successfully ✓" })
        setCurrentPwd(""); setNewPwd(""); setConfirmPwd("")
      } else {
        setPwdMsg({ type:"error", text: data.error || "Error" })
      }
    } catch {
      setPwdMsg({ type:"error", text: "Server error" })
    }
    setPwdLoading(false)
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container" style={{ maxWidth:700 }}>

        {/* Header */}
        <div style={{ marginBottom:40 }}>
          <Link href="/dashboard" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr ? "العودة للوحة" : "Back to Dashboard"}
          </Link>
          <h1 className="font-display" style={{ fontSize:40, fontWeight:400, color:"var(--cream)", marginTop:12 }}>
            {isAr ? "الإعدادات" : "Settings"}
          </h1>
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:24 }}>

          {/* Profile info */}
          <div className="card" style={{ padding:32 }} dir={isAr?"rtl":"ltr"}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              {isAr ? "المعلومات الشخصية" : "Profile Information"}
            </h2>

            {/* Avatar */}
            <div style={{ display:"flex", alignItems:"center", gap:20, marginBottom:28 }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:28, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)" }}>{user?.name}</div>
                <div style={{ fontSize:13, color:"var(--text-muted)", marginTop:2 }}>{user?.email}</div>
                <div style={{ fontSize:10, fontWeight:700, marginTop:6, padding:"2px 8px", borderRadius:4, display:"inline-block", letterSpacing:1.5, textTransform:"uppercase",
                  background: user?.role==="ADMIN" ? "rgba(248,113,113,0.15)" : user?.role==="INSTRUCTOR" ? "rgba(96,165,250,0.15)" : "rgba(52,211,153,0.15)",
                  color: user?.role==="ADMIN" ? "#f87171" : user?.role==="INSTRUCTOR" ? "#60a5fa" : "#34d399",
                }}>
                  {user?.role}
                </div>
              </div>
            </div>

            <form onSubmit={handleUpdateName} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} style={inputStyle}
                  onFocus={e => e.target.style.borderColor="var(--gold)"}
                  onBlur={e  => e.target.style.borderColor="var(--border)"} />
              </div>
              <div>
                <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                  {isAr ? "البريد الإلكتروني" : "Email"}
                </label>
                <input type="email" value={email} disabled style={{ ...inputStyle, opacity:0.5, cursor:"not-allowed" }} />
                <p style={{ fontSize:11, color:"var(--text-muted)", marginTop:6 }}>
                  {isAr ? "لا يمكن تغيير البريد الإلكتروني" : "Email cannot be changed"}
                </p>
              </div>

              {nameMsg && (
                <div style={{ padding:"12px 16px", borderRadius:8, fontSize:13,
                  background: nameMsg.type==="success" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                  border: `1px solid ${nameMsg.type==="success" ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
                  color: nameMsg.type==="success" ? "#34d399" : "#f87171",
                }}>
                  {nameMsg.text}
                </div>
              )}

              <button type="submit" disabled={nameLoading} className="btn-gold"
                style={{ alignSelf:"flex-start", padding:"11px 28px", fontSize:14, opacity:nameLoading?0.7:1 }}>
                {nameLoading ? (isAr?"جاري الحفظ...":"Saving...") : (isAr?"حفظ التغييرات":"Save Changes")}
              </button>
            </form>
          </div>

          {/* Change password */}
          <div className="card" style={{ padding:32 }} dir={isAr?"rtl":"ltr"}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:24 }}>
              {isAr ? "تغيير كلمة المرور" : "Change Password"}
            </h2>

            <form onSubmit={handleUpdatePassword} style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {[
                { label_en:"Current Password", label_ar:"كلمة المرور الحالية", value:currentPwd, onChange:setCurrentPwd },
                { label_en:"New Password",     label_ar:"كلمة المرور الجديدة", value:newPwd,     onChange:setNewPwd     },
                { label_en:"Confirm Password", label_ar:"تأكيد كلمة المرور",   value:confirmPwd, onChange:setConfirmPwd },
              ].map((field: any) => (
                <div key={field.label_en}>
                  <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                    {isAr ? field.label_ar : field.label_en}
                  </label>
                  <input type="password" value={field.value} onChange={e => field.onChange(e.target.value)}
                    placeholder="••••••••" style={inputStyle}
                    onFocus={e => e.target.style.borderColor="var(--gold)"}
                    onBlur={e  => e.target.style.borderColor="var(--border)"} />
                </div>
              ))}

              {pwdMsg && (
                <div style={{ padding:"12px 16px", borderRadius:8, fontSize:13,
                  background: pwdMsg.type==="success" ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)",
                  border: `1px solid ${pwdMsg.type==="success" ? "rgba(52,211,153,0.3)" : "rgba(248,113,113,0.3)"}`,
                  color: pwdMsg.type==="success" ? "#34d399" : "#f87171",
                }}>
                  {pwdMsg.text}
                </div>
              )}

              <button type="submit" disabled={pwdLoading} className="btn-gold"
                style={{ alignSelf:"flex-start", padding:"11px 28px", fontSize:14, opacity:pwdLoading?0.7:1 }}>
                {pwdLoading ? (isAr?"جاري التغيير...":"Changing...") : (isAr?"تغيير كلمة المرور":"Change Password")}
              </button>
            </form>
          </div>

          {/* Appearance */}
          <div className="card" style={{ padding:32 }} dir={isAr?"rtl":"ltr"}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              {isAr ? "المظهر" : "Appearance"}
            </h2>
            <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
              {isAr ? "اختر مظهر المنصة المفضل لديك" : "Choose your preferred theme"}
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
              {THEMES.map((t: any) => (
                <button key={t.key} onClick={() => setTheme(t.key)} style={{
                  padding:"20px 16px", borderRadius:12, cursor:"pointer",
                  border:"2px solid",
                  borderColor: theme===t.key ? "var(--gold)" : "var(--border)",
                  background: theme===t.key ? "var(--gold-pale)" : "var(--ink)",
                  transition:"all 0.2s",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                }}>
                  <span style={{ fontSize:28 }}>{t.icon}</span>
                  <span style={{ fontSize:13, fontWeight:600, color: theme===t.key ? "var(--gold)" : "var(--text-muted)" }}>
                    {isAr ? t.ar : t.en}
                  </span>
                  {theme===t.key && (
                    <span style={{ fontSize:11, color:"var(--gold)" }}>✓ {isAr?"مفعّل":"Active"}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="card" style={{ padding:32 }}>
            <h2 className="font-display" style={{ fontSize:20, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              {isAr ? "اللغة" : "Language"}
            </h2>
            <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
              {isAr ? "اختر لغة المنصة" : "Choose the platform language"}
            </p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {[
                { key:"en", label:"English", native:"English", flag:"🇬🇧" },
                { key:"ar", label:"Arabic",  native:"عربي",    flag:"🇸🇦" },
              ].map((l: any) => (
                <button key={l.key} onClick={() => setLang(l.key as "en"|"ar")} style={{
                  padding:"20px", borderRadius:12, cursor:"pointer",
                  border:"2px solid",
                  borderColor: lang===l.key ? "var(--gold)" : "var(--border)",
                  background: lang===l.key ? "var(--gold-pale)" : "var(--ink)",
                  transition:"all 0.2s",
                  display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                }}>
                  <span style={{ fontSize:28 }}>{l.flag}</span>
                  <span style={{ fontSize:13, fontWeight:600, color: lang===l.key ? "var(--gold)" : "var(--text-muted)" }}>
                    {l.native}
                  </span>
                  {lang===l.key && (
                    <span style={{ fontSize:11, color:"var(--gold)" }}>✓ {isAr?"مفعّل":"Active"}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
