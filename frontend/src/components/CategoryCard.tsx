import type { Category } from "@/types"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { EditIcon, Loader2Icon, TagIcon, Trash2Icon } from "lucide-react"
import { Button } from "./ui/button"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog"
import { useState } from "react"
import CategoryForm from "./CategoryForm"
import { useRemoveCategory } from "@/services/hooks/categoryHook"
import { getContrastColor } from "@/lib/utils"

interface CategoryCardProps {
  category: Category
}

const getTypeLabel = (type: string) => {
  switch (type) {
    case "income":
      return "Income"
    case "expense":
      return "Expense"
    case "both":
      return "Both"
    default:
      return type
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case "income":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
    case "expense":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
    case "both":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
  }
}

function CategoryCard({ category }: CategoryCardProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [removeCategory, setRemoveCategory] = useState(false)
  const { mutate: remove, isPending: removing } = useRemoveCategory()

  const handleDelete = () => {
    remove(category._id, {
      onSuccess: () => {
        setRemoveCategory(false)
      },
    })
  }
  return (
    <Card key={category._id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3 flex-1">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-medium"
              style={{
                backgroundColor: category.color,
                color: getContrastColor(category.color),
              }}
            >
              {category.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{category.name}</h3>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className={getTypeColor(category.type)}>
                  {getTypeLabel(category.type)}
                </Badge>
                {category.isDefault && (
                  <Badge variant="outline">
                    <TagIcon className="w-3 h-3 mr-1" />
                    Default
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-1 ml-2">
            {!category.isDefault && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingCategory(category)}
              >
                <EditIcon className="h-4 w-4" />
              </Button>
            )}

            {!category.isDefault && (
              <AlertDialog
                onOpenChange={setRemoveCategory}
                open={removeCategory}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2Icon className="h-4 w-4" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Category</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete the category "
                      {category.name}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button
                      variant="destructive"
                      disabled={removing}
                      onClick={() => handleDelete()}
                    >
                      {removing ? (
                        <Loader2Icon className="animate-spin" />
                      ) : (
                        "Delete"
                      )}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        {/* Edit Category Form */}
        {editingCategory && (
          <CategoryForm
            category={editingCategory}
            open={!!editingCategory}
            onOpenChange={(open) => !open && setEditingCategory(null)}
          />
        )}
      </CardContent>
    </Card>
  )
}

export default CategoryCard
