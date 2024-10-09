import { redirect } from "next/navigation"
import { signIn, auth } from "@/auth"
import { AuthError } from "next-auth"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
 
export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <div className="flex flex-col gap-2">
      <form
        action={async (formData) => {
          "use server"
          try {
            await signIn("credentials", formData)
          } catch (error) {
            if (error instanceof AuthError) {
              // return redirect(`${SIGNIN_ERROR_URL}?error=${error.type}`)
              console.log("error", error.cause?.err?.message)
            }
            // throw error
          } finally {
            return redirect(props.searchParams.callbackUrl || "/")
          }
        }}
      >
        <Label htmlFor="username">
          Username
          <Input name="username" id="username" />
        </Label>
        <Label htmlFor="password">
          Password
          <Input name="password" id="password" />
        </Label>
        <Input type="submit" value="Sign In" />
      </form>
      
    </div>
  )
}