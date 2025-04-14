import { motion } from "framer-motion";
import { Loader } from "lucide-react";

const TableHeader = ({
  cols,
  extraHeader,
  totalCol,
  isLoadingState,
  isLoadingMsg,
  notFoundMsg,
  data,
  tableBody,
}: TableHeaderProps) => {
  return (
    <div className="flex flex-col w-full">
      {isLoadingState ? (
        <h1 className="text-center text-[24px] mt-8 flex items-center gap-2 justify-center">
          {isLoadingMsg}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 1,
              ease: "linear",
            }}
            style={{ display: "inline-block" }}
          >
            <Loader className="text-black" />
          </motion.div>
        </h1>
      ) : data.length === 0 ? (
        <h1 className="text-center text-[24px] mt-8">{notFoundMsg}</h1>
      ) : (
        <div className="overflow-x-auto lg:overflow-x-auto overflow-y-hidden border rounded-2xl scrollbar-thin">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-cyan-800">
              <tr>
                {extraHeader && (
                  <th className="px-4 py-6 text-center text-sm font-medium text-white tracking-wider">
                    {extraHeader}
                  </th>
                )}
                {cols.map((col, index) => (
                  <th
                    key={index}
                    className="px-4 py-6 text-center text-sm font-medium text-white tracking-wider"
                  >
                    {typeof col === "object" && col.label ? (
                      <span className="inline-flex items-center gap-2">
                        {col.label}
                        {col.icon}
                      </span>
                    ) : (
                      col.toString()
                    )}
                  </th>
                ))}
                {totalCol && (
                  <th className="px-4 py-6 text-center text-sm font-medium text-neutral-800 tracking-wider">
                    {totalCol}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-400">
              {data.length === 0 ? (
                <tr>
                  <td className="px-4 py-6 align-top whitespace-normal break-words text-sm font-medium text-gray-900">
                    No Data Found
                  </td>
                </tr>
              ) : (
                tableBody
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableHeader;
