"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

export default function UnreadBadge() {
  const { data: session } = useSession()
  const [unread, setUnread] = useState(0)

  useEffect(() => {
    if (!session) return
    checkUnread()
    const interval = setInterval(checkUnread, 30000) // check every 30s
    return () => clearInterval(interval)
  }, [session])

  async function checkUnread() {
    try {
      const res  = await fetch("/api/messages/unread")
      const data = await res.json()
      setUnread(data.count || 0)
    } catch {}
  }

  if (!unread) return null

  return (
    <div style={{
      position:"absolute", top:-4, right:-4,
      width:16, height:16, borderRadius:"50%",
      background:"#f87171",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontSize:9, fontWeight:800, color:"#fff",
    }}>
      {unread > 9 ? "9+" : unread}
    </div>
  )
}
