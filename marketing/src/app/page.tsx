import { ModeToggle } from "@/components/ModeToggle"
import NavigationButtons from "@/components/NavigationButtons"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { auth } from "@clerk/nextjs/server"
import {
  ArrowRightIcon,
  PieChartIcon,
  ShieldIcon,
  TrendingUpIcon,
  WalletIcon,
} from "lucide-react"
import Link from "next/link"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="relative min-h-screen bg-linear-to-br from-background to-secondary">
      <div className="absolute top-3 right-3">
        <ModeToggle />
      </div>
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-primary underline">
            MIVRO
          </h1>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Manage Your Finances <span className="text-primary">Easily</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            A personal finance management app that helps you track your
            expenses, manage your budget, and achieve your financial goals.
          </p>
          <NavigationButtons />
        </div>

        {/* Features Section */}
        <div
          id="features"
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <Card>
            <CardHeader>
              <WalletIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Transaction Recording</CardTitle>
              <CardDescription>
                Record all income and expenses easily and quickly
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <PieChartIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Financial Analysis</CardTitle>
              <CardDescription>
                Visualisasi data keuangan dengan grafik yang mudah dipahami
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <TrendingUpIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Monthly report</CardTitle>
              <CardDescription>
                Comprehensive reports to monitor your financial progress
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <ShieldIcon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Safe & Trusted</CardTitle>
              <CardDescription>
                Data Anda tersimpan dengan aman dan dapat diakses kapan saja
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Benefits Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Why Choose Our App?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Intuitive Interface
              </h3>
              <p className="text-muted-foreground">
                User-friendly design that is easy to use for all groups
              </p>
            </div>

            <div>
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Realtime Access</h3>
              <p className="text-muted-foreground">
                Real-time data synchronization across all your devices
              </p>
            </div>

            <div>
              <div className="bg-primary/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Deep Insight</h3>
              <p className="text-muted-foreground">
                In-depth analysis to assist financial decision making
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Manage Your Finances?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have already experienced the benefits
          </p>
          <Button size="lg" variant="secondary" asChild>
            {userId ? (
              <Link href="/dashboard">
                Go to Dashboard
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            ) : (
              <Link href="/sign-in">
                Register Now for Free
                <ArrowRightIcon className="ml-2 h-4 w-4" />
              </Link>
            )}
          </Button>
        </div>
        <p className="text-sm ml-1 pb-1">v2.3.3</p>
      </div>
    </div>
  )
}
