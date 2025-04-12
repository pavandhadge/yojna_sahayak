import {
  GraduationCap,
  Heart,
  Users,
  Briefcase,
  Home,
  Sprout,
  Book,
  Truck,
  Sun,
  Wifi,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ icon: Icon, title, description, color }) => (
  <div
    className={`
      bg-white p-6 rounded-xl
      border border-gray-200 hover:border-transparent
      cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)]
      group hover:shadow-lg
      flex flex-col h-full
      relative overflow-hidden
      hover:bg-gradient-to-b from-white to-${color.bg}/5
    `}
    style={{
      "--tw-gradient-to": `var(--${color.text.replace("text-", "")}-50)`,
    }}
  >
    {/* Colored overlay on hover */}
    <div
      className="absolute inset-0 bg-current opacity-0 group-hover:opacity-5 transition-opacity duration-300"
      style={{ color: color.text.replace("text-", "") }}
    ></div>

    {/* Hover effect line */}
    <div
      className="absolute bottom-0 left-0 right-0 h-[3px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
      style={{ color: color.text }}
    ></div>

    <div className="mb-5 relative z-10">
      <div
        className={`w-12 h-12 rounded-lg ${color.bg}/10 group-hover:${color.bg}/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110`}
      >
        <Icon
          size={42}
          className={`${color.text} opacity-90 group-hover:opacity-100 transition-opacity`}
        />
      </div>
    </div>

    <div className="relative z-10">
      <h3 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 text-lg group-hover:text-gray-700 transition-colors">
        {description}
      </p>
    </div>

    <div className="mt-auto pt-4 relative z-10">
      <div className="flex justify-end">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          className="text-gray-400 group-hover:text-gray-600 transition-colors duration-300 group-hover:translate-x-1"
        >
          <path
            d="M5 12h14M12 5l7 7-7 7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  </div>
);

const Categories = () => {
  const navigate = useNavigate();
  const categories = [
    {
      icon: GraduationCap,
      title: "Education",
      description: "50+ schemes",
      color: { text: "text-blue-600", bg: "bg-blue-600" },
    },
    {
      icon: Heart,
      title: "Healthcare",
      description: "40+ schemes",
      color: { text: "text-rose-600", bg: "bg-rose-600" },
    },
    {
      icon: Users,
      title: "Women Empowerment",
      description: "30+ schemes",
      color: { text: "text-violet-600", bg: "bg-violet-600" },
    },
    {
      icon: Briefcase,
      title: "Employment",
      description: "45+ schemes",
      color: { text: "text-amber-600", bg: "bg-amber-600" },
    },
    {
      icon: Home,
      title: "Housing",
      description: "25+ schemes",
      color: { text: "text-emerald-600", bg: "bg-emerald-600" },
    },
    {
      icon: Sprout,
      title: "Agriculture",
      description: "35+ schemes",
      color: { text: "text-lime-600", bg: "bg-lime-600" },
    },
    {
      icon: Book,
      title: "Skill Development",
      description: "20+ schemes",
      color: { text: "text-indigo-600", bg: "bg-indigo-600" },
    },
    {
      icon: Truck,
      title: "Transportation",
      description: "15+ schemes",
      color: { text: "text-orange-600", bg: "bg-orange-600" },
    },
    {
      icon: Sun,
      title: "Energy",
      description: "10+ schemes",
      color: { text: "text-yellow-500", bg: "bg-yellow-500" },
    },
    {
      icon: Wifi,
      title: "Digital India",
      description: "25+ schemes",
      color: { text: "text-sky-600", bg: "bg-sky-600" },
    },
    {
      icon: Zap,
      title: "Rural Development",
      description: "30+ schemes",
      color: { text: "text-green-600", bg: "bg-green-600" },
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold text-gray-900 mb-3 tracking-tight">
            Government Schemes
          </h2>
          <div className="w-16 h-1 bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore various government schemes across different categories
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              onClick={() => navigate(`/schemes?cat=${category.title}`)}
              className="hover:-translate-y-1 transition-transform duration-300"
            >
              <CategoryCard {...category} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
