import { RouterProvider } from "react-router"
import { useAuth } from "@clerk/clerk-react"
import publicRoutes from "./routes/publicRoutes"
import protectedRoutes from "./routes/protectedRoutes"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "./components/ThemeProvider"

const queryClient = new QueryClient()

function App() {
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <RouterProvider router={userId ? protectedRoutes : publicRoutes} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
