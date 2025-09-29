import { Button } from "@/components/ui/button"
import type { TransactionFilter } from "@/types"
import {
  ArrowUpDownIcon,
  CalendarIcon,
  EditIcon,
  FilterIcon,
  PlusIcon,
  SearchIcon,
  Trash2Icon,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import categories from "@/data/categories"
import transactions from "@/data/transactions"
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
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { getContrastColor } from "@/lib/utils"

function TransactionsPage() {
  const [filter, setFilter] = useState<TransactionFilter>({})
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  const handleFilterChange = (key: keyof TransactionFilter, value: string) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value === "all" ? undefined : value,
    }))
  }

  const handleDelete = (transactionId: string) => {
    console.log(transactionId)
    // deleteTransaction(transactionId);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Transaction History
          </h1>
          <p className="text-muted-foreground">
            Manage and view all your financial transactions
          </p>
        </div>
        <Link to="/add-transaction">
          <Button size="lg" className="w-full sm:w-auto">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilterIcon className="h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search for transactions..."
                value={filter.searchTerm || ""}
                onChange={(e) =>
                  handleFilterChange("searchTerm", e.target.value)
                }
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select
              value={filter.type || "all"}
              onValueChange={(value) => handleFilterChange("type", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="income">Income</SelectItem>
                <SelectItem value="expense">Expense</SelectItem>
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filter.categoryId || "all"}
              onValueChange={(value) => handleFilterChange("categoryId", value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Category</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span>{category.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Button
              variant="outline"
              onClick={() =>
                setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"))
              }
              className="justify-start"
            >
              <ArrowUpDownIcon className="mr-2 h-4 w-4" />
              {sortOrder === "desc" ? "Latest" : "Oldest"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction List ({transactions.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                {Object.keys(filter).some(
                  (key) => filter[key as keyof TransactionFilter]
                )
                  ? "No transactions match the filter"
                  : "There are no transactions yet"}
              </p>
              <Link to="/add-transaction" className="inline-block mt-4">
                <Button>Add Transaction</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-2">
              {transactions.map((transaction) => {
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
                            <p className="font-medium">
                              {transaction.category.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(
                                new Date(transaction.date),
                                "dd MMMM yyyy"
                              )}
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
                              {transaction.type === "income"
                                ? "Income"
                                : "Expense"}
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
                      <AlertDialog>
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
                            <AlertDialogTitle>
                              Delete Transaction
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this transaction?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(transaction._id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default TransactionsPage
