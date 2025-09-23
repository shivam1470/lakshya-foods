import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl
    const token = req.nextauth.token

    // Admin routes protection
    if (pathname.startsWith('/admin')) {
      if (token?.role !== 'admin') {
        return new Response('Forbidden', { status: 403 })
      }
    }

    return
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl

        // Protect profile pages
        if (pathname.startsWith('/profile')) {
          return !!token
        }

        // Protect admin pages - require admin role
        if (pathname.startsWith('/admin')) {
          return !!token && token.role === 'admin'
        }

        // Allow access to other pages
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/profile/:path*',
    '/admin/:path*',
    // Add other protected routes here
  ]
}