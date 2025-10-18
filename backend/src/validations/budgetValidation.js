import { z } from "zod"

const enumPeriod = ["yearly", "monthly"]

const create = z
  .object({
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .length(24, "Invalid category"),
    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be a positive number"),
    period: z.enum(enumPeriod, {
      required_error: "Period is required",
      invalid_type_error: "Period must be one of: yearly, monthly",
    }),
    startDate: z
      .string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Start date must be a valid date string",
      }),
    endDate: z
      .string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date string",
      }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })

const update = z
  .object({
    id: z
      .string({
        required_error: "ID is required",
        invalid_type_error: "ID must be a string",
      })
      .length(24, "Invalid ID"),
    category: z
      .string({
        required_error: "Category is required",
        invalid_type_error: "Category must be a string",
      })
      .length(24, "Invalid category"),
    amount: z
      .number({
        required_error: "Amount is required",
        invalid_type_error: "Amount must be a number",
      })
      .positive("Amount must be a positive number"),
    period: z.enum(enumPeriod, {
      required_error: "Period is required",
      invalid_type_error: "Period must be one of: yearly, monthly",
    }),
    startDate: z
      .string({
        required_error: "Start date is required",
        invalid_type_error: "Start date must be a string",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "Start date must be a valid date string",
      }),
    endDate: z
      .string({
        required_error: "End date is required",
        invalid_type_error: "End date must be a string",
      })
      .refine((date) => !isNaN(Date.parse(date)), {
        message: "End date must be a valid date string",
      }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })

const remove = z.object({
  id: z
    .string({
      required_error: "ID is required",
      invalid_type_error: "ID must be a string",
    })
    .length(24, "Invalid ID"),
})

const budgetValidation = {
  create,
  update,
  remove,
}
export default budgetValidation
