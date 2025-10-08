import { Card, CardContent } from "@/components/ui/card"
import { useGetBalance } from "@/services/hooks/dashboardHook"
import { WalletIcon, AlertTriangle } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

const BalanceSkeleton = () => (
  <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-4 w-24 bg-primary-foreground/50 mb-1" />
          <Skeleton className="h-8 w-40 bg-primary-foreground/70" />
        </div>
        <WalletIcon className="h-12 w-12 text-primary-foreground/50" />
      </div>
    </CardContent>
  </Card>
)

const BalanceErrorCard = ({ errorMessage }: { errorMessage: string }) => (
  <Card className="bg-red-600 text-white border-red-800">
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6" />
          <div>
            <p className="text-sm font-semibold">Gagal Memuat Saldo</p>
            <p className="text-xs opacity-80">{errorMessage}</p>
          </div>
        </div>
        <WalletIcon className="h-12 w-12 opacity-50" />
      </div>
    </CardContent>
  </Card>
)

function TotalBalance() {
  const { data: balance, isPending, isError, error } = useGetBalance()

  if (isPending) {
    return <BalanceSkeleton />
  }

  if (isError) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Kesalahan saat mengambil data saldo."
    return <BalanceErrorCard errorMessage={errorMessage} />
  }

  const currentBalance = balance ?? 0

  return (
    <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-foreground text-sm">Total Balance</p>
            <h2 className="text-3xl font-bold">
              Rp {currentBalance.toLocaleString("id-ID")}
            </h2>
          </div>
          <WalletIcon className="h-12 w-12 text-primary-foreground/80" />
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalBalance
