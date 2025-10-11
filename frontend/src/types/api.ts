import type transactionValidation from "@/lib/validations/transaction-validation"
import { z } from "zod"

export interface ErrorResponse<TErrors = Record<string, unknown>> {
  success: false
  message: string
  errors: TErrors | Record<string, unknown>
  data: object
  meta: { timestamp: string }
}

export interface CategoryFieldErrors {
  name?: string[]
  type?: string[]
  color?: string[]
}

export type FormDataTransaction = z.infer<typeof transactionValidation.add>

export interface TransactionFieldErrors {
  type?: string[]
  amount?: string[]
  category?: string[]
  date?: string[]
  notes?: string[]
}
