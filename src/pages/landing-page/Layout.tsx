import React from "react";
import Navbar from "../../components/Landing/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../../components/Landing/Footer";

const LayoutLanding: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutLanding;
