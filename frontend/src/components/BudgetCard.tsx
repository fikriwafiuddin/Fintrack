import type { Budget } from "@/types"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, EditIcon, Loader2Icon, Trash2Icon } from "lucide-react"
import { format } from "date-fns"
import { Progress } from "./ui/progress"
import { useState } from "react"
import BudgetForm from "./BudgetForm"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog"
import { useRemoveBudget } from "@/services/hooks/budgetHook"
import CurrencyFormatter from "./CurrencyFormatter"

interface BudgetCardProps {
  budget: Budget
}

function BudgetCard({ budget }: BudgetCardProps) {
  const [isEditingBudget, setIsEditingBudget] = useState<boolean>(false)
  const [isDeletingBudget, setIsDeletinBudget] = useState<boolean>(false)
  const { mutate: remove, isPending: removing } = useRemoveBudget()

  const handleDelete = () => {
    remove(budget._id, {
      onSuccess: () => setIsDeletinBudget(false),
    })
  }

  const percentage = Math.min((budget.spent / budget.amount) * 100, 100)
  let status = { color: "text-green-600", label: "Safe" }
  const remaining = budget.amount - budget.spent

  if (percentage >= 100) status = { color: "text-destructive", label: "Exceed" }
  else if (percentage >= 80)
    status = { color: "text-yellow-600", label: "Nearly gone" }

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white"
                style={{ backgroundColor: budget.category.color }}
              >
                {budget.category.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-lg">
                  {budget.category.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">{budget.period}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingBudget(true)}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-destructive hover:text-destructive"
                onClick={() => setIsDeletinBudget(true)}
              >
                <Trash2Icon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Budget Amount */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Budget</span>
              <span className="font-medium">
                <CurrencyFormatter amount={budget.amount} />
              </span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>

          {/* Spent & Remaining */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Used</p>
              <p className="font-semibold text-destructive">
                <CurrencyFormatter amount={budget.spent} />
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Remaining</p>
              <p className={`font-semibold ${status.color}`}>
                <CurrencyFormatter amount={Math.max(0, remaining)} />
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between pt-2 border-t">
            <div className="flex items-center text-xs text-muted-foreground">
              <CalendarIcon className="h-3 w-3 mr-1" />
              {format(new Date(budget.startDate), "dd MMM")} -{" "}
              {format(new Date(budget.endDate), "dd MMM yyyy")}
            </div>
            <span className={`text-xs font-medium ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Progress percentage */}
          <div className="text-center">
            <span className={`text-2xl font-bold ${status.color}`}>
              {percentage.toFixed(0)}%
            </span>
            <p className="text-xs text-muted-foreground">
              from the used budget
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Update Budget */}
      <BudgetForm
        open={isEditingBudget}
        onOpenChange={setIsEditingBudget}
        budget={budget}
      />

      {/* Delete Budget */}
      <AlertDialog open={isDeletingBudget} onOpenChange={setIsDeletinBudget}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Budget</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this budget? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={removing}
            >
              {removing ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BudgetCard
