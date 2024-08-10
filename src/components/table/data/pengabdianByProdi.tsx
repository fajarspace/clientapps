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
} from "@nextui-org/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Pagination } from "@nextui-org/pagination";
import { useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import { toast, ToastContainer } from "react-toastify";
import {
  DELETE_PENGABDIAN,
  GET_ALL_PENGABDIAN,
} from "../../../graphql/actions/pengabdian.action";
import { Link } from "react-router-dom";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { DeleteIcon } from "../../icons/table/delete-icon";
import { EyeIcon } from "../../icons/table/eye-icon";

interface Pengabdian {
  id: string;
  judul_pengabdian: string;
  ketua: string;
  bidang: string;
  tahun_akademik: string;
  createdAt: string;
  status: string;
}

const PengabdianByProdiData: React.FC = () => {
  const { data } = useQuery<{
    getAllPengabdian: Pengabdian[];
  }>(GET_ALL_PENGABDIAN);
  const [deletePengabdian] = useMutation(DELETE_PENGABDIAN);
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(
    new Set<string | number>(["all"])
  );
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const pengabdians = data?.getAllPengabdian || [];

  const filteredItems = useMemo(() => {
    return pengabdians.filter((pengabdian) => {
      const matchesSearch = pengabdian.judul_pengabdian
        .toLowerCase()
        .includes(filterValue.toLowerCase());
      const matchesStatus =
        statusFilter.has("all") || statusFilter.has(pengabdian.status);

      return matchesSearch && matchesStatus;
    });
  }, [pengabdians, filterValue, statusFilter]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [filteredItems, page]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this proposal?")) {
      try {
        await deletePengabdian({ variables: { id } });
        toast.success("Proposal deleted successfully!");
        window.location.reload(); // Consider using refetch or updating state instead
      } catch (error) {
        toast.error("Failed to delete proposal!");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="mb-4 flex gap-4">
        <Input
          placeholder="Search by title"
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
          fullWidth
        />
        <Dropdown>
          <DropdownTrigger>
            <Button
              endContent={<ChevronDownIcon className="text-large" />}
              variant="flat"
            >
              Status
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Filter by status"
            closeOnSelect={false}
            selectedKeys={statusFilter}
            selectionMode="multiple"
            onSelectionChange={(keys) => setStatusFilter(new Set(keys))}
          >
            <DropdownItem key="all">All</DropdownItem>
            <DropdownItem key="Submitted">Submitted</DropdownItem>
            <DropdownItem key="Approved">Approved</DropdownItem>
            <DropdownItem key="Rejected">Rejected</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <Table
        aria-label="Pengabdian Table"
        bottomContent={
          <div className="flex w-full justify-between items-center">
            <span className="text-default-400 text-small">
              {paginatedItems.length} of {filteredItems.length} selected
            </span>
            <Pagination
              isCompact
              showControls
              total={Math.ceil(filteredItems.length / rowsPerPage)}
              page={page}
              onChange={(newPage) => setPage(newPage)}
            />
            <div className="hidden sm:flex gap-2">
              <Button
                isDisabled={page <= 1}
                size="sm"
                variant="flat"
                onPress={() => setPage((p) => Math.max(p - 1, 1))}
              >
                Previous
              </Button>
              <Button
                isDisabled={
                  page >= Math.ceil(filteredItems.length / rowsPerPage)
                }
                size="sm"
                variant="flat"
                onPress={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        }
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
          {paginatedItems.map((pengabdian, index) => (
            <TableRow key={pengabdian.id}>
              <TableCell>{(page - 1) * rowsPerPage + index + 1}</TableCell>
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
                <div className="flex justify-between">
                  <Tooltip content="Detail Penelitian" color="foreground">
                    <Link
                      to={`/dashboard/pengabdian/detail/${pengabdian.id}`}
                      className="text-lg text-gray-500 cursor-pointer"
                    >
                      <EyeIcon />
                    </Link>
                  </Tooltip>
                  <Tooltip content="Delete Penelitian" color="danger">
                    <span
                      className="text-lg text-red-500 cursor-pointer"
                      onClick={() => handleDelete(pengabdian.id)}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default PengabdianByProdiData;
