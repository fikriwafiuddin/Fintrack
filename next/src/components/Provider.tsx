import { QueryClientProvider } from "@tanstack/react-query"
import queryClient from "./queryClient"
import { useUser } from "@/lib/hooks/useAuth"

function Content({ children }: { children: React.ReactNode }) {
  const { isLoading } = useUser()

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <h1 className="text-xl text-slate-700 font-semibold">Loading</h1>
      </div>
    )
  }
  return children
}

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Content>{children}</Content>
    </QueryClientProvider>
  )
}

export default Provider
