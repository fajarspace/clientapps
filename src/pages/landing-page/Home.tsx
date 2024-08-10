import React from "react";
import HeroLanding from "../../components/Landing/Hero";
// import AboutLanding from "../../components/Landing/About";
import PenelitianChart from "../../components/Landing/PenelitianChart";
import HowItWorks from "../../components/Landing/HowItWorks";
// import Berita from "../../components/Landing/berita/page";
// import Pengumuman from "../../components/Landing/pengumuman/page";
import Features from "../../components/Landing/features/page";
import PenelitianChartPie from "../../components/Landing/PenelitianChartPie";

const HomeLanding: React.FC = () => {
  return (
    <div>
      <HeroLanding />
      {/* <AboutLanding /> */}
      {/* <Berita />
      <Pengumuman /> */}
      <PenelitianChart />
      <PenelitianChartPie />
      <HowItWorks />
      <Features />
    </div>
  );
};

export default HomeLanding;
