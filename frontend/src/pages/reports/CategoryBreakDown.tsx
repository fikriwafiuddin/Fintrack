import CustomTooltip from "@/components/CustomTooltip"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChartIcon } from "lucide-react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type BreakdownItem = {
  categoryId: number
  categoryName: string
  color: string
  amount: number
  percentage: number
}

type CategoryBreakDownProps = {
  month: string
  year: number
  incomeBreakdown: BreakdownItem[]
  expenseBreakdown: BreakdownItem[]
}

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
                    label={({ categoryName, percentage }) =>
                      `${categoryName} (${percentage.toFixed(1)}%)`
                    }
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
                    key={item.categoryId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">
                        {item.categoryName}
                      </span>
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
                    label={({ categoryName, percentage }) =>
                      `${categoryName} (${percentage.toFixed(1)}%)`
                    }
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
                    key={item.categoryId}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium">
                        {item.categoryName}
                      </span>
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
