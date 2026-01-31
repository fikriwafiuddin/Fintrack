import { z } from "zod"

const add = z.object({
  type: z.enum(["expense", "income"], "Type is required"),
  amount: z.preprocess(
    (val) => Number(val),
    z
      .number("Amount must be a number")
      .positive("Amount must be a positive number"),
  ),
  category: z.string("Category is required"),
  frequency: z.enum(
    ["daily", "weekly", "monthly", "yearly"],
    "Frequency is required",
  ),
  startDate: z.date("Start date is required"),
  notes: z
    .string()
    .max(25, "Notes must be at most 25 characters long")
    .optional(),
})

const recurringValidation = {
  add,
}

export default recurringValidation
