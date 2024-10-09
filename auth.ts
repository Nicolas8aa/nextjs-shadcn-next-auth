import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { prisma } from './db'
import { scryptSync, randomBytes } from 'crypto'

export const saltAndHashPassword = (password: string): string => {
  const salt = randomBytes(16).toString('hex')
  const hash = scryptSync(password, salt, 32).toString('hex')
  return `${salt}:${hash}`
}

const verifyPassword = (
  storedPassword: string,
  inputPassword: string,
): boolean => {
  const [salt, storedHash] = storedPassword.split(':')
  const inputHash = scryptSync(inputPassword, salt, 32).toString('hex')
  return storedHash === inputHash
}

const getUserFromDb = async (username: string) => {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })
  return user
}

import { object, string } from 'zod'

export const signInSchema = object({
  username: string({ required_error: 'Se requiere nombre de usuario' })
    .min(1, 'Se requiere nombre de usuario')
    .max(32, 'El nombre de usuario debe tener menos de 32 caracteres'),
  password: string({ required_error: 'Se requiere contraseña' }).min(
    1,
    'Se requiere contraseña',
  ),
  // .min(8, "La contraseña debe tener más de 8 caracteres")
  // .max(32, "La contraseña debe tener menos de 32 caracteres"),
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    authorized: async ({ auth }) => {
      // Logged in users are authenticated, otherwise redirect to login page
      return !!auth
    },
  },
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null

        const { password, username } = await signInSchema.parseAsync(
          credentials,
        )

        // logic to salt and hash password

        // logic to verify if the user exists
        user = await getUserFromDb(username)

        // logic to verify if the password is correct

        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error('Usuario o contraseña incorrectos')
        }

        // logic to verify if the password is correct
        if (!verifyPassword(user.password, password)) {
          // Password is incorrect
          throw new Error('Usuario o contraseña incorrectos')
        }

        // return user object with their profile data
        return user
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
})
