import { z } from "zod"

const askAI = z.object({
  message: z
    .string("Message must be a string")
    .min(1, "Message must be at least 1 characters")
    .trim(),
})

const chatValidation = {
  askAI,
}
export default chatValidation
