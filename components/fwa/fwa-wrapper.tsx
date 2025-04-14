"use client";

import { Filter, Search } from "lucide-react";
import { Button } from "../ui/button";
import { useFWA } from "@/hooks/claims/use-fwa";
import FWACharts from "./fwa-charts";
import { ClaimsPagination } from "../reusable-components/claims-pagination";
import { FWAStats } from "./fwa-stats";
import { useClaims } from "@/hooks/claims/use-claims";
import FwaResultsTable from "../tables/fwa-table";

export const FWAWrapper = () => {
  const {
    params,
    fwaData,
    isLoadingFwaData,
    handleUpdateParams,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    fwaAnalytics,
  } = useFWA({
    page: 1,
    limit: 10,
  });
  const { claimAnalytics } = useClaims({ page: 1, limit: 10 });

  const handleFirstPage = () => handleUpdateParams({ page: 1 });
  const handleLastPage = () => handleUpdateParams({ page: totalPages });
  const handleLimitChange = (limit: number) => handleUpdateParams({ limit });

  return (
    <div className="flex flex-col gap-4">
      <FWAStats
        values={fwaAnalytics}
        totalClaims={claimAnalytics.totalClaims}
      />

      <FWACharts values={fwaAnalytics} />
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search claims..."
              className="pl-10 w-full sm:w-[300px] h-10 rounded-lg border border-blue-200 bg-white py-2 px-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <Button
            variant="outline"
            size="lg"
            className="flex items-center gap-2 text-blue-700 border-blue-200 hover:bg-blue-50 transition-colors hover:cursor-pointer"
          >
            Show Filters
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <FwaResultsTable data={fwaData} />

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

        {/*  <TriggeredRulesTable
          data={rulesReports}
          isLoadingState={isLoadingRulesReports}
        />

        */}
      </div>
    </div>
  );
};

export default FWAWrapper;
