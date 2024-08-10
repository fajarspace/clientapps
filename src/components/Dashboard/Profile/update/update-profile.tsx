import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { toast, ToastContainer } from "react-toastify";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { useUser } from "../../../hooks/useUser";
import { UPDATE_PROFILE } from "../../../../graphql/actions/profile.action";
import { useNavigate } from "react-router-dom";
import { Select, Input, Switch, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { jafungOptions } from "../../Proposals/penelitian/create/data";

const { Option } = Select;

// Define the DosenOption type based on the expected structure of the data
interface DosenOption {
  id: string;
  nama: string;
  nidn: string;
  prodi: string;
}

const UpdateProfile: React.FC = () => {
  const { profile, loading: userLoading } = useUser();
  const navigate = useNavigate();
  const id = profile?.id;

  const [updateProfile, { loading: updating }] = useMutation(UPDATE_PROFILE);

  const [nidn, setNidn] = useState(profile?.nidn || "");
  const [jafung, setJafung] = useState(profile?.jafung || "");
  const [prodi, setProdi] = useState(profile?.prodi || "");
  const [nama, setNama] = useState(profile?.nama || "");

  const [dosenOptions, setDosenOptions] = useState<DosenOption[]>([]);
  const [manualInput, setManualInput] = useState(false);

  useEffect(() => {
    if (profile) {
      setNidn(profile.nidn);
      setJafung(profile.jafung);
      setProdi(profile.prodi);
      setNama(profile.nama);
    }
  }, [profile]);

  useEffect(() => {
    const fetchDosen = async () => {
      try {
        const response = await fetch(
          process.env.VITE_REACT_DOSEN_API + "/api/dosen"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data structure:", data);
        if (Array.isArray(data.data)) {
          setDosenOptions(data.data);
        } else if (Array.isArray(data)) {
          setDosenOptions(data);
        } else if (data.data && Array.isArray(data.data.data)) {
          setDosenOptions(data.data.data);
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

  const handleDosenSelect = (value: string) => {
    const selectedDosen = dosenOptions.find((dosen) => dosen.nama === value);
    if (selectedDosen) {
      setNama(selectedDosen.nama);
      setNidn(selectedDosen.nidn);
      setProdi(selectedDosen.prodi);
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "jafung") {
      setJafung(value);
    }
  };

  const isDuplicateEntry = () => {
    return dosenOptions.some(
      (dosen) =>
        dosen.nama === nama.trim() ||
        dosen.nidn === nidn.trim() ||
        dosen.prodi === prodi.trim()
    );
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (manualInput && isDuplicateEntry()) {
      toast.error("Data yang dimasukkan sudah ada. Mohon periksa kembali.");
      return;
    }

    const input = {
      id: id as string,
      updateProfileInput: {
        nidn: nidn.trim(),
        jafung,
        prodi: prodi.trim(),
        nama: nama.trim(),
      },
    };
    try {
      await updateProfile({
        variables: input,
      });
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      toast.error("Failed to update profile: " + error.message);
    }
  };

  if (userLoading) return <Spinner size="lg" color="primary" />;

  return (
    <div className="flex justify-center py-10">
      <ToastContainer />
      <Card className="w-full max-w-lg shadow-md rounded-lg">
        <CardBody>
          <h2 className="text-xl font-semibold mb-4">
            {nidn ? "Edit Profile" : "Lengkapi Profil Anda"}
          </h2>
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-semibold flex items-center">
                  Nama
                  <Tooltip title="Data tidak ditemukan? Ketik manual">
                    <QuestionCircleOutlined className="ml-2" />
                  </Tooltip>
                </label>
                <Switch
                  checked={manualInput}
                  onChange={(checked) => {
                    setManualInput(checked);
                    if (checked) {
                      setNama("");
                      setNidn("");
                      setProdi("");
                    }
                  }}
                />
              </div>
              {!manualInput ? (
                <Select
                  showSearch
                  placeholder="Siapa anda?"
                  size="large"
                  value={nama || undefined}
                  onChange={handleDosenSelect}
                  className="w-full"
                >
                  {dosenOptions.map((option) => (
                    <Option key={option.id} value={option.nama}>
                      {option.nama}
                    </Option>
                  ))}
                </Select>
              ) : (
                <Input
                  size="large"
                  type="text"
                  placeholder="Masukkan Nama + Gelar"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                  className="w-full"
                />
              )}
              <br />
              <br />
              <label className="font-semibold">NIDN/NIDK</label>
              <Input
                size="large"
                type="text"
                name="nidn"
                placeholder="NIDN/NIDK"
                value={nidn}
                onChange={(e) => setNidn(e.target.value)}
                required
                className="w-full"
                disabled={!manualInput}
              />
              <br />
              <br />
              <label className="font-semibold">Jabatan Fungsional</label>

              <Select
                placeholder="--Pilih Jabatan Fungsional--"
                size="large"
                value={jafung || undefined}
                onChange={(value) => handleSelectChange("jafung", value)}
                className="w-full"
              >
                {jafungOptions.map((option) => (
                  <Option key={option.key} value={option.label}>
                    {option.label}
                  </Option>
                ))}
              </Select>
              <br />
              <br />
              <label className="font-semibold">Prodi</label>
              <Input
                size="large"
                type="text"
                name="prodi"
                placeholder="Prodi"
                value={prodi}
                onChange={(e) => setProdi(e.target.value)}
                required
                className="w-full"
                disabled={!manualInput}
              />
            </div>

            <div className="flex justify-end mt-6">
              <Button
                type="submit"
                color="primary"
                disabled={updating}
                className="w-full"
              >
                {updating ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Update Profile"
                )}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateProfile;
