import { z } from "zod"

const add = z.object({
  type: z.enum(["expense", "income"], "Type is required"),
  amount: z.preprocess(
    (val) => Number(val),
    z
      .number("Amount must be a number")
      .positive("Amount must be a positive number")
  ),
  category: z.string("Category is required"),
  date: z.date("Date is required"),
  time: z
    .string("Time must be a string")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format"),
  notes: z.string().optional(),
})

const transactionValidation = {
  add,
}
export default transactionValidation
