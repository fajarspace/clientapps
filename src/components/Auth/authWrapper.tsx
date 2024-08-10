// AuthWrapper.tsx
import React from "react";
import useAuthCheck from "./middleware";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  useAuthCheck();
  return <>{children}</>;
};

export default AuthWrapper;
