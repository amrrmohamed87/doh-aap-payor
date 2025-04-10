import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationLink = ({
  link,
  name,
  closeSidebar,
  restateHamburger,
  children,
}: SidebarNavgationLinksProps) => {
  const path = usePathname();
  return (
    <Link
      href={link}
      onClick={() => {
        closeSidebar();
        restateHamburger();
      }}
      className={
        path === link
          ? "p-1 text-sm rounded flex stroke-[0.75] hover:stroke-cyan-800 stroke-cyan-700 text-cyan-700 hover:text-cyan-800 place-items-center gap-3 transition-color duration-300"
          : "bg-transparent text-sm p-1 rounded flex stroke-[0.75] hover:stroke-cyan-700 stroke-[#888888] text-[#888888] hover:text-cyan-700 place-items-center gap-3 transition-color duration-300"
      }
    >
      {children}
      <p className="text-inherit overflow-hidden whitespace-nowrap tracking-wide">
        {name}
      </p>
    </Link>
  );
};

export default NavigationLink;
