import categoryValidation from "@/lib/validations/category-validation"
import type {
  Category,
  CategoryFieldErrors,
  ErrorResponse,
  FormDataCategory,
} from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/services/hooks/categoryHook"
import { Loader2Icon } from "lucide-react"
import type { AxiosError } from "axios"

interface CategoryFormProps {
  category?: Category
  open: boolean
  onOpenChange: (open: boolean) => void
}

const colorOptions = [
  "#ff6b6b",
  "#4ecdc4",
  "#45b7d1",
  "#f9ca24",
  "#6c5ce7",
  "#a29bfe",
  "#fd79a8",
  "#00b894",
  "#e17055",
  "#74b9ff",
  "#e84393",
  "#00cec9",
  "#fdcb6e",
  "#9b59b6",
  "#f39c12",
  "#e74c3c",
  "#3498db",
  "#2ecc71",
  "#f1c40f",
  "#8e44ad",
]

function CategoryForm({ category, open, onOpenChange }: CategoryFormProps) {
  const form = useForm<FormDataCategory>({
    resolver: zodResolver(categoryValidation.add),
    defaultValues: {
      name: category?.name || "",
      color: category?.color || colorOptions[0],
      type: category?.type || "expense",
    },
  })
  const { mutate: create, isPending: creating } = useCreateCategory()
  const { mutate: update, isPending: updating } = useUpdateCategory()

  const onSubmit = async (data: FormDataCategory) => {
    if (category) {
      update(
        { id: category._id, data },
        {
          onSuccess: () => {
            onOpenChange(false)
            form.reset()
          },
          onError: (error) => {
            const axiosError = error as AxiosError<
              ErrorResponse<CategoryFieldErrors>
            >

            if (
              axiosError.response &&
              axiosError.response.status === 400 &&
              axiosError.response.data?.errors
            ) {
              const fieldErrors = axiosError.response.data.errors

              Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
                if (messages && messages.length > 0) {
                  form.setError(fieldName as keyof FormDataCategory, {
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
          const axiosError = error as AxiosError<
            ErrorResponse<CategoryFieldErrors>
          >

          if (
            axiosError.response &&
            axiosError.response.status === 400 &&
            axiosError.response.data?.errors
          ) {
            const fieldErrors = axiosError.response.data.errors

            Object.entries(fieldErrors).forEach(([fieldName, messages]) => {
              if (messages && messages.length > 0) {
                form.setError(fieldName as keyof FormDataCategory, {
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
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Example: Food" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <div className="grid grid-cols-5 gap-2">
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          className={`w-10 h-10 rounded-full border-2 ${
                            field.value === color
                              ? "border-foreground"
                              : "border-transparent"
                          }`}
                          style={{ backgroundColor: color }}
                          onClick={() => field.onChange(color)}
                        />
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="expense" id="expense" />
                        <Label htmlFor="expense">Expense</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="income" id="income" />
                        <Label htmlFor="income">Income</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="both" id="both" />
                        <Label htmlFor="both">Both</Label>
                      </div>
                    </RadioGroup>
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
                ) : category ? (
                  "Update Category"
                ) : (
                  "Add Category"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default CategoryForm
