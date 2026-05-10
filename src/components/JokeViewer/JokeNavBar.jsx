import React from 'react'

const JokeNavBar = ({theme, setTheme}) => {
  return (
    <div className={`w-full px-6 py-4 flex items-center justify-between border-b transition-all duration-300 sticky top-0 z-50 ${
  theme === "dark"
    ? "bg-slate-900 border-slate-700 text-white"
    : "bg-[#dbe4f3] border-zinc-300 text-zinc-900"
}`}>

  {/* LOGO */}
  <div className="text-2xl font-bold" style={{ fontFamily: "cursive" }}>
    😄 JokeBox
  </div>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-4">

    {/* SEARCH BOX */}
    <input
      type="text"
      placeholder="Search jokes..."
      className={`px-4 py-2 rounded-full border-2 outline-none transition-all duration-300 shadow-sm ${
        theme === "dark"
          ? "bg-slate-800 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500"
          : "bg-white/80 border-zinc-400 text-zinc-900 placeholder:text-zinc-500 focus:ring-2 focus:ring-yellow-300"
      }`}
    />

    {/* TOGGLE BUTTON */}
    <button
      onClick={()=> {theme === "dark" ? setTheme("light") : setTheme("dark")}}
      className={`px-4 py-2 rounded-full border-2 font-semibold shadow active:scale-95 transition ${
        theme === "dark"
          ? "bg-slate-700 border-slate-500 text-white hover:bg-slate-600"
          : "bg-yellow-100 border-zinc-700 text-zinc-900 hover:bg-yellow-50"
      }`}
      style={{ fontFamily: "cursive" }}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>

  </div>
</div>
  )
}

export default JokeNavBar