import React, { useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useLockedBody } from "../hooks/useBodyLock";
import { useUser } from "../hooks/useUser";
import { SidebarContext } from "./layout-context";
import { SidebarWrapper } from "../Sidebar/sidebar";
import { NavbarWrapper } from "../Navbar/navbar";
import { hourglass } from "ldrs";

hourglass.register();

interface Props {
  children: ReactNode;
}

export const DashboardLayoutWrapper: React.FC<Props> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  const { profile, loading, error } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && profile && (!profile.nidn || !profile.prodi)) {
      navigate(`/dashboard/profile/${profile.id}`);
    }
  }, [profile, loading, navigate]);

  // Default values shown

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <l-hourglass
          size="70"
          bg-opacity="0.1"
          speed="1.75"
          color="#1E40AF"
        ></l-hourglass>
      </div>
    );
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>{children}</NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};
