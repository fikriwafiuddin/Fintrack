import { z } from "zod"

const create = z.object({
  subject: z
    .string({
      error: "Feedback subject is required",
    })
    .min(5, "Feedback subject must be at least 5 characters")
    .max(100, "Feedback subject must be at most 100 characters"),
  message: z
    .string({
      error: "Feedback message is required",
    })
    .min(10, "Feedback message must be at least 10 characters")
    .max(1000, "Feedback message must be at most 1000 characters"),
})

export const feedbackValidation = {
  create,
}
