"use client";

import { useState, useEffect, useCallback } from "react";
import { useAnimationControls, useCycle } from "motion/react";
import { useSideBarContext } from "@/contextAPI/sidebar-context";

export const useSidebar = () => {
  const [websiteOptionsMenu, setWebsiteOptionsMenu] = useState<boolean>(false);
  const [opened, toggle] = useCycle(false, true);
  const { isOpen, setIsOpen } = useSideBarContext();

  const sidebarVariants = {
    close: {
      width: "5rem",
      transition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
    open: {
      width: "16rem",
      transition: {
        type: "spring",
        damping: 15,
        duration: 0.5,
      },
    },
  };

  const svgVariants = {
    close: {
      rotate: 360,
    },
    open: {
      rotate: 180,
    },
  };

  const logoVariants = {
    close: {
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  const lineVariants = {
    open: {
      rotate: 45,
      y: 5,
      transition: { duration: 0.3 },
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const lineTwoVariants = {
    open: {
      rotate: -45,
      y: -5,
      transition: { duration: 0.3 },
    },
    closed: {
      rotate: 0,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const sidebarControls = useAnimationControls();
  const svgControls = useAnimationControls();
  const logoControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      sidebarControls.start("open");
      svgControls.start("open");
      logoControls.start("open");
    } else {
      sidebarControls.start("close");
      svgControls.start("close");
      logoControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = useCallback(() => {
    return setIsOpen(!isOpen);
  }, [isOpen]);

  const handleNavigationClose = useCallback(() => {
    return setIsOpen(false);
  }, [isOpen]);

  const handleWebsiteOptionsMenu = () => {
    setWebsiteOptionsMenu(!websiteOptionsMenu);
  };

  return {
    websiteOptionsMenu,
    handleWebsiteOptionsMenu,
    isOpen,
    setIsOpen,
    handleOpenClose,
    handleNavigationClose,
    sidebarVariants,
    sidebarControls,
    svgVariants,
    svgControls,
    logoVariants,
    logoControls,
    opened,
    toggle,
    lineVariants,
    lineTwoVariants,
  };
};
