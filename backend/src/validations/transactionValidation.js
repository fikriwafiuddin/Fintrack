import { z } from "zod"

const create = z.object({
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be a positive number"),
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    message: "Type must be either income or expense",
  }),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .length(24, "Invalid Category ID format"),
  date: z
    .string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Date must be a valid date string",
    }),
  notes: z
    .string({
      invalid_type_error: "Notes must be a string",
    })
    .max(500, "Notes must be at most 500 characters long")
    .optional(),
})

const update = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID format"),
  amount: z
    .number({
      required_error: "Amount is required",
      invalid_type_error: "Amount must be a number",
    })
    .positive("Amount must be a positive number"),
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    message: "Type must be either income or expense",
  }),
  category: z
    .string({
      required_error: "Category is required",
      invalid_type_error: "Category must be a string",
    })
    .length(24, "Invalid Category ID format"),
  date: z
    .string({
      required_error: "Date is required",
      invalid_type_error: "Date must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Date must be a valid date string",
    }),
  notes: z
    .string({
      invalid_type_error: "Notes must be a string",
    })
    .max(500, "Notes must be at most 500 characters long")
    .optional(),
})

const remove = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID format"),
})

const transactionValidation = {
  create,
  update,
  remove,
}
export default transactionValidation
