import type { Category, RecurringTransaction } from "@/types"
import { Button } from "../ui/button"
import { Loader2Icon, PauseIcon, PlayIcon } from "lucide-react"
import { useUpdateRecurringStatus } from "@/services/hooks/recurringHook"

type RecurringToggleStatusProps = {
  recurring: RecurringTransaction<string | Category>
}

function RecurringToggleStatus({ recurring }: RecurringToggleStatusProps) {
  const { mutate: toggleStatus, isPending: toggling } =
    useUpdateRecurringStatus()
  const handleToggle = () => {
    toggleStatus(recurring._id)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8"
      onClick={handleToggle}
      disabled={toggling}
    >
      {toggling ? (
        <Loader2Icon className="size-4 animate-spin" />
      ) : recurring.status === "active" ? (
        <PauseIcon className="size-4" />
      ) : (
        <PlayIcon className="size-4" />
      )}
    </Button>
  )
}

export default RecurringToggleStatus
