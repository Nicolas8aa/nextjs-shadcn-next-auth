import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

import { User as PrismaUser } from '.prisma/client'

declare module 'next-auth' {
  interface Session {
    user: PrismaUser & DefaultSession['user']
  }

  interface User extends DefaultUser, PrismaUser {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    user: PrismaUser
  }
}
