"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useSidebar } from "@/hooks/sidebar/use-sidebar";
import Image from "next/image";

import {
  ArrowRight,
  Bell,
  BellIcon,
  ChartBarBig,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  User,
} from "lucide-react";
import ToolTipComponent from "../reusable-components/ToolTipComponent";
import NavigationLink from "./sidebar-routes/NavigationLink";

export const Sidebar = () => {
  const {
    websiteOptionsMenu,
    handleWebsiteOptionsMenu,
    isOpen,
    handleOpenClose,
    handleNavigationClose,
    sidebarVariants,
    sidebarControls,
    svgVariants,
    svgControls,
    logoVariants,
    opened,
    toggle,
    lineVariants,
    lineTwoVariants,
  } = useSidebar();

  return (
    <>
      <motion.button
        onClick={() => {
          handleOpenClose();
          toggle();
        }}
        className="md:hidden fixed top-5 right-4 z-30 w-6 h-6 flex flex-col gap-[6px] pt-1 items-center"
        aria-label="Toggle navigation"
      >
        <motion.div
          className={`w-full h-1 transition-colors duration-700 ${
            opened && isOpen ? "bg-red-700" : "bg-cyan-600"
          }`}
          variants={lineVariants}
          animate={opened && isOpen ? "open" : "closed"}
        />
        <motion.div
          className={`w-full h-1 transition-colors duration-700 ${
            opened && isOpen ? "bg-red-700" : "bg-cyan-600"
          }`}
          variants={lineTwoVariants}
          animate={opened && isOpen ? "open" : "closed"}
        />
      </motion.button>

      <motion.nav
        variants={sidebarVariants}
        initial="close"
        animate={sidebarControls}
        className={`
          fixed z-20 top-0 left-0 h-screen bg-white border border-white shadow rounded-r-3xl
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:flex
          flex flex-col gap-10 p-5
        `}
      >
        <motion.div
          className="flex flex-row w-full justify-between items-center"
          layout // Enables smooth layout transitions
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                variants={logoVariants}
                initial="close"
                animate="open"
                exit="close"
                className="flex w-36"
                key="logo" // Key for proper animation tracking
              >
                <Image
                  src="/logo.jpg"
                  alt="Logo"
                  width={160}
                  height={32}
                  priority
                  sizes="(max-width: 1024px) 0px, 100vw"
                  className="w-40 h-10"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <button
            className="p-1 rounded-full hidden md:flex hover:cursor-pointer"
            onClick={handleOpenClose}
          >
            <motion.p
              animate={svgControls}
              variants={svgVariants}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <ArrowRight className="w-7 h-7 text-cyan-600 hover:text-cyan-700 transition-all duration-300" />
            </motion.p>
          </button>
        </motion.div>

        <div className="flex flex-col gap-5 flex-grow">
          <ToolTipComponent tooltipText="Providers Dashboard">
            <NavigationLink
              closeSidebar={handleNavigationClose}
              restateHamburger={() => toggle()}
              link="/"
              name="Dashboard"
            >
              <LayoutDashboard className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </ToolTipComponent>
          <ToolTipComponent tooltipText="Providers Ranking">
            <NavigationLink
              closeSidebar={handleNavigationClose}
              restateHamburger={() => toggle()}
              link="/providers-ranking"
              name="Claims Analysis"
            >
              <ChartBarBig className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </ToolTipComponent>
          <ToolTipComponent tooltipText="Payers Dashboard">
            <NavigationLink
              closeSidebar={handleNavigationClose}
              restateHamburger={() => toggle()}
              link="/payers"
              name="FWA Dashboard"
            >
              <LayoutGrid className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </ToolTipComponent>
          <ToolTipComponent tooltipText="Payers Ranking">
            <NavigationLink
              closeSidebar={handleNavigationClose}
              restateHamburger={() => toggle()}
              link="/payers-ranking"
              name="FWA Alerts"
            >
              <BellIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8" />
            </NavigationLink>
          </ToolTipComponent>
        </div>

        <div className="relative ml-1">
          <div
            onClick={handleWebsiteOptionsMenu}
            className="flex items-center pl-0.5 py-2 gap-3 border rounded-lg border-gray-300 cursor-pointer"
          >
            <User className="stroke-[0.75] stroke-gray-600 min-w-7 w-7" />
            <p className="text-gray-700 font-medium overflow-hidden whitespace-nowrap">
              Acorn Research
            </p>
          </div>
          <AnimatePresence>
            {websiteOptionsMenu && (
              <motion.div
                className={`absolute bottom-0 md:mt-0 ${
                  isOpen ? "left-0 md:left-60" : "left-16"
                } min-w-[240px] bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-gray-100 z-50`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <div className="p-2">
                  <div className="text-sm font-medium text-gray-500 flex items-center gap-3">
                    <div className="border-2 rounded-full w-fit py-2">
                      <User className="stroke-[0.75] stroke-gray-600 min-w-10 w-10" />
                    </div>
                    <h1 className="text-gray-700 font-medium overflow-hidden whitespace-nowrap">
                      Acorn Research
                    </h1>
                  </div>

                  <hr className="my-2 border border-cyan-600 rounded-full" />

                  <div className="space-y-1">
                    <ToolTipComponent tooltipText="Notifications">
                      <div className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <Bell className="stroke-[0.75] stroke-gray-600 min-w-5 w-5" />
                        <span className="text-gray-700">Notifications</span>
                      </div>
                    </ToolTipComponent>
                    <ToolTipComponent tooltipText="Logout">
                      <div className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                        <LogOut className="stroke-[0.75] stroke-gray-600 min-w-5 w-5" />
                        <span className="text-gray-700">Logout</span>
                      </div>
                    </ToolTipComponent>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};
