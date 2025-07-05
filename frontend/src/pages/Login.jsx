import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import authValidation from "../validations/auth-validation"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/thunk/auth-thunk"

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(authValidation.login),
    mode: "onSubmit",
  })
  const { isLoading } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onSubmit = async (data) => {
    dispatch(login(data))
      .unwrap()
      .catch((backendErrors) => {
        for (const key in backendErrors?.errors) {
          setError(key, { message: backendErrors.errors[key][0] })
        }
      })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="">
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              // required
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div className="">
            <label htmlFor="password">Password:</label>
            <input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
