import CategoryCard from "@/components/CategoryCard"
import CategoryForm from "@/components/CategoryForm"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert" // Untuk Error
import { Skeleton } from "@/components/ui/skeleton" // Untuk Loading
import { useGetAllCategories } from "@/services/hooks/categoryHook"
import type { Category } from "@/types"
import { PaletteIcon, PlusIcon, AlertTriangle } from "lucide-react"
import { useState } from "react"

// Tipe data hasil seleksi (sesuai yang di-export dari hook)
interface CategorizedData {
  defaultCategories: Category[]
  customCategories: Category[]
}

// Komponen Skeleton untuk satu baris kategori (meniru grid)
const CategoryGridSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <Card key={i} className="h-20">
        <CardContent className="p-4 flex items-center space-x-4">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
)

function CategoriesPage() {
  const [isAddingCategory, setIsAddingCategory] = useState(false)

  // Gunakan generic type pada useGetAllCategories untuk type safety
  const { data, isPending, isError, error } = useGetAllCategories() as {
    // Type Assertion sementara untuk menggunakan data
    data: CategorizedData | undefined
    isPending: boolean
    isError: boolean
    error: unknown
  }

  // Data yang aman, default ke array kosong saat loading/error
  const defaultCategories = data?.defaultCategories || []
  const customCategories = data?.customCategories || []

  // --- 1. Penanganan Loading (Early Return) ---
  if (isPending) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <Skeleton className="h-10 w-full sm:w-40" />
        </div>

        {/* Content Skeleton */}
        <CardTitle className="mt-4">Default Categories</CardTitle>
        <CategoryGridSkeleton />
        <CardTitle className="mt-4">Custom Categories</CardTitle>
        <CategoryGridSkeleton />
      </div>
    )
  }

  // --- 2. Penanganan Error (Early Return) ---
  if (isError) {
    // Best Practice: tampilkan error card yang jelas
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error."

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
          <Button size="lg" className="w-full sm:w-auto" disabled>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>

        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Failed to Load Category</AlertTitle>
          <AlertDescription>
            An error occurred while retrieving the category list. Please try
            reloading the page.
            <p className="mt-1 text-xs opacity-80">{errorMessage}</p>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  // --- 3. Tampilkan Data (Success State) ---
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

      {/* Default Categories Section */}
      <div>
        <CardTitle className="mb-4">Default Categories</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {defaultCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>

      {/* Custom Categories Section */}
      <div>
        <CardTitle className="mb-4">Custom Categories</CardTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {customCategories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>

        {/* Empty State untuk Custom Categories */}
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
      </div>

      {/* Add Category Form */}
      <CategoryForm
        open={isAddingCategory}
        onOpenChange={setIsAddingCategory}
      />
    </div>
  )
}

export default CategoriesPage
