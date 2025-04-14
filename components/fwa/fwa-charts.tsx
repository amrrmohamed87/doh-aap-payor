"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const FWACharts = ({ values }: FWAChartsProps) => {
  const COLORS = {
    flag: "#EF4444 ", // Soft purple
    rejection: "#F59E0B", // Muted pink
    abuse: "#8B5CF6", // Teal
    accent1: "#00CEC9", // Teal
    accent2: "#636E72", // Cool gray
    background: "#F8FAFC", // Very light gray
  };

  const pieData = [
    { name: "Fraud", value: values.totalFraud ?? 0 },
    { name: "Waste", value: values.totalWaste ?? 0 },
    { name: "Abuse", value: values.totalAbuse ?? 0 },
  ];

  const chartConfig = {
    fraud: {
      label: "Fraud",
      color: "hsl(var(--chart-1))",
    },
    abuse: {
      label: "Abuse",
      color: "hsl(var(--chart-2))",
    },
    waste: {
      label: "Waste",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig;

  const chartData = [
    {
      pillar: "Fraud",
      visitors: values.fraudProbability ?? 0,
      fill: "#EF4444",
    },
    {
      pillar: "Waste",
      visitors: values.wasteProbability ?? 0,
      fill: "#F59E0B",
    },
    {
      pillar: "Abuse",
      visitors: values.abuseProbability ?? 0,
      fill: "#8B5CF6",
    },
  ];

  const chartConfig2 = {
    Fraud: {
      label: "Fraud",
      color: "hsl(var(--chart-1))",
    },
    Waste: {
      label: "Waste",
      color: "hsl(var(--chart-2))",
    },
    Abuse: {
      label: "Abuse",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-3">
      {/* Pie Chart Card */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-cyan-900">
          FWA Category Distribution
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Breakdown of Flagged Claims by Fraud, Waste, and Abuse Indicators to
          Prioritize Risk Mitigation and Compliance Efforts
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={120}
                  innerRadius={80} // Larger hole for more elegant donut
                  fill="#8884d8"
                  dataKey="value"
                  animationDuration={500}
                >
                  <Cell
                    key="flag"
                    fill={COLORS.flag}
                    stroke={COLORS.background}
                    strokeWidth={2}
                  />
                  <Cell
                    key="rejection"
                    fill={COLORS.rejection}
                    stroke={COLORS.background}
                    strokeWidth={2}
                  />
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} triggers`, ""]}
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
                    padding: "12px",
                  }}
                  itemStyle={{ color: COLORS.accent2 }}
                />
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: "24px" }}
                  formatter={(value) => (
                    <span className="text-gray-600 text-sm">{value}</span>
                  )}
                />
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-blue-900">
          Probabilistic FWA Attribution
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Weighted Distribution of Suspected Claims Based on Assigned
          Probability Scores for Fraud, Waste, and Abuse Categories
        </p>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ChartContainer
              config={chartConfig2}
              className="mx-auto aspect-square max-h-[300px]"
            >
              <PieChart>
                <ChartTooltip
                  content={
                    <ChartTooltipContent hideLabel className="w-[40px]" />
                  }
                />
                <Pie data={chartData} dataKey="visitors" label nameKey="pillar">
                  <LabelList
                    dataKey="pillar"
                    className="fill-background"
                    stroke="none"
                    fontSize={10}
                    formatter={(value: keyof typeof chartConfig2) =>
                      chartConfig2[value]?.label
                    }
                  />
                </Pie>
              </PieChart>
            </ChartContainer>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default FWACharts;
