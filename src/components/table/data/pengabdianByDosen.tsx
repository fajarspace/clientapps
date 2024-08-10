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
import { Button, Select } from "antd"; // Import Ant Design Select
import { useUser } from "../../hooks/useUser";
import { StatusUsulan } from "../../Dashboard/Proposals/Status";
import { EyeIcon } from "../../icons/table/eye-icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

interface Pengabdian {
  id: string;
  ketua: string;
  email: string;
  bidang: string;
  tahun_akademik: string;
  judul_pengabdian: string;
  status: string;
  createdAt: string;
}

const columns = [
  { name: "NO", uid: "no" },
  { name: "KETUA", uid: "nama" },
  { name: "JUDUL", uid: "judul_pengabdian" },
  { name: "BIDANG FOKUS", uid: "bidang_fokus" },
  { name: "TAHUN", uid: "tahun_pelaksanaan" },
  { name: "STATUS USULAN", uid: "status" },
  { name: "AKSI", uid: "actions" },
];

const getYearsRange = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 5; i <= currentYear; i++) {
    years.push(i.toString());
  }
  return years;
};

const PengabdianByDosenData: React.FC = () => {
  const { loading, user, error, refetch } = useUser();
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);

  const years = useMemo(getYearsRange, []);

  if (loading) return <Spinner size="lg" color="primary" />;
  if (error) {
    console.error("Error fetching user data:", error);
    return <div className="text-red-500">Error fetching data</div>;
  }

  const filteredPengabdian = selectedYear
    ? user.pengabdian.filter(
        (p: Pengabdian) => p.tahun_akademik === selectedYear
      )
    : user.pengabdian;

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
  const handleSync = () => {
    refetch(); // Manually trigger refetch
  };
  return (
    <div className="w-full flex flex-col gap-6">
      <ToastContainer />
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <label className="mr-2 font-semibold">Tahun Pelaksanaan</label>
          <Select
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            className="w-48"
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
      {filteredPengabdian.length === 0 ? (
        selectedYear && Number(selectedYear) >= new Date().getFullYear() ? (
          <div className="text-center">
            <Link
              to={"/dashboard/pengabdian/create"}
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
        <Table aria-label="User Pengabdian Table">
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
            {filteredPengabdian.map((pengabdian: Pengabdian, index: number) => (
              <TableRow key={pengabdian.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pengabdian.ketua}</TableCell>
                <TableCell>{pengabdian.judul_pengabdian}</TableCell>
                <TableCell>{pengabdian.bidang}</TableCell>
                <TableCell>{pengabdian.tahun_akademik}</TableCell>
                <TableCell className={getStatusColor(pengabdian.status)}>
                  {pengabdian.status}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-4">
                    <Tooltip content="Details">
                      <Link
                        to={`/dashboard/pengabdian/detail/${pengabdian.id}`}
                      >
                        <span className="text-lg text-gray-500 cursor-pointer">
                          <EyeIcon />
                        </span>
                      </Link>
                    </Tooltip>
                    {/* <Tooltip content="Delete Pengabdian" color="danger">
                      <span
                        className="text-lg text-red-500 cursor-pointer"
                        onClick={() => handleDelete(pengabdian.id)}
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

export default PengabdianByDosenData;
