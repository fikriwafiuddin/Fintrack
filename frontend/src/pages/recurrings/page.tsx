import { Button } from "@/components/ui/button"
import { PlusIcon, RefreshCwIcon, AlertTriangleIcon } from "lucide-react"
import { useGetAllRecurrings } from "@/services/hooks/recurringHook"
import RecurringCard from "@/components/recurring/RecurringCard"
import { useNavigate } from "react-router"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"
import RecurringForm from "@/components/recurring/RecurringForm"
import { useState } from "react"

function RecurringTransactionsPage() {
  const {
    data: recurrings,
    isPending,
    isError,
    error,
    refetch,
  } = useGetAllRecurrings()
  const navigate = useNavigate()
  const [openForm, setOpenForm] = useState<boolean>(false)

  return (
    <div className="space-y-6">
      <RecurringForm open={openForm} onOpenChange={setOpenForm} />

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Recurring Transactions
          </h1>
          <p className="text-muted-foreground">
            Manage your automated income and expenses
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => setOpenForm(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Recurring
        </Button>
      </div>

      {isError && (
        <Alert variant="destructive">
          <AlertTriangleIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "Failed to load recurring transactions."}
            <Button
              variant="link"
              className="p-0 h-auto text-destructive underline"
              onClick={() => refetch()}
            >
              Try again
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      ) : recurrings && recurrings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recurrings.map((recurring) => (
            <RecurringCard key={recurring._id} recurring={recurring} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-muted/30 rounded-lg border-2 border-dashed">
          <RefreshCwIcon className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
          <h3 className="text-xl font-semibold text-muted-foreground">
            No recurring transactions found
          </h3>
          <p className="text-muted-foreground mb-6">
            Create one to automate your financial tracking
          </p>
          <Button onClick={() => navigate("/recurrings/add")}>
            Create your first recurring
          </Button>
        </div>
      )}
    </div>
  )
}

export default RecurringTransactionsPage
