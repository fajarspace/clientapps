// src/hoc/withDashboardLayout.tsx
import React from "react";
import { DashboardLayoutWrapper } from "../Dashboard/dashboardLayout";

const withDashboardLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <DashboardLayoutWrapper>
      <Component {...props} />
    </DashboardLayoutWrapper>
  );
};

export default withDashboardLayout;
