import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { signIn, auth } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          MiApp Móvil
        </h2>
        <h3 className="mt-2 text-center text-xl text-gray-600">
          Iniciar sesión
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4 px-4 shadow rounded-lg ">
          <form
            className="space-y-4"
            action={async (formData) => {
              'use server'
              try {
                await signIn('credentials', formData)
              } catch (error) {
                if (error instanceof AuthError) {
                  // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
                  console.log('error', error.cause?.err?.message)
                }
                // throw error
              } finally {
                return redirect(props.searchParams.callbackUrl || '/')
              }
            }}
          >
            <div>
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre de usuario
              </Label>
              <div className="mt-1">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </Label>
              <div className="mt-1">
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Iniciar sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
