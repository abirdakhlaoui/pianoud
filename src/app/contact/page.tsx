"use client"

import { useState } from "react"
import { useLang } from "@/components/providers/LangProvider"

export default function ContactPage() {
  const { isAr } = useLang()
  const [form, setForm]       = useState({ name:"", email:"", subject:"", message:"" })
  const [loading, setLoading] = useState(false)
  const [sent, setSent]       = useState(false)
  const [error, setError]     = useState("")

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/contact", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify(form),
    })

    setLoading(false)
    if (res.ok) {
      setSent(true)
    } else {
      setError(isAr ? "حدث خطأ. حاول مرة أخرى." : "Something went wrong. Please try again.")
    }
  }

  const inputStyle: React.CSSProperties = {
    width:"100%", padding:"13px 16px", borderRadius:10,
    border:"1px solid var(--border)", background:"var(--ink)",
    color:"var(--cream)", fontSize:14, outline:"none",
    transition:"border-color 0.2s",
    fontFamily:"var(--font-body)",
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }} dir={isAr?"rtl":"ltr"}>
      <div className="container" style={{ maxWidth:1100 }}>

        {/* Header */}
        <div style={{ textAlign:"center", marginBottom:72 }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12, marginBottom:16 }}>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
            <span style={{ fontSize:11, fontWeight:700, color:"var(--gold)", letterSpacing:4, textTransform:"uppercase" }}>
              {isAr ? "تواصل معنا" : "Contact Us"}
            </span>
            <div style={{ width:32, height:1, background:"var(--gold)", opacity:0.6 }}/>
          </div>
          <h1 className="font-display" style={{ fontSize:"clamp(36px,6vw,64px)", fontWeight:400, color:"var(--cream)", marginBottom:16 }}>
            {isAr
              ? <>نحن هنا <span className="gradient-text" style={{fontWeight:800}}>للمساعدة</span></>
              : <>We are here <span className="gradient-text" style={{fontWeight:800}}>to help</span></>}
          </h1>
          <p style={{ fontSize:16, color:"var(--text-muted)", maxWidth:520, margin:"0 auto", lineHeight:1.8 }}>
            {isAr
              ? "هل لديك سؤال عن دورة أو تحتاج مساعدة؟ فريقنا جاهز للرد عليك خلال 24 ساعة."
              : "Have a question about a course or need help? Our team will reply within 24 hours."}
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1.6fr", gap:48, alignItems:"start" }} className="contact-grid">

          {/* Left — info */}
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>

            {/* Contact cards */}
            {[
              {
                icon:"📧",
                title_en:"Email",          title_ar:"البريد الإلكتروني",
                value:"contact@pianoud.com",
                desc_en:"We reply within 24h", desc_ar:"نرد خلال 24 ساعة",
              },
              {
                icon:"📱",
                title_en:"WhatsApp",       title_ar:"واتساب",
                value:"+966 50 000 0000",
                desc_en:"Available 9am–9pm GST", desc_ar:"متاح 9 صباحاً – 9 مساءً",
              },
              {
                icon:"📍",
                title_en:"Location",       title_ar:"الموقع",
                value: isAr ? "المملكة العربية السعودية • تونس" : "Saudi Arabia • Tunisia",
                desc_en:"Online platform, worldwide", desc_ar:"منصة أونلاين — عالمياً",
              },
              {
                icon:"🕐",
                title_en:"Response Time",  title_ar:"وقت الاستجابة",
                value: isAr ? "أقل من 24 ساعة" : "Less than 24 hours",
                desc_en:"Mon–Sat, 9am–9pm", desc_ar:"الاثنين – السبت",
              },
            ].map((item: any, i: any) => (
              <div key={i} className="card" style={{ padding:24, display:"flex", gap:16, alignItems:"flex-start" }}>
                <div style={{ width:48, height:48, borderRadius:12, background:"var(--gold-pale)", border:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0 }}>
                  {item.icon}
                </div>
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:"var(--gold)", letterSpacing:1, textTransform:"uppercase", marginBottom:4 }}>
                    {isAr ? item.title_ar : item.title_en}
                  </p>
                  <p style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:2 }}>{item.value}</p>
                  <p style={{ fontSize:12, color:"var(--text-muted)" }}>{isAr ? item.desc_ar : item.desc_en}</p>
                </div>
              </div>
            ))}

            {/* Social links */}
            <div className="card" style={{ padding:24 }}>
              <p style={{ fontSize:13, fontWeight:600, color:"var(--cream)", marginBottom:16 }}>
                {isAr ? "تابعنا على" : "Follow us on"}
              </p>
              <div style={{ display:"flex", gap:12 }}>
                {[
                  { label:"YouTube",   icon:"▶", color:"#f87171", href:"#" },
                  { label:"Instagram", icon:"◈", color:"#c084fc", href:"#" },
                  { label:"Facebook",  icon:"f", color:"#60a5fa", href:"#" },
                ].map((s: any) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 16px", borderRadius:8, border:"1px solid var(--border)", textDecoration:"none", transition:"all 0.2s", background:"var(--ink)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor=s.color; (e.currentTarget as HTMLElement).style.color=s.color }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor="var(--border)"; (e.currentTarget as HTMLElement).style.color="var(--text-muted)" }}>
                    <span style={{ fontSize:14, color:"inherit" }}>{s.icon}</span>
                    <span style={{ fontSize:13, fontWeight:500, color:"inherit" }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="card" style={{ padding:36 }}>
            {sent ? (
              <div style={{ textAlign:"center", padding:"48px 0" }}>
                <div style={{ fontSize:64, marginBottom:20 }}>🎉</div>
                <h2 className="font-display" style={{ fontSize:28, fontWeight:600, color:"var(--cream)", marginBottom:12 }}>
                  {isAr ? "تم الإرسال!" : "Message Sent!"}
                </h2>
                <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.7, marginBottom:28 }}>
                  {isAr
                    ? "شكراً لتواصلك! سنرد عليك خلال 24 ساعة على بريدك الإلكتروني."
                    : "Thank you for reaching out! We'll reply to your email within 24 hours."}
                </p>
                <button onClick={() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }) }}
                  className="btn-outline" style={{ padding:"12px 28px" }}>
                  {isAr ? "إرسال رسالة أخرى" : "Send Another Message"}
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display" style={{ fontSize:24, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
                  {isAr ? "أرسل لنا رسالة" : "Send us a message"}
                </h2>
                <p style={{ fontSize:14, color:"var(--text-muted)", marginBottom:28 }}>
                  {isAr ? "يسعدنا الإجابة على جميع أسئلتك." : "We'd love to answer all your questions."}
                </p>

                {error && (
                  <div style={{ padding:"12px 16px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:14, marginBottom:20 }}>
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:18 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                        {isAr ? "الاسم الكامل" : "Full Name"} *
                      </label>
                      <input type="text" value={form.name} onChange={e=>update("name",e.target.value)} required
                        placeholder={isAr?"اسمك الكامل":"Your name"} style={inputStyle}
                        onFocus={e=>e.target.style.borderColor="var(--gold)"}
                        onBlur={e =>e.target.style.borderColor="var(--border)"} />
                    </div>
                    <div>
                      <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                        {isAr ? "البريد الإلكتروني" : "Email"} *
                      </label>
                      <input type="email" value={form.email} onChange={e=>update("email",e.target.value)} required
                        placeholder={isAr?"بريدك الإلكتروني":"your@email.com"} style={inputStyle}
                        onFocus={e=>e.target.style.borderColor="var(--gold)"}
                        onBlur={e =>e.target.style.borderColor="var(--border)"} />
                    </div>
                  </div>

                  <div>
                    <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                      {isAr ? "الموضوع" : "Subject"} *
                    </label>
                    <select value={form.subject} onChange={e=>update("subject",e.target.value)} required
                      style={{ ...inputStyle, cursor:"pointer" }}>
                      <option value="">{isAr?"اختر الموضوع...":"Select a subject..."}</option>
                      <option value="course-question">{isAr?"سؤال عن دورة":"Question about a course"}</option>
                      <option value="payment">{isAr?"مشكلة في الدفع":"Payment issue"}</option>
                      <option value="technical">{isAr?"مشكلة تقنية":"Technical problem"}</option>
                      <option value="instructor">{isAr?"الانضمام كمدرّس":"Become an instructor"}</option>
                      <option value="partnership">{isAr?"شراكة أو تعاون":"Partnership"}</option>
                      <option value="other">{isAr?"موضوع آخر":"Other"}</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize:13, fontWeight:500, color:"var(--text-muted)", display:"block", marginBottom:8 }}>
                      {isAr ? "رسالتك" : "Message"} *
                    </label>
                    <textarea value={form.message} onChange={e=>update("message",e.target.value)} required rows={6}
                      placeholder={isAr
                        ? "اكتب رسالتك هنا بالتفصيل..."
                        : "Write your message here in detail..."}
                      style={{ ...inputStyle, resize:"vertical" }}
                      onFocus={e=>e.target.style.borderColor="var(--gold)"}
                      onBlur={e =>e.target.style.borderColor="var(--border)"} />
                  </div>

                  <button type="submit" disabled={loading} className="btn-gold"
                    style={{ width:"100%", justifyContent:"center", padding:16, fontSize:15, opacity:loading?0.7:1 }}>
                    {loading
                      ? (isAr?"جاري الإرسال...":"Sending...")
                      : (isAr?"إرسال الرسالة ✉️":"Send Message ✉️")}
                  </button>

                  <p style={{ fontSize:12, color:"var(--text-muted)", textAlign:"center" }}>
                    {isAr
                      ? "نحن نحترم خصوصيتك — لن نشارك بياناتك مع أي جهة."
                      : "We respect your privacy — your data will never be shared."}
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .contact-grid { grid-template-columns: 1fr 1.6fr; }
        @media(max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
