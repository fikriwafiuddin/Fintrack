import { Link } from "react-router-dom"

function Home() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <header className="border-b-2 border-slate-200 text-slate-700 p-4 flex items-center justify-between">
        <h1 className="text-slate-700 text-2xl font-bold">Fintrack</h1>
        <Link
          to={"/dashboard"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          Get Started
        </Link>
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

            <div className="flex justify-center mt-8">
              <Link
                to={"/dashboard"}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                Get Started
              </Link>
            </div>
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
