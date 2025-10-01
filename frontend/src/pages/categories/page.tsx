import CategoryCard from "@/components/CategoryCard"
import CategoryForm from "@/components/CategoryForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { Category } from "@/types"
import { PaletteIcon, PlusIcon } from "lucide-react"
import { useState } from "react"

const defaultCategories: Category[] = [
  {
    _id: "1",
    name: "Makanan",
    color: "#ff6b6b",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Transportasi",
    color: "#4ecdc4",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "3",
    name: "Tagihan",
    color: "#45b7d1",
    type: "expense",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "4",
    name: "Hiburan",
    color: "#f9ca24",
    type: "both",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "5",
    name: "Gaji",
    color: "#6c5ce7",
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
  {
    _id: "6",
    name: "Investasi",
    color: "#a29bfe",
    type: "income",
    isDefault: true,
    createdAt: new Date(),
  },
]

const customCategories: Category[] = [
  {
    _id: "7",
    name: "Freelance",
    color: "#a28cfe",
    type: "income",
    isDefault: false,
    createdAt: new Date(),
  },
]

function CategoriesPage() {
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Category Management
          </h1>
          <p className="text-muted-foreground">
            Manage transaction categories to organize your finances.
          </p>
        </div>
        <Button
          size="lg"
          className="w-full sm:w-auto"
          onClick={() => setIsAddingCategory(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Default Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {defaultCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {/* Custom Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customCategories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>

      {customCategories.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <PaletteIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              There are no custom categories yet
            </p>
            <Button onClick={() => setIsAddingCategory(true)}>
              Add First Category
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add Category Form */}
      <CategoryForm
        open={isAddingCategory}
        onOpenChange={setIsAddingCategory}
      />
    </div>
  )
}

export default CategoriesPage
