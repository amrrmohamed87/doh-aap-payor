declare type ClaimsSummaryCardsProps = {
  values: ClaimAnalytics;
};

declare type ClaimsTableProps = {
  data: ClaimsData[];
  isLoadingState?: boolean;
  errorMsg?: string;
};

declare type FWAChartsProps = {
  values: FWAAnalytics;
};

declare type FWASummaryCardsProps = {
  values: FWAAnalytics;
  totalClaims: number;
};
