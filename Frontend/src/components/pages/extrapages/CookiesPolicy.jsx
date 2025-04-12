import { Cookie, Settings, ShieldHalf, ListChecks } from "lucide-react";

const CookiesPolicy = () => {
  const cookieTypes = [
    {
      name: "Essential Cookies",
      purpose: "Necessary for website functionality",
      example: "Authentication, security"
    },
    {
      name: "Performance Cookies",
      purpose: "Help improve user experience",
      example: "Analytics, error tracking"
    },
    {
      name: "Functional Cookies",
      purpose: "Enable enhanced features",
      example: "Preferences, localization"
    },
    {
      name: "Targeting Cookies",
      purpose: "Used for advertising",
      example: "Tracking, remarketing"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Cookie size={48} className="text-green-300" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cookies Policy</h1>
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
                <Settings size={24} className="text-green-600" />
                How We Use Cookies
              </h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar tracking technologies to enhance your experience on our website.
                This policy explains what cookies are and how we use them.
              </p>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Are Cookies?</h3>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files stored on your device when you visit websites. They help 
                  websites remember information about your visit.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <ShieldHalf size={20} className="text-green-600" />
                  Types of Cookies We Use
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {cookieTypes.map((cookie, i) => (
                    <div key={i} className="bg-green-50 rounded-lg p-5">
                      <h4 className="font-semibold text-green-800 mb-2">{cookie.name}</h4>
                      <p className="text-gray-700 mb-1 text-sm">
                        <span className="font-medium">Purpose:</span> {cookie.purpose}
                      </p>
                      <p className="text-gray-700 text-sm">
                        <span className="font-medium">Example:</span> {cookie.example}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-3">
                  <ListChecks size={20} className="text-green-600" />
                  Managing Cookies
                </h3>
                <p className="text-gray-600 mb-4">
                  You can control and/or delete cookies as you wish. Most browsers allow you to:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-2">
                  <li>Delete all cookies from your browser settings</li>
                  <li>Block third-party cookies</li>
                  <li>Set preferences before cookies are placed</li>
                  <li>Use private browsing modes</li>
                </ul>
                <p className="text-gray-600 mt-4">
                  Note that disabling cookies may affect website functionality.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Cookie Consent</h3>
                <p className="text-gray-600 mb-2">
                  We use a cookie consent banner to obtain your permission for non-essential cookies.
                </p>
                <p className="text-gray-600">
                  You can update your preferences at any time by clicking the "Cookie Settings" link in our footer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicy;