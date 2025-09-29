import type { Category, Transaction } from "@/types"

const transactions: Transaction<Category>[] = [
  {
    _id: "1",
    category: {
      _id: "1",
      name: "Food",
      color: "#333fff",
      type: "Income",
    },
    amount: 1000,
    user: "1",
    date: new Date(),
    type: "income",
  },
]

export default transactions
