"use client"

import Link from "next/link"
import { useLang } from "@/components/providers/LangProvider"

export default function NotFound() {
  const { isAr } = useLang()

  return (
    <main style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"var(--ink)", textAlign:"center", padding:24 }}>
      <div>
        <div className="font-display gradient-text" style={{ fontSize:"clamp(80px,20vw,180px)", fontWeight:800, lineHeight:1 }}>
          404
        </div>
        <div style={{ fontSize:48, margin:"16px 0" }}>🎵</div>
        <h1 className="font-display" style={{ fontSize:"clamp(24px,4vw,40px)", fontWeight:400, color:"var(--cream)", marginBottom:16 }}>
          {isAr ? "عذراً، هذه الصفحة غير موجودة" : "This page doesn't exist"}
        </h1>
        <p style={{ fontSize:16, color:"var(--text-muted)", maxWidth:400, margin:"0 auto 36px", lineHeight:1.8 }}>
          {isAr
            ? "ربما تمّ حذف الصفحة أو تغيير رابطها. عُد للصفحة الرئيسية واستكشف دوراتنا."
            : "The page may have been deleted or its link changed. Go back to the homepage and explore our courses."}
        </p>
        <div style={{ display:"flex", gap:16, justifyContent:"center", flexWrap:"wrap" }}>
          <Link href="/" className="btn-gold" style={{ padding:"13px 32px", fontSize:15 }}>
            {isAr ? "الصفحة الرئيسية" : "Go Home"}
          </Link>
          <Link href="/courses" className="btn-outline" style={{ padding:"13px 32px", fontSize:15 }}>
            {isAr ? "استعرض الدورات" : "Browse Courses"}
          </Link>
        </div>
      </div>
    </main>
  )
}
