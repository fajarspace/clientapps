import React from "react";

const HeaderLanding: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">Penelitian & Pengabdian</div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#about" className="hover:text-gray-300">
                Tentang Kami
              </a>
            </li>
            <li>
              <a href="#projects" className="hover:text-gray-300">
                Penelitian
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-gray-300">
                Testimoni
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300">
                Kontak
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default HeaderLanding;
