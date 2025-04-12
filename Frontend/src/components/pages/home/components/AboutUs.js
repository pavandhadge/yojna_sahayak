import { Info, Target, Users, Shield } from "lucide-react";

const AboutUs = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
            <Info size={48} className="text-primary" />
            About Us
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-600 mb-10 leading-relaxed">
            We are dedicated to bridging the gap between citizens and government
            schemes. Our mission is to provide easy access to all government
            schemes, ensuring that every citizen can take advantage of the
            benefits they are entitled to.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Target className="text-primary mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Our Mission
              </h3>
              <p className="text-gray-600">
                To empower citizens by providing comprehensive information about
                government schemes.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Users className="text-primary mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Who We Serve
              </h3>
              <p className="text-gray-600">
                All citizens looking to benefit from government initiatives and
                programs.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <Shield className="text-primary mx-auto mb-4" size={32} />
              <h3 className="font-semibold text-lg mb-3 text-gray-800">
                Our Commitment
              </h3>
              <p className="text-gray-600">
                Providing accurate, up-to-date information and guidance on all
                available schemes.
              </p>
            </div>
          </div>

          <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition duration-300 font-medium text-lg shadow-sm hover:shadow-md">
            Learn More About Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
