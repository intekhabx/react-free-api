import React from "react";

const MealPageBtn = ({ theme, page, setPage, totalPage }) => {
  return (
    <div className="flex items-center justify-center gap-5 my-8">
      
      {/* Previous */}
      <button
        disabled={page === 1}
        onClick={() => setPage(Math.max(1, page - 1))}
        className={`cursor-pointer px-6 py-2 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg
        backdrop-blur-md border
        ${
          theme === "dark"
            ? "bg-white/30 text-white border-white/20 hover:bg-white/20 disabled:opacity-30"
            : "bg-black/30 text-gray-800 border-gray-300 hover:bg-black/10 disabled:opacity-30"
        }`}
      >
        ← Prev
      </button>

      {/* Page Indicator */}
      <div
        className={`px-4 py-2 rounded-full text-sm font-semibold shadow-md border backdrop-blur-md
        ${
          theme === "dark"
            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-white/10"
            : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white border-transparent"
        }`}
      >
        {page} / {totalPage}
      </div>

      {/* Next */}
      <button
        disabled={page === totalPage}
        onClick={() => setPage(Math.min(totalPage, page + 1))}
        className={`cursor-pointer px-6 py-2 rounded-full font-semibold tracking-wide transition-all duration-300 shadow-lg
        backdrop-blur-md border
        ${
          theme === "dark"
            ? "bg-indigo-500/20 text-white border-indigo-400/30 hover:bg-indigo-500/30 disabled:opacity-30"
            : "bg-indigo-500 text-white border-indigo-500 hover:bg-indigo-600 disabled:opacity-30"
        }`}
      >
        Next →
      </button>
    </div>
  );
};

export default MealPageBtn;