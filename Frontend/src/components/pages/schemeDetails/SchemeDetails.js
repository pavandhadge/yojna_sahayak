import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import {
  getSchemeById,
  saveFavoriteSchemes,
  removeFavoriteSchemes,
  getFavoriteSchemes,
} from "../../../services/schemes/schemeService";
import {
  ArrowLeft,
  Target,
  List,
  FileText,
  Users,
  Download,
  Share2,
  Bookmark,
  ChevronDown,
  ChevronUp,
  Info,
  MessageCircle,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import ChatBot from "../../common/chatbot/ChatBot";
import { generatePDF } from "../../../helper/generatePdf";
import { shareScheme } from "../../../helper/shareScheme";
import DisplayFormatted from "./components/DisplayFormatted";
import DisplayMarkdown from "./components/DisplayMarkdown";
import { toast } from "react-hot-toast";

const SchemeDetails = () => {
  const { id } = useParams();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contentRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    overview: true,
    eligibility: true,
    benefits: true,
    documents: true,
    apply: true,
    faq: true,
  });

  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  useEffect(() => {
    const fetchSchemeDetails = async () => {
      try {
        const data = await getSchemeById(id);
        setScheme(data);
      } catch (err) {
        setError("Failed to fetch scheme details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSchemeDetails();
  }, [id]);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const savedSchemes = await getFavoriteSchemes();
        setIsSaved(savedSchemes.includes(id));
      } catch (error) {
        console.error("Error checking saved status:", error);
      }
    };

    if (id) checkIfSaved();
  }, [id]);

  const handleSaveScheme = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);
      if (isSaved) {
        await removeFavoriteSchemes(id);
        toast.success("Removed from favorites");
      } else {
        await saveFavoriteSchemes(id);
        toast.success("Added to favorites");
      }
      setIsSaved(!isSaved);
    } catch (error) {
      toast.error("Please login to save schemes");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center space-y-4">
          <div className="h-14 w-14 bg-green-100 rounded-full mb-4"></div>
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-red-100 rounded-full mb-4">
            <AlertCircle className="text-red-500" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );

  if (!scheme)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4">
            <Info className="text-gray-500" size={24} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Scheme not found
          </h3>
          <p className="text-gray-600">
            The requested scheme could not be found in our database.
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Floating header on scroll */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm py-3 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center text-gray-700 hover:text-gray-900 transition-colors group"
          >
            <ArrowLeft
              className="mr-2 group-hover:-translate-x-1 transition-transform"
              size={18}
            />
            <span className="font-medium">Back to schemes</span>
          </button>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSaveScheme}
              disabled={isSaving}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSaved
                  ? "bg-green-100 text-green-800 hover:bg-green-200"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              } ${isSaving ? "opacity-70" : ""}`}
            >
              <Bookmark
                size={16}
                className={`mr-2 ${isSaved ? "fill-green-600" : ""}`}
              />
              {isSaving ? "Saving..." : isSaved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-10">
          <button
            onClick={() => window.history.back()}
            className="md:hidden flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
          >
            <ArrowLeft
              className="mr-2 group-hover:-translate-x-1 transition-transform"
              size={18}
            />
            Back
          </button>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {scheme?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight tracking-tight">
                {scheme?.schemeName}
              </h1>

              {scheme?.schemeShortTitle && (
                <p className="text-lg text-gray-600">
                  {scheme.schemeShortTitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleSaveScheme}
                disabled={isSaving}
                className={`md:hidden flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isSaved
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                } ${isSaving ? "opacity-70" : ""}`}
              >
                <Bookmark
                  size={16}
                  className={`mr-2 ${isSaved ? "fill-green-600" : ""}`}
                />
                {isSaving ? "..." : isSaved ? "Saved" : "Save"}
              </button>
            </div>
          </div>
        </div>
        import {Sparkles} from "lucide-react"; // ... (rest of the imports) //
        ... (rest of the component code)
        {/* Meta information */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {scheme?.nodalMinistryName && (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Ministry
              </p>
              <p className="font-medium text-gray-900">
                {scheme.nodalMinistryName}
              </p>
            </div>
          )}
          {scheme?.state && (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                State
              </p>
              <p className="font-medium text-gray-900">{scheme.state}</p>
            </div>
          )}
          <div
            className="bg-gradient-to-br from-green-400 to-blue-500 p-5 rounded-xl border border-transparent shadow-lg hover:shadow-xl transition-shadow cursor-pointer flex items-center justify-center text-white"
            onClick={() => setIsChatbotOpen(true)}
          >
            <Sparkles className="mr-3" size={24} />
            <div className="text-center">
              <p className="text-xs uppercase tracking-wider mb-1">
                AI Assistant
              </p>
              <p className="font-bold text-lg">Ask a question</p>
            </div>
          </div>
          {scheme?.openDate && (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Open Date
              </p>
              <p className="font-medium text-gray-900">
                {formatDate(scheme.openDate)}
              </p>
            </div>
          )}
          {scheme?.closeDate && (
            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-shadow">
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                Close Date
              </p>
              <p className="font-medium text-gray-900">
                {formatDate(scheme.closeDate)}
              </p>
            </div>
          )}
        </div>
        {isChatbotOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000] flex items-center justify-center">
            <ChatBot
              schemeId={scheme?._id}
              schemeName={scheme?.schemeName}
              onClose={() => setIsChatbotOpen(false)}
            />
          </div>
        )}
        <div ref={contentRef} className="space-y-6">
          {/* Overview Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("overview")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Target size={20} className="text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Overview
                </h2>
              </div>
              {expandedSections.overview ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.overview && (
              <div className="px-6 pb-6 prose prose-green max-w-none">
                <DisplayMarkdown
                  content={
                    scheme?.detailedDescription_md || "No overview available."
                  }
                />
              </div>
            )}
          </section>

          {/* Eligibility Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("eligibility")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users size={20} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Eligibility Criteria
                </h2>
              </div>
              {expandedSections.eligibility ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.eligibility && (
              <div className="px-6 pb-6 prose prose-blue max-w-none">
                <DisplayMarkdown
                  content={
                    scheme?.eligibilityDescription_md ||
                    "No eligibility information provided."
                  }
                />
              </div>
            )}
          </section>

          {/* Benefits Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("benefits")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <List size={20} className="text-purple-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Scheme Benefits
                </h2>
              </div>
              {expandedSections.benefits ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.benefits && (
              <div className="px-6 pb-6">
                <DisplayFormatted benefitsData={scheme?.benefits} />
              </div>
            )}
          </section>

          {/* Documents Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("documents")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <FileText size={20} className="text-amber-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Required Documents
                </h2>
              </div>
              {expandedSections.documents ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.documents && (
              <div className="px-6 pb-6">
                <DisplayFormatted benefitsData={scheme?.documents_required} />
              </div>
            )}
          </section>

          {/* Application Process Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("apply")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-cyan-50 rounded-lg">
                  <FileText size={20} className="text-cyan-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Process
                </h2>
              </div>
              {expandedSections.apply ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.apply && (
              <div className="px-6 pb-6">
                {scheme?.applicationProcess?.length > 0 ? (
                  <div className="space-y-6">
                    {scheme.applicationProcess.map((process, index) => (
                      <div key={index} className="prose max-w-none">
                        <h3 className="font-semibold text-gray-800 mb-3">
                          {process?.mode || "Application Mode"}:
                        </h3>
                        <DisplayFormatted benefitsData={process?.process} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No application process available.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* FAQs Section */}
          <section className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-xs hover:shadow-sm transition-shadow">
            <button
              onClick={() => toggleSection("faq")}
              className="w-full flex justify-between items-center p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-pink-50 rounded-lg">
                  <HelpCircle size={20} className="text-pink-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>
              {expandedSections.faq ? (
                <ChevronUp size={20} className="text-gray-400" />
              ) : (
                <ChevronDown size={20} className="text-gray-400" />
              )}
            </button>
            {expandedSections.faq && (
              <div className="px-6 pb-6">
                {scheme?.faqs?.length > 0 ? (
                  <div className="space-y-6">
                    {scheme.faqs.map((faq, index) => (
                      <div
                        key={index}
                        className="border-b border-gray-100 pb-6 last:border-0"
                      >
                        <h3 className="font-semibold text-gray-900 mb-3">
                          {faq?.question || "Question"}
                        </h3>
                        <p className="text-gray-600">
                          {faq?.answer || "Answer not available."}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No FAQs found.</p>
                )}
              </div>
            )}
          </section>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-start mt-12">
            <button
              onClick={() => generatePDF(contentRef, scheme?.schemeName)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Download size={18} />
              <span className="font-medium">Download PDF</span>
            </button>
            <button
              onClick={() => shareScheme(scheme?.schemeName)}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all shadow-md hover:shadow-lg"
            >
              <Share2 size={18} />
              <span className="font-medium">Share Scheme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchemeDetails;
