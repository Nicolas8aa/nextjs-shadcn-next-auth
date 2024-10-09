import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { prisma } from "./db";
import {scryptSync, randomBytes} from 'crypto';


const saltAndHashPassword = (password: string): string => {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 32).toString('hex');
  
    return hash;
};

const getUserFromDb = async (username: string, pwHash: string) => {
    const user = await prisma.user.findUnique({
        where: {
            username,
            password: pwHash
        }
    });
    return user;
};


import { object, string } from "zod"
 
export const signInSchema = object({
  username: string({ required_error: "Se requiere nombre de usuario" })
    .min(1, "Se requiere nombre de usuario")
    .max(32, "El nombre de usuario debe tener menos de 32 caracteres"),
  password: string({ required_error: "Se requiere contraseña" })
    .min(1, "Se requiere contraseña")
    // .min(8, "La contraseña debe tener más de 8 caracteres")
    // .max(32, "La contraseña debe tener menos de 32 caracteres"),
});

 
export const { handlers, signIn, signOut, auth } = NextAuth({
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

        const {password,  username} = await signInSchema.parseAsync(credentials)
 
        // logic to salt and hash password
        const pwHash = saltAndHashPassword(password)
 
        // logic to verify if the user exists
        user = await getUserFromDb(username, pwHash)
 
        if (!user) {
          // No user found, so this is their first attempt to login
          // meaning this is also the place you could do registration
          throw new Error("Usuario o contraseña incorrectos")
        }
 
        // return user object with their profile data
        return user
      },
    }),
  ],
})