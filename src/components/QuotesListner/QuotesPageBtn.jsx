import React from "react";

const QuotesPageBtn = ({ theme, page, setPage , totalPage}) => {

  return (
    <div className="flex justify-center items-center gap-6 mt-12 flex-wrap">

      {/* PREVIOUS BUTTON */}
      <button
        onClick={()=> setPage(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`group cursor-pointer relative overflow-hidden px-7 py-3 rounded-2xl font-semibold tracking-wide transition-all duration-300 shadow-xl active:scale-95 border ${
          page === 1
            ? "opacity-40 cursor-not-allowed"
            : ""
        } ${
          theme === "dark"
            ? "bg-[#0f172a] text-white border-slate-700 hover:border-blue-500"
            : "bg-white/80 text-zinc-800 border-zinc-300 hover:border-orange-400"
        }`}
      >

        {/* GLOW EFFECT */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ${
            theme === "dark"
              ? "bg-blue-500/10"
              : "bg-orange-300/20"
          }`}
        ></div>

        <span className="relative z-10 flex items-center gap-2">
          ← Previous
        </span>
      </button>

      {/* PAGE NUMBER */}
      <div
        className={`px-6 py-3 rounded-full text-lg font-bold shadow-lg border ${
          theme === "dark"
            ? "bg-[#0b1220] text-blue-300 border-slate-700"
            : "bg-gradient-to-r from-amber-100 to-yellow-100 text-orange-700 border-orange-200"
        }`}
      >
        Page {page} of {totalPage}
      </div>

      {/* NEXT BUTTON */}
      <button
        onClick={()=> setPage(Math.min(totalPage, page + 1))}
        disabled={page === totalPage}
        className={`group cursor-pointer relative overflow-hidden px-7 py-3 rounded-2xl font-semibold tracking-wide transition-all duration-300 shadow-xl active:scale-95 ${
          theme === "dark"
            ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:scale-105"
            : "bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:scale-105"
        }`}
      >

        {/* SHINE EFFECT */}
        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700 bg-white/20 skew-x-12"></div>

        <span className="relative z-10 flex items-center gap-2">
          Next →
        </span>
      </button>

    </div>
  );
};

export default QuotesPageBtn;