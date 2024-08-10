"use client";
import { Link } from "react-router-dom";
import ProfilePage from "../Profile";
import { useUser } from "../../hooks/useUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookOpenReader,
  faGear,
  faMagnifyingGlass,
  faUsersCog,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import LatestPenelitian from "../Proposals/penelitian/latest-penelitian";
import LastProgressPenelitian from "../Proposals/penelitian/last-progress";
import LastProgressPengabdian from "../Proposals/pengabdian/last-progress";
import LatestPengabdian from "../Proposals/pengabdian/latest-pengabdian";

export const Content = () => {
  const { loading, user } = useUser(); // Ambil loading dan user dari hook useUser
  const [isDosen, setIsDosen] = useState(false); // State untuk menyimpan status Prodi
  const [isAdmin, setIsAdmin] = useState(false); // State untuk menyimpan status Admin
  const [isProdi, setIsProdi] = useState(false); // State untuk menyimpan status Admin

  useEffect(() => {
    if (!loading && user) {
      setIsDosen(user.role === "Dosen");
      setIsAdmin(user.role === "Admin");
      setIsProdi(user.role === "Prodi");
    }
  }, [loading, user]);

  let dashboardTitle = "Dashboard Pengusul";
  let dashboardDesc =
    "Anda dapat mengajukan usulan terkait dengan layanan berikut:";

  if (user?.role === "Prodi") {
    dashboardTitle = "Dashboard Prodi";
    dashboardDesc =
      "Anda dapat menyetujui usulan dan mengirim surat rekomendasi terkait dengan layanan berikut:";
  } else if (user?.role === "Admin") {
    dashboardTitle = "Dashboard Admin";
    dashboardDesc =
      "Anda dapat mengatur dan mengelola user akun terkait dengan layanan berikut:";
  }

  return (
    <div className="h-full lg:px-6">
      <div className="flex flex-col justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 flex flex-col w-full">
          {/* Welcome Section */}
          <h3 className="text-3xl font-semibold mb-4">Selamat datang</h3>
          <div className="bg-blue-800 dark:bg-default-50 text-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">{dashboardTitle}</h2>
            <p className="mb-4">{dashboardDesc}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isDosen && (
                <>
                  <Link
                    to="/dashboard/penelitian"
                    className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-800">
                      <FontAwesomeIcon icon={faMagnifyingGlass} /> Penelitian
                    </h3>
                  </Link>
                  <Link
                    to="/dashboard/pengabdian"
                    className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-800">
                      <FontAwesomeIcon icon={faBookOpenReader} /> Pengabdian
                    </h3>
                  </Link>
                </>
              )}

              {isProdi && (
                <>
                  <Link
                    to="/dashboard/penelitian"
                    className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-800">
                      <FontAwesomeIcon icon={faMagnifyingGlass} /> Penelitian
                    </h3>
                  </Link>
                  <Link
                    to="/dashboard/pengabdian"
                    className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-800">
                      <FontAwesomeIcon icon={faBookOpenReader} /> Pengabdian
                    </h3>
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                  >
                    <h3 className="text-lg font-semibold text-blue-800">
                      <FontAwesomeIcon icon={faGear} /> Settings
                    </h3>
                  </Link>
                </>
              )}
              {isAdmin && (
                <Link
                  to="/dashboard/accounts"
                  className="bg-white rounded-lg shadow-md p-5 text-center hover:shadow-lg transition duration-300"
                >
                  <h3 className="text-lg font-semibold text-blue-800">
                    <FontAwesomeIcon icon={faUsersCog} /> User Management
                  </h3>
                </Link>
              )}
            </div>
          </div>

          {/* Last Submission Status Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Status usulan terakhir
            </h3>
            {isDosen ? <LastProgressPenelitian /> : <LatestPenelitian />}
            <br />
            {isDosen ? <LastProgressPengabdian /> : <LatestPengabdian />}
            {/* <LastProgressSubmission /> */}
            <ProfilePage />
          </div>
        </div>
      </div>
    </div>
  );
};
