import recurringValidation from "@/lib/validations/recurring-validation"
import { z } from "zod"

export interface RecurringFieldErrors {
  type?: string[]
  amount?: string[]
  category?: string[]
  frequency?: string[]
  startDate?: string[]
  notes?: string[]
}

export type FormDataRecurring = z.infer<typeof recurringValidation.add>
