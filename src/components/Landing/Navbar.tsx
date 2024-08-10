import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "/logo-fatek.png";

const Navbar = () => {
  const location = useLocation();
  const activeClass = "text-blue-800 font-bold"; // Define the active class
  const [isOpen, setIsOpen] = useState(false); // State to handle sidebar toggle
  const [scrolled, setScrolled] = useState(false); // State to handle scroll

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // const isHomePage = location.pathname.startsWith("/");

  return (
    <nav
      className={`fixed w-full z-[99] transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white border-b-blue-800 border-b-3 dark:bg-default-50 shadow-md py-2"
          : "bg-transparent text-black dark:text-white py-4"
      }`}
    >
      {/* <nav
      className={`fixed w-full z-[99] transition-all duration-300 ease-in-out ${
        isHomePage
          ? scrolled
            ? " dark:bg-black dark:text-white shadow-md py-2"
            : "bg-white dark:bg-transparent dark:bg-default-50 dark:text-white py-4"
          : scrolled
          ? " shadow-md py-2"
          : "dark:bg-black dark:text-white py-4"
      }`}
    > */}
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          <img
            src={Logo}
            width={scrolled ? 150 : 250}
            alt="logo-scs"
            className="transition-all duration-300 ease-in-out"
          />
        </Link>
        <div className="block md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div className="hidden md:flex md:items-center md:space-x-6">
          <Link
            to="/panduan"
            className={`mx-2 ${
              location.pathname === "/panduan" ? activeClass : ""
            }`}
          >
            Panduan
          </Link>
          <Link
            to="/penelitian"
            className={`mx-2 ${
              location.pathname === "/penelitian" ? activeClass : ""
            }`}
          >
            Penelitian
          </Link>
          <Link
            to="/pengabdian"
            className={`mx-2 ${
              location.pathname === "/pengabdian" ? activeClass : ""
            }`}
          >
            Pengabdian
          </Link>
          {/* <Link
            to="/berita"
            className={`mx-2 ${
              location.pathname === "/portfolio" ? activeClass : ""
            }`}
          >
            Berita
          </Link> */}
          {/* <Link
            to="/pengumuman"
            className={`mx-2 ${
              location.pathname === "/blogs" ? activeClass : ""
            }`}
          >
            Pengumuman
          </Link> */}
          <Link
            to="/login"
            className="button rounded-md bg-blue-800 hover:bg-blue-700 text-white p-2 pr-5 pl-5"
          >
            Login
          </Link>
        </div>
      </div>
      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white dark:bg-default-50 shadow-lg z-20 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end items-center p-4">
          <button
            onClick={toggleMenu}
            className="text-black dark:text-white focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-start p-4 space-y-4">
          <Link
            to="/panduan"
            className={`w-full ${
              location.pathname === "/panduan" ? activeClass : ""
            }`}
            onClick={toggleMenu}
          >
            panduan
          </Link>
          <Link
            to="/penelitian"
            className={`w-full ${
              location.pathname === "/penelitian" ? activeClass : ""
            }`}
            onClick={toggleMenu}
          >
            Penelitian
          </Link>
          <Link
            to="/pengabdian"
            className={`w-full ${
              location.pathname === "/pengabdian" ? activeClass : ""
            }`}
            onClick={toggleMenu}
          >
            Pengabdian
          </Link>
          {/* <Link
            to="/berita"
            className={`w-full ${
              location.pathname === "/berita" ? activeClass : ""
            }`}
            onClick={toggleMenu}
          >
            Berita
          </Link>
          <Link
            to="/pengumuman"
            className={`w-full ${
              location.pathname === "/pengumuman" ? activeClass : ""
            }`}
            onClick={toggleMenu}
          >
            Pengumuman
          </Link> */}
          <Link
            to="/login"
            className="w-full rounded-md bg-blue-800 hover:bg-blue-700 text-white p-2 text-center"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;
