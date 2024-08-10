import React from "react";

const TestimonialLanding: React.FC = () => {
  return (
    <section id="testimonials" className="py-20">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold">Testimoni</h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Replace with dynamic data */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Pengalaman yang sangat berharga dan bermanfaat!"
            </p>
            <div className="mt-4 text-right">- Nama Testimoni</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Proyek ini sangat membantu masyarakat."
            </p>
            <div className="mt-4 text-right">- Nama Testimoni</div>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md">
            <p className="text-gray-700">
              "Saya belajar banyak dari penelitian ini."
            </p>
            <div className="mt-4 text-right">- Nama Testimoni</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialLanding;
