import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import SchemeCard from "../../common/schemeCard/SchemeCard";
import Pagination from "../../common/pagination/Pagination";
import { getPersonalizedSavedSchemes } from "../../../services/SavedSchemes/SavedSchemeservice";

const SavedSchemesPage = () => {
  const [SavedSchemes, setSavedSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalSchemes, setTotalSchemes] = useState(0);
  const [error, setError] = useState(null);

  const fetchSavedSchemes = useCallback(async (page) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPersonalizedSavedSchemes(page);

      setSavedSchemes(data?.schemes);
      setTotalPages(data?.totalPages);
      setCurrentPage(data?.currentPage);
      setTotalSchemes(data?.totalSchemes);
    } catch (error) {
      console.error("Failed to fetch SavedSchemes:", error);
      setError("Failed to fetch SavedSchemes. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavedSchemes(currentPage);
  }, [currentPage, fetchSavedSchemes]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const SavedSchemesCountText =
    totalSchemes > 0
      ? `Showing ${(currentPage - 1) * 9}-${currentPage * 9} of ${totalSchemes} recommended schemes`
      : "";

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#74B83E]"></div>
        <p className="mt-2 text-xl">Loading SavedSchemes...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <section className="container mx-auto py-12">
        <h1 className="text-4xl font-bold pt-10 mb-8 text-center">
          Your Saved Schemes
        </h1>

        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8"
            role="alert"
          >
            <p>{error}</p>
          </div>
        )}

        {SavedSchemesCountText && (
          <p className="text-gray-600 mb-4">{SavedSchemesCountText}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SavedSchemes.map((scheme) => (
            <Link to={`/scheme/${scheme._id}`} key={scheme._id}>
              <SchemeCard scheme={scheme} />
            </Link>
          ))}
        </div>

        {!loading && SavedSchemes.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {SavedSchemes.length === 0 && !loading && (
          <div className="text-center py-8">
            <Search size={48} className="text-gray-400 mx-auto mb-4" />
            <p className="text-xl text-gray-600">
              No saved schemes found. Please update your profile preferences.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default SavedSchemesPage;
