import { z } from "zod"

const login = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Invalid email address"),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(1, "Password is required"),
})

const register = z
  .object({
    username: z
      .string({
        required_error: "Username is required",
        invalid_type_error: "Username must be a string",
      })
      .min(3, "Username must be at least 3 characters long"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email address"),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Password must be a string",
      })
      .min(6, "Password must be at least 6 characters long")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      }),
    confirmPassword: z
      .string({
        required_error: "Confirm Password is required",
        invalid_type_error: "Confirm Password must be a string",
      })
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const updateProfile = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  balance: z.preprocess(
    (val) => Number(val),
    z.number({
      required_error: "Balance is required",
      invalid_type_error: "Balance must be a number",
    })
  ),
})

export default {
  login,
  register,
  updateProfile,
}
