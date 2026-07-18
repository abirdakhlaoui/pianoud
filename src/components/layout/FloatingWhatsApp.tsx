"use client"
import { WHATSAPP_NUMBER } from "@/lib/whatsapp"

export default function FloatingWhatsApp() {
  const message = encodeURIComponent("Hi! I'm interested in Pianoud courses and would like more info.")
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 999,
        width: 60,
        height: 60,
        borderRadius: "50%",
        background: "#25D366",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 20px rgba(37,211,102,0.5)",
        transition: "transform 0.2s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <svg viewBox="0 0 24 24" width="32" height="32" fill="#fff">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.28-1.38c1.45.79 3.08 1.21 4.75 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m0 1.67c2.2 0 4.26.86 5.82 2.42a8.19 8.19 0 012.41 5.82c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.18 8.18 0 01-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24m-3.6 4.6c-.16 0-.42.06-.64.31s-.85.83-.85 2.02.87 2.34.99 2.5c.12.16 1.7 2.62 4.13 3.57 2.03.8 2.44.64 2.88.6.44-.04 1.42-.58 1.62-1.14s.2-1.04.14-1.14c-.06-.1-.22-.16-.46-.28s-1.42-.7-1.64-.78-.38-.12-.54.12-.62.78-.76.94-.28.18-.52.06c-.24-.12-1.01-.37-1.93-1.19-.71-.63-1.19-1.42-1.33-1.66s-.02-.37.1-.49c.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4s.04-.3-.02-.42c-.06-.12-.54-1.32-.75-1.8-.2-.48-.4-.42-.54-.42h-.46z"/>
      </svg>
    </a>
  )
}
