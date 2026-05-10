import React from 'react'

const MealCardBox = ({theme, meal, setSelectedMeal}) => {
  return (
        <div
          className={`max-w-4xl relative mx-auto rounded-2xl overflow-hidden shadow-xl transition-all duration-300 border
          ${
            theme === "dark"
              ? "bg-gray-900 text-white border-gray-700"
              : "bg-white text-gray-800 border-gray-200"
          }`}
        >
          {/* remove item button */}
          <button
            onClick={() => setSelectedMeal(null)}
            className={`z-30 absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full text-xl font-bold transition-all duration-300 shadow-lg
          ${
            theme === "dark"
              ? "bg-white/10 text-white hover:bg-red-500 hover:text-white"
              : "bg-black/10 text-gray-800 hover:bg-red-500 hover:text-white"
          }`}>
          ✕
          </button>

          {/* Image */}
          <div className="relative">
            <img
              src={meal?.strMealThumb}
              alt={meal?.strMeal}
              className="w-full h-72 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

            <h1 className="absolute bottom-4 left-5 text-3xl font-bold tracking-wide">
              {meal?.strMeal}
            </h1>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {meal?.strTags?.split(",").map((tag, i) => (
                <span
                  key={i}
                  className={`px-3 py-1 text-xs rounded-full font-medium
                  ${
                    theme === "dark"
                      ? "bg-gray-800 text-green-300"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Category & Area */}
            <div className="flex justify-between text-sm opacity-80">
              <p>🍛 {meal?.strCategory}</p>
              <p>🌍 {meal?.strArea}</p>
            </div>

            {/* Instructions */}
            <div
              className={`p-4 rounded-xl leading-relaxed text-sm border
              ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <h2 className="font-semibold mb-2 text-base">Instructions</h2>
              <p className="whitespace-pre-line">{meal.strInstructions}</p>
            </div>

            {/* Ingredients */}
            <div>
              <h2 className="font-semibold mb-3 text-base">Ingredients</h2>
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 20 }).map((_, i) => {
                  const ingredient = meal[`strIngredient${i + 1}`];
                  const measure = meal[`strMeasure${i + 1}`];

                  if (!ingredient) return null;

                  return (
                    <div
                      key={i}
                      className={`flex justify-between px-3 py-2 rounded-lg text-sm border
                      ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <span>{ingredient}</span>
                      <span className="opacity-70">{measure}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* YouTube Button */}
            <a
              href={meal?.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-2"
            >
              <button
                className={`px-5 py-2 rounded-xl font-medium transition-all duration-200
                ${
                  theme === "dark"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-red-500 hover:bg-red-600 text-white"
                }`}
              >
                ▶ Watch Recipe
              </button>
            </a>
          </div>
        </div>
  )
}

export default MealCardBox