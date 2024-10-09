import SignInForm from './SignInForm'

export default async function SignInPage(props: {
  searchParams: { callbackUrl: string | undefined }
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Apuestas
        </h2>
        <h3 className="mt-2 text-center text-xl text-gray-600">
          Iniciar sesión
        </h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-4  pb-4 px-4 shadow rounded-lg ">
          <SignInForm callbackUrl={props.searchParams.callbackUrl} />
        </div>
      </div>
    </div>
  )
}
