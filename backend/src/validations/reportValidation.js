import { z } from "zod"

const summary = z.object({
  month: z
    .preprocess(
      (val) => Number(val),
      z
        .number({
          invalid_type_error: "Month must be a number",
          required_error: "Month is required",
        })
        .int()
        .min(0, "Month must be between 0 and 11")
        .max(11, "Month must be between 0 and 11"),
    )
    .default(new Date().getMonth()),
  year: z
    .preprocess(
      (val) => Number(val),
      z.number({
        invalid_type_error: "Year must be a number",
        required_error: "Year is required",
      }),
    )
    .default(new Date().getFullYear()),
})

const reportValidation = {
  summary,
}
export default reportValidation
