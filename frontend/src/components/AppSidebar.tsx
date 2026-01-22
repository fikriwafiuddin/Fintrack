import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  PlusCircle,
  List,
  Settings,
  BarChart3,
  PiggyBankIcon,
  BotIcon,
  Tags,
  MessageSquareText,
} from "lucide-react"
import { Link, useLocation } from "react-router"
import { useSidebar } from "@/components/ui/sidebar"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Add Transaction",
    href: "/add-transaction",
    icon: PlusCircle,
  },
  {
    name: "History",
    href: "/transactions",
    icon: List,
  },
  {
    name: "Budgets",
    href: "/budgets",
    icon: PiggyBankIcon,
  },
  {
    name: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Tags,
  },
  {
    name: "Ask AI",
    href: "/ask-ai",
    icon: BotIcon,
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
  {
    name: "Feedback",
    href: "/feedback",
    icon: MessageSquareText,
  },
]

export function AppSidebar() {
  const location = useLocation()
  const { isMobile, setOpenMobile } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-primary hover:text-primary hover:bg-transparent">
              <div>
                <img src="/logo.webp" alt="logo" className="size-7" />
              </div>
              <span className="font-bold text-xl">Mivro</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    isActive={item.href === location.pathname}
                    asChild
                  >
                    <Link
                      to={item.href}
                      onClick={() => {
                        if (isMobile) setOpenMobile(false)
                      }}
                    >
                      <item.icon />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
