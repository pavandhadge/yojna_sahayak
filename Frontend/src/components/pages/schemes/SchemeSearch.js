import { useState } from "react";
import { Search, BookOpen, Users, Coins, Calendar, Building2, MapPin, Filter, ChevronDown, X } from "lucide-react";

// Constants remain the same
const CATEGORIES = [
    "Women and Child",
    "Utility & Sanitation",
    "Travel & Tourism",
    "Transport & Infrastructure Sports & Culture",
    "Social welfare & Empowerment",
    "Skills & Employment",
    "Science, IT & Communications",
    "Public Safety,Law & Justice",
    "Housing & Shelter",
    "Health & Wellness",
    "Education & Learning",
    "Business & Entrepreneurship",
    "Banking, Financial Services and Insurance",
    "Agriculture,Rural & Environment"
];

const MINISTRIES = [
    "Ministry Of Culture",
    "Ministry Of Petroleum and Natural Gas",
    "Ministry Of Rural Development",
    "Ministry Of Housing & Urban Affairs",
    "Ministry Of Heavy Industries",
    "Ministry Of Health & Family Welfare",
    "Ministry Of Science And Technology",
    "Ministry Of Law and Justice",
    "Ministry Of Agriculture and Farmers Welfare",
    "Ministry Of Labour and Employment",
    "Ministry Of External Affairs",
    "Ministry Of Youth Affairs & Sports",
    "Ministry Of Micro, Small and Medium Enterprises",
    "Ministry Of Commerce And Industry",
    "Ministry Of Minority Affairs",
    "Ministry Of New and Renewable Energy",
    "Ministry Of Social Justice and Empowerment",
    "Ministry Of Finance",
    "Ministry Of Women and Child Development",
    "Ministry Of Jal Shakti",
    "Ministry Of Education",
    "Ministry Of Skill Development And Entrepreneurship"
];

const STATES = [
    "Andaman and Nicobar Islands", "Arunachal Pradesh", "Assam", "Bihar",
    "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
    "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
    "Maharashtra", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
    "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
    "Uttar Pradesh", "Uttarakhand", "West Bengal", "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry"
];

const LEVELS = ["State/ UT", "Central", "State"];

