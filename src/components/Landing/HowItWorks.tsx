import React from "react";

const HowItWorks: React.FC = () => {
  return (
    <section className="bg-blue-800 text-white py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Bagaimana RisetFT Bekerja?</h2>
        <p className="mb-12 text-lg">
          RisetFT memiliki fitur-fitur yang mudah digunakan untuk membantu Anda
          mengatur dan mengontrol akun Anda secara online.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Ikon Usulan Proposal */}
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 2.01L5 2C3.9 2 3 2.9 3 4v16c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 18H5V4h14v16zM11 8h2v8h-2V8zm0-4h2v2h-2V4z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Usulan Proposal Penelitian dan Pengabdian kepada Masyarakat
            </h3>
            <p className="text-center">
              Dosen membuat Usulan Proposal Penelitian dan Pengabdian kepada
              Masyarakat untuk diajukan kepada Prodi
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Ikon Review Usulan Proposal */}
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 4v2h18V4H3zm2 4h14v14H5V8zm9 4H8v2h6v-2zm0 4H8v2h6v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Review Usulan Proposal
            </h3>
            <p className="text-center">
              Usulan Proposal Penelitian dan Pengabdian kepada Masyarakat
              menunggu untuk disetujui oleh Prodi
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4">
              {/* Ikon Laporan Pelaksanaan Kegiatan */}
              <svg
                className="w-12 h-12"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M3 4v2h18V4H3zm2 4h14v14H5V8zm9 4H8v2h6v-2zm0 4H8v2h6v-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Kirim Surat Rekomendasi Prodi
            </h3>
            <p className="text-center">
              Kirim Surat Rekomendasi Prodi Proposal Penelitian dan Pengabdian
              kepada Masyarakat yang telah disetujui
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
