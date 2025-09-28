import TransactionForm from "../../components/TransactionForm"

function AddTransactionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Tambah Transaksi</h1>
        <p className="text-muted-foreground">
          Catat transaksi keuangan Anda dengan mudah dan cepat.
        </p>
      </div>

      <TransactionForm />
    </div>
  )
}

export default AddTransactionPage
