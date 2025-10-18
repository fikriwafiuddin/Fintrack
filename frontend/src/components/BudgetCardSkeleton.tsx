import { CalendarIcon } from "lucide-react"
import { Card, CardContent, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

function BudgetCardSkeleton() {
  return (
    <Card className="shadow-none border border-gray-100 dark:border-gray-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          {/* Left Side: Category Icon and Name */}
          <div className="flex items-center space-x-3">
            {/* Category Initial Circle Skeleton */}
            <Skeleton className="w-10 h-10 rounded-full" />

            <div>
              {/* Category Name Skeleton */}
              <Skeleton className="h-4 w-28 mb-1" />

              {/* Period Skeleton */}
              <Skeleton className="h-3 w-16" />
            </div>
          </div>

          {/* Right Side: Action Buttons Skeleton */}
          <div className="flex items-center space-x-1">
            <Skeleton className="h-8 w-8 rounded-md" />
            <Skeleton className="h-8 w-8 rounded-md" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Budget Amount Section */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            {/* Budget Label Skeleton */}
            <Skeleton className="h-4 w-16" />

            {/* Budget Value Skeleton */}
            <Skeleton className="h-4 w-20" />
          </div>
          {/* Progress Bar Skeleton */}
          <Skeleton className="h-2 w-full" />
        </div>

        {/* Spent & Remaining Section (Grid) */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          {/* Used Column */}
          <div>
            <Skeleton className="h-4 w-12 mb-1" /> {/* Used Label */}
            <Skeleton className="h-6 w-24" /> {/* Used Value */}
          </div>
          {/* Remaining Column */}
          <div>
            <Skeleton className="h-4 w-16 mb-1" /> {/* Remaining Label */}
            <Skeleton className="h-6 w-24" /> {/* Remaining Value */}
          </div>
        </div>

        {/* Status/Date Range Section */}
        <div className="flex items-center justify-between pt-2 border-t border-dashed border-muted">
          {/* Date Range Skeleton */}
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="h-3 w-3 mr-1 opacity-50" />
            <Skeleton className="h-3 w-32" />
          </div>

          {/* Status Label Skeleton */}
          <Skeleton className="h-3 w-16" />
        </div>

        {/* Progress Percentage */}
        <div className="text-center">
          {/* Percentage Value Skeleton */}
          <Skeleton className="h-8 w-16 mx-auto mb-1" />

          {/* Description Skeleton */}
          <Skeleton className="h-3 w-28 mx-auto" />
        </div>
      </CardContent>
    </Card>
  )
}

export default BudgetCardSkeleton
