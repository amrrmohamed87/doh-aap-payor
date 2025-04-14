import MetricsStats from "../reusable-components/metrics-stats";

export const ClaimsStats = ({ values }: ClaimsSummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsStats
        title="Total Submitted Claims"
        value={values.totalClaims ?? 0}
        icon={<span className="text-2xl">📑</span>}
        className="border-l-4 border-gray-100"
      />

      <MetricsStats
        title="Providers"
        value={values.totalUniqueProviderId ?? 0}
        icon={<span className="text-3xl">🏥</span>}
        className="border-l-4 border-cyan-500"
      />

      <MetricsStats
        title="Payors"
        value={values.totalUniquePayorId ?? 0}
        icon={<span className="text-3xl">🤝🏻</span>}
        className="border-l-4 border-cyan-700"
      />

      <MetricsStats
        title="Patients"
        value={values.totalUniqueMemberId ?? 0}
        icon={<span className="text-3xl">🙋🏻‍♀️</span>}
        className="border-l-4 border-cyan-900"
      />
    </div>
  );
};
