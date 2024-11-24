import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  // Obtener el token del usuario
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Verificar si el usuario está autenticado y si su perfil está completo
  if (token && token.isProfileComplete === false) {
    return NextResponse.redirect(new URL('/employee/complete', req.url))
  }
  // Permitir el acceso si el perfil está completo o si no es necesario autenticar
  return NextResponse.next()
}

// Configuración para especificar en qué rutas aplicar el middleware
export const config = {
  matcher: ['/dashboard/:path*'],
}
