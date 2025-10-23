import CurrencyFormatter from "@/components/CurrencyFormatter"
import CustomTooltip from "@/components/CustomTooltip"
import { AlertTitle } from "@/components/ui/alert"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { BreakdownCategoryItem } from "@/types"
import { AlertTriangleIcon, PieChartIcon } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type CategoryBreakDownProps = {
  month: string
  year: number
  incomeBreakdown: BreakdownCategoryItem[]
  expenseBreakdown: BreakdownCategoryItem[]
}

// --- SKELETON COMPONENT UNTUK CATEGORY BREAKDOWN ---
export const CategoryBreakDownSkeleton = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-pulse">
    {[1, 2].map((i) => (
      <Card key={i}>
        <CardHeader>
          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-muted rounded-md" />
        </CardHeader>
        <CardContent>
          {/* Pie Chart Area Skeleton */}
          <div className="h-[250px] w-full flex items-center justify-center bg-muted rounded-lg mb-4">
            {/* Circle Placeholder */}
            <div className="w-24 h-24 rounded-full bg-muted-foreground/30" />
          </div>
          {/* List/Legend Skeleton */}
          <div className="space-y-3 pt-2">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-muted-foreground/50" />
                  <div className="h-3 w-20 bg-muted-foreground/50 rounded" />
                </div>
                <div className="h-3 w-16 bg-muted-foreground/50 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
)

// --- ERROR COMPONENT UNTUK CATEGORY BREAKDOWN ---
export const CategoryBreakDownError = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    {[1, 2].map((i) => (
      <Card key={i} className="border-destructive">
        <CardHeader className="flex flex-row items-center space-x-2">
          <PieChartIcon className="h-5 w-5 text-destructive" />
          <AlertTitle className="m-0 p-0 text-destructive">
            Data Load Failed
          </AlertTitle>
        </CardHeader>
        <CardContent className="h-[300px] flex flex-col justify-center items-center text-center">
          <AlertTriangleIcon className="h-8 w-8 text-destructive mb-3" />
          <p className="text-sm text-destructive font-medium">
            Failed to load {i === 1 ? "Expense" : "Income"} Breakdown.
          </p>
          <p className="text-xs text-muted-foreground">
            Check the connection or try changing the reporting month.
          </p>
        </CardContent>
      </Card>
    ))}
  </div>
)

function CategoryBreakDown({
  month,
  year,
  incomeBreakdown,
  expenseBreakdown,
}: CategoryBreakDownProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Expense Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Expense Breakdown - {month} {year}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {expenseBreakdown.length > 0 ? (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={expenseBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ percentage }) => `(${percentage.toFixed(1)}%)`}
                  >
                    {expenseBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2">
                {expenseBreakdown.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        <CurrencyFormatter amount={item.amount} />
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PieChartIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                There is no expense data for {month} {year}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Income Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5" />
            Income Breakdown - {month} {year}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {incomeBreakdown.length > 0 ? (
            <div className="space-y-4">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={incomeBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="amount"
                    label={({ percentage }) => `(${percentage.toFixed(1)}%)`}
                  >
                    {incomeBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>

              <div className="space-y-2">
                {incomeBreakdown.slice(0, 5).map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Rp {item.amount.toLocaleString("id-ID")}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.percentage.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <PieChartIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                There is no income data for {month} {year}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default CategoryBreakDown
