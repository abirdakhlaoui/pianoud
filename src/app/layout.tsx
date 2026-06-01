import type { Metadata } from "next"
import { Cormorant_Garamond, Cairo } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import SessionWrapper from "@/components/providers/SessionWrapper"
import { LangProvider } from "@/components/providers/LangProvider"
import { ThemeProvider } from "@/components/providers/ThemeProvider"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-display",
  display: "swap",
})

const cairo = Cairo({
  subsets: ["arabic","latin"],
  weight: ["300","400","500","600","700"],
  variable: "--font-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Pianoud — Online Piano & Oud Academy",
    template: "%s | Pianoud",
  },
  description: "Learn Piano and Oud online with expert instructors. Bilingual Arabic/English courses for all levels — beginner to advanced. Join 500+ students at Pianoud Music Academy.",
  keywords: ["piano lessons","oud lessons","online music academy","Arabic music","piano online","تعلم البيانو","تعلم العود","دروس موسيقى","أكاديمية موسيقى"],
  authors: [{ name:"Pianoud" }],
  creator: "Pianoud",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pianoud.com",
    siteName: "Pianoud",
    title: "Pianoud — Online Piano & Oud Academy",
    description: "Learn Piano and Oud online with expert instructors. Bilingual Arabic/English courses.",
    images: [{ url:"/logo-full.png", width:700, height:650, alt:"Pianoud Music Academy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pianoud — Online Piano & Oud Academy",
    description: "Learn Piano and Oud online with expert instructors.",
    images: ["/logo-full.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cairo.variable}`} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SessionWrapper>
          <LangProvider>
            <ThemeProvider>
              <Navbar />
              {children}
              <Footer />
            </ThemeProvider>
          </LangProvider>
        </SessionWrapper>
      </body>
    </html>
  )
}
