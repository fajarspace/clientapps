import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { ChevronUpIcon } from "../icons/sidebar/chevron-up-icon";
import Link from "next/link";
import { useUser } from "../hooks/useUser";

interface Props {
  icon: React.ReactNode;
  title: string;
  items?: string[]; // Assuming items is an optional array of strings
}

export const CollapseItems: React.FC<Props> = ({ icon, title = [] }) => {
  const { user } = useUser();

  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={<ChevronUpIcon />}
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] dark:hover:bg-default-100 hover:bg-blue-900 rounded-xl active:scale-[0.98] transition-transform px-3.5",
            title:
              "text-white px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label={`Accordion for ${title}`}
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {title === "Penelitian" && user && user.role === "Prodi" && (
              <div>
                <span className="w-full flex mb-4 text-default-300 dark:text-default-600 hover:text-default-100 transition-colors">
                  <Link href="/dashboard/penelitian">Usulan</Link>
                </span>
              </div>
            )}
            {title === "Penelitian" && user && user.role === "Dosen" && (
              <div>
                <span className="w-full flex mb-4 text-default-300 dark:text-default-600 hover:text-default-100 transition-colors">
                  <Link href="/dashboard/penelitian">Usulan Baru</Link>
                </span>
              </div>
            )}
            {title === "Pengabdian" && user && user.role === "Prodi" && (
              <div>
                <span className="w-full flex mb-4 text-default-300 dark:text-default-600 hover:text-default-100 transition-colors">
                  <Link href="/dashboard/pengabdian">Usulan</Link>
                </span>
              </div>
            )}
            {title === "Pengabdian" && user && user.role === "Dosen" && (
              <div>
                <span className="w-full flex mb-4 text-default-300 dark:text-default-600 hover:text-default-100 transition-colors">
                  <Link href="/dashboard/pengabdian">Usulan Baru</Link>
                </span>
              </div>
            )}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
