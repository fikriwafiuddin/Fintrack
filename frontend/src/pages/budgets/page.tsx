import BudgetCard from "@/components/BudgetCard"
import BudgetCardSkeleton from "@/components/BudgetCardSkeleton"
import BudgetForm from "@/components/BudgetForm"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { useGetAllBudgets } from "@/services/hooks/budgetHook"
import { AlertTriangleIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

function BudgetsPage() {
  const {
    isPending: isFetchingBudgets,
    data,
    error,
    isError,
  } = useGetAllBudgets()
  const [isAddingBudget, setIsAddingBudget] = useState<boolean>(false)

  const budgets = data?.budgets || []
  const errorMessage = error instanceof Error ? error.message : "Unknown error."

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

      {isError && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Failed to Load Budgets</AlertTitle>
          <AlertDescription>
            An error occurred while retrieving the budget list. Please try
            reloading the page.
            <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isFetchingBudgets ? (
          <>
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
            <BudgetCardSkeleton />
          </>
        ) : (
          budgets.map((budget) => (
            <BudgetCard key={budget._id} budget={budget} />
          ))
        )}
      </div>

      <BudgetForm open={isAddingBudget} onOpenChange={setIsAddingBudget} />
    </div>
  )
}

export default BudgetsPage
