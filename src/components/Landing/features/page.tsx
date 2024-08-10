import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faClock,
  faShieldAlt,
  faCogs,
  faMobileAlt,
  faBook,
} from "@fortawesome/free-solid-svg-icons";
import Mbp from "/feature/merge.png";

const features = [
  {
    icon: faCheckCircle,
    title: "Berfungsi Penuh",
    description:
      "Mendukung penuh untuk membuat usulan penelitian maupun pengabdian.",
    link: "#",
    color: "text-blue-500",
  },
  {
    icon: faClock,
    title: "Cepat & Mudah",
    description: "Proses cepat dan mudah digunakan.",
    link: "#",
    color: "text-purple-500",
  },
  {
    icon: faShieldAlt,
    title: "Data Aman",
    description: "Data yang aman dan kredibilitas terjamin.",
    link: "#",
    color: "text-green-500",
  },
  {
    icon: faCogs,
    title: "Konfigurable",
    description: "Mudah untuk mengatur usulan penelitian dan pengabdian.",
    link: "#",
    color: "text-orange-500",
  },
  {
    icon: faMobileAlt,
    title: "Desain Responsif",
    description: "Desain yang responsif dan mudah digunakan.",
    link: "#",
    color: "text-green-500",
  },
  {
    icon: faBook,
    title: "Dokumentasi Bantuan",
    description: "Dokumentasi yang lengkap dan mudah dibaca.",
    link: "#",
    color: "text-gray-500",
  },
];

const Feature = () => {
  const leftFeatures = features.slice(0, 3);
  const rightFeatures = features.slice(3);

  return (
    <div className="min-h-screen py-48 flex items-center justify-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col space-y-8">
          {leftFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`text-2xl ${feature.color}`}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 mb-2">{feature.description}</p>
                {/* <a
                  href={feature.link}
                  className="text-blue-400 hover:underline"
                >
                  Learn more &rarr;
                </a> */}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full md:w-1/3 mb-8 md:mb-0 flex justify-center">
          <img
            src={Mbp} // Replace with the actual image path
            alt="Team working"
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/3 mb-8 md:mb-0 flex flex-col space-y-8">
          {rightFeatures.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className={`text-2xl ${feature.color}`}>
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400 mb-2">{feature.description}</p>
                {/* <a
                  href={feature.link}
                  className="text-blue-400 hover:underline"
                >
                  Learn more &rarr;
                </a> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;
