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
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"], {
    required_error: "Frequency is required",
    message: "Frequency must be daily, weekly, monthly, or yearly",
  }),
  startDate: z
    .string({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Start date must be a valid date string",
    }),
  notes: z
    .string({
      invalid_type_error: "Notes must be a string",
    })
    .max(25, "Notes must be at most 25 characters long")
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
  frequency: z.enum(["daily", "weekly", "monthly", "yearly"], {
    required_error: "Frequency is required",
    message: "Frequency must be daily, weekly, monthly, or yearly",
  }),
  notes: z
    .string({
      invalid_type_error: "Notes must be a string",
    })
    .max(25, "Notes must be at most 25 characters long")
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

const updateStatus = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID format"),
})

const enumStatus = ["all", "active", "paused"]

const getAll = z.object({
  status: z
    .enum(enumStatus, {
      invalid_type_error: "Status must be all, active, or paused",
    })
    .default("all"),
})

const recurringValidation = {
  create,
  update,
  remove,
  updateStatus,
  getAll,
}
export default recurringValidation
