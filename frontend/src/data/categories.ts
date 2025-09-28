import type { Category } from "@/types"

const categories: Category[] = [
  {
    _id: "1",
    name: "Makanan",
    color: "#ff6b6b",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Transportasi",
    color: "#4ecdc4",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "3",
    name: "Tagihan",
    color: "#45b7d1",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "4",
    name: "Hiburan",
    color: "#f9ca24",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "5",
    name: "Gaji",
    color: "#6c5ce7",
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "6",
    name: "Investasi",
    color: "#a29bfe",
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
]
export default categories
