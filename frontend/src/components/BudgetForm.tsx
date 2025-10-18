import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import type { Budget, FormDataBudget } from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import budgetValidation from "@/lib/validations/budget-validation"
import { useGetAllCategories } from "@/services/hooks/categoryHook"
import { Loader2Icon } from "lucide-react"
import CategoryItemSkeleton from "./CategoryItemSkeleton"
import { useCreateBudget, useUpdateBudget } from "@/services/hooks/budgetHook"
import DatePicker from "./DatePicker"

interface BudgetFormProps {
  budget?: Budget
  open: boolean
  onOpenChange: (open: boolean) => void
}

function BudgetForm({ budget, open, onOpenChange }: BudgetFormProps) {
  const form = useForm({
    resolver: zodResolver(budgetValidation.add),
    defaultValues: {
      category: budget?.category._id || "",
      amount: budget?.amount || 0,
      period: budget?.period || "monthly",
      startDate: budget?.startDate ? new Date(budget.startDate) : new Date(),
      endDate: budget?.endDate
        ? new Date(budget.endDate)
        : new Date(new Date().setMonth(new Date().getMonth() + 1)),
    },
  })
  const { data: categoryData, isPending: isCategoriesLoading } =
    useGetAllCategories()
  const { mutate: create, isPending: creating } = useCreateBudget()
  const { mutate: update, isPending: updating } = useUpdateBudget()

  const allCategories = [
    ...(categoryData?.customCategories || []),
    ...(categoryData?.defaultCategories || []),
  ]
  const expenseCategories = allCategories.filter(
    (category) => category.type === "both" || category.type === "expense"
  )

  const onSubmit = (data: FormDataBudget) => {
    if (budget) {
      update(
        { id: budget._id, data },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
          },
          onError: (error) => {
            const axiosError = error

            if (
              axiosError.response &&
              axiosError.response.status === 400 &&
              axiosError.response.data?.errors
            ) {
              const fieldErrors = axiosError.response.data.errors

              Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
                if (messages && messages.length > 0) {
                  form.setError(fieldName as keyof FormDataBudget, {
                    type: "server",
                    message: messages[0],
                  })
                }
              })
            }
          },
        }
      )
    } else {
      create(data, {
        onSuccess: () => {
          onOpenChange(false)
          form.reset()
        },
        onError: (error) => {
          const axiosError = error

          if (
            axiosError.response &&
            axiosError.response.status === 400 &&
            axiosError.response.data?.errors
          ) {
            const fieldErrors = axiosError.response.data.errors

            Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
              if (messages && messages.length > 0) {
                form.setError(fieldName as keyof FormDataBudget, {
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

  const handleCancel = () => {
    form.reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{budget ? "Edit Budget" : "Add New Budget"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Category */}
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
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isCategoriesLoading ? (
                        <CategoryItemSkeleton />
                      ) : (
                        expenseCategories.map((category) => (
                          <SelectItem key={category._id} value={category._id}>
                            <div className="flex items-center">
                              <div
                                className="w-3 h-3 rounded-full mr-2"
                                style={{ backgroundColor: category.color }}
                              />
                              {category.name}
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

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Example: 5000000"
                      {...field}
                      value={
                        field.value === undefined || field.value === null
                          ? ""
                          : String(field.value)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Period */}
            <FormField
              control={form.control}
              name="period"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Period</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose period" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date */}
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* End Date */}
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <DatePicker field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex space-x-2">
              <Button
                type="submit"
                className="flex-1"
                disabled={creating || updating}
              >
                {creating || updating ? (
                  <Loader2Icon className="animate-spin" />
                ) : budget ? (
                  "Update Budget"
                ) : (
                  "Add Budget"
                )}
              </Button>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default BudgetForm
