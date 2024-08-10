import React from "react";
import { useQuery } from "@apollo/client";
import DataTable from "react-data-table-component";
import { GET_ALL_PENELITIAN } from "../../../graphql/actions/penelitian.action";

const PenelitianLanding: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PENELITIAN);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const columns = [
    {
      name: "Judul Penelitian",
      selector: (row: any) => row.judul_penelitian,
      sortable: true,
    },
    {
      name: "Bidang",
      selector: (row: any) => row.bidang,
      sortable: true,
    },
    {
      name: "Tahun Akademik",
      selector: (row: any) => row.tahun_akademik,
      sortable: true,
    },
    {
      name: "Nama Ketua",
      selector: (row: any) => row.anggota.ketua,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row: any) => row.email,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.status,
      sortable: true,
    },
  ];

  return (
    <div className="container py-40 mx-auto">
      <h1 className="text-2xl font-bold mb-4">Daftar Penelitian</h1>
      <DataTable
        columns={columns}
        data={data.getAllPenelitian}
        pagination
        highlightOnHover
        striped
      />
    </div>
  );
};

export default PenelitianLanding;
