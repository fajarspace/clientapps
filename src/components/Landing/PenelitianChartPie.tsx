import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
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

// Define the type for the chart data
interface ChartData {
  name: string;
  value: number;
  type: "Penelitian" | "Pengabdian";
}

const PenelitianChartPie: React.FC = () => {
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
  }, []);

  if (loadingPenelitian || loadingPengabdian) return <p>Loading...</p>;
  if (errorPenelitian) return <p>Error: {errorPenelitian.message}</p>;
  if (errorPengabdian) return <p>Error: {errorPengabdian.message}</p>;

  // Filter data for "Approved" status
  const approvedPenelitian = dataPenelitian.getAllPenelitian.filter(
    (penelitian: Penelitian) => penelitian.status === "Approved"
  );

  const approvedPengabdian = dataPengabdian.getAllPengabdian.filter(
    (pengabdian: Penelitian) => pengabdian.status === "Approved"
  );

  // Group data by tahun_akademik
  const groupedByYear: {
    [key: string]: { penelitian: number; pengabdian: number };
  } = {};

  approvedPenelitian.forEach((item: Penelitian) => {
    const tahun = item.tahun_akademik;
    if (!groupedByYear[tahun]) {
      groupedByYear[tahun] = { penelitian: 0, pengabdian: 0 };
    }
    groupedByYear[tahun].penelitian += 1;
  });

  approvedPengabdian.forEach((item: Penelitian) => {
    const tahun = item.tahun_akademik;
    if (!groupedByYear[tahun]) {
      groupedByYear[tahun] = { penelitian: 0, pengabdian: 0 };
    }
    groupedByYear[tahun].pengabdian += 1;
  });

  // Create chart data
  const chartData: ChartData[] = Object.keys(groupedByYear).flatMap((year) => [
    {
      name: `${year} Penelitian`,
      value: groupedByYear[year].penelitian,
      type: "Penelitian",
    },
    {
      name: `${year} Pengabdian`,
      value: groupedByYear[year].pengabdian,
      type: "Pengabdian",
    },
  ]);

  // Group Dosen data by prodi
  const groupedByProdi: { [key: string]: number } = {};
  dosenOptions.forEach((dosen) => {
    if (!groupedByProdi[dosen.prodi]) {
      groupedByProdi[dosen.prodi] = 0;
    }
    groupedByProdi[dosen.prodi] += 1;
  });

  // Create chart data for Dosen
  const dosenChartData = Object.keys(groupedByProdi).map((prodi) => ({
    name: prodi,
    value: groupedByProdi[prodi],
  }));
  console.log("Dosen chart data:", dosenChartData);

  // Define a color palette
  const colors = {
    Penelitian: "#0070F0",
    Pengabdian: "#ffc658",
  };

  // Custom label renderer
  const renderCustomLabel = ({ type }: { type: string }) => {
    return type;
  };

  return (
    <div className="container relative py-10 px-2 md:py-20 md:px-8 flex flex-col md:flex-row">
      <div className="w-full md:w-2/3">
        {/* <div className="mx-auto text-center mb-5 md:mb-10">
          <h2 className="text-2xl md:text-3xl font-bold">Grafik terbaru</h2>
        </div> */}
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={renderCustomLabel}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[entry.type]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="w-full md:w-1/3 md:pl-10 items-center content-center">
        {/* <h2 className="text-xl md:text-2xl font-bold mb-4">Deskripsi</h2> */}
        <p className="text-2xl">
          Grafik ini menunjukkan jumlah penelitian (biru) dan pengabdian
          (kuning) yang disetujui per tahun akademik.
        </p>
      </div>
    </div>
  );
};

export default PenelitianChartPie;
