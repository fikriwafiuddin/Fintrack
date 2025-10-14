import { AppSidebar } from "@/components/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { SignedIn, UserButton } from "@clerk/clerk-react"
import { Outlet } from "react-router"

function MainLayout() {
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
