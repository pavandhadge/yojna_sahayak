import { Scale, Gavel, BookOpen, AlertTriangle } from "lucide-react";

const TermsOfService = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Scale size={48} className="text-green-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg prose-green max-w-none">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Gavel size={24} className="text-green-600" />
                Legal Agreement
              </h2>
              <p className="text-gray-600 mb-4">
                These Terms govern your use of our website and services. By accessing or using our 
                services, you agree to be bound by these Terms.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Account Registration</h3>
                <p className="text-gray-600 mb-4">
                  You must provide accurate information when creating an account and keep it updated.
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-medium">•</span>
                      You are responsible for maintaining account security
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-medium">•</span>
                      Notify us immediately of any unauthorized use
                    </li>
                    <li className="flex items-start gap-2 text-gray-700">
                      <span className="text-green-600 font-medium">•</span>
                      We reserve the right to suspend or terminate accounts
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <BookOpen size={20} className="text-green-600" />
                  2. User Responsibilities
                </h3>
                <p className="text-gray-600 mb-4">
                  As a user of our services, you agree not to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Violate any laws or regulations",
                    "Infringe intellectual property rights",
                    "Upload malicious code or viruses",
                    "Attempt unauthorized access",
                    "Engage in fraudulent activity",
                    "Disrupt service operations"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Service Modifications</h3>
                <p className="text-gray-600 mb-4">
                  We reserve the right to modify or discontinue services at any time without notice.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <AlertTriangle size={20} className="text-green-600" />
                  4. Disclaimers
                </h3>
                <div className="bg-green-50 rounded-lg p-6">
                  <p className="text-gray-700 mb-3 font-medium">THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND.</p>
                  <p className="text-gray-600">
                    We do not guarantee accuracy, completeness, or usefulness of any information.
                    Your use of the service is at your sole risk.
                  </p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                <p className="text-gray-600">
                  For questions about these Terms, contact us at:
                  <br />
                  <a href="mailto:legal@example.com" className="text-green-600 hover:underline">
                    legal@example.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;