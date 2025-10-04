import { z } from "zod"

const create = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .trim(),
  type: z.enum(["income", "expense", "both"], {
    required_error: "Type is required",
    message: "Type must be either income, expense, or both",
  }),
  color: z
    .string({
      required_error: "Color is required",
      invalid_type_error: "Color must be a string",
    })
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code"),
})

const update = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID format"),
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name must be a string",
    })
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters")
    .trim(),
  type: z.enum(["income", "expense", "both"], {
    required_error: "Type is required",
    message: "Type must be either 'income', 'expense', or 'both'",
  }),
  color: z
    .string({
      required_error: "Color is required",
      invalid_type_error: "Color must be a string",
    })
    .regex(/^#([0-9A-F]{3}){1,2}$/i, "Color must be a valid hex code"),
})

const remove = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID format"),
})

const categoryValidation = {
  create,
  update,
  remove,
}
export default categoryValidation
