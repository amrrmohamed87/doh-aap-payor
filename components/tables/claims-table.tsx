"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "../ui/badge";
import TableHeader from "./table-header";
import { ResultDetailDialog } from "../reusable-components/result-dialog";

export const ClaimsTable = ({ data }: ClaimsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <TableHeader
      cols={[
        "Claim ID",
        "Member ID",
        "Provider ID",
        "Payor ID",
        "Status",
        "Reason",
        "More Details",
      ]}
      data={data}
      isLoadingState={false}
      notFoundMsg="Loading..."
      tableBody={data.flatMap((item, index) => {
        const isExpanded = expandedRows.includes(item.id);
        return [
          <tr key={`main-${index}`}>
            <td className="text-center px-4 py-3 min-w-[120px] w-[120px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              {`CLAIM-${item.id}`}
            </td>
            <td className="text-center px-4 py-3 min-w-[200px] w-[200px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              {item.memberId}
            </td>
            <td className="text-center px-4 py-3 min-w-[160px] w-[160px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              {item.providerId}
            </td>
            <td className="text-center px-4 py-3 min-w-[120px] w-[120px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              {item.payorId}
            </td>
            <td className="text-center px-4 py-3 min-w-[120px] w-[120px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              <Badge
                className={`${
                  item.results.status === "rejected" ||
                  item.results.status === "flagged"
                    ? "border-2 border-red-200 text-red-700 hover:bg-red-50"
                    : "border-2 border-blue-200 text-blue-700 hover:bg-blue-50"
                } bg-transparent transition-colors px-3 py-1 rounded-3xl`}
              >
                {item.results.status === "flagged" ||
                item.results.status === "rejected"
                  ? "Rejected"
                  : "Approved"}
              </Badge>
            </td>
            <td className="text-center px-4 py-3 min-w-[120px] w-[120px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              {item.results.status === "approved" ? (
                "Passed"
              ) : (
                <ResultDetailDialog results={item.results} />
              )}
            </td>
            <td className="text-center px-4 py-3 min-w-[110px] w-[110px]  align-center whitespace-normal break-words text-sm font-medium text-gray-900">
              <div
                className="flex items-center justify-center cursor-pointer"
                onClick={() => toggleRow(item.id)}
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
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <div className="px-4 pb-4">
                      <div className="overflow-hidden">
                        <div className="p-6 space-y-6">
                          {/* Encounter Info Section */}
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                              Encounter Information
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-100 p-4 rounded-lg">
                              <InfoCard
                                label="Type"
                                value={item.encounter.type}
                              />
                              <InfoCard
                                label="Start"
                                value={new Date(
                                  item.encounter.start
                                ).toLocaleString()}
                              />
                              <InfoCard
                                label="End"
                                value={new Date(
                                  item.encounter.end
                                ).toLocaleString()}
                              />
                              <InfoCard
                                label="Start Type"
                                value={item.encounter.startType}
                              />
                              <InfoCard
                                label="End Type"
                                value={item.encounter.endType}
                              />
                            </div>
                          </div>

                          {/* Activities Section */}
                          <div className="space-y-3">
                            <h4 className="text-lg font-semibold text-gray-800 flex items-center">
                              <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                              Activities
                            </h4>
                            <div className="space-y-3">
                              {item.activities.map((act, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow"
                                >
                                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                    <InfoCard label="Code" value={act.code} />
                                    <InfoCard label="Type" value={act.type} />
                                    <InfoCard
                                      label="Net"
                                      value={`AED ${act.net}`}
                                    />
                                    <InfoCard
                                      label="Date"
                                      value={new Date(
                                        act.date
                                      ).toLocaleDateString()}
                                    />
                                    <div className="md:col-span-2 lg:col-span-4">
                                      <InfoCard
                                        label="Auth ID"
                                        value={act.priorAuthorizationID}
                                        fullWidth
                                      />
                                    </div>
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </td>
          </tr>,
          ,
        ];
      })}
    />
  );
};

const InfoCard = ({
  label,
  value,
  fullWidth = false,
}: {
  label: string;
  value: string | number | undefined;
  fullWidth?: boolean;
}) => (
  <div className={`${fullWidth ? "col-span-full" : ""}`}>
    <p className="text-sm font-medium text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-800 mt-1">{value}</p>
  </div>
);

export default ClaimsTable;
