import TransactionForm from "../../components/TransactionForm"

function AddTransactionPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Add Transaction</h1>
        <p className="text-muted-foreground">
          Record your financial transactions easily and quickly.
        </p>
      </div>

      <TransactionForm />
    </div>
  )
}

export default AddTransactionPage
