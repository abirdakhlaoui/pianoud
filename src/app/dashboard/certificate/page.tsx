"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams, useRouter } from "next/navigation"
import { useLang } from "@/components/providers/LangProvider"
import Link from "next/link"

function CertificateContent() {
  const { data: session, status } = useSession()
  const { isAr }                  = useLang()
  const searchParams              = useSearchParams()
  const router                    = useRouter()
  const slug                      = searchParams.get("slug")

  const [cert, setCert]       = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin")
      return
    }
    if (status === "authenticated") {
      const url = slug ? `/api/certificate?slug=${slug}` : "/api/certificate"
      fetch(url)
        .then(r => r.json())
        .then(data => {
          if (data.eligible) setCert(data)
          else setError(data.error || "Not eligible")
          setLoading(false)
        })
        .catch(() => { setError("Server error"); setLoading(false) })
    }
  }, [status, slug])

  if (status === "loading" || loading) return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <div style={{ fontSize:40, marginBottom:16 }}>🎓</div>
      <p style={{ color:"var(--text-muted)" }}>{isAr?"جاري التحميل...":"Loading..."}</p>
    </main>
  )

  if (error || !cert) return (
    <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
      <div style={{ maxWidth:400, margin:"0 auto", padding:24 }}>
        <div style={{ fontSize:64, marginBottom:16 }}>🎓</div>
        <h2 className="font-display" style={{ fontSize:24, color:"var(--cream)", marginBottom:12 }}>
          {isAr?"لا توجد شهادة":"No Certificate Yet"}
        </h2>
        <p style={{ color:"var(--text-muted)", marginBottom:12, lineHeight:1.7 }}>
          {isAr
            ? "يجب أن تكون مسجّلاً في دورة للحصول على شهادة."
            : "You need to be enrolled in a course to get a certificate."}
        </p>
        <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/dashboard" className="btn-gold" style={{ padding:"11px 24px" }}>
            {isAr?"لوحة التحكم":"Dashboard"}
          </Link>
          <Link href="/courses" className="btn-outline" style={{ padding:"11px 24px" }}>
            {isAr?"استعرض الدورات":"Browse Courses"}
          </Link>
        </div>
      </div>
    </main>
  )

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container" style={{ maxWidth:900 }}>

        {/* Actions */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:32 }} className="no-print">
          <Link href="/dashboard/progress" style={{ fontSize:13, color:"var(--text-muted)", textDecoration:"none" }}>
            ← {isAr?"تقدّمي":"My Progress"}
          </Link>
          <button onClick={() => window.print()} className="btn-gold" style={{ padding:"11px 28px", fontSize:14 }}>
            🖨️ {isAr?"طباعة / تحميل PDF":"Print / Download PDF"}
          </button>
        </div>

        {/* Certificate */}
        <div style={{
          background:"linear-gradient(135deg,#0A0A0A 0%,#111111 50%,#0A0A0A 100%)",
          border:"2px solid #C9A84C",
          borderRadius:16, padding:"60px 72px",
          position:"relative", overflow:"hidden",
          boxShadow:"0 0 0 8px rgba(201,168,76,0.05), 0 40px 100px rgba(0,0,0,0.6)",
        }}>

          {/* Corner decorations */}
          {[
            { top:20, left:20, borderTop:"2px solid #C9A84C", borderLeft:"2px solid #C9A84C" },
            { top:20, right:20, borderTop:"2px solid #C9A84C", borderRight:"2px solid #C9A84C" },
            { bottom:20, left:20, borderBottom:"2px solid #C9A84C", borderLeft:"2px solid #C9A84C" },
            { bottom:20, right:20, borderBottom:"2px solid #C9A84C", borderRight:"2px solid #C9A84C" },
          ].map((s,i) => (
            <div key={i} style={{ position:"absolute", width:40, height:40, ...s as any }}/>
          ))}

          {/* Background pattern */}
          <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:"repeating-linear-gradient(45deg,#C9A84C 0,#C9A84C 1px,transparent 0,transparent 50%)", backgroundSize:"20px 20px" }}/>

          <div style={{ textAlign:"center", position:"relative" }}>

            {/* Logo */}
            <div className="font-display" style={{ fontSize:30, fontWeight:700, background:"linear-gradient(135deg,#F0D878,#C9A84C,#8B6914)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", marginBottom:4 }}>
              Pianoud
            </div>
            <p style={{ fontSize:11, color:"rgba(201,168,76,0.5)", letterSpacing:4, textTransform:"uppercase", marginBottom:48 }}>
              ONLINE MUSIC ACADEMY
            </p>

            {/* Certificate title */}
            <p style={{ fontSize:13, fontWeight:600, color:"rgba(201,168,76,0.7)", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>
              {isAr ? "شهادة إتمام" : "Certificate of Completion"}
            </p>

            <div style={{ width:80, height:1, background:"linear-gradient(90deg,transparent,#C9A84C,transparent)", margin:"0 auto 32px" }}/>

            <p style={{ fontSize:16, color:"#8A8A7A", marginBottom:16 }}>
              {isAr ? "يُشهد بأن" : "This certifies that"}
            </p>

            <h1 className="font-display" style={{
              fontSize:"clamp(36px,6vw,60px)", fontWeight:700,
              background:"linear-gradient(135deg,#F0D878,#C9A84C)",
              WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", marginBottom:16, lineHeight:1.1,
            }}>
              {cert.studentName}
            </h1>

            <p style={{ fontSize:16, color:"#8A8A7A", marginBottom:16 }}>
              {isAr ? "قد أتمّ بنجاح دورة" : "has successfully completed the course"}
            </p>

            <h2 className="font-display" style={{ fontSize:"clamp(20px,4vw,32px)", fontWeight:600, color:"#F5F0E8", marginBottom:48, lineHeight:1.3 }}>
              {isAr ? cert.courseTitle_ar : cert.courseTitle_en}
            </h2>

            <div style={{ width:80, height:1, background:"linear-gradient(90deg,transparent,#C9A84C,transparent)", margin:"0 auto 40px" }}/>

            {/* Signatures */}
            <div style={{ display:"flex", justifyContent:"space-around", alignItems:"flex-end" }}>
              <div style={{ textAlign:"center" }}>
                <div style={{ width:120, height:1, background:"#C9A84C", marginBottom:8 }}/>
                <p style={{ fontSize:13, color:"#8A8A7A" }}>Ons Wafa Romdhani</p>
                <p style={{ fontSize:10, color:"#3A3A3A", letterSpacing:1 }}>PIANO INSTRUCTOR</p>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:8 }}>🎓</div>
                <p style={{ fontSize:12, color:"#5A5A4A" }}>{cert.date}</p>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ width:120, height:1, background:"#C9A84C", marginBottom:8 }}/>
                <p style={{ fontSize:13, color:"#8A8A7A" }}>Omar Algour</p>
                <p style={{ fontSize:10, color:"#3A3A3A", letterSpacing:1 }}>OUD INSTRUCTOR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate ID */}
        <p style={{ textAlign:"center", fontSize:12, color:"var(--text-muted)", marginTop:20 }}>
          Certificate ID: PIANOUD-{(cert.courseSlug || slug || "COURSE").toUpperCase()}-{new Date().getFullYear()}
        </p>

      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          header, footer, nav { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </main>
  )
}

export default function CertificatePage() {
  return (
    <Suspense fallback={
      <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
        <p style={{ color:"var(--text-muted)" }}>Loading...</p>
      </main>
    }>
      <CertificateContent />
    </Suspense>
  )
}
