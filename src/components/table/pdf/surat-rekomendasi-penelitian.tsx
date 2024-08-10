import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import { useQuery } from "@apollo/client";
import jsPDF from "jspdf";
import { GET_PENELITIAN_BY_ID } from "../../../graphql/actions/penelitian.action";
import "jspdf-autotable";
import { useUser } from "../../hooks/useUser";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const SuratRekomendasiPenelitian: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const Navigate = useNavigate();
  const { data, loading, error } = useQuery(GET_PENELITIAN_BY_ID, {
    variables: { id },
  });
  const { profile, user } = useUser();
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [documentNumber, setDocumentNumber] = useState<string>("");

  useEffect(() => {
    if (data && data.getPenelitianById && profile && user) {
      if (data.getPenelitianById.status === "Approved") {
        const no = new URLSearchParams(window.location.search).get("no");
        if (no) {
          setDocumentNumber(no);
          generatePDF(no);
        } else {
          const userDocNumber = window.prompt("Masukkan nomor surat:");
          if (userDocNumber) {
            setDocumentNumber(userDocNumber);
            generatePDF(userDocNumber);
          }
        }
      } else {
        toast.error("Only approved Penelitian can generate PDF.");
        Navigate("/"); // Redirect to home or another appropriate page
      }
    }
  }, [data, profile, user, Navigate]);

  const generatePDF = (no: string) => {
    if (!data || !data.getPenelitianById || !profile) return;

    const doc = new jsPDF("p", "mm", "a4");
    const penelitian = data.getPenelitianById;
    const anggota = penelitian.anggota && penelitian.anggota[0];

    const anggotaDetails = [
      {
        susunan: "Ketua Peneliti",
        nama: penelitian.ketua,
        nidn: penelitian.nidn,
        jafung: penelitian.jafung,
      },
      {
        susunan: "Anggota I",
        nama: anggota.anggota_1,
        nidn: anggota.nidn_anggota_1,
        jafung: anggota.jafung_anggota_1,
      },
      {
        susunan: "Anggota II",
        nama: anggota.anggota_2,
        nidn: anggota.nidn_anggota_2,
        jafung: anggota.jafung_anggota_2,
      },
      {
        susunan: "Anggota III",
        nama: anggota.anggota_3,
        nidn: anggota.nidn_anggota_3,
        jafung: anggota.jafung_anggota_3,
      },
      {
        susunan: "Anggota IV",
        nama: anggota.anggota_4,
        nidn: anggota.nidn_anggota_4,
        jafung: anggota.jafung_anggota_4,
      },
    ];

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const nextYear = currentYear + 1;
    const academicYear =
      currentMonth >= 6
        ? `${currentYear}/${nextYear}`
        : `${currentYear - 1}/${currentYear}`;

    const currentMonthName = currentDate.toLocaleString("id-ID", {
      month: "long",
    }); // Nama bulan dalam bahasa Indonesia
    const currentDay = currentDate.getDate();

    const img = new Image();
    img.src = "/template/surat-rekomendasi-penelitian.png";

    img.onload = () => {
      doc.addImage(img, "PNG", 0, 0, 210, 297);
      doc.setFont("times", "normal");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(no, 47, 54.4);
      doc.text("Tahun Akademik", 95, 116.6);
      doc.text(penelitian.semester, 78.7, 116.6);
      doc.text(academicYear, 126.2, 116.6);
      doc.text(", dengan rincian sebagai", 144, 116.6);
      doc.text("berikut:", 25.2, 121.9);

      (doc as any).autoTable({
        startY: 135,
        margin: { top: 10, left: 30.2, right: 10 },
        head: [["Susunan Anggota", "Nama", "NIDN", "JAFUNG"]],
        body: anggotaDetails.map((anggota) => [
          anggota.susunan,
          anggota.nama || "",
          anggota.nidn || "",
          anggota.jafung || "",
        ]),
        theme: "plain",
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 60 },
          2: { cellWidth: 25 },
          3: { cellWidth: 40 },
        },
        styles: {
          font: "times",
          lineColor: [0, 0, 0],
          lineWidth: 0.2,
          fontSize: 10,
          cellPadding: 0.7,
        },
        headStyles: {
          fillColor: [255, 255, 255],
          textColor: [0, 0, 0],
          lineColor: [0, 0, 0],
          halign: "center",
        },
        alternateRowStyles: { fillColor: [255, 255, 255] },
      });

      doc.text(`${penelitian.judul_penelitian}`, 30.5, 183);
      doc.text(
        `Bekasi, ${currentDay} ${currentMonthName} ${currentYear}`,
        25.2,
        210
      );

      const pdfBlob = doc.output("blob");
      const pdfBlobUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfBlobUrl);
    };
  };

  const sendWhatsAppMessage = async () => {
    try {
      if (pdfUrl) {
        const { judul_penelitian, ketua } = data.getPenelitianById;
        const message =
          `*Surat Rekomendasi Penelitian*\n\n` +
          `Judul Penelitian: *${judul_penelitian}*\n` +
          `Ketua Peneliti: *${ketua}*\n\n` +
          `Silakan unduh surat rekomendasi melalui tautan berikut:\n` +
          `${window.location.origin}/surat-rekomendasi-penelitian/${id}?no=${documentNumber}\n\n` +
          `Terima kasih.`;
        await axios.post(
          "https://api.fonnte.com/send",
          {
            target: data.getPenelitianById.wa,
            message: message,
          },
          {
            headers: {
              Authorization: process.env.FONNTE_API_TOKEN,
            },
          }
        );
        toast.success("PDF link sent via WhatsApp!");
      }
    } catch (error) {
      console.error("Error sending WhatsApp message:", error);
      toast.error("Failed to send WhatsApp message");
    }
  };

  if (loading) return <Spinner size="lg" color="primary" />;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="flex flex-col md:flex-row items-center justify-start h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
      />
      {data?.getPenelitianById?.status !== "Approved" ? (
        <p>Only approved Penelitian can be viewed and downloaded as a PDF.</p>
      ) : (
        <>
          {pdfUrl && (
            <div className="flex flex-col md:flex-row w-full items-center space-y-6 md:space-y-0 md:space-x-6">
              <iframe
                src={pdfUrl}
                className="h-screen w-screen border-none"
              ></iframe>

              <div className="flex flex-col space-y-4 px-20 py-20">
                <a
                  href={pdfUrl}
                  download={`Surat_Rekomendasi_${data.getPenelitianById.judul_penelitian}.pdf`}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white rounded-md text-center"
                >
                  Download
                </a>
                {user.role === "Prodi" && (
                  <button
                    onClick={sendWhatsAppMessage}
                    className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg transition"
                  >
                    Kirim ke Pengusul
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SuratRekomendasiPenelitian;
