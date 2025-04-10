import { ChevronDown } from "lucide-react";

const NavGroup = ({
  name,
  setChevronPosition,
  chevronPosition,
  children,
}: SidebarNavGroupProps) => {
  return (
    <h1
      onClick={() => setChevronPosition(!chevronPosition)}
      className={
        chevronPosition
          ? "p-1 hover:cursor-pointer rounded flex stroke-[0.75] hover:stroke-blue-800 stroke-blue-700 text-blue-700 hover:text-blue-800 place-items-center gap-3 transition-color duration-300"
          : "bg-transparent p-1 hover:cursor-pointer rounded flex stroke-[0.75] hover:stroke-blue-700 stroke-[#888888] text-[#888888] hover:text-blue-700 place-items-center gap-3 transition-color duration-300"
      }
    >
      {children}
      <p className="text-inherit overflow-hidden whitespace-nowrap tracking-wide">
        {name}
      </p>
      <ChevronDown
        className={`transform transition-transform duration-300 ml-auto ${
          chevronPosition ? "rotate-180" : ""
        }`}
      />
    </h1>
  );
};

export default NavGroup;
