import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import {
  GET_PENGABDIAN_BY_ID,
  APPROVE_PENGABDIAN,
  REJECT_PENGABDIAN,
} from "../../../../graphql/actions/pengabdian.action";
import { Typography, Space, Table, Button, Modal, Input } from "antd";
import { toast, ToastContainer } from "react-toastify";
import { useUser } from "../../../hooks/useUser";
import withDashboardLayout from "../../../hoc/withDashboardLayout";

const { Title, Text } = Typography;

const DetailPengabdian = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { loading: userLoading, user } = useUser();
  const { loading, error, data } = useQuery(GET_PENGABDIAN_BY_ID, {
    variables: { id },
  });
  const [approvePengabdian] = useMutation(APPROVE_PENGABDIAN);
  const [rejectPengabdian] = useMutation(REJECT_PENGABDIAN);
  const [modalVisible, setModalVisible] = useState(false);
  const [no, setDocNumber] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    if (data) {
      setStatus(data.getPengabdianById.status);
    }
  }, [data]);

  if (loading || userLoading) return <>Loading...</>;
  if (error) return <p>Error: {error.message}</p>;

  const {
    judul_pengabdian,
    bidang,
    tahun_akademik,
    semester,
    ketua,
    nidn,
    prodi,
    jafung,
    anggota,
  } = data.getPengabdianById;

  const anggotaDetails = anggota && anggota[0];

  const anggotaDosen = [
    {
      key: "anggota1", // Unique key for each item
      nidn: anggotaDetails?.nidn_anggota_1,
      ketua: anggotaDetails?.anggota_1,
      prodi: anggotaDetails?.prodi_anggota_1,
      jafung: anggotaDetails?.jafung_anggota_1,
    },
    {
      key: "anggota2",
      nidn: anggotaDetails?.nidn_anggota_2,
      ketua: anggotaDetails?.anggota_2,
      prodi: anggotaDetails?.prodi_anggota_2,
      jafung: anggotaDetails?.jafung_anggota_2,
    },
    {
      key: "anggota3",
      nidn: anggotaDetails?.nidn_anggota_3,
      ketua: anggotaDetails?.anggota_3,
      prodi: anggotaDetails?.prodi_anggota_3,
      jafung: anggotaDetails?.jafung_anggota_3,
    },
    {
      key: "anggota4",
      nidn: anggotaDetails?.nidn_anggota_4,
      ketua: anggotaDetails?.anggota_4,
      prodi: anggotaDetails?.prodi_anggota_4,
      jafung: anggotaDetails?.jafung_anggota_4,
    },
  ];

  const columnsKetua = [
    { title: "NIDN", dataIndex: "nidn", key: "nidn" },
    { title: "Nama", dataIndex: "ketua", key: "ketua" },
    { title: "Institusi", dataIndex: "institusi", key: "institusi" },
    { title: "Prodi", dataIndex: "prodi", key: "prodi" },
    { title: "Jabatan fungsional", dataIndex: "jafung", key: "jafung" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text: string) => (
        <span
          style={{
            color:
              text === "Approved"
                ? "green"
                : text === "Rejected"
                ? "red"
                : "blue",
          }}
        >
          {text}
        </span>
      ),
    },
  ];

  const dataKetua = [
    {
      key: "ketua1", // Unique key for each item
      nidn,
      ketua,
      institusi: "Universitas Pelita Bangsa",
      prodi,
      jafung,
      status,
    },
  ];

  const columnsAnggota = [
    { title: "NIDN", dataIndex: "nidn", key: "nidn" },
    { title: "Nama", dataIndex: "ketua", key: "ketua" },
    { title: "Prodi", dataIndex: "prodi", key: "prodi" },
    { title: "Jabatan Fungsional", dataIndex: "jafung", key: "jafung" },
  ];

  const confirmApprove = () => {
    Modal.confirm({
      title: "Konfirmasi Persetujuan",
      content: "Apakah Anda yakin ingin menyetujui pengabdian ini?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk: handleApprove,
    });
  };

  const confirmReject = () => {
    Modal.confirm({
      title: "Konfirmasi Penolakan",
      content: "Apakah Anda yakin ingin menolak pengabdian ini?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk: handleReject,
    });
  };

  const handleApprove = async () => {
    try {
      await approvePengabdian({
        variables: { id },
        refetchQueries: [{ query: GET_PENGABDIAN_BY_ID, variables: { id } }],
      });
      toast.success("Pengabdian disetujui");
      setStatus("Approved");
    } catch (error) {
      toast.error("Gagal menyetujui pengabdian");
    }
  };

  const handleReject = async () => {
    try {
      await rejectPengabdian({
        variables: { id },
        refetchQueries: [{ query: GET_PENGABDIAN_BY_ID, variables: { id } }],
      });
      toast.success("Pengabdian ditolak");
      setStatus("Rejected");
    } catch (error) {
      toast.error("Gagal menolak pengabdian");
    }
  };

  const handleSendLetter = () => {
    setModalVisible(true);
  };

  const handleModalOk = () => {
    if (no.trim() === "") {
      toast.error("Nomor surat tidak boleh kosong");
      return;
    }
    navigate(`/surat-rekomendasi-pengabdian/${id}?no=${no}`);
    setModalVisible(false);
  };

  const handleModalCancel = () => {
    setModalVisible(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <ToastContainer />
      <div className="card bg-white dark:bg-default-50 rounded-lg shadow-md p-6">
        <Space className="flex justify-between items-center mb-6">
          <Title className="dark:text-white" level={2}>
            Usulan Pengabdian
          </Title>
          <div className="mt-8 flex gap-4">
            {user?.role === "Prodi" && status === "Submitted" && (
              <>
                <Button type="primary" onClick={confirmApprove}>
                  Setuju
                </Button>
                <Button type="default" onClick={confirmReject}>
                  Tolak
                </Button>
              </>
            )}
            {user?.role === "Prodi" && status === "Approved" && (
              <Button type="link" onClick={handleSendLetter}>
                Kirim Surat Rekomendasi
              </Button>
            )}
            {user?.role === "Prodi" && status === "Rejected" && (
              <Text type="danger">Usulan Ditolak</Text>
            )}
          </div>
        </Space>
        <Space direction="vertical" className="w-full mb-8">
          <Text className="dark:text-white" strong>
            Judul: {judul_pengabdian}
          </Text>
          <Text className="dark:text-white" strong>
            Bidang Fokus: {bidang}
          </Text>
          <Text className="dark:text-white" strong>
            Semester: {semester}
          </Text>
          <Text className="dark:text-white" strong>
            Tahun Pelaksanaan: {tahun_akademik}
          </Text>
        </Space>
        <div className="mt-8">
          <Title level={3} className="dark:text-white mb-4">
            Identitas Ketua
          </Title>
          <div className="overflow-x-auto">
            <Table
              columns={columnsKetua}
              dataSource={dataKetua}
              pagination={false}
            />
          </div>
          <Title level={3} className="dark:text-white mt-8 mb-4">
            Identitas Anggota
          </Title>
          <div className="overflow-x-auto">
            <Table
              columns={columnsAnggota}
              dataSource={anggotaDosen}
              pagination={false}
            />
          </div>
        </div>
      </div>
      <Modal
        title="Masukkan Nomor Surat"
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Generate"
        cancelText="Batal"
      >
        <Input
          placeholder="Masukkan Nomor Surat"
          value={no}
          onChange={(e) => setDocNumber(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default withDashboardLayout(DetailPengabdian);
