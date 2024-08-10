// useAuthCheck.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

const useAuthCheck = () => {
  const { accessToken, refreshToken } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthRoute =
      location.pathname === "/login" || location.pathname === "/register";
    const isProtectedRoute =
      location.pathname.startsWith("/dashboard") &&
      location.pathname !== "/login";

    if (isAuthRoute && accessToken && refreshToken) {
      navigate("/dashboard");
    }

    if (isProtectedRoute && (!accessToken || !refreshToken)) {
      navigate("/login");
    }
  }, [accessToken, refreshToken, location, navigate]);
};

export default useAuthCheck;
