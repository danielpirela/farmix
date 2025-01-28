import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { supabaseServer } from '@lib/supabaseServer'

declare module 'next-auth' {
  interface Session {
    user: {
      isProfileComplete?: boolean
      id?: string
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    isProfileComplete?: boolean
    id?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async signIn({ user }) {
      const supabase = await supabaseServer()
      const { email, name } = user

      const { data: existingEmployee } = await supabase
        .from('employees')
        .select('*')
        .eq('email', email)
        .single()

      if (!existingEmployee) {
        await supabase.from('employees').insert([
          {
            id_document: '',
            last_name: name?.split(' ')[1] || '',
            first_name: name?.split(' ')[0] || '',
            phone: '',
            email: email,
            address: '',
            hire_date: null,
            role_id: '5872e3a8-02bf-4ac4-b42e-188f70dacb35'
          }
        ])
      }
      return true
    },

    async session({ session, token }) {
      session.user.isProfileComplete = token.isProfileComplete
      session.user.id = token.id // Agregar el id a la sesión
      return session
    },

    async jwt({ token }) {
      // Remove the user check to always verify the employee data
      const supabase = await supabaseServer()
      const { data: existingEmployee } = await supabase
        .from('employees')
        .select('*')
        .eq('email', token.email)
        .single()

      token.isProfileComplete =
        !!existingEmployee?.phone &&
        !!existingEmployee?.address &&
        !!existingEmployee?.email &&
        !!existingEmployee?.first_name &&
        !!existingEmployee?.last_name &&
        !!existingEmployee?.hire_date &&
        !!existingEmployee?.role_id &&
        !!existingEmployee?.id_document

      token.id = existingEmployee?.employee_id

      return token
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
