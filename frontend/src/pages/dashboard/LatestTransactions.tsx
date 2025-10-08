import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useGetRecentTransactions } from "@/services/hooks/dashboardHook"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "react-router"

const TransactionRowSkeleton = () => (
  <div className="flex items-center justify-between p-4 rounded-lg border border-border">
    <div className="flex items-center space-x-4">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div>
        <Skeleton className="h-4 w-28 mb-1" />
        <Skeleton className="h-3 w-20" />
      </div>
    </div>
    <Skeleton className="h-5 w-24" />
  </div>
)

function LatestTransactions() {
  const {
    data: transactions,
    isPending,
    isError,
    error,
  } = useGetRecentTransactions()

  const recentTransactionsData = transactions || []

  const isEmpty = !isPending && !isError && recentTransactionsData.length === 0

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to load recent transactions."

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Latest Transactions</CardTitle>
          <Link to="/transactions">
            <Button variant="outline" size="sm">
              See All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Failed to Load</AlertTitle>
            <AlertDescription>
              Unable to retrieve transaction data. Please try reloading the
              page.
              <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  if (isPending) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Latest Transactions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TransactionRowSkeleton />
          <TransactionRowSkeleton />
          <TransactionRowSkeleton />
        </CardContent>
      </Card>
    )
  }

  if (isEmpty) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Latest Transactions</CardTitle>
          <Link to="/transactions">
            <Button variant="outline" size="sm">
              See All
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              There are no transactions yet
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Start by adding your first transaction
            </p>
            <Link to="/add-transaction">
              <Button>Add Transaction</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Latest Transactions</CardTitle>
        <Link to="/transactions">
          <Button variant="outline" size="sm">
            See All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTransactionsData.map((transaction) => (
            <div
              key={transaction._id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                  style={{
                    backgroundColor: transaction.category?.color || "#cccccc",
                  }}
                >
                  {transaction.category?.name.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p className="font-medium">
                    {transaction.category?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(transaction.date), "dd MMM yyyy")}
                  </p>
                  {transaction.notes && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {transaction.notes}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold ${
                    transaction.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}
                  Rp {transaction.amount.toLocaleString("id-ID")}
                </p>
                <p className="text-xs text-muted-foreground">
                  {transaction.type === "income" ? "Income" : "Expenses"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestTransactions
