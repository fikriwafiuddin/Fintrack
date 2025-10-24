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

const enumType = ["all", "income", "expense"]
const enumSort = ["asc", "desc"]

const getAll = z.object({
  type: z
    .enum(enumType, {
      invalid_type_error: "Type must be all, income, or expense",
    })
    .default("all"),
  category: z
    .string({
      invalid_type_error: "Category must be a string",
    })
    .default("all"),
  sort: z
    .enum(enumSort, {
      invalid_type_error: "Sort must be asc or desc",
    })
    .default("asc"),
  startDate: z
    .string({
      required_error: "Start date is required",
      invalid_type_error: "Start date must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "Start date must be a valid date string",
    })
    .default(
      new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString()
    ),
  endDate: z
    .string({
      required_error: "End date is required",
      invalid_type_error: "End date must be a string",
    })
    .refine((date) => !isNaN(Date.parse(date)), {
      message: "End date must be a valid date string",
    })
    .default(
      new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0
      ).toISOString()
    ),
  page: z
    .preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Page must be number",
        })
        .positive("Page must be positive number")
    )
    .default(1),
})

const transactionValidation = {
  create,
  update,
  remove,
  getAll,
}
export default transactionValidation
