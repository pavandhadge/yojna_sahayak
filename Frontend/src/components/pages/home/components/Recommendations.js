import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { UserContext } from "../../../../context/UserContext";
import SchemeCard from "../../../common/schemeCard/SchemeCard";
import { getPersonalizedRecommendations } from "../../../../services/recommendations/recommendationService";

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isUserLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      if (!isUserLoggedIn) return;

      try {
        setLoading(true);
        const data = await getPersonalizedRecommendations();
        setRecommendations(data.schemes || []);
      } catch (err) {
        setError("Failed to fetch recommendations. Please try again later.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [isUserLoggedIn]);

  if (!isUserLoggedIn) {
    return (
      <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Personalized Recommendations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get tailored scheme suggestions based on your profile and needs
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 text-center max-w-3xl mx-auto">
            <div className="space-y-6">
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Unlock Personalized Recommendations
              </h3>
              <p className="text-lg text-gray-600">
                Create an account to receive scheme recommendations curated just
                for you
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <button
                  onClick={() => navigate("/signup")}
                  className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Sign Up Now <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium rounded-lg transition-all duration-200"
                >
                  I already have an account
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-10 h-10 text-green-600 animate-spin mx-auto" />
          <p className="text-lg font-medium text-gray-700">
            Finding the best schemes for you...
          </p>
          <p className="text-sm text-gray-500">
            Analyzing your profile and preferences
          </p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl border border-red-100 p-6 sm:p-8 text-center">
          <div className="space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-50 rounded-full mx-auto">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900">
              Couldn't load recommendations
            </h3>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Recommended For You
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Schemes we think would be perfect for your profile
          </p>
        </div>

        {recommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.slice(0, 3).map((scheme) => (
              <Link
                to={`/scheme/${scheme._id}`}
                key={scheme._id}
                className="transition-transform hover:scale-[1.02] duration-200"
              >
                <SchemeCard scheme={scheme} />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm p-8 sm:p-10 text-center max-w-2xl mx-auto">
            <div className="space-y-5">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto">
                <Search className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                No recommendations found
              </h3>
              <p className="text-gray-600">
                Complete your profile information to get personalized scheme
                suggestions.
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="mt-4 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
              >
                Complete Your Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Recommendations;
