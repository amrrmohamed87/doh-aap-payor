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

declare type MetricsStatsProps = {
  title: string;
  value: string | number | undefined;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  className?: string;
};

declare type PaginationProps = {
  currentPage: number;
  totalPages: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onFirstPage: () => void;
  onLastPage: () => void;
  onPreviousPage: () => void;
  onNextPage: () => void;
};

declare type DialogModelProps = {
  tritggerBtnClassName?: string;
  triggerBtnText?: string;
  triggerBtnFn?: VoidFunction;
  isConfirming?: boolean;
  loaderIconCn?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  dialogCancelBtnText?: string;
  dialogConfirmBtnText?: string;
  onCancel?: VoidFunction;
  onConfirm?: VoidFunction;
  showConfirmBtn?: boolean;
  children?: React.ReactNode;
};

declare type TableHeaderProps = {
  cols: (string | { label: string; icon?: React.ReactNode })[];
  extraHeader?: string;
  totalCol?: string;
  tableBody: React.ReactNode;
  data: any[];
  notFoundMsg?: string;
  isLoadingState?: boolean;
  isLoadingMsg?: string;
};
