'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signInAction(formData: FormData, callbackUrl?: string) {
  try {
    await signIn('credentials', formData)
  } catch (error: any) {
    if (error instanceof AuthError) {
      // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}
      throw new Error(error.cause?.err?.message)
    }

    error.cause = { nextNoDigest: true, originalCause: error.cause }
    throw error
  }

  revalidatePath('/', 'layout')
}
