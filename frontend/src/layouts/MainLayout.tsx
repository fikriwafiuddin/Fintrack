import { AppSidebar } from "@/components/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useGetUserPreference } from "@/services/hooks/settingHook"
import { useUserPreference } from "@/store/useUserPreference"
import { SignedIn, UserButton } from "@clerk/clerk-react"
import { useEffect } from "react"
import { Outlet } from "react-router"

function MainLayout() {
  const { data: userPreference, isLoading: loadingUserPreference } =
    useGetUserPreference()
  const setCurrencyCode = useUserPreference((state) => state.setCurrencyCode)

  useEffect(() => {
    if (userPreference?.currency) {
      setCurrencyCode(userPreference.currency)
    }
  }, [userPreference, setCurrencyCode])

  if (loadingUserPreference) {
    return (
      <div className="flex flex-col gap-2 items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="text-muted-foreground">Loading preference...</span>
      </div>
    )
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <main className="p-4 flex-1">
          <header className="flex justify-between">
            <SidebarTrigger />
            <div className="">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default MainLayout
