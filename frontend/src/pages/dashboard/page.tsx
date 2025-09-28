import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { Category, Transaction } from "@/types"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  CalendarIcon,
  PlusIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import { format } from "date-fns"

const recentTransactions: Array<Transaction<Category>> = [
  {
    _id: "1",
    user: "1",
    category: {
      _id: "1",
      name: "Food",
      user: "1",
      type: "expenses",
      color: "#123456",
      is_default: false,
    },
    type: "expense",
    date: new Date(),
    notes: "Pecel Lele",
    amount: 10000,
  },
  {
    _id: "2",
    user: "1",
    category: {
      _id: "2",
      name: "Freelance",
      user: "1",
      type: "income",
      color: "#545454",
      is_default: false,
    },
    type: "income",
    date: new Date(),
    notes: "Web development",
    amount: 10000,
  },
]

function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")

  const periodData = useMemo(() => {
    let label: string

    switch (selectedPeriod) {
      case "today":
        label = "Hari Ini"
        break
      case "week":
        label = "Minggu Ini"
        break
      case "month":
        label = "Bulan Ini"
        break
      default:
        label = "Hari Ini"
    }

    const totalIncome = 100000

    const totalExpense = 20000

    return {
      label,
      totalIncome,
      totalExpense,
      net: totalIncome - totalExpense,
      transactions: 10,
    }
  }, [selectedPeriod])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! View your financial summary.
          </p>
        </div>
        <Link to="/add-transaction">
          <Button size="lg" className="w-full sm:w-auto">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-foreground text-sm">Total Balance</p>
              <h2 className="text-3xl font-bold">Rp {100000}</h2>
            </div>
            <WalletIcon className="h-12 w-12 text-primary-foreground/80" />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Period Summary</h3>
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income Card */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                <ArrowUpCircleIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Income {selectedPeriod}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  Rp {periodData.totalIncome.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Expense Card */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                <ArrowDownCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Expenses {selectedPeriod}
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  Rp {periodData.totalExpense.toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Net Card */}
        <Card>
          <CardContent className="p-3">
            <div className="flex items-center space-x-4">
              <div
                className={`p-2 rounded-full ${
                  periodData.net >= 0
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-orange-100 dark:bg-orange-900"
                }`}
              >
                <TrendingUpIcon
                  className={`h-6 w-6 ${
                    periodData.net >= 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Difference {selectedPeriod}
                </p>
                <p
                  className={`text-2xl font-bold ${
                    periodData.net >= 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  Rp {Math.abs(periodData.net).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          {recentTransactions.length === 0 ? (
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
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div
                  key={transaction._id}
                  className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium"
                      style={{ backgroundColor: transaction.category.color }}
                    >
                      {transaction.category.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.category.name}</p>
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
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default DashboardPage
