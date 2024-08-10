import React, { useState } from "react";
import { Steps, Modal, Select } from "antd";
import CreatePenelitianForm from "./formData";
import AnggotaForm from "./anggotaForm";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import IdentitasForm from "./identitasForm";
import { Card, CardBody } from "@nextui-org/card";
import { useQuery } from "@apollo/client";
import { Spinner } from "@nextui-org/react";
import { IS_SUBMISSION_OPEN } from "../../../../../graphql/actions/settings.action";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import SubmissionClosed from "../../../settings/closed";
import { bidangOptions } from "./data";

const { Step } = Steps;
const { Option } = Select;

const CreatePenelitian: React.FC = () => {
  const {
    loading: settingsLoading,
    error: settingsError,
    data: settingsData,
  } = useQuery(IS_SUBMISSION_OPEN);
  const {
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
  } = CreatePenelitianForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleNext = () => {
    if (currentStep === 0) {
      if (!formData.semester) {
        setValidationError("Data jangan ada yang kosong!");
        return;
      }
    }

    if (currentStep === 2) {
      if (!formData.judul_penelitian || !formData.bidang) {
        setValidationError("Data jangan ada yang kosong!.");
        return;
      }
    }

    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    setValidationError("");
    nextStep();
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const steps = [
    {
      label: "Identitas Usulan",
      content: (
        <IdentitasForm
          formData={formData}
          handleSelectChange={handleSelectChange}
          handleChange={handleChange}
          key="ketua"
          semesterKey="semester"
        />
      ),
    },
    {
      label: "Anggota",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AnggotaForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            anggotaKey="anggota_1"
          />
          <AnggotaForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            anggotaKey="anggota_2"
          />
          <AnggotaForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            anggotaKey="anggota_3"
          />
          <AnggotaForm
            formData={formData}
            handleSelectChange={handleSelectChange}
            handleChange={handleChange}
            anggotaKey="anggota_4"
          />
        </div>
      ),
    },
    {
      label: "Judul Penelitian",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            size="lg"
            type="text"
            name="judul_penelitian"
            placeholder="Judul Penelitian"
            variant="bordered"
            value={formData.judul_penelitian}
            onChange={handleChange}
            required
          />
          <Select
            placeholder="--Pilih Bidang Penelitian--"
            size="large"
            value={formData.bidang ? formData.bidang : undefined}
            onChange={(value: any) => handleSelectChange("bidang", value)}
            className="w-full custom-select"
          >
            {bidangOptions.map((option) => (
              <Option key={option.key} value={option.label}>
                {option.label}
              </Option>
            ))}
          </Select>
        </div>
      ),
    },
    {
      label: "Review & Submit",
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Identitas Usulan:</h4>

            <p className="p-2 font-medium">
              Semester: <span className="font-normal">{formData.semester}</span>
            </p>
            <p className="p-2 font-medium">
              Tahun:{" "}
              <span className="font-normal">{formData.tahun_akademik}</span>
            </p>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="font-semibold p-2">Nama Ketua</th>
                  <th className="font-semibold p-2">NIDN</th>
                  <th className="font-semibold p-2">Prodi</th>
                  <th className="font-semibold p-2">Jafung</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2">{formData.ketua}</td>
                  <td className="p-2">{formData.nidn}</td>
                  <td className="p-2">{formData.prodi}</td>
                  <td className="p-2">{formData.jafung}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Anggota:</h4>
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="font-semibold p-2">Nama Anggota</th>
                  <th className="font-semibold p-2">NIDN</th>
                  <th className="font-semibold p-2">Jafung</th>
                  <th className="font-semibold p-2">Prodi</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="p-2">{formData.anggota_1}</td>
                  <td className="p-2">{formData.nidn_anggota_1}</td>
                  <td className="p-2">{formData.jafung_anggota_1}</td>
                  <td className="p-2">{formData.prodi_anggota_1}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">{formData.anggota_2}</td>
                  <td className="p-2">{formData.nidn_anggota_2}</td>
                  <td className="p-2">{formData.jafung_anggota_2}</td>
                  <td className="p-2">{formData.prodi_anggota_2}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">{formData.anggota_3}</td>
                  <td className="p-2">{formData.nidn_anggota_3}</td>
                  <td className="p-2">{formData.jafung_anggota_3}</td>
                  <td className="p-2">{formData.prodi_anggota_3}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="p-2">{formData.anggota_4}</td>
                  <td className="p-2">{formData.nidn_anggota_4}</td>
                  <td className="p-2">{formData.jafung_anggota_4}</td>
                  <td className="p-2">{formData.prodi_anggota_4}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Judul Penelitian & Bidang:</h4>
            <table className="w-full border border-gray-300">
              <tbody>
                <tr className="border-b border-gray-300">
                  <td className="font-semibold p-2">Judul Penelitian:</td>
                  <td className="p-2">{formData.judul_penelitian}</td>
                </tr>
                <tr className="border-b border-gray-300">
                  <td className="font-semibold p-2">Bidang Penelitian:</td>
                  <td className="p-2">{formData.bidang}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
  ];

  if (settingsLoading || userLoading) {
    return <div>Loading user data...</div>;
  }

  if (settingsError) {
    return <div>Error loading settings: {settingsError.message}</div>;
  }

  if (!settingsData.isSubmissionOpen) {
    return <SubmissionClosed />;
  }

  return (
    <div className="w-[95%] m-auto p-10 flex flex-col gap-4">
      <Card>
        <CardBody>
          <Steps current={currentStep} className="mt-4">
            {steps.map((step, index) => (
              <Step
                className="z-[2]"
                key={index}
                title={<span className="dark:text-white">{step.label}</span>}
              />
            ))}
          </Steps>

          <div className="mt-6">{steps[currentStep].content}</div>

          <form onSubmit={handleSubmit}>
            <div className="flex justify-between mt-4">
              {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
              {currentStep < steps.length - 1 && (
                <Button onClick={handleNext}>Next</Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button color="primary" type="submit" disabled={loading}>
                  {loading ? <Spinner color="white" size="sm" /> : "Submit"}
                </Button>
              )}
            </div>
          </form>
          {validationError && (
            <p className="text-red-500 mt-4">{validationError}</p>
          )}
          {error && <p>Error occurred: {error.message}</p>}
        </CardBody>
      </Card>

      <Modal
        title={
          <span>
            <ExclamationCircleOutlined className="mr-2" />
            Confirmation
          </span>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Next"
        cancelText="Wait"
      >
        <p>Are you sure you want to proceed to the next step?</p>
      </Modal>
    </div>
  );
};

export default CreatePenelitian;
