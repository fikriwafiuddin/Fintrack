export type Category = {
  _id: string
  user?: string
  name: string
  type: string
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

export interface TransactionFilter {
  categoryId?: string
  type?: "income" | "expense"
  startDate?: Date
  endDate?: Date
  searchTerm?: string
}
