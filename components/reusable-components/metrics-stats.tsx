export const MetricsStats = ({
  title,
  value,
  icon,
  trend,
  trendValue,
  className = "",
}: MetricsStatsProps) => {
  const trendColors = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-gray-500",
  };

  return (
    <div className={`bg-white rounded-xl p-6 shadow-sm border  ${className}`}>
      <div
        className={`${
          trend ? "mb-0" : "mb-3"
        } flex justify-between items-start`}
      >
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-semibold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-lg bg-gray-50 text-gray-600">{icon}</div>
      </div>
      {trend && trendValue && (
        <div className={`flex items-center mt-4 text-sm ${trendColors[trend]}`}>
          {trend === "up" ? (
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 15l7-7 7 7"
              />
            </svg>
          ) : trend === "down" ? (
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : null}
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
};

export default MetricsStats;
