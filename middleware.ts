import { withAuth } from 'next-auth/middleware'

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here
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

        // Allow access to other pages
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    '/profile/:path*',
    // Add other protected routes here
  ]
}