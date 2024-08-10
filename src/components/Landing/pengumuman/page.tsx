const announcements = [
  {
    id: 1,
    number: "Manual.245/E5/DT.05.00/2024",
    title:
      "Pengumuman Perpanjangan Penerimaan Proposal Program Kosabangsa Tahun Anggaran 2024",
    documentLink: "#",
    documentText: "Pengumuman Perpanjangan Penerimaan...",
    date: "Mon Jul 29 2024",
  },
  {
    id: 2,
    number: "Manual.237/E5/DT.05.00/2024",
    title:
      "Penandatanganan Kontrak Pelaksanaan Program Penelitian dan Pengabdian kepada Masyarakat Tahun Anggaran 2024",
    documentLink: "#",
    documentText: "Penandatanganan Kontrak Pelaksanaan...",
    date: "Sun Jul 28 2024",
  },
  {
    id: 3,
    number: "Manual.236/E5/DT.05.00/2024",
    title:
      "Pengumuman Penerima Pendanaan Program Bantuan Biaya Luaran Prototipe Tahun Anggaran 2024",
    documentLink: "#",
    documentText: "Pengumuman Penerima Pendanaan Pr...",
    date: "Sun Jul 28 2024",
  },
];

const Pengumuman = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center p-10 mb-10">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            Pengumuman
          </h1>
          <p className="mt-4 text-gray-600">
            Pengumuman terkait dengan aturan maupun informasi Penelitian dan
            Pengabdian kepada Masyarakat.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-white dark:bg-default-50 rounded-lg shadow-lg p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold dark:text-white mb-2">
                  {announcement.number}
                </h3>
                <p className="text-gray-500 mb-4">{announcement.title}</p>
                <p className="text-blue-600 underline">
                  <a href={announcement.documentLink}>
                    {announcement.documentText}
                  </a>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-500 text-sm">{announcement.date}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <button className="text-blue-600 underline">
            Lihat pengumuman lainnya...
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pengumuman;
