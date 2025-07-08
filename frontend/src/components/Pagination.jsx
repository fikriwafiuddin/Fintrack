import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { setPage } from "../store/slice/transactionSlice"

export default function Pagination({ totalPages, totalData, currentPage }) {
  const dispatch = useDispatch()

  const createPageNumbers = () => {
    const pages = []

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        )
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        )
      }
    }

    return pages
  }

  const handlePageChange = (page) => {
    if (page !== "..." && page !== currentPage) {
      dispatch(setPage(page))
    }
  }

  return (
    <div className="bg-white px-4 py-4 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
      {/* Left Info */}
      <div className="text-xs md:text-sm text-slate-700">
        Showing{" "}
        <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(currentPage * 10, totalData)}
        </span>{" "}
        of <span className="font-medium">{totalData}</span> results
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center space-x-1 md:space-x-2">
          <button
            className="p-2 text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            <FaChevronLeft size={14} />
          </button>

          {createPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`px-2 py-1 md:px-3 md:py-2 text-xs md:text-sm border rounded-md ${
                page === currentPage
                  ? "bg-slate-300 border-slate-300 text-slate-900"
                  : page === "..."
                  ? "text-slate-500 bg-white border border-slate-300 cursor-default"
                  : "text-slate-700 bg-white border border-slate-300 hover:bg-slate-50"
              }`}
              onClick={() => handlePageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          <button
            className="p-2 text-slate-500 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            <FaChevronRight size={14} />
          </button>
        </div>
      )}
    </div>
  )
}
