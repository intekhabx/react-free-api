import React from 'react'

const MealLoader = ({theme}) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative flex flex-col items-center gap-4">

        {/* Spinner */}
        <div
          className={`w-14 h-14 rounded-full border-4 animate-spin
          ${
            theme === "dark"
              ? "border-gray-700 border-t-indigo-500"
              : "border-gray-200 border-t-indigo-500"
          }`}
        ></div>

        {/* Glow Dot Animation */}
        <div className="flex gap-2">
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce"></span>
        </div>

        {/* Text */}
        <p
          className={`text-sm tracking-wide font-medium
          ${
            theme === "dark" ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Loading delicious meals...
        </p>
      </div>
    </div>
  );
}

export default MealLoader