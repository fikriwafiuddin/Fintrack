export type Category = {
  _id: string
  user: string
  name: string
  type: string
  color: string
  is_default: boolean
}

export type Transaction<TCategory> = {
  _id: string
  user: string
  category: TCategory
  type: string
  amount: number
  date: Date
  notes: string
}
