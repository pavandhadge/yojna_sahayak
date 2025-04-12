import { ChevronRight, Sparkles } from "lucide-react";
import DisplayMarkdown from "../../pages/schemeDetails/components/DisplayMarkdown";

const SchemeCard = ({ scheme }) => {
  return (
    <div className="h-full group relative bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200/80 hover:border-gray-400/90 flex flex-col isolate">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 -z-10 rounded-lg bg-gradient-to-br from-green-50/30 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Featured badge (conditional) */}
      {scheme.featured && (
        <div className="absolute top-4 right-4 flex items-center gap-1 bg-gradient-to-r from-green-600 to-green-800 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm z-10">
          <Sparkles className="w-3 h-3" />
          <span>Featured</span>
        </div>
      )}

      {/* Card Content */}
      <div className="p-6 pb-4 space-y-4 flex-grow">
        {/* Title with animated underline */}
        <div className="relative">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-green-800 transition-colors duration-300 line-clamp-2">
            {scheme.schemeName}
          </h2>
          <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gray-400 to-gray-600 w-0 group-hover:w-full transition-all duration-500 origin-left" />
        </div>

        {/* Description with improved typography */}
        <div className="text-gray-600 text-sm leading-relaxed line-clamp-3 min-h-[60px]">
          <DisplayMarkdown
            content={scheme.detailedDescription_md}
            className="prose-sm prose-headings:font-medium prose-p:my-1 prose-ul:list-disc prose-ul:pl-5"
          />
        </div>

        {/* Tags with enhanced visibility */}
        <div className="flex flex-wrap gap-2 mt-3">
          {scheme.tags?.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-green-50/60 border border-green-300 text-green-800 rounded-lg text-xs font-semibold hover:bg-green-100 hover:border-green-400 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5"
            >
              {tag}
            </span>
          ))}
          {scheme.tags?.length > 4 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium border border-gray-300">
              +{scheme.tags.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Footer with enhanced visibility */}
      <div className="px-6 py-4 border-t border-gray-100/80 group-hover:border-green-300 bg-white/70 backdrop-blur-md shadow-inner transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-600 group-hover:text-green-700 transition-colors flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
              {scheme.deadline || "Ongoing"}
            </span>
          </div>

          <button className="relative flex items-center gap-1 text-sm font-semibold text-green-700 hover:text-green-900 transition-colors group/button px-2 py-1 rounded-lg hover:bg-green-50">
            <span className="relative">
              View details
              <span className="absolute bottom-0 left-0 h-0.5 bg-green-600 w-full max-w-0 group-hover/button:max-w-full transition-all duration-300" />
            </span>
            <ChevronRight className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>

      {/* State layer for better interaction feedback */}
      <div className="absolute inset-0 rounded-lg bg-green-600/0 group-hover:bg-gray-400/5 transition-colors duration-300 pointer-events-none" />
    </div>
  );
};

export default SchemeCard;
