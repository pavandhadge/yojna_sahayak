import { ShieldCheck, Lock, EyeOff, Server } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <ShieldCheck size={48} className="text-green-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="prose prose-lg prose-green max-w-none">
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Lock size={24} className="text-green-600" />
                Your Privacy Matters
              </h2>
              <p className="text-gray-600 mb-4">
                We are committed to protecting your personal information and your right to privacy.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you use our services.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Information We Collect</h3>
                <p className="text-gray-600 mb-4">
                  We collect personal information that you voluntarily provide to us when you register, 
                  express interest in our services, or otherwise contact us.
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Personal Identifiers (name, email, phone number)</li>
                  <li>Account Credentials (passwords, security questions)</li>
                  <li>Usage Data (browsing activity, feature usage)</li>
                  <li>Technical Data (IP address, device information)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <EyeOff size={20} className="text-green-600" />
                  2. How We Use Your Information
                </h3>
                <p className="text-gray-600 mb-4">
                  We use personal information collected via our services for legitimate business purposes:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    "To provide and maintain our service",
                    "To notify you about changes",
                    "To allow participation in interactive features",
                    "To provide customer support",
                    "For analysis to improve our services",
                    "To monitor usage and detect technical issues"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Data Sharing & Disclosure</h3>
                <p className="text-gray-600 mb-4">
                  We may share information in these situations:
                </p>
                <div className="bg-green-50 rounded-lg p-6">
                  <ul className="space-y-3">
                    {[
                      "With service providers for business purposes",
                      "For legal compliance or law enforcement requests",
                      "During business transfers (mergers/acquisitions)",
                      "With your consent for specific purposes"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <span className="text-green-600 font-medium">{i + 1}.</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <Server size={20} className="text-green-600" />
                  4. Data Security
                </h3>
                <p className="text-gray-600 mb-4">
                  We implement appropriate technical and organizational measures to protect your 
                  personal information. However, no system is 100% secure.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h3>
                <p className="text-gray-600">
                  If you have questions about this policy, contact our Data Protection Officer at:
                  <br />
                  <a href="mailto:privacy@example.com" className="text-green-600 hover:underline">
                    privacy@example.com
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

export default PrivacyPolicy;