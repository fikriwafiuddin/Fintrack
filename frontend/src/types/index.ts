import type budgetValidation from "@/lib/validations/budget-validation"
import type categoryValidation from "@/lib/validations/category-validation"
import type transactionValidation from "@/lib/validations/transaction-validation"
import { z } from "zod"

// Type success response from API
export interface SuccessResponse<TData> {
  success: boolean
  message: string
  data: TData
  meta: {
    timestamp: string
  }
}

// Type error response from API
export interface ErrorResponse<TErrors = Record<string, unknown>> {
  success: false
  message: string
  errors: TErrors | Record<string, unknown>
  data: object
  meta: { timestamp: string }
}

export type Category = {
  _id: string
  user?: string
  name: string
  type: "expense" | "income" | "both"
  color: string
  isDefault?: boolean
  createdAt?: Date
}

export type Transaction<TCategory> = {
  _id: string
  user: string
  category: TCategory
  type: "expense" | "income"
  amount: number
  date: Date
  notes?: string
}

export type Budget = {
  _id: string
  category: Category
  amount: number
  spent: number
  period: "yearly" | "monthly"
  endDate: Date
  startDate: Date
}

export type BreakdownCategoryItem = {
  _id: number
  name: string
  color: string
  amount: number
  percentage: number
}

export interface TransactionFilter {
  categoryId?: string
  type?: "income" | "expense"
  startDate?: Date
  endDate?: Date
  searchTerm?: string
  sort: "asc" | "desc"
}

export interface CategoryFieldErrors {
  name?: string[]
  type?: string[]
  color?: string[]
}

export interface TransactionFieldErrors {
  type?: string[]
  amount?: string[]
  category?: string[]
  date?: string[]
  notes?: string[]
}

export type FormDataTransaction = z.infer<typeof transactionValidation.add>
export type FormDataCategory = z.infer<typeof categoryValidation.add>
export type FormDataBudget = z.infer<typeof budgetValidation.add>
