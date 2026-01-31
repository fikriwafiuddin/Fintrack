import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "../ui/button"
import { Textarea } from "../ui/textarea"
import type { ErrorResponse, RecurringTransaction } from "@/types"
import {
  useCreateRecurring,
  useUpdateRecurring,
} from "@/services/hooks/recurringHook"
import type { AxiosError } from "axios"
import { useGetAllCategories } from "@/services/hooks/categoryHook"
import { useMemo } from "react"
import CategoryItemSkeleton from "../CategoryItemSkeleton"
import { useUserPreference } from "@/store/useUserPreference"
import DatePicker from "../DatePicker"
import { Loader2Icon } from "lucide-react"
import type { FormDataRecurring, RecurringFieldErrors } from "@/types/form"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import recurringValidation from "@/lib/validations/recurring-validation"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

interface RecurringFormProps {
  recurring?: RecurringTransaction<string>
  open: boolean
  onOpenChange: (open: boolean) => void
}

function RecurringForm({ recurring, open, onOpenChange }: RecurringFormProps) {
  const form = useForm({
    resolver: zodResolver(recurringValidation.add),
    defaultValues: {
      type: recurring?.type || "expense",
      amount: recurring?.amount || 0,
      category: recurring?.category || "",
      frequency: recurring?.frequency || "monthly",
      startDate: recurring?.nextOccurrence
        ? new Date(recurring.nextOccurrence)
        : new Date(),
      notes: recurring?.notes || "",
    },
  })
  const { mutate: create, isPending: creating } = useCreateRecurring()
  const { mutate: update, isPending: updating } = useUpdateRecurring()
  const { data: categoryData, isPending: isCategoriesLoading } =
    useGetAllCategories()
  const currencyCode = useUserPreference((state) => state.currencyCode)

  const currentType = form.watch("type")

  const filteredCategories = useMemo(() => {
    if (!categoryData) return []

    const allCategories = [
      ...(categoryData.defaultCategories || []),
      ...(categoryData.customCategories || []),
    ]

    return allCategories.filter((category) => {
      if (category.type === "both") {
        return true
      }
      return category.type === currentType
    })
  }, [categoryData, currentType])

  const onSubmit = (data: FormDataRecurring) => {
    if (recurring) {
      update(
        { id: recurring._id, data },
        {
          onSuccess: () => onOpenChange(false),
          onError: (error) => {
            const axiosError = error as AxiosError<
              ErrorResponse<RecurringFieldErrors>
            >
            if (axiosError.response?.data?.errors) {
              const fieldErrors = axiosError.response.data.errors
              Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
                if (messages && messages.length > 0) {
                  form.setError(fieldName as keyof FormDataRecurring, {
                    type: "server",
                    message: messages[0],
                  })
                }
              })
            }
          },
        },
      )
    } else {
      create(data, {
        onSuccess: () => onOpenChange(false),
        onError: (error) => {
          const axiosError = error as AxiosError<
            ErrorResponse<RecurringFieldErrors>
          >
          if (axiosError.response?.data?.errors) {
            const fieldErrors = axiosError.response.data.errors
            Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
              if (messages && messages.length > 0) {
                form.setError(fieldName as keyof FormDataRecurring, {
                  type: "server",
                  message: messages[0],
                })
              }
            })
          }
        },
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Recurring Transaction</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="expense" />
                        <Label htmlFor="expense">Expense</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
                        <Label htmlFor="income">Income</Label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount ({currencyCode})</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="0"
                      type="number"
                      {...field}
                      value={field.value?.toString() || ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Category{" "}
                    {isCategoriesLoading && (
                      <Loader2Icon className="animate-spin size-4" />
                    )}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isCategoriesLoading ? (
                        <CategoryItemSkeleton />
                      ) : (
                        filteredCategories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span>{category.name}</span>
                            </div>
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <FormControl>
                      <DatePicker
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a note to this recurring transaction..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                className="flex-1"
                type="submit"
                disabled={creating || updating || isCategoriesLoading}
              >
                {creating || updating ? (
                  <Loader2Icon className="animate-spin" />
                ) : recurring ? (
                  "Update Recurring"
                ) : (
                  "Add Recurring"
                )}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" disabled={creating || updating}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default RecurringForm
