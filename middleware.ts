// export { auth as middleware } from '@/auth'

import { auth } from './auth'

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }

  if (req.auth && req.nextUrl.pathname === '/signin') {
    const newUrl = new URL('/', req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
