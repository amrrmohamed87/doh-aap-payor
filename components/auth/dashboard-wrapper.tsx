"use client";

import { useSideBarContext } from "../../contextAPI/sidebar-context";

export const DashboardWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const { isOpen } = useSideBarContext();
  return (
    <div
      className={`flex-1 transition-all duration-500 ease-in-out ${
        isOpen ? "ml-4" : "ml-0"
      } p-5 overflow-auto`}
    >
      {children}
    </div>
  );
};
