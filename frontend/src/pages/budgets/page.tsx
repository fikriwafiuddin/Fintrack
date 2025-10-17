import BudgetCard from "@/components/BudgetCard"
import BudgetForm from "@/components/BudgetForm"
import { Button } from "@/components/ui/button"
import type { Budget } from "@/types"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

const budgets: Budget[] = [
  {
    _id: "b1",
    category: {
      _id: "c1",
      user: "u1",
      name: "Makanan & Minuman",
      type: "expense",
      color: "#FF6B6B",
      isDefault: true,
      createdAt: new Date("2025-01-01"),
    },
    amount: 3000000,
    spent: 2250000,
    period: "monthly",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
  },
  {
    _id: "b2",
    category: {
      _id: "c2",
      user: "u1",
      name: "Transportasi",
      type: "expense",
      color: "#4ECDC4",
      createdAt: new Date("2025-02-10"),
    },
    amount: 1000000,
    spent: 850000,
    period: "monthly",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
  },
  {
    _id: "b3",
    category: {
      _id: "c3",
      user: "u1",
      name: "Gaji",
      type: "income",
      color: "#1A535C",
      createdAt: new Date("2025-03-05"),
    },
    amount: 10000000,
    spent: 0,
    period: "monthly",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
  },
  {
    _id: "b4",
    category: {
      _id: "c4",
      user: "u1",
      name: "Hiburan",
      type: "expense",
      color: "#FF9F1C",
      createdAt: new Date("2025-04-12"),
    },
    amount: 1500000,
    spent: 1200000,
    period: "monthly",
    startDate: new Date("2025-10-01"),
    endDate: new Date("2025-10-31"),
  },
  {
    _id: "b5",
    category: {
      _id: "c5",
      user: "u1",
      name: "Investasi",
      type: "both",
      color: "#2EC4B6",
      createdAt: new Date("2025-05-20"),
    },
    amount: 2000000,
    spent: 500000,
    period: "yearly",
    startDate: new Date("2025-01-01"),
    endDate: new Date("2025-12-31"),
  },
]

function BudgetsPage() {
  const [isAddingBudget, setIsAddingBudget] = useState<boolean>(false)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Budget Management
          </h1>
          <p className="text-muted-foreground">
            Manage your budget to control your expenses
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => setIsAddingBudget(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Budget
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {budgets.map((budget) => (
          <BudgetCard key={budget._id} budget={budget} />
        ))}
      </div>

      <BudgetForm open={isAddingBudget} onOpenChange={setIsAddingBudget} />
    </div>
  )
}

export default BudgetsPage
