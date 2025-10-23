import { format } from "date-fns"
import TransactionForm from "@/components/TransactionForm"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { getContrastColor } from "@/lib/utils"
import type { Category, Transaction } from "@/types"
import { Button } from "./ui/button"
import {
  EditIcon,
  EllipsisVerticalIcon,
  Loader2Icon,
  Trash2Icon,
} from "lucide-react"
import { useState } from "react"
import { useRemoveTransaction } from "@/services/hooks/transactionHook"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import CurrencyFormatter from "./CurrencyFormatter"

type TransactionCardProps = {
  transaction: Transaction<Category>
}

function TransactionCard({ transaction }: TransactionCardProps) {
  const [removingTransaction, setRemovingTransaction] = useState<boolean>(false)
  const [editingTransaction, setEditingTransaction] = useState<boolean>(false)
  const { mutate: remove, isPending: removing } = useRemoveTransaction()

  const handleDelete = () => {
    remove(transaction._id, {
      onSuccess: () => setRemovingTransaction(false),
    })
  }

  return (
    <div
      key={transaction._id}
      className="relative flex items-center text-xs sm:text-base justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
    >
      {/* Dropdown Menu Actions Mobile */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="sm:hidden absolute top-1 right-1"
          asChild
        >
          <Button variant="ghost" size="icon">
            <EllipsisVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40" align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => setEditingTransaction(true)}>
              <EditIcon className="size-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setRemovingTransaction(true)}>
              <Trash2Icon className="size-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

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
              <p className="font-medium text-sm sm:text-base">
                {transaction.category.name}
              </p>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {format(new Date(transaction.date), "dd MMMM yyyy HH:mm")}
              </p>
              <p
                className={`sm:hidden font-bold text-sm sm:text-sm ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                <CurrencyFormatter amount={transaction.amount} />
              </p>
              {transaction.notes && (
                <p className="text-xs text-muted-foreground mt-1 max-w-xs truncate">
                  {transaction.notes}
                </p>
              )}
            </div>
            <div className="text-right">
              <p
                className={`hidden sm:block font-bold text-sm sm:text-lg ${
                  transaction.type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                <CurrencyFormatter amount={transaction.amount} />
              </p>
              <p className="text-xs text-muted-foreground">
                {transaction.type === "income" ? "Income" : "Expense"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="hidden sm:flex items-center space-x-1 sm:space-x-2 ml-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setEditingTransaction(true)}
        >
          <EditIcon className="size-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setRemovingTransaction(true)}
        >
          <Trash2Icon className="size-4" />
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog onOpenChange={setEditingTransaction} open={editingTransaction}>
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
              variant="destructive"
            >
              {removing ? <Loader2Icon className="animate-spin" /> : "Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default TransactionCard
