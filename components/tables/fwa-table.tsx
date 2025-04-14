"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, ShieldAlert } from "lucide-react";
import { Badge } from "../ui/badge";
import TableHeader from "./table-header";

export const FwaResultsTable = ({ data }: { data: FWAData[] }) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const getColor = (flag: string) => {
    switch (flag) {
      case "Fraud":
        return "bg-red-100 text-red-700 border-red-300";
      case "Waste":
        return "bg-yellow-100 text-yellow-700 border-yellow-300";
      case "Abuse":
        return "bg-purple-100 text-purple-700 border-purple-300";
      default:
        return "bg-gray-100 text-gray-700 border-gray-300";
    }
  };

  return (
    <TableHeader
      cols={[
        "Case ID",
        "Member ID",
        "Provider ID",
        "Payor ID",
        "Flagged As",
        "Prediction",
        "More Details",
      ]}
      data={data}
      isLoadingState={false}
      notFoundMsg="No FWA Cases Detected"
      tableBody={data.flatMap((item, index) => {
        const isExpanded = expandedRows.includes(item.id);
        return [
          <tr
            key={`main-${index}`}
            className="hover:bg-slate-50 transition-colors duration-200 cursor-pointer"
          >
            <td className="text-center px-4 py-3 font-medium text-sm text-gray-900">
              CASE-{item.id}
            </td>
            <td className="text-center px-4 py-3 text-sm text-gray-900">
              {item.memberId}
            </td>
            <td className="text-center px-4 py-3 text-sm text-gray-900">
              {item.providerId}
            </td>
            <td className="text-center px-4 py-3 text-sm text-gray-900">
              {item.payorId}
            </td>
            <td className="text-center px-4 py-3 text-sm">
              <Badge
                className={`border-2 ${getColor(
                  item.flaggedAs
                )} px-3 py-1 rounded-3xl`}
              >
                {item.flaggedAs}
              </Badge>
            </td>
            <td className="text-center px-4 py-3 text-sm text-gray-800">
              {item.predictionCode}
            </td>
            <td className="text-center px-4 py-3">
              <div
                onClick={() => toggleRow(item.id)}
                className="flex justify-center items-center"
              >
                {isExpanded ? (
                  <ChevronUp size={22} className="text-blue-500" />
                ) : (
                  <ChevronDown size={22} className="text-blue-500" />
                )}
              </div>
            </td>
          </tr>,

          <tr key={`expanded-${index}`}>
            <td colSpan={7} className="p-0 border-none">
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="bg-white shadow-md px-4 pb-4"
                  >
                    <div className="p-6 space-y-6">
                      {/* Triggered Rules */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                          <ShieldAlert className="w-5 h-5 text-blue-500 mr-2" />
                          Triggered Columns
                        </h4>
                        <div className="bg-slate-100 p-4 rounded-lg space-y-2 text-sm">
                          {Object.entries(item.triggerdColumns).map(
                            ([key, value], i) => (
                              <div key={i} className="text-gray-700">
                                <span className="font-medium">{key}:</span>{" "}
                                {String(value)}
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Probabilities */}
                      <div className="space-y-3">
                        <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                          <span className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                          Probability Breakdown
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-100 p-4 rounded-lg">
                          <InfoCard
                            label="Fraud (F)"
                            value={`${(item.probablilites.F * 100).toFixed(
                              2
                            )}%`}
                          />
                          <InfoCard
                            label="Waste (W)"
                            value={`${(item.probablilites.W * 100).toFixed(
                              2
                            )}%`}
                          />
                          <InfoCard
                            label="Abuse (A)"
                            value={`${(item.probablilites.A * 100).toFixed(
                              2
                            )}%`}
                          />
                        </div>
                      </div>

                      {/* Metadata */}
                      <div className="text-right text-xs text-gray-400">
                        Created at: {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </td>
          </tr>,
        ];
      })}
    />
  );
};

const InfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800 mt-1">{value}</p>
  </div>
);

export default FwaResultsTable;
