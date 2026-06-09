import { auth } from "@/lib/auth"

export default async function AuthTest() {
  const session = await auth()
  return (
    <main style={{ padding: 100, fontFamily: "monospace" }}>
      <h1>Auth Test (server-side)</h1>
      <pre style={{ background: "#f0f0f0", padding: 20, borderRadius: 8, color: "#000" }}>
        {JSON.stringify(session, null, 2) || "null"}
      </pre>
    </main>
  )
}
