import NextLink from "next/link";
import React from "react";
import clsx from "clsx";
import { useSidebarContext } from "../Dashboard/layout-context";

interface Props {
  title: string;
  icon: React.ReactNode;
  isActive?: boolean;
  href?: string;
}

export const SidebarItem = ({ icon, title, isActive, href = "" }: Props) => {
  const { setCollapsed } = useSidebarContext();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NextLink
      href={href}
      className="text-default-900 active:bg-none max-w-full"
    >
      <div
        className={clsx(
          isActive
            ? "dark:hover:bg-default-100 hover:bg-blue-900 [&_svg_path]:fill-primary-500"
            : "dark:hover:bg-default-100 hover:bg-blue-900",
          "flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]"
        )}
        onClick={handleClick}
      >
        {icon}
        <span className="text-white">{title}</span>
      </div>
    </NextLink>
  );
};
