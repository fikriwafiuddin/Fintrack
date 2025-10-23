import CurrencyFormatter from "@/components/CurrencyFormatter"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, TrendingUpIcon } from "lucide-react"

type SummaryCardProps = {
  summaryData: {
    totalIncome: number
    totalExpense: number
    difference: number
    totalTransactions: number
  }
}

function SummaryCard({ summaryData }: SummaryCardProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Income</p>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                <CurrencyFormatter amount={summaryData.totalIncome} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
              <TrendingUpIcon className="h-6 w-6 text-red-600 dark:text-red-400 rotate-180" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expense</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                <CurrencyFormatter amount={summaryData.totalExpense} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div
              className={`p-2 rounded-full ${
                summaryData.difference >= 0
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "bg-orange-100 dark:bg-orange-900"
              }`}
            >
              <TrendingUpIcon
                className={`h-6 w-6 ${
                  summaryData.difference >= 0
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-orange-600 dark:text-orange-400"
                }`}
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">difference</p>
              <p
                className={`text-2xl font-bold ${
                  summaryData.difference >= 0
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-orange-600 dark:text-orange-400"
                }`}
              >
                <CurrencyFormatter amount={Math.abs(summaryData.difference)} />
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <CalendarIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Transaction</p>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {summaryData.totalTransactions}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCard
