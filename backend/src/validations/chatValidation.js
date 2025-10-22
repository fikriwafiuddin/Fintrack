import { z } from "zod"

const show = z
  .string({
    required_error: "Chat ID is required",
    invalid_type_error: "Chat ID must be a string",
  })
  .length(24, "Invalid format chat ID")

const askAI = z.object({
  //   chatId: z
  //     .string({
  //       required_error: "Chat ID is required",
  //       invalid_type_error: "Chat ID must be a string",
  //     })
  //     .length(24, "Invalid format chat ID")
  //     .optional(),
  message: z.string({
    required_error: "Message is required",
    invalid_type_error: "Message must be a string",
  }),
})

const chatValidation = {
  show,
  askAI,
}
export default chatValidation
