import type { NextAuthConfig } from "next-auth"

// Edge-compatible config (no Prisma, no bcrypt) — used by middleware
export const authConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" as const },
  pages: { signIn: "/auth/signin" },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id   = user.id
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.id   = token.id
        session.user.role = token.role
      }
      return session
    },
  },
} satisfies NextAuthConfig
