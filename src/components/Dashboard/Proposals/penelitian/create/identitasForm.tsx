"use client";
import React from "react";
import { Select, Input } from "antd";
import { semesterOptions } from "./data";

const { Option } = Select;

interface IdentitasFormProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (name: string, value: string) => void;
  semesterKey: string;
}

const tahunAkademik = `${new Date().getFullYear()}`;

const IdentitasForm: React.FC<IdentitasFormProps> = ({
  formData,
  handleChange,
  handleSelectChange,
  semesterKey,
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="flex gap-4 lg:col-span-2">
        <Input
          size="large"
          type="text"
          name="tahun_akademik"
          placeholder="Tahun Akademik"
          value={tahunAkademik}
          onChange={handleChange}
          required
          disabled
          className="w-full"
        />
        <Select
          placeholder="--Pilih Semester--"
          size="large"
          value={formData.semester ? formData.semester : undefined}
          onChange={(value: any) => handleSelectChange(semesterKey, value)}
          className="w-full custom-select"
        >
          {semesterOptions.map((option) => (
            <Option key={option.key} value={option.label}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
      <p className="text-lg font-semibold">Identitas Ketua</p>
      <div className="flex gap-4 lg:col-span-2">
        <Input
          size="large"
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled
        />

        <Input
          size="large"
          type="text"
          name="wa"
          placeholder="Whatsapp"
          value={formData.wa}
          onChange={handleChange}
          required
          disabled
        />
      </div>
      <div className="flex gap-4 lg:col-span-2">
        <Input
          size="large"
          type="text"
          name="nama"
          placeholder="Nama"
          value={formData.ketua}
          onChange={handleChange}
          required
          disabled
        />

        <Input
          size="large"
          type="text"
          name="nidn_ketua"
          placeholder="NIDN"
          value={formData.nidn}
          onChange={handleChange}
          required
          disabled
        />

        <Input
          size="large"
          type="text"
          name="prodi_ketua"
          placeholder="Prodi"
          value={formData.prodi}
          onChange={handleChange}
          required
          disabled
        />
      </div>
    </div>
  );
};

export default IdentitasForm;
