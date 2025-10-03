import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Link } from "react-router"
import TotalBalance from "./TotalBalance"
import StatsCard from "./StatsCard"
import LatestTransactions from "./LatestTransactions"

function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! View your financial summary.
          </p>
        </div>
        <Link to="/add-transaction">
          <Button size="lg" className="w-full sm:w-auto">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Transaction
          </Button>
        </Link>
      </div>

      <TotalBalance />

      <StatsCard />

      <LatestTransactions />
    </div>
  )
}

export default DashboardPage
