import { Info, Target, Users, Shield, Globe } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Empowering Citizens Through Information
          </h1>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            We bridge the gap between government initiatives and the people who
            need them most
          </p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-300">
              Explore Schemes
            </button>
            <button className="border-2 border-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-green-700 transition duration-300">
              Our Mission
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Info size={48} className="text-green-600" />
              About Our Initiative
            </h2>
            <div className="w-24 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Connecting Citizens to Opportunities
                </h3>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Founded in 2024, our platform was created to simplify access
                  to government welfare programs. We recognized that millions of
                  eligible citizens were missing out on benefits simply because
                  they couldn't navigate complex application processes.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Today, we serve as a comprehensive resource for all central
                  and state government schemes, with verified information
                  updated weekly by our team of policy experts.
                </p>
              </div>
              <div className="bg-gray-100 rounded-xl overflow-hidden h-80">
                {/* Placeholder for image */}
                <div className="w-full h-full flex items-center justify-center bg-green-50 text-green-600">
                  <Globe size={64} />
                </div>
              </div>
            </div>

            {/* Stats Section */}
            {/* <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">
                  50+
                </div>
                <div className="text-gray-600">Government Departments</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">
                  1M+
                </div>
                <div className="text-gray-600">Monthly Visitors</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-purple-700 mb-2">
                  5K+
                </div>
                <div className="text-gray-600">Schemes Listed</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-orange-700 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div> */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">
                  30+
                </div>
                <div className="text-gray-600">Government Departments</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-green-700 mb-2">8</div>
                <div className="text-gray-600">Languages Supported</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-purple-700 mb-2">
                  2K+
                </div>
                <div className="text-gray-600">Schemes Listed</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl text-center">
                <div className="text-4xl font-bold text-orange-700 mb-2">
                  24/7
                </div>
                <div className="text-gray-600">Support Available</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Target className="text-green-600 mx-auto mb-6" size={40} />
              <h3 className="font-semibold text-xl mb-4 text-gray-800">
                Clarity
              </h3>
              <p className="text-gray-600">
                We break down complex policies into simple, actionable
                information that anyone can understand.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Users className="text-green-600 mx-auto mb-6" size={40} />
              <h3 className="font-semibold text-xl mb-4 text-gray-800">
                Accessibility
              </h3>
              <p className="text-gray-600">
                Our platform is designed for everyone, regardless of education
                level or technical ability.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="text-green-600 mx-auto mb-6" size={40} />
              <h3 className="font-semibold text-xl mb-4 text-gray-800">
                Integrity
              </h3>
              <p className="text-gray-600">
                We provide accurate, unbiased information verified by our team
                of experts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals working to make government accessible
            </p>
          </div>

          {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                name: "Sharad Etthar",
                role: "developer",
                bio: "SDE at LTI Mindtree",
                responsibilities: "Database + Frontend",
              },
              {
                name: "Pavan Dhadge",
                role: "Developer",
                bio: "Loves to code",
                responsibilities: "Backend + Frontend + Auth",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="bg-green-100 h-48 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-green-600 mb-1">{member.role}</p>
                  <p className="text-gray-800 italic mb-3">
                    {member.responsibilities}
                  </p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { name: "Pava Dhadge" },
              { name: "Dipak Ghadge" },
              { name: "Atharva Golwalkar" },
              { name: "Prathamesh Gajare" },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="bg-green-100 h-48 flex items-center justify-center">
                  <div className="w-32 h-32 rounded-full bg-green-600 flex items-center justify-center text-white text-4xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Benefits You Qualify For?
          </h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Join millions of citizens who've discovered government programs
            through our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-green-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition duration-300 text-lg">
              Search Schemes Now
            </button>
            <button className="border-2 border-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-700 transition duration-300 text-lg">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
