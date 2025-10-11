import { Card, CardContent } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

function StatCardSkeleton() {
  return (
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
}

export default StatCardSkeleton
