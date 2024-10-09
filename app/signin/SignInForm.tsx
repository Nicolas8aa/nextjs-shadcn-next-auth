'use client'

import React, { useEffect, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInAction } from './action'
import { toast } from '@/hooks/use-toast'
import { AuthError } from 'next-auth'

const SignInForm = ({ callbackUrl }: { callbackUrl?: string }) => {
  const [pending, startTransition] = useTransition()

  return (
    <form className="space-y-4" action="#">
      {/* {state?.error && <div className="text-red-600">{state.error}</div>} */}
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
            placeholder="Usuario"
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
          formAction={(formData) => {
            startTransition(async () => {
              try {
                await signInAction(formData, callbackUrl)
                toast({
                  title: 'Bienvenido',
                  description: 'Has iniciado sesion correctamente',
                  duration: 2000,
                })
              } catch (error: any) {
                toast({
                  title: 'Error',
                  description: error.message,
                  duration: 2000,
                  variant: 'destructive',
                })
              }
            })
          }}
          className="w-full "
        >
          Iniciar sesión
        </Button>
      </div>
    </form>
  )
}

export default SignInForm
