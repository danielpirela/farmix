import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const ROLES = {
  admin: '43dc32e1-bbc6-4752-a43c-f730ba28365d',
  employee: '5c9fc195-2609-46ce-8b47-736229ce7bca',
  owner : '88e647c3-b321-48d0-b807-1b5e444c4f1c',
  veterinary : 'cd73bfd8-5c3d-4faa-8483-0d0cd3b0e404',
  milker: '5872e3a8-02bf-4ac4-b42e-188f70dacb35',
  foreman : '9ead41a0-06a6-4310-a71e-70e4a4e8ab27'
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Define las rutas protegidas y los roles permitidos
  const protectedRoutes: Record<string, string[]> = {
    '/dashboard/admin/animals': [ROLES.admin, ROLES.owner, ROLES.veterinary, ROLES.foreman, ROLES.milker],
    '/dashboard/admin/animals/reports': [ROLES.admin, ROLES.owner, ROLES.foreman],
    '/dashboard/admin/animals/health': [ROLES.admin, ROLES.owner, ROLES.foreman, ROLES.milker, ROLES.veterinary],

    '/dashboard/admin/suppliers': [ROLES.admin, ROLES.owner, ROLES.foreman],
    '/dashboard/admin/suppliers/reports': [ROLES.admin, ROLES.owner, ROLES.foreman],

    '/dashboard/admin/finances': [ROLES.admin, ROLES.owner],
    '/dashboard/admin/finances/reports': [ROLES.admin, ROLES.owner],

    '/dashboard/admin/inventory': [ROLES.admin, ROLES.owner,  ROLES.foreman, ROLES.employee],
    '/dashboard/admin/inventory/reports': [ROLES.admin, ROLES.owner, ROLES.foreman, ROLES.employee],

    '/dashboard/admin/employees': [ROLES.admin, ROLES.owner],
    '/dashboard/employee/activities': [ROLES.admin, ROLES.owner, ROLES.foreman],
    '/dashboard/employees/certificates': [ROLES.employee, ROLES.owner, ROLES.foreman, ROLES.milker, ROLES.veterinary, ROLES.admin],
    '/dashboard/employees/reports': [ROLES.admin, ROLES.owner, ROLES.foreman],

    '/dashboard/employees': [ROLES.employee, ROLES.owner, ROLES.foreman, ROLES.milker, ROLES.veterinary, ROLES.admin],
    '/dashboard/clients': [ROLES.employee, ROLES.owner, ROLES.foreman]
  }

  const { pathname } = req.nextUrl

  // Verifica si la ruta es protegida
  for (const route in protectedRoutes) {
    if (pathname.startsWith(route)) {
      console.log(token?.role)
      console.log(route)
      console.log(protectedRoutes[route])

      if (!token || !protectedRoutes[route].includes(token.role)) {
        // Redirige a la página de inicio si no tiene acceso
        return NextResponse.redirect(new URL('/', req.url))
      }
    }
  }



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
