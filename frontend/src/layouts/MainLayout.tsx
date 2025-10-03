import { AppSidebar } from "@/components/AppSidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { SignedIn, UserButton } from "@clerk/clerk-react"
import { Outlet } from "react-router"

function MainLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
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
    </SidebarProvider>
  )
}

export default MainLayout
