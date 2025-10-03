import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Category, Transaction } from "@/types"
import { CalendarIcon } from "lucide-react"
import { Link } from "react-router"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"

const recentTransactions: Array<Transaction<Category>> = [
  {
    _id: "1",
    user: "1",
    category: {
      _id: "1",
      name: "Food",
      user: "1",
      type: "expense",
      color: "#123456",
      isDefault: false,
      createdAt: new Date(),
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
      isDefault: false,
      createdAt: new Date(),
    },
    type: "income",
    date: new Date(),
    notes: "Web development",
    amount: 10000,
  },
]

function LatestTransactions() {
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
  )
}

export default LatestTransactions
