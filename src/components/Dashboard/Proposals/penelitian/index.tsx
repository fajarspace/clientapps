"use client";
// import { HouseIcon } from "@/components/icons/breadcrumb/house-icon";
// import { UsersIcon } from "@/components/icons/breadcrumb/users-icon";
import { useEffect, useState } from "react";
// import { Input } from "@nextui-org/input";
import { useUser } from "../../../hooks/useUser";
import PenelitianByProdiData from "../../../table/data/penelitianByProdi";
import PenelitianByDosenData from "../../../table/data/penelitianByDosen";

const Penelitian = () => {
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
      <h3 className="text-xl font-semibold">Penelitian</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        {/* <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input className="w-full" placeholder="Search users" />
        </div> */}
        <div className="flex flex-row gap-3.5 flex-wrap"></div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {isAdmin ? <PenelitianByProdiData /> : <PenelitianByDosenData />}
      </div>
    </div>
  );
};

export default Penelitian;
