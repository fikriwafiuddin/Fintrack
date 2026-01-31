import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Edit2Icon, Trash2Icon } from "lucide-react"
import type { Category, RecurringTransaction } from "@/types"
import { format } from "date-fns"
import CurrencyFormatter from "../CurrencyFormatter"
import { cn } from "@/lib/utils"
import { useState } from "react"
import RecurringForm from "./RecurringForm"
import RecurringDelete from "./RecurringDelete"
import RecurringToggleStatus from "./RecurringToggleStatus"

interface RecurringCardProps {
  recurring: RecurringTransaction<Category>
}

function RecurringCard({ recurring }: RecurringCardProps) {
  const [openForm, setOpenForm] = useState<boolean>(false)
  const [openDelete, setOpenDelete] = useState<boolean>(false)

  const handleDelete = () => {
    setOpenDelete(true)
  }

  const handleEdit = () => {
    setOpenForm(true)
  }

  return (
    <>
      <Card
        className={cn(recurring.status === "paused" && "opacity-60", "p-0")}
      >
        <CardContent className="p-4">
          <div className="flex flex-col">
            <div className="flex items-center space-x-4">
              <div
                className="p-2 rounded-full text-white"
                style={{ backgroundColor: recurring.category.color }}
              >
                <CalendarIcon className="size-5" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {recurring.category.name}
                </h3>
                <p className="text-sm text-muted-foreground capitalize">
                  {recurring.frequency} • {recurring.type}
                </p>
              </div>
            </div>
            <div>
              <p
                className={cn(
                  "font-bold text-lg",
                  recurring.type === "income"
                    ? "text-green-500"
                    : "text-red-500",
                )}
              >
                {recurring.type === "income" ? "+" : "-"}
                <CurrencyFormatter amount={recurring.amount} />
              </p>
              <p className="text-xs text-muted-foreground">
                Next:{" "}
                {format(new Date(recurring.nextOccurrence), "dd MMM yyyy")}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className={cn(
                  "px-2 py-0.5 rounded-full text-[10px] uppercase font-bold",
                  recurring.status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700",
                )}
              >
                {recurring.status}
              </span>
            </div>
            <div className="flex space-x-2">
              <RecurringToggleStatus recurring={recurring} />
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                onClick={handleEdit}
              >
                <Edit2Icon className="size-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 text-red-500 hover:text-red-600"
                onClick={handleDelete}
              >
                <Trash2Icon className="size-4" />
              </Button>
            </div>
          </div>

          {recurring.notes && (
            <p className="mt-3 text-sm text-muted-foreground border-t pt-2 italic">
              {recurring.notes}
            </p>
          )}
        </CardContent>
      </Card>

      <RecurringForm
        recurring={{ ...recurring, category: recurring.category._id }}
        open={openForm}
        onOpenChange={setOpenForm}
      />
      <RecurringDelete
        recurringId={recurring._id}
        open={openDelete}
        onOpenChange={setOpenDelete}
      />
    </>
  )
}

export default RecurringCard
