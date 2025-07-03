function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="border-b-2 border-slate-200 text-slate-700 p-4 flex items-center justify-between">
        <h1 className="text-slate-700 text-2xl font-bold">Fintrack</h1>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Get Started
        </button>
      </header>
      <main className="pb-10">
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="p-8 md:p-12 lg:px-16 py-24">
            <div className="mx-auto max-w-lg text-center">
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl dark:text-white">
                Take Control of Your Finances with Fintrack
              </h2>

              <p className="text-gray-500 sm:mt-4 dark:text-gray-400">
                Fintrack helps you manage your income, expenses, savings, and
                financial goals—all in one simple, intuitive platform. Start
                making smarter money decisions today.
              </p>
            </div>

            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-auto mt-8 block hover:bg-blue-600 transition-colors duration-200"
            >
              Get Started
            </button>
          </div>
          <div className="w-11/12 max-w-4xl mx-auto shadow-2xl rounded overflow-hidden">
            <img src="assets/dashboard.png" alt="dashboard" />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home
