import { format } from "date-fns"
import TransactionForm from "@/components/TransactionForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getContrastColor } from "@/lib/utils"
import type { Category, Transaction } from "@/types"
import { Button } from "./ui/button"
import { EditIcon, Loader2Icon, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { useRemoveTransaction } from "@/services/hooks/transactionHook"

type TransactionCardProps = {
  transaction: Transaction<Category>
}

function TransactionCard({ transaction }: TransactionCardProps) {
  const [removingTransaction, setRemovingTransaction] = useState<boolean>(false)
  const { mutate: remove, isPending: removing } = useRemoveTransaction()

  const handleDelete = () => {
    remove(transaction._id, {
      onSuccess: () => setRemovingTransaction(false),
    })
  }

  return (
    <div
      key={transaction._id}
      className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center space-x-4 flex-1">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-medium"
          style={{
            backgroundColor: transaction.category.color,
            color: getContrastColor(transaction.category.color),
          }}
        >
          {transaction.category.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{transaction.category.name}</p>
              <p className="text-sm text-muted-foreground">
                {format(new Date(transaction.date), "dd MMMM yyyy")}
              </p>
              {transaction.notes && (
                <p className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                  {transaction.notes}
                </p>
              )}
            </div>
            <div className="text-right">
              <p
                className={`font-bold text-lg ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                Rp {transaction.amount.toLocaleString("id-ID")}
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.type === "income" ? "Income" : "Expense"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2 ml-4">
        {/* Edit Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <EditIcon className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm
              transaction={{
                ...transaction,
                category: transaction.category._id,
              }}
            />
          </DialogContent>
        </Dialog>

        {/* Delete Alert */}
        <AlertDialog
          onOpenChange={setRemovingTransaction}
          open={removingTransaction}
        >
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="text-destructive hover:text-destructive"
            >
              <Trash2Icon className="h-4 w-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Transaction</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to delete this transaction? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button
                disabled={removing}
                onClick={handleDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {removing ? <Loader2Icon className="animate-spin" /> : "Delete"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}

export default TransactionCard
