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
  AlertTriangle,
} from "lucide-react"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { useGetSummary } from "@/services/hooks/dashboardHook"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const StatCardSkeleton = () => (
  <Card className="h-28">
    <CardContent className="p-3 h-full">
      <div className="flex items-center space-x-4 h-full">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
    </CardContent>
  </Card>
)

function StatsCard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today")
  const { data, isPending, isError, error } = useGetSummary({
    period: selectedPeriod,
  })

  const summaryData = data?.summary || {
    totalIncome: 0,
    totalExpense: 0,
    difference: 0,
  }
  const netDifference = summaryData.difference
  const isPositive = netDifference >= 0

  if (isError) {
    return (
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

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Failed to Load Data</AlertTitle>
          <AlertDescription>
            An error occurred while retrieving today's summary. Please try
            again.
            <p className="mt-1 text-xs opacity-80">
              {error instanceof Error ? error.message : "Unknown error."}
            </p>
          </AlertDescription>
        </Alert>
      </div>
    )
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
        {isPending ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            {/* --- Income Card --- */}
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
                      Rp {summaryData.totalIncome.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- Expense Card --- */}
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
                      Rp {summaryData.totalExpense.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* --- Net Card (Difference) --- */}
            <Card>
              <CardContent className="p-3">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-full ${
                      isPositive
                        ? "bg-blue-100 dark:bg-blue-900"
                        : "bg-orange-100 dark:bg-orange-900"
                    }`}
                  >
                    <TrendingUpIcon
                      className={`h-6 w-6 ${
                        isPositive
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
                        isPositive
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-orange-600 dark:text-orange-400"
                      }`}
                    >
                      Rp {Math.abs(netDifference).toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

export default StatsCard
