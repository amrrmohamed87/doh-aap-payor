import MetricsStats from "../reusable-components/metrics-stats";

export const FWAStats = ({ values, totalClaims }: FWASummaryCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <MetricsStats
        title="Total Submitted Claims"
        value={totalClaims ?? 0}
        icon={<span className="text-2xl">📑</span>}
        className="border-l-4 border-gray-100"
      />

      <MetricsStats
        title="Fraud"
        value={values.totalFraud ?? 0}
        icon={<span className="text-3xl">🚨</span>}
        className="border-l-4 border-[#EF4444]"
      />

      <MetricsStats
        title="Waste"
        value={values.totalWaste ?? 0}
        icon={<span className="text-3xl">♻️</span>}
        className="border-l-4 border-[#F59E0B]"
      />

      <MetricsStats
        title="Abuse"
        value={values.totalAbuse ?? 0}
        icon={<span className="text-3xl">🚫</span>}
        className="border-l-4 border-[#8B5CF6]"
      />
    </div>
  );
};
