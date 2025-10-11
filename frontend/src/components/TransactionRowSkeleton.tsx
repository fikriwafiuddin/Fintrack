import { Skeleton } from "./ui/skeleton"

function TransactionRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg border border-border">
      <div className="flex items-center space-x-4">
        <Skeleton className="w-10 h-10 rounded-full" />
        <div>
          <Skeleton className="h-4 w-28 mb-1" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
      <Skeleton className="h-5 w-24" />
    </div>
  )
}

export default TransactionRowSkeleton
