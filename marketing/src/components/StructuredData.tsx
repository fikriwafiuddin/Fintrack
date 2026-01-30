export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MIVRO",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "IDR",
    },
    description:
      "MIVRO is a personal finance management app that helps you track expenses, manage budgets, and achieve your financial goals.",
    featureList: [
      "Pencatatan Transaksi (Income & Expense)",
      "Manajemen Kategori",
      "Budget Tracking",
      "Laporan Keuangan Bulanan",
      "Analisis Keuangan dengan Grafik",
      "AI Assistant untuk Konsultasi Keuangan",
      "Dark Mode & Light Mode",
      "Multi-Currency Support",
    ],
    screenshot: "https://www.mivro.my.id/og-image.png",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
