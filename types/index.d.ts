declare type SidebarContextType = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type SidebarNavgationLinksProps = {
  link: string;
  name: string;
  closeSidebar: VoidFunction;
  restateHamburger: VoidFunction;
  children: React.ReactNode;
};

declare type SidebarNavGroupProps = {
  name: string;
  setChevronPosition: React.Dispatch<React.SetStateAction<boolean>>;
  chevronPosition: boolean;
  children: React.ReactNode;
};

declare type NavigationGroupProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  toggleHamburgerRestate: VoidFunction;
  navNameState: boolean;
  setNavNameState: React.Dispatch<React.SetStateAction<boolean>>;
};

declare type ToolTipComponentProps = {
  children: React.ReactNode;
  tooltipText: string;
  sideOffset?: number;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
};
