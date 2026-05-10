import React from "react";

const QuotesNav = ({ theme, setTheme }) => {
  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-[#020617]/95 border-slate-800"
          : "bg-gradient-to-r from-rose-100/95 via-amber-50/95 to-yellow-100/95 border-orange-200"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO SECTION */}
        <div className="flex items-center gap-3">

          {/* ICON */}
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-lg ${
              theme === "dark"
                ? "bg-gradient-to-br from-blue-600 to-cyan-500"
                : "bg-gradient-to-br from-orange-400 to-yellow-300"
            }`}
          >
            ✨
          </div>

          {/* TEXT */}
          <div>
            <h1
              className={`text-2xl font-extrabold tracking-wide ${
                theme === "dark"
                  ? "text-white"
                  : "text-zinc-800"
              }`}
              style={{ fontFamily: "cursive" }}
            >
              QuoteVerse
            </h1>

            <p
              className={`text-xs tracking-widest uppercase ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-zinc-500"
              }`}
            >
              Daily Inspiration
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH BAR */}
          <div className="relative hidden sm:block">

            <input
              type="text"
              placeholder="Search quotes..."
              className={`w-[240px] pl-12 pr-5 py-3 rounded-2xl outline-none border transition-all duration-300 shadow-lg ${
                theme === "dark"
                  ? "bg-[#0f172a] border-slate-700 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-500"
                  : "bg-white/80 border-orange-200 text-zinc-800 placeholder:text-zinc-400 focus:ring-2 focus:ring-orange-300"
              }`}
            />

            {/* SEARCH ICON */}
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg opacity-70">
              🔍
            </span>
          </div>

          {/* THEME BUTTON */}
          <button
            onClick={() =>
              setTheme(theme === "dark" ? "light" : "dark")
            }
            className={`cursor-pointer relative overflow-hidden px-5 py-3 rounded-2xl font-semibold shadow-xl transition-all duration-300 active:scale-95 group ${
              theme === "dark"
                ? "bg-gradient-to-r from-slate-800 to-slate-700 text-white border border-slate-600 hover:border-cyan-500"
                : "bg-white text-zinc-800 border border-orange-200 hover:border-orange-400"
            }`}
          >

            {/* HOVER GLOW */}
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 ${
                theme === "dark"
                  ? "bg-cyan-500/10"
                  : "bg-orange-300/20"
              }`}
            ></div>

            <span
              className="relative z-10 flex items-center gap-2"
              style={{ fontFamily: "cursive" }}
            >
              {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
            </span>
          </button>

        </div>
      </div>
    </nav>
  );
};

export default QuotesNav;