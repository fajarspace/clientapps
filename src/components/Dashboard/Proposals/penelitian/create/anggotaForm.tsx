"use client";
import React, { useEffect, useState } from "react";
import { Input, Select, Switch, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { jafungOptions } from "./data";

const { Option } = Select;

interface AnggotaFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  anggotaKey: string;
}

interface DosenData {
  id: string;
  nama: string;
  nidn: string;
  prodi: string;
}

const AnggotaForm: React.FC<AnggotaFormProps> = ({
  formData,
  handleSelectChange,
  anggotaKey,
}) => {
  const [dosenOptions, setDosenOptions] = useState<DosenData[]>([]);
  const [manualInput, setManualInput] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchDosen = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.VITE_REACT_DOSEN_API}/api/dosen?page=${pageNum}`
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDosen(page);
  }, [page]);

  // Create keys for each field based on anggotaKey
  const namaKey = `${anggotaKey}`;
  const nidnKey = `nidn_${anggotaKey}`;
  const jafungKey = `jafung_${anggotaKey}`;
  const prodiKey = `prodi_${anggotaKey}`;

  const handleNamaChange = (value: string) => {
    const selectedDosen = dosenOptions.find((dosen) => dosen.nama === value);
    if (selectedDosen) {
      handleSelectChange(namaKey, selectedDosen.nama);
      handleSelectChange(nidnKey, selectedDosen.nidn);
      handleSelectChange(prodiKey, selectedDosen.prodi);
    }
  };

  const handleManualChange = (name: string, value: string) => {
    handleSelectChange(name, value);
  };

  const isDuplicateEntry = (field: keyof DosenData, value: string) => {
    return dosenOptions.some((dosen) => dosen[field] === value.trim());
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4">
      <p className="text-lg font-semibold">Anggota {anggotaKey}</p>
      <div className="flex items-center">
        <Switch
          checked={manualInput}
          onChange={(checked) => {
            setManualInput(checked);
            if (checked) {
              // Clear manual input fields when switching to manual mode
              handleSelectChange(namaKey, "");
              handleSelectChange(nidnKey, "");
              handleSelectChange(prodiKey, "");
            }
          }}
          checkedChildren=""
          unCheckedChildren=""
        />
        <Tooltip title="Aktifkan untuk memasukkan data secara manual jika tidak menemukan data yang sesuai">
          <QuestionCircleOutlined className="ml-2" />
        </Tooltip>
      </div>
      {!manualInput ? (
        <>
          <Select
            showSearch
            placeholder={`Pilih nama ${anggotaKey}`}
            size="large"
            value={formData[namaKey] || undefined}
            onChange={handleNamaChange}
            className="w-full custom-select"
            onPopupScroll={handleScroll}
            loading={loading}
          >
            {dosenOptions.map((option) => (
              <Option key={option.id} value={option.nama}>
                {option.nama}
              </Option>
            ))}
          </Select>
          <Input
            size="large"
            className="custom-input"
            placeholder={`NIDN ${anggotaKey}`}
            value={formData[nidnKey]}
            readOnly
            disabled
          />
          <Input
            size="large"
            placeholder={`Prodi ${anggotaKey}`}
            value={formData[prodiKey]}
            readOnly
            disabled
          />
        </>
      ) : (
        <>
          <Input
            size="large"
            placeholder="Nama"
            value={formData[namaKey]}
            onChange={(e) => handleManualChange(namaKey, e.target.value)}
            required
            className="w-full"
          />
          {isDuplicateEntry("nama", formData[namaKey]) && (
            <p style={{ color: "red" }}>Nama sudah ada di data dosen.</p>
          )}
          <Input
            size="large"
            placeholder="NIDN"
            value={formData[nidnKey]}
            onChange={(e) => handleManualChange(nidnKey, e.target.value)}
            required
            className="w-full"
          />
          {isDuplicateEntry("nidn", formData[nidnKey]) && (
            <p style={{ color: "red" }}>NIDN sudah ada di data dosen.</p>
          )}
          <Input
            size="large"
            placeholder="Prodi"
            value={formData[prodiKey]}
            onChange={(e) => handleManualChange(prodiKey, e.target.value)}
            required
            className="w-full"
          />
          {isDuplicateEntry("prodi", formData[prodiKey]) && (
            <p style={{ color: "red" }}>Prodi sudah ada di data dosen.</p>
          )}
        </>
      )}
      <Select
        placeholder="--Pilih jabatan fungsional--"
        size="large"
        value={formData[jafungKey] || undefined}
        onChange={(value) => handleSelectChange(jafungKey, value)}
        className="w-full custom-select"
      >
        {jafungOptions.map((option) => (
          <Option key={option.key} value={option.label}>
            {option.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default AnggotaForm;
