import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "@/components/ThemeProvider"
import StructuredData from "@/components/StructuredData"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mivro.my.id"),
  title: {
    default: "MIVRO - Personal Finance Management App",
    template: "%s | MIVRO",
  },
  description:
    "MIVRO is a personal finance management app that helps you track expenses, manage budgets, and achieve your financial goals. Complete features: transaction recording, financial analysis, monthly reports, budget tracking, and AI assistant.",
  keywords: [
    "aplikasi keuangan",
    "manajemen keuangan pribadi",
    "pencatatan pengeluaran",
    "budget tracker",
    "laporan keuangan",
    "financial management",
    "expense tracker",
    "income tracker",
    "personal finance",
    "money management",
    "budgeting app",
    "financial planning",
    "MIVRO",
    "MIVRO - Manage Your Personal Finances Easily",
    "MIVRO - Personal Finance Management App",
    "MIVRO - Personal Finance Management App",
  ],
  authors: [{ name: "MIVRO Team" }],
  creator: "MIVRO",
  publisher: "MIVRO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.mivro.my.id",
    title: "MIVRO - Personal Finance Management App",
    description:
      "Manage your finances easily. Track expenses, set budgets, and achieve your financial goals with MIVRO.",
    siteName: "MIVRO",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Uncomment dan isi saat setup Google Search Console
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="id" suppressHydrationWarning>
        <head>
          <StructuredData />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
