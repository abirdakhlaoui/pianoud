"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const COURSES: Record<string, { title_en: string; title_ar: string; price: number; instrument: string }> = {
  "piano-fundamentals": { title_en:"Piano Fundamentals: From Zero to Advanced", title_ar:"أساسيات البيانو: من الصفر إلى المتقدم", price:184, instrument:"PIANO" },
  "arabic-maqam-oud":   { title_en:"Arabic Maqam & Oud Mastery",                title_ar:"المقامات العربية وإتقان العود",          price:259, instrument:"OUD"   },
  "classical-piano":    { title_en:"Classical Piano",                            title_ar:"البيانو الكلاسيكي",                     price:334, instrument:"PIANO" },
  "oud-beginners":      { title_en:"Oud for Beginners: First Steps",             title_ar:"العود للمبتدئين: الخطوات الأولى",        price:146, instrument:"OUD"   },
  "arabic-piano":       { title_en:"Arabic Piano",                               title_ar:"البيانو العربي",                         price:296, instrument:"PIANO" },
  "oud-advanced":       { title_en:"Oud Advanced",                               title_ar:"العود المتقدم",                          price:371, instrument:"OUD"   },
  "piano-kids":         { title_en:"Piano KIDS",                                 title_ar:"البيانو للأطفال",                        price:120, instrument:"PIANO" },
  "music-reading":      { title_en:"Music Reading",                              title_ar:"قراءة النوتة الموسيقية",                 price:99,  instrument:"PIANO" },
  "oud-harmony":        { title_en:"Harmony for Oud",                            title_ar:"الهارموني للعود",                        price:220, instrument:"OUD"   },
}

