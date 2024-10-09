// export { auth as middleware } from '@/auth'

import { auth } from './auth'

export default auth((req) => {
  const callbackUrl = req.nextUrl.href

  if (!req.auth && req.nextUrl.pathname !== '/signin') {
    const newUrl = new URL('/signin', req.nextUrl.origin)
    if (req.nextUrl.pathname !== '/') {
      newUrl.searchParams.set('callbackUrl', callbackUrl)
    }

    return Response.redirect(newUrl)
  }

  if (req.auth && req.nextUrl.pathname === '/signin') {
    // redirect to the callbackUrl if the user is already signed in

    const callbackUrl = req.nextUrl.searchParams.get('callbackUrl')

    // Redirect to the callback URL if it exists, otherwise redirect to the home page
    if (callbackUrl) {
      return Response.redirect(new URL(callbackUrl, req.nextUrl.origin))
    } else {
      return Response.redirect(new URL('/', req.nextUrl.origin))
    }
  }
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
