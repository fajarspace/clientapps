import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { GET_ALL_PENELITIAN } from "../../graphql/actions/penelitian.action";
import { GET_ALL_PENGABDIAN } from "../../graphql/actions/pengabdian.action";

// Define the type for Penelitian data
interface Penelitian {
  status: string;
  tahun_akademik: string;
}

// Define the type for Dosen data
interface DosenData {
  id: number;
  prodi: string;
  name: string;
}

const PenelitianChart: React.FC = () => {
  const {
    loading: loadingPenelitian,
    error: errorPenelitian,
    data: dataPenelitian,
  } = useQuery(GET_ALL_PENELITIAN);
  const {
    loading: loadingPengabdian,
    error: errorPengabdian,
    data: dataPengabdian,
  } = useQuery(GET_ALL_PENGABDIAN);

  const [dosenOptions, setDosenOptions] = useState<DosenData[]>([]);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_REACT_DOSEN_API}/api/dosen`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data structure:", data);
        if (Array.isArray(data.data)) {
          setDosenOptions((prev) => [...prev, ...data.data]);
        } else if (Array.isArray(data)) {
          setDosenOptions((prev) => [...prev, ...data]);
        } else if (data.data && Array.isArray(data.data.data)) {
          setDosenOptions((prev) => [...prev, ...data.data.data]);
        } else {
          console.error("Fetched data is not an array:", data);
          setDosenOptions([]); // or handle the error as needed
        }
      } catch (error) {
        console.error("Error fetching dosen data:", error);
        setDosenOptions([]); // or handle the error as needed
      }
    };

    fetchDosen();
  }, [dosenOptions]);

  if (loadingPenelitian || loadingPengabdian) return <p>Loading...</p>;
  if (errorPenelitian) return <p>Error: {errorPenelitian.message}</p>;
  if (errorPengabdian) return <p>Error: {errorPengabdian.message}</p>;

  // Group data by status and tahun_akademik
  const groupedByYearAndStatus: { [key: string]: { [key: string]: number } } =
    {};

  const processPenelitianPengabdian = (item: Penelitian) => {
    const tahun = item.tahun_akademik;
    const status = item.status;
    if (!groupedByYearAndStatus[tahun]) {
      groupedByYearAndStatus[tahun] = {
        Submitted: 0,
        Approved: 0,
        Rejected: 0,
      };
    }
    groupedByYearAndStatus[tahun][status] += 1;
  };

  dataPenelitian.getAllPenelitian.forEach(processPenelitianPengabdian);
  dataPengabdian.getAllPengabdian.forEach(processPenelitianPengabdian);

  console.log("Grouped data by year and status:", groupedByYearAndStatus);

  // Create chart data
  const chartData = Object.keys(groupedByYearAndStatus).map((year) => ({
    tahun: year,
    Submitted: groupedByYearAndStatus[year].Submitted || 0,
    Approved: groupedByYearAndStatus[year].Approved || 0,
    Rejected: groupedByYearAndStatus[year].Rejected || 0,
  }));

  console.log("Chart data:", chartData);

  // Define a color palette
  const colors = {
    Submitted: "#0070F0", // Biru
    Approved: "#22C55E", // Hijau
    Rejected: "#ff0000", // Merah
  };

  return (
    <div className="relative py-10 px-2 md:py-20 md:px-8">
      <div className="mx-auto text-center mb-5 md:mb-10">
        <h2 className="text-2xl md:text-3xl font-bold">
          Grafik Penelitian dan Pengabdian
        </h2>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="tahun" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Submitted" fill={colors.Submitted} />
          <Bar dataKey="Approved" fill={colors.Approved} />
          <Bar dataKey="Rejected" fill={colors.Rejected} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PenelitianChart;
