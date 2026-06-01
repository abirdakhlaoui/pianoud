import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import AdminUsersClient from "./AdminUsersClient"

export default async function AdminUsersPage() {
  const session = await auth()
  if (!session) redirect("/auth/signin")
  const user = session.user as any
  if (user.role !== "ADMIN") redirect("/dashboard")

  const users = await prisma.user.findMany({
    orderBy: { createdAt:"desc" },
    select: {
      id:        true,
      name:      true,
      email:     true,
      role:      true,
      createdAt: true,
      _count: {
        select: { enrollments:true }
      }
    }
  })

  return <AdminUsersClient users={users} currentUserId={user.id} />
}
