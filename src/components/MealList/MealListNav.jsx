import React from 'react'

const MealListNav = ({theme, setTheme}) => {
  return (
    <nav
      className={`w-full sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300
      ${
        theme === "dark"
          ? "bg-gray-950/70 border-gray-800 text-white"
          : "bg-white/70 border-gray-200 text-gray-800"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-xl font-bold tracking-wide">
          🍽️ MealFinder
        </h1>

        {/* Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <a href="#" className="hover:text-indigo-500 transition">Home</a>
          <a href="#" className="hover:text-indigo-500 transition">Recipes</a>
          <a href="#" className="hover:text-indigo-500 transition">About</a>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={() =>
            setTheme(theme === "dark" ? "light" : "dark")
          }
          className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md
          ${
            theme === "dark"
              ? "bg-white text-black hover:bg-gray-200"
              : "bg-gray-900 text-white hover:bg-black"
          }`}
        >
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  )
}

export default MealListNav