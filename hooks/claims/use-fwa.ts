"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { handleApiCallError } from "@/utils/reusable-fn";
import { toast } from "react-toastify";

export const useFWA = (initialParams: ClaimQueryParams) => {
  const [params, setParams] = useState<ClaimQueryParams>(initialParams);

  const [fwaData, setFwaData] = useState<FWAData[]>([]);
  const [searchFields, setSearchFields] = useState<SearchFields>({
    total: 0,
    page: 1,
    limit: 10,
    hasMore: false,
    totalPages: 0,
  });
  const [isLoadingFwaData, setIsLoadingFwaData] = useState<boolean>(false);

  const [fwaAnalytics, setFwaAnalytics] = useState<FWAAnalytics>({
    totalFraud: 0,
    totalAbuse: 0,
    totalWaste: 0,
    fraudProbability: 0,
    abuseProbability: 0,
    wasteProbability: 0,
  });
  const [isLoadingFwaAnalytics, setIsLoadingFwaAnalytics] =
    useState<boolean>(false);

  const handleFetchClaims = useCallback(
    async (abortController?: AbortController) => {
      setIsLoadingFwaData(true);
      try {
        const query = new URLSearchParams();
        query.set("page", params.page.toString());
        if (params.limit) query.set("limit", params.limit.toString());
        if (params.status) query.set("status", params.status);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/claims/fwa?${query}`,
          {
            signal: abortController?.signal,
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          const errorMsg = handleApiCallError(response.status, resData.message);
          toast.error(errorMsg);
          setFwaData([]);
          setSearchFields({
            total: 0,
            page: 1,
            limit: 10,
            hasMore: false,
            totalPages: 0,
          });
          return;
        }

        setFwaData(resData.data);
        setSearchFields({
          total: resData.total || 0,
          page: resData.page || 1,
          limit: resData.limit || 10,
          hasMore: resData.hasMore || false,
          totalPages: resData.totalPages || 0,
        });
        setIsLoadingFwaData(false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          // Silent abort: component unmounted or request cancelled
          console.log("Fetch aborted intentionally");
          return;
        }
        toast.error(
          "An error occurred, Please check your internet connection or contact support"
        );

        setIsLoadingFwaData(false);
        return;
      }
    },
    [params]
  );

  useEffect(() => {
    const abortController = new AbortController();
    handleFetchClaims(abortController);
    return () => abortController.abort();
  }, [handleFetchClaims]);

  const handleUpdateParams = useCallback(
    (newParams: Partial<ClaimQueryParams>) => {
      setParams((prevParams) => ({
        ...prevParams,
        ...newParams,
      }));
    },
    [params]
  );

  const totalPages = useMemo(() => {
    return searchFields.totalPages ? searchFields.totalPages : 1;
  }, [params.page, fwaData, searchFields]);

  const currentPage = useMemo(() => {
    return params.page ? params.page : 1;
  }, [params.page, fwaData, searchFields]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) handleUpdateParams({ page: currentPage - 1 });
  }, [params.page, currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) handleUpdateParams({ page: currentPage + 1 });
  }, [params.page, currentPage, totalPages]);

  const handleFetchClaimAnalytics = useCallback(async () => {
    setIsLoadingFwaAnalytics(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/claims/fwa/analytics`
      );
      const resData = await response.json();
      if (!response.ok) {
        const errorMsg = handleApiCallError(response.status, resData.message);
        toast.error(errorMsg);
        setFwaAnalytics({
          totalFraud: 0,
          totalAbuse: 0,
          totalWaste: 0,
          fraudProbability: 0,
          abuseProbability: 0,
          wasteProbability: 0,
        });
        setIsLoadingFwaAnalytics(false);
        return;
      }
      setFwaAnalytics(resData);
      setIsLoadingFwaAnalytics(false);
    } catch (error) {
      toast.error(
        "An error occurred, Please check your internet connection or contact support"
      );
      setIsLoadingFwaAnalytics(false);
      return;
    }
  }, []);

  useEffect(() => {
    handleFetchClaimAnalytics();
  }, [handleFetchClaimAnalytics]);

  return {
    params,
    fwaData,
    isLoadingFwaData,
    handleUpdateParams,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    fwaAnalytics,
  };
};
