import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarIcon, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useGetRecentTransactions } from "@/services/hooks/dashboardHook"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Link } from "react-router"
import TransactionCard from "@/components/TransactionCard"
import TransactionRowSkeleton from "@/components/TransactionRowSkeleton"

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
            <TransactionCard transaction={transaction} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default LatestTransactions
