import NextAuth, { DefaultSession, NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { supabaseServer } from "@components/lib/supabaseServer"

// Extender el tipo `Session` para incluir `isProfileComplete`
declare module "next-auth" {
  interface Session {
    user: {
      isProfileComplete?: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isProfileComplete?: boolean
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const supabase = await supabaseServer()
      const { email, name } = user

      const { data: existingEmployee } = await supabase
        .from("employees")
        .select("*")
        .eq("email", email)
        .single()

      if (!existingEmployee) {
        await supabase.from("employees").insert([
          {
            id_document: "",
            last_name: name?.split(" ")[1] || "",
            first_name: name?.split(" ")[0] || "",
            phone: "",
            email: email,
            address: "",
            hire_date: null,
            role_id: "5872e3a8-02bf-4ac4-b42e-188f70dacb35",
          },
        ])
      }
      return true
    },

    async session({ session, token }) {
      session.user.isProfileComplete = token.isProfileComplete
      return session
    },

    async jwt({ token, user }) {
      if (user) {
        const supabase = await supabaseServer()
        const { data: existingEmployee } = await supabase
          .from("employees")
          .select("*")
          .eq("email", user.email)
          .single()

        token.isProfileComplete =
          !!existingEmployee?.phone &&
          !!existingEmployee?.address &&
          !!existingEmployee?.id_document
      }
      return token
    },
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
