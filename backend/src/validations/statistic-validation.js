import { z } from "zod"

const statisticPerMonth = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Type is required",
    invalid_type_error: "Type must be either 'income' or 'expense'",
  }),
  year: z.preprocess(
    (val) => Number(val),
    z
      .number({
        required_error: "Year is required",
        invalid_type_error: "Year must be a number",
      })
      .positive({ message: "Year must be positive" })
  ),
  month: z.string(),
})

export default {
  statisticPerMonth,
}
