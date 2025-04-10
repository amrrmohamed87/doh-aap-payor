"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSideBarContext = () => {
  const context = useContext(SidebarContext);

  if (context === undefined) {
    throw new Error("useSideBarContext must be used within a SidebarProvider");
  }

  return context;
};
