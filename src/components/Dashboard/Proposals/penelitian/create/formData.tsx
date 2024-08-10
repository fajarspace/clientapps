// components/CreatePenelitianForm.tsx
"use client";
import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useUser } from "../../../../hooks/useUser";
import { CREATE_PENELITIAN } from "../../../../../graphql/actions/penelitian.action";
import { useNavigate } from "react-router-dom";

interface FormData {
  judul_penelitian: string;
  tahun_akademik: string;
  ketua: string;
  nidn: string;
  jafung: string;
  prodi: string;
  semester: string;
  email: string;
  bidang: string;
  wa: string;
  anggota_1: string;
  nidn_anggota_1: string;
  jafung_anggota_1: string;
  prodi_anggota_1: string;
  anggota_2: string;
  nidn_anggota_2: string;
  jafung_anggota_2: string;
  prodi_anggota_2: string;
  anggota_3: string;
  nidn_anggota_3: string;
  jafung_anggota_3: string;
  prodi_anggota_3: string;
  anggota_4: string;
  nidn_anggota_4: string;
  jafung_anggota_4: string;
  prodi_anggota_4: string;
  userId: string;
}

const CreatePenelitianForm = () => {
  const Navigate = useNavigate();
  const { user, profile, loading: userLoading } = useUser();
  // const { profiles } = useAllUser();
  const [formData, setFormData] = useState<FormData>({
    judul_penelitian: "",
    tahun_akademik: new Date().getFullYear().toString(),
    ketua: "",
    nidn: "",
    jafung: "",
    prodi: "",
    semester: "", // Tambahkan properti semester
    email: "",
    bidang: "",
    wa: "",
    anggota_1: "",
    nidn_anggota_1: "",
    jafung_anggota_1: "",
    prodi_anggota_1: "",
    anggota_2: "",
    nidn_anggota_2: "",
    jafung_anggota_2: "",
    prodi_anggota_2: "",
    anggota_3: "",
    nidn_anggota_3: "",
    jafung_anggota_3: "",
    prodi_anggota_3: "",
    anggota_4: "",
    nidn_anggota_4: "",
    jafung_anggota_4: "",
    prodi_anggota_4: "",
    userId: "",
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (user && profile) {
      setFormData((prevData) => ({
        ...prevData,
        ketua: profile.nama,
        email: user.email,
        wa: String(user.phone_number),
        userId: user.id,
        nidn: profile.nidn,
        prodi: profile.prodi,
        jafung: profile.jafung,
      }));
    }
  }, []);

  const [createPenelitian, { loading, error }] = useMutation(CREATE_PENELITIAN);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPenelitian({
        variables: {
          createPenelitianInput: {
            judul_penelitian: formData.judul_penelitian,
            tahun_akademik: formData.tahun_akademik,
            semester: formData.semester,
            ketua: formData.ketua,
            nidn: formData.nidn,
            jafung: formData.jafung,
            prodi: formData.prodi,
            email: formData.email,
            wa: formData.wa,
            bidang: formData.bidang,
            anggota: {
              anggota_1: formData.anggota_1,
              nidn_anggota_1: formData.nidn_anggota_1,
              jafung_anggota_1: formData.jafung_anggota_1,
              prodi_anggota_1: formData.prodi_anggota_1,
              anggota_2: formData.anggota_2,
              nidn_anggota_2: formData.nidn_anggota_2,
              jafung_anggota_2: formData.jafung_anggota_2,
              prodi_anggota_2: formData.prodi_anggota_2,
              anggota_3: formData.anggota_3,
              nidn_anggota_3: formData.nidn_anggota_3,
              jafung_anggota_3: formData.jafung_anggota_3,
              prodi_anggota_3: formData.prodi_anggota_3,
              anggota_4: formData.anggota_4,
              nidn_anggota_4: formData.nidn_anggota_4,
              jafung_anggota_4: formData.jafung_anggota_4,
              prodi_anggota_4: formData.prodi_anggota_4,
            },
            userId: formData.userId,
          },
        },
      });
      toast.success("Penelitian added successfully!");
      Navigate("/dashboard/penelitian");
    } catch (error) {
      console.error("Error adding penelitian:", error);
      toast.error("Failed to add penelitian");
    }
  };

  const nextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  return {
    formData,
    loading,
    error,
    userLoading,
    handleChange,
    handleSelectChange,
    handleSubmit,
    nextStep,
    prevStep,
    currentStep,
  };
};

export default CreatePenelitianForm;
