import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const ClaimsPagination = ({
  currentPage,
  totalPages,
  limit,
  onPageChange,
  onLimitChange,
  onFirstPage,
  onLastPage,
  onPreviousPage,
  onNextPage,
}: PaginationProps) => {
  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLimit = Math.max(1, parseInt(e.target.value) || 10);
    onLimitChange(newLimit);
    onPageChange(1);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-6">
      {/* Rows per page selector */}
      <div className="flex items-center gap-2">
        <label className="text-base font-medium text-gray-700">
          Rows per Page
        </label>
        <input
          type="number"
          min="1"
          value={limit}
          onChange={handleLimitChange}
          className="w-20 py-1 pl-3 pr-1 border rounded-md shadow focus:border-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Page navigation */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={onFirstPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-md border-2 transition-colors ${
            currentPage === 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-blue-200 hover:bg-blue-50 text-blue-700 cursor-pointer"
          }`}
          aria-label="First page"
        >
          <ChevronsLeft size={20} />
        </button>

        {/* Previous Page */}
        <button
          onClick={onPreviousPage}
          disabled={currentPage === 1}
          className={`p-2 rounded-md border-2 transition-colors ${
            currentPage === 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-blue-200 hover:bg-blue-50 text-blue-700 cursor-pointer"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Current page indicator */}
        <span className="text-base font-medium text-gray-700 px-3">
          Page <span className="font-semibold">{currentPage}</span> of{" "}
          <span className="font-semibold">{totalPages}</span>
        </span>

        {/* Next Page */}
        <button
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className={`p-2 rounded-md border-2 transition-colors ${
            currentPage >= totalPages
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-blue-200 hover:bg-blue-50 text-blue-700 cursor-pointer"
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={20} />
        </button>

        {/* Last Page */}
        <button
          onClick={onLastPage}
          disabled={currentPage >= totalPages}
          className={`p-2 rounded-md border-2 transition-colors ${
            currentPage >= totalPages
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-blue-200 hover:bg-blue-50 text-blue-700 cursor-pointer"
          }`}
          aria-label="Last page"
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </div>
  );
};
