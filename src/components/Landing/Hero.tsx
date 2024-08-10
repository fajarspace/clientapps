import { Image } from "@nextui-org/react";

const HeroLanding = () => {
  return (
    <div
      className="text-black container dark:text-white py-32"
      // style={{
      //   backgroundImage: `url(${HeroImage})`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      //   backgroundAttachment: "fixed",
      //   height: "80vh",
      // }}
    >
      <div className="absolute left-0 right-0 bottom-0 top-0 z-0">
        <Image
          className="w-full h-full"
          src="https://nextui.org/gradients/docs-right.png"
          alt="gradient"
        />
      </div>
      {/* Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black opacity-80"></div> */}
      <div className="container relative mx-auto py-28 px-4">
        <h1 className="text-5xl lg:text-6xl mb-4">
          Selamat Datang di <br />
          <span className="font-bold text-blue-800">RisetFT</span>
        </h1>
        <p className="text-lg lg:text-xl mb-8">
          Basis Informasi Penelitian dan Pengabdian kepada Masyarakat.
        </p>
        <a
          href="/login"
          className="inline-block bg-blue-800 border-blue-800 border-2 text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-blue-800 hover:border-2 hover:border-blue-800 transition duration-300"
        >
          Ajukan Usulan
        </a>
      </div>
    </div>
  );
};

export default HeroLanding;
