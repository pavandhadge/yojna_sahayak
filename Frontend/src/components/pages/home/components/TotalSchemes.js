import { FileText, Building, Landmark, Search } from "lucide-react";

const StatCard = ({ icon: Icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center group border border-gray-200  hover:border-black transition-all">
    <Icon size={48} className="text-[#74B83E] mr-8" />
    <div>
      <h3 className="text-3xl font-bold">{value}</h3>
      <p className="text-gray-600">{title}</p>
    </div>
  </div>
);

const TotalSchemes = () => {
  return (
    <section className="px-8 py-16 bg-gray-150">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Total Available Schemes
      </h1>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <StatCard
            icon={FileText}
            title="Total Schemes Available"
            value="500+"
          />
          <StatCard
            icon={Building}
            title="Total Central Schemes"
            value="200+"
          />
          <StatCard
            icon={Landmark}
            title="Total Schemes for States"
            value="300+"
          />
        </div>
        <div className="text-center">
          <button className="bg-[#74B83E] text-white px-8 py-4 rounded-full text-xl font-semibold flex items-center mx-auto transition-all duration-300 hover:bg-green-600 hover:scale-105">
            <Search className="mr-3" />
            Find Schemes for You
          </button>
        </div>
      </div>
    </section>
  );
};

export default TotalSchemes;
