"use client";
import React from "react";
import { useQuery } from "@apollo/client";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GET_ALL_PENELITIAN } from "../../../../graphql/actions/penelitian.action";
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

interface Penelitian {
  id: string;
  judul_penelitian: string;
  ketua: string;
  bidang: string;
  tahun_akademik: string;
  createdAt: string;
  status: string;
}

const LatestPenelitian: React.FC = () => {
  const { data, loading } = useQuery<{
    getAllPenelitian: Penelitian[];
  }>(GET_ALL_PENELITIAN);

  const penelitians = data?.getAllPenelitian || [];

  // Sort by createdAt and take the 3 most recent records
  const recentPenelitians = [...penelitians]
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
          aria-label="Recent Penelitian"
          css={{ height: "auto", minWidth: "100%" }}
        >
          <TableHeader>
            <TableColumn>No</TableColumn>
            <TableColumn>Judul Penelitian</TableColumn>
            <TableColumn>Nama</TableColumn>
            <TableColumn>Bidang</TableColumn>
            <TableColumn>Tahun</TableColumn>
            <TableColumn>Created At</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody>
            {recentPenelitians.map((penelitian, index) => (
              <TableRow key={penelitian.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{penelitian.judul_penelitian}</TableCell>
                <TableCell>{penelitian.ketua}</TableCell>
                <TableCell>{penelitian.bidang}</TableCell>
                <TableCell>{penelitian.tahun_akademik}</TableCell>
                <TableCell>
                  {format(new Date(penelitian.createdAt), "dd MMMM yyyy")}
                </TableCell>
                <TableCell
                  style={{
                    color:
                      penelitian.status === "Approved"
                        ? "green"
                        : penelitian.status === "Rejected"
                        ? "red"
                        : "blue",
                  }}
                >
                  {penelitian.status}
                </TableCell>
                <TableCell>
                  <Link to={`/dashboard/penelitian/detail/${penelitian.id}`}>
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
          <Link to="/dashboard/penelitian">
            <Button>Lihat lainnya</Button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestPenelitian;