function CheckoutForm({ slug, price }: { slug: string; price: number }) {
  const stripe   = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError("")

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success?course=${slug}`,
      },
    })

    if (stripeError) {
      setError(stripeError.message || "Payment failed.")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement options={{ layout:"tabs" }} />
      {error && (
        <div style={{ marginTop:16, padding:"12px 16px", borderRadius:8, background:"rgba(248,113,113,0.1)", border:"1px solid rgba(248,113,113,0.3)", color:"#f87171", fontSize:14 }}>
          {error}
        </div>
      )}
      <button type="submit" disabled={!stripe || loading} className="btn-gold"
        style={{ width:"100%", justifyContent:"center", padding:16, fontSize:16, marginTop:24, opacity:loading?0.7:1 }}>
        {loading ? "Processing..." : `Pay ${price} SAR`}
      </button>
    </form>
  )
}

export default function CheckoutPage() {
  const params  = useParams()
  const slug    = params.slug as string
  const { data: session, status } = useSession()
  const router  = useRouter()
  const [clientSecret, setClientSecret] = useState("")
  const [loadingPayment, setLoadingPayment] = useState(false)
  const course = COURSES[slug]

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/auth/signin?redirect=/checkout/${slug}`)
      return
    }
    if (status === "authenticated" && slug && course) {
      setLoadingPayment(true)
      fetch("/api/stripe/create-payment-intent", {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ slug }),
      })
        .then(r => r.json())
        .then(d => {
          if (d.clientSecret) setClientSecret(d.clientSecret)
          setLoadingPayment(false)
        })
        .catch(() => setLoadingPayment(false))
    }
  }, [status, slug])

  if (!course) {
    return (
      <main style={{ minHeight:"100vh", paddingTop:120, textAlign:"center", background:"var(--ink)" }}>
        <p style={{ color:"var(--text-muted)", fontSize:18, marginBottom:24 }}>Course not found.</p>
        <Link href="/courses" className="btn-gold" style={{ display:"inline-flex" }}>← Back to Courses</Link>
      </main>
    )
  }

  return (
    <main style={{ minHeight:"100vh", paddingTop:100, paddingBottom:80, background:"var(--ink)" }}>
      <div className="container" style={{ maxWidth:960 }}>
        <div style={{ display:"grid", gap:48, alignItems:"start" }} className="checkout-grid">

          {/* Left — order summary */}
          <div>
            <p style={{ fontSize:12, fontWeight:600, color:"var(--gold)", letterSpacing:3, textTransform:"uppercase", marginBottom:12 }}>Checkout</p>
            <h1 className="font-display" style={{ fontSize:36, fontWeight:600, color:"var(--cream)", marginBottom:32 }}>
              Complete your enrollment
            </h1>

            {/* Course card */}
            <div className="card" style={{ padding:28, marginBottom:20 }}>
              <div style={{ display:"flex", gap:16, alignItems:"center" }}>
                <div style={{
                  width:64, height:64, borderRadius:10, flexShrink:0,
                  background: course.instrument==="PIANO" ? "linear-gradient(135deg,#0d1117,#1a1a2e)" : "linear-gradient(135deg,#0d1117,#1a0a00)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:28,
                }}>
                  {course.instrument==="PIANO" ? "🎹" : "🪘"}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>{course.title_en}</div>
                  <div style={{ fontSize:13, color:"var(--text-muted)" }}>
                    {course.instrument==="PIANO" ? "Piano Course" : "Oud Course"}
                  </div>
                </div>
                <div className="font-display" style={{ fontSize:26, fontWeight:700, color:"var(--cream)", flexShrink:0 }}>
                  {course.price} <span style={{ fontSize:13, color:"var(--text-muted)", fontWeight:400 }}>SAR</span>
                </div>
              </div>
            </div>

            {/* What's included */}
            <div className="card" style={{ padding:24, marginBottom:20 }}>
              <h3 style={{ fontSize:15, fontWeight:600, color:"var(--cream)", marginBottom:16 }}>What's included</h3>
              {[
                { icon:"♾️", text:"Full lifetime access"          },
                { icon:"📱", text:"Mobile & desktop"              },
                { icon:"🏆", text:"Certificate of completion"     },
                { icon:"🔄", text:"30-day money-back guarantee"   },
                { icon:"💬", text:"Direct instructor Q&A"         },
                { icon:"📅", text:"Live sessions with instructor" },
              ].map(item => (
                <div key={item.text} style={{ display:"flex", gap:10, alignItems:"center", fontSize:14, color:"var(--text-muted)", marginBottom:10 }}>
                  <span>{item.icon}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            {/* Payment methods */}
            <div className="card" style={{ padding:20 }}>
              <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:12 }}>Accepted payment methods</p>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                {["💳 Credit Card","🍎 Apple Pay","🔵 Google Pay","🏦 Mada"].map(m => (
                  <span key={m} style={{ fontSize:12, padding:"6px 12px", borderRadius:6, border:"1px solid var(--border)", color:"var(--text-muted)" }}>{m}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — payment form */}
          <div className="card" style={{ padding:32, position:"sticky", top:100 }}>
            <h2 className="font-display" style={{ fontSize:22, fontWeight:600, color:"var(--cream)", marginBottom:8 }}>
              Payment Details
            </h2>
            <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:24 }}>
              🔒 Secured by Stripe
            </p>

            {clientSecret ? (
              <Elements stripe={stripePromise} options={{
                clientSecret,
                appearance: {
                  theme:"night",
                  variables: {
                    colorPrimary:"#C9A84C", colorBackground:"#1A1A1A",
                    colorText:"#F5F0E8", colorDanger:"#f87171", borderRadius:"8px",
                  },
                },
              }}>
                <CheckoutForm slug={slug} price={course.price} />
              </Elements>
            ) : (
              <div style={{ textAlign:"center", padding:"40px 0", color:"var(--text-muted)" }}>
                {loadingPayment ? (
                  <div>
                    <div style={{ fontSize:24, marginBottom:12 }}>⏳</div>
                    <p>Loading payment form...</p>
                  </div>
                ) : status === "unauthenticated" ? (
                  <p>Redirecting to sign in...</p>
                ) : (
                  <p>Preparing payment...</p>
                )}
              </div>
            )}

            <p style={{ fontSize:11, color:"var(--text-muted)", textAlign:"center", marginTop:20 }}>
              🔒 256-bit SSL encryption — safe & secure
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .checkout-grid { grid-template-columns: 1fr 400px; }
        @media(max-width:800px) { .checkout-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  )
}
