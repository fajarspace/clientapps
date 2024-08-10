import React from "react";

const GuidePage: React.FC = () => {
  return (
    <div className="min-h-screen py-32">
      <div className="max-w-5xl mx-auto bg-default-50 dark:bg-default-50 p-8 shadow-lg rounded-lg">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 dark:text-white mb-6">
          Panduan Pengusulan
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Panduan Teknis Usulan Penelitian dan Pengabdian kepada Masyarakat
        </p>

        {/* <div className="mb-8">
          <div className="relative pb-9/16">
            <iframe
              // width="740"
              // height="416"
              className="mx-auto"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ></iframe>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default GuidePage;
