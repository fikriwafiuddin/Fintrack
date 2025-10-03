import { Card, CardContent } from "@/components/ui/card"
import { WalletIcon } from "lucide-react"

function TotalBalance() {
  const totalBalance = 100000

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">
              Rp {totalBalance.toLocaleString("id-ID")}
            </h2>
          </div>
          <WalletIcon className="h-12 w-12 text-primary-foreground/80" />
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalBalance
