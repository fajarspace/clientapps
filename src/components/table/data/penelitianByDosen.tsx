"use client";
import React, { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Spinner,
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useUser } from "../../hooks/useUser";
import { StatusUsulan } from "../../Dashboard/Proposals/Status";
// import { DeleteIcon } from "../../icons/table/delete-icon";
import { EyeIcon } from "../../icons/table/eye-icon";
// import { DELETE_PENELITIAN } from "../../../graphql/actions/penelitian.action";
import { Button, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

interface Penelitian {
  id: string;
  ketua: string;
  email: string;
  bidang: string;
  tahun_akademik: string;
  judul_penelitian: string;
  status: string;
  createdAt: string;
}

const columns = [
  { name: "NO", uid: "no" },
  { name: "KETUA", uid: "nama" },
  { name: "JUDUL", uid: "judul_penelitian" },
  { name: "BIDANG FOKUS", uid: "bidang_fokus" },
  { name: "TAHUN", uid: "tahun_pelaksanaan" },
  { name: "STATUS USULAN", uid: "status" },
  { name: "AKSI", uid: "actions" },
];

// const getYearsRange = () => {
//   const currentYear = new Date().getFullYear();
//   const years = [];
//   for (let i = currentYear - 5; i <= currentYear; i++) {
//     years.push(i.toString());
//   }
//   return years;
// };

const PenelitianByDosenData: React.FC = () => {
  const { loading, user, error, refetch } = useUser(); // Include refetch here
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  // const [deletePenelitian] = useMutation(DELETE_PENELITIAN);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear - 5; i <= currentYear; i++) {
      yearsArray.push(i.toString()); // Convert all years to strings
    }
    return yearsArray;
  }, []);

  if (loading) return <Spinner size="lg" color="primary" />;
  if (error) {
    console.error("Error fetching user data:", error);
    return <div className="text-red-500">Error fetching data</div>;
  }

  const filteredPenelitian = selectedYear
    ? user.penelitian.filter(
        (p: Penelitian) => p.tahun_akademik === selectedYear
      )
    : user.penelitian;

  const getStatusColor = (status: string) => {
    switch (status) {
      case StatusUsulan.SUBMIT:
        return "text-blue-500";
      case StatusUsulan.Submitted:
        return "text-primary-500";
      case StatusUsulan.Approved:
        return "text-green-500";
      case StatusUsulan.Rejected:
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  // const handleDelete = async (id: string) => {
  //   if (window.confirm("Are you sure you want to delete this proposal?")) {
  //     try {
  //       await deletePenelitian({ variables: { id } });
  //       toast.success("Proposal deleted successfully!");
  //       refetch(); // Trigger a refetch after deletion
  //     } catch (error) {
  //       toast.error("Failed to delete proposal!");
  //     }
  //   }
  // };

  const handleSync = () => {
    refetch(); // Manually trigger refetch
  };

  return (
    <div className="w-full flex flex-col gap-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          {/* <label className="mr-2 font-semibold">Tahun Pelaksanaan</label> */}
          <Select
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            className="w-48" // Adjust the width as needed
            placeholder="Select Year"
          >
            <Select.Option value="">All</Select.Option>
            {years.map((year) => (
              <Select.Option key={year} value={year}>
                {year}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Button onClick={handleSync} color="primary">
          {loading ? (
            <Spinner size="sm" color="white" />
          ) : (
            <FontAwesomeIcon icon={faSyncAlt} />
          )}
          {!loading && "Sync"}
        </Button>
      </div>
      {filteredPenelitian.length === 0 ? (
        selectedYear && Number(selectedYear) >= new Date().getFullYear() ? (
          <div className="text-center">
            <Link
              to={"/dashboard/penelitian/create"}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
            >
              Ajukan Proposal
            </Link>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            Tidak ada data tersedia
          </div>
        )
      ) : (
        <Table aria-label="User Penelitian Table">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
                className="text-left"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody>
            {filteredPenelitian.map((penelitian: Penelitian, index: number) => (
              <TableRow key={penelitian.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{penelitian.ketua}</TableCell>
                <TableCell>{penelitian.judul_penelitian}</TableCell>
                <TableCell>{penelitian.bidang}</TableCell>
                <TableCell>{penelitian.tahun_akademik}</TableCell>
                <TableCell className={getStatusColor(penelitian.status)}>
                  {penelitian.status}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <Tooltip content="Details">
                      <Link
                        to={`/dashboard/penelitian/detail/${penelitian.id}`}
                      >
                        <span className="text-lg text-gray-500 cursor-pointer">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {/* <Tooltip content="Delete Penelitian" color="danger">
                      <span
                        className="text-lg text-red-500 cursor-pointer"
                        onClick={() => handleDelete(penelitian.id)}
                      >
                        <DeleteIcon />
                      </span>
                    </Tooltip> */}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default PenelitianByDosenData;