const SchemeSearch = ({ onSearch }) => {
    const [filters, setFilters] = useState({
        search: "",
        schemeName: "",
        openDate: "",
        closeDate: "",
        state: "",
        nodalMinistryName: "",
        level: "",
        category: "",
        gender: "",
        incomeGroup: "",
    });

    const [activeTab, setActiveTab] = useState('basic');

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(filters);
    };

    const clearFilter = (filterName) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: "",
        }));
    };

    const SelectField = ({ label, name, value, onChange, options, icon: Icon }) => (
        <div className="relative group">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full py-3 pl-10 pr-10 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-gray-800 text-base appearance-none shadow-xs hover:shadow-sm focus:shadow-md focus:outline-none"
        >
          <option value="" disabled className="text-gray-400">
            Select {label}
          </option>
          {options.map((option) => (
            <option 
              key={option} 
              value={option} 
              className="truncate hover:bg-green-50"
            >
              {option}
            </option>
          ))}
        </select>
        
        {/* Leading icon */}
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-green-600 transition-colors">
          <Icon size={18} />
        </div>
        
        {/* Custom dropdown arrow */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within:text-green-600 transition-colors">
          <svg 
            width="16" 
            height="16" 
            viewBox="0 0 20 20" 
            fill="currentColor"
            className="transition-transform group-focus-within:rotate-180"
          >
            <path 
              fillRule="evenodd" 
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </div>
      </div>
    );

    const tabs = [
        { id: 'basic', label: 'Basic Filters', icon: Filter },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'eligibility', label: 'Eligibility', icon: Users },
        { id: 'dates', label: 'Dates', icon: Calendar },
    ];

    return (
        <div className="max-w-full mx-auto px-4 py-8 sm:py-10">
        
      
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-full ">
              <div className="flex items-center bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500">
                <input
                  type="text"
                  name="search"
                  placeholder="Search for government schemes..."
                  value={filters.search}
                  onChange={handleFilterChange}
                  className="flex-1 px-5 py-3 sm:py-3.5 text-base sm:text-[15px] border-none focus:outline-none focus:ring-0 min-w-0 bg-transparent placeholder-gray-500"
                />
                <button
                  type="submit"
                  className="px-5 sm:px-6 py-3 sm:py-3.5 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200 flex items-center gap-2 flex-shrink-0 rounded-r-[7px]"
                >
                  <Search size={18} className="flex-shrink-0" />
                  <span className="hidden sm:inline font-medium text-sm">Search</span>
                </button>
              </div>
            </div>
      

      
            {/* Filter Tabs */}
            <div className="bg-white rounded-lg shadow-xs overflow-hidden border border-gray-200">
              <div className="flex overflow-x-auto scrollbar-hide border-b border-gray-200">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 flex-1 min-w-fit
                      ${activeTab === tab.id 
                        ? 'text-green-600 border-b-2 border-green-500 bg-green-50 font-medium' 
                        : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'}`}
                  >
                    <tab.icon size={16} className="flex-shrink-0" />
                    <span>{tab.label}</span>
                  </button>
                ))}
              </div>
      
              <div className="p-4 sm:p-5">
                {activeTab === 'basic' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Category"
                      name="category"
                      value={filters.category}
                      onChange={handleFilterChange}
                      options={CATEGORIES}
                      icon={BookOpen}
                    />
                    <SelectField
                      label="Ministry"
                      name="nodalMinistryName"
                      value={filters.nodalMinistryName}
                      onChange={handleFilterChange}
                      options={MINISTRIES}
                      icon={Building2}
                    />
                  </div>
                )}
      
                {activeTab === 'location' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="State"
                      name="state"
                      value={filters.state}
                      onChange={handleFilterChange}
                      options={STATES}
                      icon={MapPin}
                    />
                    <SelectField
                      label="Level"
                      name="level"
                      value={filters.level}
                      onChange={handleFilterChange}
                      options={LEVELS}
                      icon={Filter}
                    />
                  </div>
                )}
      
                {activeTab === 'eligibility' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectField
                      label="Gender"
                      name="gender"
                      value={filters.gender}
                      onChange={handleFilterChange}
                      options={["Male", "Female", "Other"]}
                      icon={Users}
                    />
                    <SelectField
                      label="Income Group"
                      name="incomeGroup"
                      value={filters.incomeGroup}
                      onChange={handleFilterChange}
                      options={["EWS", "General", "OBC", "SC", "ST"]}
                      icon={Coins}
                    />
                  </div>
                )}
      
                {activeTab === 'dates' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Open Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="openDate"
                          value={filters.openDate}
                          onChange={handleFilterChange}
                          className="w-full px-3 pl-9 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 text-sm"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                    <div className="relative">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Close Date</label>
                      <div className="relative">
                        <input
                          type="date"
                          name="closeDate"
                          value={filters.closeDate}
                          onChange={handleFilterChange}
                          className="w-full px-3 pl-9 py-2 bg-white border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 text-gray-700 text-sm"
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
                        {/* Active Filters */}
                        {Object.entries(filters).some(([_, value]) => value) && (
                        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
                            <div className="flex flex-wrap gap-2">
                                {Object.entries(filters).map(([key, value]) => 
                                    value && (
                                        <div key={key} 
                                            className="flex items-center gap-1.5 bg-[#74B83E] bg-opacity-10 text-[#74B83E] px-2 py-0.5 rounded-md text-sm font-medium">
                                            {key}: {value}
                                            <button
                                                type="button"
                                                onClick={() => clearFilter(key)}
                                                className="hover:text-red-500 transition-colors"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
          </form>
        </div>
      );
};

export default SchemeSearch;