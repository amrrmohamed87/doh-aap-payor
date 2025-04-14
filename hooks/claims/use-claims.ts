"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { toast } from "react-toastify";
import { handleApiCallError } from "@/utils/reusable-fn";

export const useClaims = (initialParams: ClaimQueryParams) => {
  const [params, setParams] = useState<ClaimQueryParams>(initialParams);

  const [claims, setClaims] = useState<ClaimsData[]>([]);
  const [searchFields, setSearchFields] = useState<SearchFields>({
    total: 0,
    page: 1,
    limit: 10,
    hasMore: false,
    totalPages: 0,
  });
  const [isLoadingClaims, setIsLoadingClaims] = useState<boolean>(false);

  const [claimAnalytics, setClaimAnalytics] = useState<ClaimAnalytics>({
    totalClaims: 0,
    totalUniqueProviderId: 0,
    totalUniqueMemberId: 0,
    totalUniquePayorId: 0,
  });
  const [isLoadingClaimAnalytics, setIsLoadingClaimAnalytics] =
    useState<boolean>(false);

  const handleFetchClaims = useCallback(
    async (abortController?: AbortController) => {
      setIsLoadingClaims(true);
      try {
        const query = new URLSearchParams();
        query.set("page", params.page.toString());
        if (params.limit) query.set("limit", params.limit.toString());
        if (params.status) query.set("status", params.status);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/claims?${query}`,
          {
            signal: abortController?.signal,
          }
        );

        const resData = await response.json();

        if (!response.ok) {
          const errorMsg = handleApiCallError(response.status, resData.message);
          toast.error(errorMsg);
          setClaims([]);
          setSearchFields({
            total: 0,
            page: 1,
            limit: 10,
            hasMore: false,
            totalPages: 0,
          });
          return;
        }

        setClaims(resData.data);
        setSearchFields({
          total: resData.total || 0,
          page: resData.page || 1,
          limit: resData.limit || 10,
          hasMore: resData.hasMore || false,
          totalPages: resData.totalPages || 0,
        });
        setIsLoadingClaims(false);
      } catch (error: any) {
        if (error.name === "AbortError") {
          // Silent abort: component unmounted or request cancelled
          console.log("Fetch aborted intentionally");
          return;
        }
        toast.error(
          "An error occurred, Please check your internet connection or contact support"
        );

        setIsLoadingClaims(false);
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
  }, [params.page, claims, searchFields]);

  const currentPage = useMemo(() => {
    return params.page ? params.page : 1;
  }, [params.page, claims, searchFields]);

  const handlePreviousPage = useCallback(() => {
    if (currentPage > 1) handleUpdateParams({ page: currentPage - 1 });
  }, [params.page, currentPage]);

  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) handleUpdateParams({ page: currentPage + 1 });
  }, [params.page, currentPage, totalPages]);

  const handleFetchClaimAnalytics = useCallback(async () => {
    setIsLoadingClaimAnalytics(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/claims/analytics`
      );
      const resData = await response.json();
      if (!response.ok) {
        const errorMsg = handleApiCallError(response.status, resData.message);
        toast.error(errorMsg);
        setClaimAnalytics({
          totalClaims: 0,
          totalUniqueProviderId: 0,
          totalUniqueMemberId: 0,
          totalUniquePayorId: 0,
        });
        setIsLoadingClaimAnalytics(false);
        return;
      }
      setClaimAnalytics(resData);
      setIsLoadingClaimAnalytics(false);
    } catch (error) {
      toast.error(
        "An error occurred, Please check your internet connection or contact support"
      );
      setIsLoadingClaimAnalytics(false);
      return;
    }
  }, []);

  useEffect(() => {
    handleFetchClaimAnalytics();
  }, [handleFetchClaimAnalytics]);

  return {
    params,
    claims,
    isLoadingClaims,
    handleUpdateParams,
    currentPage,
    totalPages,
    handlePreviousPage,
    handleNextPage,
    claimAnalytics,
  };
};
