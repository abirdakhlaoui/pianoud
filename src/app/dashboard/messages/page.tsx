"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { useSession } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { useLang } from "@/components/providers/LangProvider"

type Message = {
  id: string
  senderId: string
  content: string
  createdAt: string
  sender: { id: string; name: string; role: string }
  receiver: { id: string; name: string; role: string }
}

type Conversation = {
  user: { id: string; name: string; role: string }
  lastMessage: Message
  unread: number
}

type User = {
  id: string
  name: string
  email: string
  role: string
}

function MessagesContent() {
  const { data: session }  = useSession()
  const { isAr }           = useLang()
  const searchParams       = useSearchParams()
  const user               = session?.user as any

  const [conversations, setConversations] = useState<Conversation[]>([])
  const [activeUser, setActiveUser]       = useState<any>(null)
  const [messages, setMessages]           = useState<Message[]>([])
  const [newMsg, setNewMsg]               = useState("")
  const [sending, setSending]             = useState(false)
  const [loading, setLoading]             = useState(true)

  // New conversation
  const [showNewChat, setShowNewChat]     = useState(false)
  const [allUsers, setAllUsers]           = useState<User[]>([])
  const [searchUser, setSearchUser]       = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchConversations()
    fetchAllUsers()
    const withId = searchParams.get("with")
    if (withId) {
      fetch(`/api/users/${withId}`)
        .then(r => r.json())
        .then(d => { if (d.user) loadConversation(d.user) })
    }
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior:"smooth" })
  }, [messages])

  async function fetchConversations() {
    const res  = await fetch("/api/messages")
    const data = await res.json()
    setConversations(data.conversations || [])
    setLoading(false)
  }

  async function fetchAllUsers() {
    const res  = await fetch("/api/users")
    const data = await res.json()
    setAllUsers(data.users || [])
  }

  async function loadConversation(otherUser: any) {
    setActiveUser(otherUser)
    setShowNewChat(false)
    const res  = await fetch(`/api/messages?with=${otherUser.id}`)
    const data = await res.json()
    setMessages(data.messages || [])
    fetchConversations()
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!newMsg.trim() || !activeUser || sending) return
    setSending(true)
    const res  = await fetch("/api/messages", {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({ receiverId: activeUser.id, content: newMsg.trim() }),
    })
    const data = await res.json()
    if (res.ok) {
      setMessages(prev => [...prev, data.message])
      setNewMsg("")
      fetchConversations()
    }
    setSending(false)
  }

  function formatTime(dateStr: string) {
    const date = new Date(dateStr)
    const now  = new Date()
    const diff = now.getTime() - date.getTime()
    if (diff < 60000)    return isAr ? "الآن" : "now"
    if (diff < 3600000)  return `${Math.floor(diff/60000)}${isAr?"د":"m"}`
    if (diff < 86400000) return date.toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })
    return date.toLocaleDateString()
  }

  const filteredUsers = allUsers.filter(u =>
    u.id !== user?.id &&
    (u.name.toLowerCase().includes(searchUser.toLowerCase()) ||
     u.email.toLowerCase().includes(searchUser.toLowerCase()))
  )

  return (
    <div style={{ height:"100vh", display:"flex", flexDirection:"column", background:"var(--ink)" }}>
      {/* Top spacer for navbar */}
      <div style={{ height:56, flexShrink:0 }}/>

      <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

        {/* ── Sidebar ── */}
        <div style={{ width:300, flexShrink:0, background:"var(--ink-soft)", borderRight:"1px solid var(--border)", display:"flex", flexDirection:"column" }}>

          {/* Header */}
          <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <h2 className="font-display" style={{ fontSize:18, fontWeight:600, color:"var(--cream)" }}>
              {isAr ? "الرسائل" : "Messages"}
            </h2>
            <button
              onClick={() => { setShowNewChat(!showNewChat); setSearchUser("") }}
              style={{
                width:32, height:32, borderRadius:"50%",
                background: showNewChat ? "var(--gold)" : "var(--gold-pale)",
                border:"1px solid var(--gold)",
                color: showNewChat ? "#0A0A0A" : "var(--gold)",
                fontSize:18, cursor:"pointer", display:"flex",
                alignItems:"center", justifyContent:"center", fontWeight:700,
              }}
              title={isAr ? "محادثة جديدة" : "New conversation"}
            >
              {showNewChat ? "×" : "+"}
            </button>
          </div>

          {/* New chat — search users */}
          {showNewChat && (
            <div style={{ padding:"12px 16px", borderBottom:"1px solid var(--border)", background:"var(--ink)" }}>
              <p style={{ fontSize:12, color:"var(--gold)", fontWeight:600, letterSpacing:2, textTransform:"uppercase", marginBottom:10 }}>
                {isAr ? "ابدأ محادثة مع:" : "Start chat with:"}
              </p>
              <input
                type="text"
                placeholder={isAr ? "ابحث باسم أو بريد..." : "Search by name or email..."}
                value={searchUser}
                onChange={e => setSearchUser(e.target.value)}
                style={{
                  width:"100%", padding:"9px 12px", borderRadius:8,
                  border:"1px solid var(--border)", background:"var(--ink-soft)",
                  color:"var(--cream)", fontSize:13, outline:"none",
                }}
                onFocus={e => e.target.style.borderColor="var(--gold)"}
                onBlur={e  => e.target.style.borderColor="var(--border)"}
                autoFocus
              />
              <div style={{ marginTop:8, maxHeight:180, overflowY:"auto" }}>
                {filteredUsers.length === 0 ? (
                  <p style={{ fontSize:12, color:"var(--text-muted)", textAlign:"center", padding:"12px 0" }}>
                    {isAr ? "لا نتائج" : "No users found"}
                  </p>
                ) : filteredUsers.map(u => (
                  <button key={u.id} onClick={() => loadConversation(u)} style={{
                    width:"100%", textAlign:"left", padding:"10px 12px",
                    background:"transparent", border:"none",
                    borderRadius:8, cursor:"pointer", transition:"background 0.15s",
                    display:"flex", alignItems:"center", gap:10,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background="var(--gold-pale)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background="transparent"}
                  >
                    <div style={{ width:34, height:34, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                      {u.name[0].toUpperCase()}
                    </div>
                    <div style={{ minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:"var(--cream)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{u.name}</div>
                      <div style={{ fontSize:10, color: u.role==="INSTRUCTOR" ? "var(--gold)" : u.role==="ADMIN" ? "#f87171" : "#60a5fa", fontWeight:600, textTransform:"uppercase", letterSpacing:1 }}>
                        {u.role}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Conversations list */}
          <div style={{ flex:1, overflowY:"auto" }}>
            {loading ? (
              <div style={{ padding:24, textAlign:"center", color:"var(--text-muted)", fontSize:13 }}>
                {isAr ? "جاري التحميل..." : "Loading..."}
              </div>
            ) : conversations.length === 0 && !showNewChat ? (
              <div style={{ padding:32, textAlign:"center" }}>
                <div style={{ fontSize:40, marginBottom:12 }}>💬</div>
                <p style={{ fontSize:13, color:"var(--text-muted)", marginBottom:12 }}>
                  {isAr ? "لا توجد محادثات بعد" : "No conversations yet"}
                </p>
                <p style={{ fontSize:12, color:"var(--text-muted)", opacity:0.7 }}>
                  {isAr ? 'اضغط "+" لبدء محادثة' : 'Press "+" to start a chat'}
                </p>
              </div>
            ) : conversations.map(conv => (
              <button key={conv.user.id}
                onClick={() => loadConversation(conv.user)}
                style={{
                  width:"100%", textAlign:"left", padding:"14px 18px",
                  background: activeUser?.id===conv.user.id ? "rgba(201,168,76,0.08)" : "transparent",
                  border:"none",
                  borderLeft: activeUser?.id===conv.user.id ? "3px solid var(--gold)" : "3px solid transparent",
                  borderBottom:"1px solid var(--border)",
                  cursor:"pointer", transition:"background 0.15s",
                }}
              >
                <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                  <div style={{ position:"relative", flexShrink:0 }}>
                    <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#0A0A0A" }}>
                      {conv.user.name[0].toUpperCase()}
                    </div>
                    {conv.unread > 0 && (
                      <div style={{ position:"absolute", top:-3, right:-3, width:18, height:18, borderRadius:"50%", background:"#f87171", display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:800, color:"#fff" }}>
                        {conv.unread}
                      </div>
                    )}
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                      <span style={{ fontSize:14, fontWeight:600, color:"var(--cream)" }}>{conv.user.name}</span>
                      <span style={{ fontSize:10, color:"var(--text-muted)" }}>{formatTime(conv.lastMessage.createdAt)}</span>
                    </div>
                    <div style={{ fontSize:11, color:"var(--text-muted)", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginTop:2 }}>
                      {conv.lastMessage.senderId === user?.id ? (isAr?"أنت: ":"You: ") : ""}
                      {conv.lastMessage.content}
                    </div>
                    <div style={{ fontSize:9, color: conv.user.role==="INSTRUCTOR" ? "var(--gold)" : "#60a5fa", marginTop:2, fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>
                      {conv.user.role}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Chat area ── */}
        {activeUser ? (
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

            {/* Chat header */}
            <div style={{ padding:"14px 24px", background:"var(--ink-soft)", borderBottom:"1px solid var(--border)", display:"flex", alignItems:"center", gap:14 }}>
              <div style={{ width:42, height:42, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, fontWeight:800, color:"#0A0A0A", flexShrink:0 }}>
                {activeUser.name[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontSize:15, fontWeight:600, color:"var(--cream)" }}>{activeUser.name}</div>
                <div style={{ fontSize:10, color: activeUser.role==="INSTRUCTOR" ? "var(--gold)" : activeUser.role==="ADMIN" ? "#f87171" : "#60a5fa", fontWeight:700, textTransform:"uppercase", letterSpacing:1 }}>
                  {activeUser.role}
                </div>
              </div>
            </div>

            {/* Messages */}
            <div style={{ flex:1, overflowY:"auto", padding:"20px 24px", display:"flex", flexDirection:"column", gap:10 }}>
              {messages.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 0" }}>
                  <div style={{ fontSize:48, marginBottom:12 }}>👋</div>
                  <p style={{ fontSize:15, color:"var(--text-muted)" }}>
                    {isAr ? `ابدأ محادثة مع ${activeUser.name}` : `Start a conversation with ${activeUser.name}`}
                  </p>
                </div>
              ) : messages.map(msg => {
                const isMine = msg.senderId === user?.id
                return (
                  <div key={msg.id} style={{ display:"flex", justifyContent: isMine ? "flex-end" : "flex-start" }}>
                    {!isMine && (
                      <div style={{ width:28, height:28, borderRadius:"50%", background:"linear-gradient(135deg,#E8CB7E,#C9A84C)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#0A0A0A", flexShrink:0, marginRight:8, alignSelf:"flex-end" }}>
                        {msg.sender.name[0].toUpperCase()}
                      </div>
                    )}
                    <div style={{
                      maxWidth:"65%",
                      padding:"11px 16px",
                      borderRadius: isMine ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                      background: isMine ? "linear-gradient(135deg,#E8CB7E,#C9A84C)" : "var(--ink-card)",
                      border: isMine ? "none" : "1px solid var(--border)",
                      color: isMine ? "#0A0A0A" : "var(--cream)",
                    }}>
                      <p style={{ fontSize:14, lineHeight:1.6, margin:0 }}>{msg.content}</p>
                      <p style={{ fontSize:10, marginTop:4, opacity:0.6, textAlign: isMine?"right":"left", margin:"4px 0 0" }}>
                        {formatTime(msg.createdAt)}
                      </p>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef}/>
            </div>

            {/* Input */}
            <form onSubmit={sendMessage} style={{ padding:"14px 20px", background:"var(--ink-soft)", borderTop:"1px solid var(--border)", display:"flex", gap:10 }}>
              <input
                type="text" value={newMsg}
                onChange={e => setNewMsg(e.target.value)}
                placeholder={isAr ? `اكتب رسالة لـ ${activeUser.name}...` : `Message ${activeUser.name}...`}
                style={{ flex:1, padding:"11px 16px", borderRadius:24, border:"1px solid var(--border)", background:"var(--ink)", color:"var(--cream)", fontSize:14, outline:"none" }}
                onFocus={e => e.target.style.borderColor="var(--gold)"}
                onBlur={e  => e.target.style.borderColor="var(--border)"}
              />
              <button type="submit" disabled={!newMsg.trim() || sending}
                style={{
                  width:44, height:44, borderRadius:"50%", flexShrink:0,
                  background: newMsg.trim() ? "linear-gradient(135deg,#E8CB7E,#C9A84C)" : "var(--ink-card)",
                  border:"1px solid var(--border)",
                  color: newMsg.trim() ? "#0A0A0A" : "var(--text-muted)",
                  fontSize:18, cursor: newMsg.trim() ? "pointer" : "not-allowed",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"all 0.2s",
                }}>
                ↑
              </button>
            </form>
          </div>
        ) : (
          <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:64, marginBottom:16 }}>💬</div>
              <h3 className="font-display" style={{ fontSize:24, color:"var(--cream)", marginBottom:8 }}>
                {isAr ? "رسائلك" : "Your Messages"}
              </h3>
              <p style={{ fontSize:15, color:"var(--text-muted)", marginBottom:24 }}>
                {isAr ? 'اضغط "+" لبدء محادثة جديدة' : 'Press "+" to start a new conversation'}
              </p>
              <button
                onClick={() => setShowNewChat(true)}
                className="btn-gold"
                style={{ padding:"12px 28px", fontSize:14 }}
              >
                + {isAr ? "محادثة جديدة" : "New Conversation"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function MessagesPage() {
  return (
    <Suspense>
      <MessagesContent />
    </Suspense>
  )
}
