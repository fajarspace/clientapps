import BlogImage1 from "/logo-fatek-2.png"; // Replace with actual paths
import BlogImage2 from "/logo-upb.png";
import BlogImage3 from "/logo-fatek.png";

const blogs = [
  {
    title: "Understanding Factory Automation",
    excerpt:
      "Discover the basics of factory automation and how it revolutionizes manufacturing processes.",
    image: BlogImage1,
    link: "/blogs/understanding-factory-automation",
  },
  {
    title: "The Future of Automation in Industry",
    excerpt:
      "Explore future trends in industrial automation and the technologies leading the way.",
    image: BlogImage2,
    link: "/blogs/future-of-automation",
  },
  {
    title: "Choosing the Right Automation Solutions",
    excerpt:
      "A comprehensive guide to selecting the right automation tools and systems for your needs.",
    image: BlogImage3,
    link: "/blogs/choosing-right-automation-solutions",
  },
];

const Berita = () => {
  return (
    <div className="container mx-auto">
      <div className="text-center p-10 mb-10">
        <h1 className="text-5xl font-bold text-black dark:text-white">
          Berita terbaru
        </h1>
        <p className="mt-4 text-gray-600">
          Berita terbaru terkait dengan aturan maupun informasi Penelitian dan
          Pengabdian kepada Masyarakat.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">
                {blog.title}
              </h2>
              <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              <a
                href={blog.link}
                className="text-secondary hover:text-secondary-light font-medium"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Berita;
