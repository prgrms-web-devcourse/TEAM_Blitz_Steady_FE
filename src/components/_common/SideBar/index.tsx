"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import Link from "next/link";
import { Box } from "@radix-ui/themes";

interface SideBarItem {
  id?: string;
  label: string;
  href: string;
}

interface SideBarProps {
  children?: ReactNode;
  sidebarItems: SideBarItem[];
  listType?: string;
}

const SideBar = ({ children, sidebarItems, listType }: SideBarProps) => {
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <Box
      className={`${
        listType === "mypage" ? "h-814 w-300" : "h-900 w-250"
      } flex flex-col items-center gap-15 overflow-y-auto overflow-x-hidden rounded-20 border-1 border-solid border-st-gray-100 p-20`}
    >
      {sidebarItems.map((item, id) => (
        <Link
          href={item.href}
          key={id}
        >
          <div
            className={`${
              listType === "mypage" ? "w-250" : "w-200"
            } h-full rounded-5 p-20 text-18 font-bold transition duration-100 ${
              selectedItem === id
                ? "bg-st-skyblue-50 text-st-primary"
                : " hover:bg-st-gray-50"
            }`}
            onClick={() => setSelectedItem(id)}
          >
            {item.label}
          </div>
        </Link>
      ))}
      {children}
    </Box>
  );
};

export default SideBar;
