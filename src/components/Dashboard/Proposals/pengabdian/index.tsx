"use client";
import { useEffect, useState } from "react";
import { useUser } from "../../../hooks/useUser";
import PengabdianByProdiData from "../../../table/data/pengabdianByProdi";
import PengabdianByDosenData from "../../../table/data/pengabdianByDosen";

const Pengabdian = () => {
  const { loading, user } = useUser(); // Ambil loading dan user dari hook useUser
  const [isAdmin, setIsAdmin] = useState(false); // State untuk menyimpan status Prodi

  useEffect(() => {
    if (!loading && user) {
      setIsAdmin(user.role === "Prodi");
    }
  }, [loading, user]);

  if (loading) return <div>Loading...</div>; // Handle loading state

  return (
    <div className="container my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Pengabdian</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        {/* <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input className="w-full" placeholder="Search users" />
        </div> */}
        <div className="flex flex-row gap-3.5 flex-wrap"></div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {isAdmin ? <PengabdianByProdiData /> : <PengabdianByDosenData />}
      </div>
    </div>
  );
};

export default Pengabdian;
