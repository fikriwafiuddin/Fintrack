import { z } from "zod"

const summary = z.object({
  period: z.enum(["today", "week", "month"], {
    required_error: "Period is required",
    message: "Period must be either today, week, or month",
  }),
})

const dashboardValidation = {
  summary,
}
export default dashboardValidation
