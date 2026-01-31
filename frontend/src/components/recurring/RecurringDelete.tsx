import { Loader2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useRemoveRecurring } from "@/services/hooks/recurringHook"

type RecurringDeleteProps = {
  recurringId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

function RecurringDelete({
  recurringId,
  open,
  onOpenChange,
}: RecurringDeleteProps) {
  const { mutate: remove, isPending: removing } = useRemoveRecurring()

  const handleDelete = () => {
    remove(recurringId, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Recurring Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this recurring transaction?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={removing}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={removing}
          >
            {removing ? <Loader2Icon className="animate-spin" /> : "Delete"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RecurringDelete
