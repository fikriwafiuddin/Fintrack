import { z } from "zod"

const create = z.object({
  subject: z
    .string({
      required_error: "Subject is required",
      invalid_type_error: "Subject must be a string",
    })
    .min(5, "Subject must be at least 5 characters long")
    .max(100, "Feedback subject must be at most 100 characters"),
  message: z
    .string({
      required_error: "Message is required",
      invalid_type_error: "Message must be a string",
    })
    .min(10, "Message must be at least 10 characters long")
    .max(1000, "Feedback message must be at most 1000 characters"),
})

const feedbackValidation = {
  create,
}
export default feedbackValidation
