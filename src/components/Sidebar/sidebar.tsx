import { useEffect, useState } from "react";
import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon } from "../icons/sidebar/accounts-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { useUser } from "../hooks/useUser";
import { useSidebarContext } from "../Dashboard/layout-context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { SettingsIcon } from "../icons/sidebar/settings-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();
  const { user, loading } = useUser();
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }
  }, [loading, user, signedIn]);

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed && (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      )}
      <div className={Sidebar({ collapsed })}>
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Dashboard"
              icon={<HomeIcon />}
              isActive={pathname === "/dashboard"}
              href="/dashboard"
            />
            <SidebarMenu title="Main Menu">
              {user && user.role === "Admin" && (
                <SidebarItem
                  isActive={pathname === "/dashboard/accounts"}
                  title="Accounts"
                  icon={<AccountsIcon />}
                  href="/dashboard/accounts"
                />
              )}

              {user && user.role === "Prodi" && (
                <>
                  <CollapseItems
                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    items={[]}
                    title="Penelitian"
                  />
                  <CollapseItems
                    icon={<FontAwesomeIcon icon={faBookOpenReader} />}
                    items={[]}
                    title="Pengabdian"
                  />

                  <SidebarMenu title="General">
                    {/* <SidebarItem
                isActive={pathname === "/developers"}
                title="Developers"
                icon={<DevIcon />}
              />
              <SidebarItem
                isActive={pathname === "/view"}
                title="View Test Data"
                icon={<ViewIcon />}
              /> */}
                    <SidebarItem
                      isActive={pathname === "/dashboard/settings"}
                      title="Settings"
                      icon={<SettingsIcon />}
                      href="/dashboard/settings"
                    />
                  </SidebarMenu>
                </>
              )}

              {user && user.role === "Dosen" && (
                <>
                  <CollapseItems
                    icon={<FontAwesomeIcon icon={faMagnifyingGlass} />}
                    items={[]}
                    title="Penelitian"
                  />
                  <CollapseItems
                    icon={<FontAwesomeIcon icon={faBookOpenReader} />}
                    items={[]}
                    title="Pengabdian"
                  />
                </>
              )}

              {/* Example of an additional sidebar item */}
              {/* <SidebarItem
                isActive={pathname === "/submissions"}
                title="Submissions"
                icon={<PaymentsIcon />}
                href="/dashboard/submissions"
              /> */}
            </SidebarMenu>

            <SidebarMenu title="Updates">
              <SidebarItem
                isActive={pathname === "/dashboard/changelog"}
                title="Changelog"
                icon={<ChangeLogIcon />}
                href="/dashboard/changelog"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};
