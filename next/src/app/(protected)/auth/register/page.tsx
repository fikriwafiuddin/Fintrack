"use client"

import { useRegister } from "@/lib/hooks/useAuth"
import authValidation from "@/lib/validations/auth-validation"
import { RegisterCredentials } from "@/types/credentials-type"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { useForm } from "react-hook-form"

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(authValidation.register),
    mode: "onSubmit",
  })
  const { isPending, mutate } = useRegister()

  const onSubmit = async (data: RegisterCredentials) => {
    mutate(data, {
      onError: (error) => {
        for (const key in error.errors) {
          setError(key as keyof RegisterCredentials, {
            message: error.errors[key][0],
          })
        }
      },
    })
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="email">Email:</label>
            <input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              {...register("username")}
              id="username"
              name="username"
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter your username"
              required
            />
            {errors.username && (
              <p className="text-sm text-red-600">{errors.username.message}</p>
            )}
          </div>
          <div>
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
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              {...register("confirmPassword")}
              id="confirmPasswor"
              name="confirmPassword"
              type="password"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
              placeholder="Enter your confirmPassword"
              required
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <button
            disabled={isPending}
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {isPending ? "Loading" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
