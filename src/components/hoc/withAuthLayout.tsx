// src/hoc/withAuthLayout.tsx
import React from "react";
import { AuthLayoutWrapper } from "../Auth/authLayout";

const withAuthLayout = (Component: React.ComponentType) => {
  return (props: any) => (
    <AuthLayoutWrapper>
      <Component {...props} />
    </AuthLayoutWrapper>
  );
};

export default withAuthLayout;
