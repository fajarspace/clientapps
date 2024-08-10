"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GET_ALL_PENGABDIAN } from "../../../../graphql/actions/pengabdian.action";
import {
  Table,
  Spinner,
  TableHeader,
  TableColumn,
  TableCell,
  TableRow,
  TableBody,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

interface Pengabdian {
  id: string;
  judul_pengabdian: string;
  ketua: string;
  bidang: string;
  tahun_akademik: string;
  createdAt: string;
  status: string;
}

const LatestPengabdian: React.FC = () => {
  const { data, loading } = useQuery<{
    getAllPengabdian: Pengabdian[];
  }>(GET_ALL_PENGABDIAN);

  const pengabdians = data?.getAllPengabdian || [];

  // Sort by createdAt and take the 3 most recent records
  const recentPengabdians = [...pengabdians]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  if (loading) return <Spinner size="sm" />;

  return (
    <>
      <ToastContainer />
      <div className="w-full flex flex-col gap-4">
        <Table
          aria-label="Recent Pengabdian"
          css={{ height: "auto", minWidth: "100%" }}
        >
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Judul Pengabdian</TableColumn>
            <TableColumn>Nama</TableColumn>
            <TableColumn>Bidang</TableColumn>
            <TableColumn>Tahun</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {recentPengabdians.map((pengabdian, index) => (
              <TableRow key={pengabdian.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{pengabdian.judul_pengabdian}</TableCell>
                <TableCell>{pengabdian.ketua}</TableCell>
                <TableCell>{pengabdian.bidang}</TableCell>
                <TableCell>{pengabdian.tahun_akademik}</TableCell>
                <TableCell>
                  {format(new Date(pengabdian.createdAt), "dd MMMM yyyy")}
                </TableCell>
                <TableCell
                  style={{
                    color:
                      pengabdian.status === "Approved"
                        ? "green"
                        : pengabdian.status === "Rejected"
                        ? "red"
                        : "blue",
                  }}
                >
                  {pengabdian.status}
                </TableCell>
                <TableCell>
                  <Link to={`/dashboard/pengabdian/detail/${pengabdian.id}`}>
                    <Button size="sm" color="primary">
                      Detail
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end">
          <Link to="/dashboard/pengabdian">
            <Button>Lihat lainnya</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestPengabdian;
