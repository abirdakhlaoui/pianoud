"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function SuccessContent() {
  const params = useSearchParams()
  const course = params.get("course") || ""

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#0A0A0A" }}>
      <div style={{ textAlign: "center", maxWidth: 520, padding: 24 }}>
        <div style={{ fontSize: 80, marginBottom: 24 }}>🎉</div>
        <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,56px)", fontWeight: 700, marginBottom: 16 }}>
          <span className="gradient-text">You're enrolled!</span>
        </h1>
        <p style={{ fontSize: 18, color: "var(--text-muted)", marginBottom: 16, lineHeight: 1.7 }}>
          Welcome to Pianoud. Your course is ready — start your musical journey now.
        </p>
        <p style={{ fontSize: 14, color: "var(--text-muted)", marginBottom: 40 }}>
          A confirmation email has been sent to your inbox.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/dashboard" className="btn-gold" style={{ padding: "14px 32px", fontSize: 16 }}>
            Go to Dashboard
          </Link>
          <Link href="/courses" className="btn-outline" style={{ padding: "14px 32px", fontSize: 16 }}>
            Browse More Courses
          </Link>
        </div>
      </div>
    </main>
  )
}

export default function SuccessPage() {
  return <Suspense><SuccessContent /></Suspense>
}
