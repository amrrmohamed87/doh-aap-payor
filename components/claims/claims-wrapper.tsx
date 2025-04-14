"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useClaims } from "@/hooks/claims/use-claims";
import { ClaimsStats } from "./claims-stats";
import ClaimsTable from "../tables/claims-table";
import { ClaimsPagination } from "../reusable-components/claims-pagination";

export const ClaimsWrapper = () => {
  const {
    params,
    claims,
    handleUpdateParams,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    claimAnalytics,
  } = useClaims({ page: 1, limit: 10 });

  const handleFirstPage = () => handleUpdateParams({ page: 1 });
  const handleLastPage = () => handleUpdateParams({ page: totalPages });
  const handleLimitChange = (limit: number) => handleUpdateParams({ limit });

  return (
    <div className="flex flex-col gap-4">
      <ClaimsStats values={claimAnalytics} />

      <div className="flex flex-col gap-4 mt-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search claims..."
              className="pl-10 w-full sm:w-[300px] h-10 rounded-lg border border-cyan-200 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 text-cyan-700 border-cyan-200 hover:bg-cyan-50 transition-colors hover:cursor-pointer"
          >
            Show Filters
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <ClaimsTable data={claims} />

        <ClaimsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          limit={params.limit} // From your hook's params
          onPageChange={(page) => handleUpdateParams({ page })}
          onLimitChange={handleLimitChange}
          onFirstPage={handleFirstPage}
          onLastPage={handleLastPage}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </div>
    </div>
  );
};

export default ClaimsWrapper;
