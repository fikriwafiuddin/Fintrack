import { z } from "zod"

const enumPeriod = ["yearly", "monthly"]

const add = z
  .object({
    category: z
      .string({
        error: (iss) =>
          iss.input === undefined || iss.input === ""
            ? "Category is required"
            : "Category must be a string",
      })
      .length(24, "Invalid category"),
    amount: z.preprocess(
      (val) => Number(val),
      z
        .number("Amount must be a number")
        .positive("Amount must be a positive number")
    ),
    period: z.enum(enumPeriod, {
      error: (iss) =>
        iss.input === undefined
          ? "Period is required"
          : "Type must be one of: yearly, monthly",
    }),
    startDate: z.date({
      error: (iss) =>
        iss.input === undefined || iss.input === ""
          ? "Start date is required"
          : "Start date must be a date",
    }),
    endDate: z.date({
      error: (iss) =>
        iss.input === undefined || iss.input === ""
          ? "End date is required"
          : "End date must be a date",
    }),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"],
  })

const budgetValidation = {
  add,
}
export default budgetValidation
