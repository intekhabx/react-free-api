import React from "react";

const QuotesLoader = ({ theme }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">

      {/* OUTER RING */}
      <div className="relative w-24 h-24">

        {/* SPINNING BORDER */}
        <div
          className={`absolute inset-0 rounded-full border-4 animate-spin ${
            theme === "dark"
              ? "border-slate-700 border-t-cyan-400"
              : "border-orange-100 border-t-orange-500"
          }`}
        ></div>

        {/* INNER GLOW */}
        <div
          className={`absolute inset-4 rounded-full blur-xl opacity-40 ${
            theme === "dark"
              ? "bg-cyan-400"
              : "bg-orange-300"
          }`}
        ></div>

        {/* CENTER ICON */}
        <div
          className={`absolute inset-0 flex items-center justify-center text-2xl font-bold ${
            theme === "dark"
              ? "text-cyan-300"
              : "text-orange-500"
          }`}
        >
          ✦
        </div>
      </div>

      {/* LOADING TEXT */}
      <div className="text-center">

        <h2
          className={`text-2xl font-bold tracking-wide ${
            theme === "dark"
              ? "text-white"
              : "text-zinc-800"
          }`}
          style={{ fontFamily: "cursive" }}
        >
          Loading Quotes...
        </h2>

        <p
          className={`mt-2 text-sm tracking-widest uppercase ${
            theme === "dark"
              ? "text-slate-400"
              : "text-zinc-500"
          }`}
        >
          Please wait a moment
        </p>

      </div>
    </div>
  );
};

export default QuotesLoader;