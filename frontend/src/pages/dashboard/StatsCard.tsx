import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  TrendingUpIcon,
} from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

function StatsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const data = {
    totalIncome: 50000,
    totalExpense: 30000,
    difference: 20000,
  }

  return (
    <div className="space-y-4">
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
                  Rp {data.totalIncome.toLocaleString("id-ID")}
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
                  Rp {data.totalExpense.toLocaleString("id-ID")}
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
                  data.difference >= 0
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-orange-100 dark:bg-orange-900"
                }`}
              >
                <TrendingUpIcon
                  className={`h-6 w-6 ${
                    data.difference >= 0
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
                    data.difference >= 0
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-orange-600 dark:text-orange-400"
                  }`}
                >
                  Rp {Math.abs(data.difference).toLocaleString("id-ID")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default StatsCard
