import { UserPlus, Search, CheckSquare, ArrowRight } from "lucide-react";

const StepCard = ({ icon: Icon, title, description, index, isLast }) => (
  <div className="relative flex flex-col items-center text-center">
    {/* Step connector (except for last item) */}
    {!isLast && (
      <div className="hidden md:block absolute top-12 left-3/4 w-2/5 h-[3px] bg-gray-800 z-10" />
    )}

    {index !== 0 && (
      <div className="hidden md:block absolute top-10 left-6 w-1/2">
        <div className="relative flex items-center">
          <div className="w-0 h-0 border-t-12 border-t-transparent z-20 border-b-12 border-b-transparent border-l-12 border-l-[#74B83E]"></div>
          {/* <div className="ml-2">Next Step</div> */}
        </div>
      </div>
    )}

    <div className="group bg-white p-6 rounded-xl border-2 shadow-sm hover:shadow-md transition-all duration-200 w-full h-full">
      <div className="flex flex-col items-center">
        <div className="mb-5 bg-gray-50 p-3 rounded-full text-[#74B83E]">
          <Icon size={32} />
        </div>
        <div className="absolute -top-3 right-4 bg-[#74B83E] text-white text-lg font-bold rounded-full w-8 h-8 flex items-center justify-center">
          {index + 1}
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base">{description}</p>
      </div>
    </div>
  </div>
);

const HowToApply = () => {
  const steps = [
    {
      icon: UserPlus,
      title: "Enter Details",
      description: "Provide basic information to find relevant schemes",
    },
    {
      icon: Search,
      title: "Find Schemes",
      description: "Discover programs matching your profile",
    },
    {
      icon: CheckSquare,
      title: "Apply Online",
      description: "Complete your application digitally",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Simple Application Process
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Three easy steps to access government benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              index={index}
              isLast={index === steps.length - 1}
              {...step}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowToApply;
