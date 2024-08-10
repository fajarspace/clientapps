import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import { ApolloProvider } from "@apollo/client";
import { graphqlClient } from "./graphql/gql.setup";
import { AuthProvider } from "./context/AuthContext"; // Ensure this is correctly imported
// import ProtectedRoute from "./components/Auth/protectedRoute";
import DashboardPages from "./pages/dashboard/Dashboard";
import AccountPages from "./pages/dashboard/account/Account";
import AuthWrapper from "./components/Auth/authWrapper";
import NotFound from "./pages/404";
import PenelitianPages from "./pages/dashboard/proposals/penelitian/Penelitian";
import CreatePenelitianPages from "./pages/dashboard/proposals/penelitian/CreatePenelitian";
import EditProfilePages from "./pages/dashboard/profile/EditProfile";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import VerificationPage from "./pages/auth/Verification";
import ForgotPasswordPage from "./pages/auth/ForgotPassword";
import RegisterPage from "./pages/auth/Register";
import PenelitianLanding from "./components/Landing/penelitian/page";
import LayoutLanding from "./pages/landing-page/Layout";
import HomeLanding from "./pages/landing-page/Home";
import DetailPenelitianPage from "./pages/dashboard/proposals/penelitian/Detail";
import SettingsPage from "./components/Dashboard/settings";
import SuratRekomendasiPenelitian from "./components/table/pdf/surat-rekomendasi-penelitian";
import UpdateAccount from "./pages/dashboard/account/UpdateAccount";
import ChangelogPage from "./pages/dashboard/changelog/Changelog";
import SuratRekomendasiPengabdian from "./components/table/pdf/surat-rekomendasi-pengabdian";
import Pengabdian from "./pages/dashboard/proposals/pengabdian/Pengabdian";
import DetailPengabdianPage from "./components/Dashboard/Proposals/pengabdian/detail";
import CreatePengabdianPage from "./pages/dashboard/proposals/pengabdian/CreatePengabdian";
import PengabdianLanding from "./components/Landing/pengabdian/page";
import GuidePage from "./components/Landing/panduan/page";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={graphqlClient}>
    <NextUIProvider>
      <NextThemesProvider
        defaultTheme="system"
        attribute="class"
        // {...themeProps}
      >
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LayoutLanding />}>
                <Route index element={<HomeLanding />} />
                <Route path="/panduan" element={<GuidePage />} />
                <Route path="/penelitian" element={<PenelitianLanding />} />
                <Route path="/pengabdian" element={<PengabdianLanding />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                {/* <Route path="/pengumuman" element={<PengumumanPage />} /> */}
              </Route>
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/verification" element={<VerificationPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route
                path="/dashboard"
                element={
                  <AuthWrapper>
                    <DashboardPages />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/profile/:id"
                element={
                  <AuthWrapper>
                    <EditProfilePages />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/account/:id"
                element={
                  <AuthWrapper>
                    <UpdateAccount />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/accounts"
                element={
                  <AuthWrapper>
                    <AccountPages />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/settings"
                element={
                  <AuthWrapper>
                    <SettingsPage />
                  </AuthWrapper>
                }
              />
              //penelitian
              <Route
                path="/dashboard/penelitian"
                element={
                  <AuthWrapper>
                    <PenelitianPages />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/penelitian/create"
                element={
                  <AuthWrapper>
                    <CreatePenelitianPages />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/penelitian/detail/:id"
                element={
                  <AuthWrapper>
                    <DetailPenelitianPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/surat-rekomendasi-penelitian/:id"
                element={<SuratRekomendasiPenelitian />}
              />
              //pengabdian
              <Route
                path="/dashboard/pengabdian"
                element={
                  <AuthWrapper>
                    <Pengabdian />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/pengabdian/create"
                element={
                  <AuthWrapper>
                    <CreatePengabdianPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/dashboard/pengabdian/detail/:id"
                element={
                  <AuthWrapper>
                    <DetailPengabdianPage />
                  </AuthWrapper>
                }
              />
              <Route
                path="/surat-rekomendasi-pengabdian/:id"
                element={<SuratRekomendasiPengabdian />}
              />
              <Route path="*" element={<NotFound />} />
              <Route
                path="/dashboard/changelog"
                element={
                  <AuthWrapper>
                    <ChangelogPage />
                  </AuthWrapper>
                }
              />
            </Routes>
          </Router>
        </AuthProvider>
      </NextThemesProvider>
    </NextUIProvider>
  </ApolloProvider>
);
