import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';
import MealPageBtn from '../components/MealList/MealPageBtn';
import MealLoader from '../components/MealList/MealLoader';
import MealCardBox from '../components/MealList/MealCardBox';
import MealListNav from '../components/MealList/MealListNav';

export const Route = createFileRoute('/mealList')({
  component: RouteComponent,
})

function RouteComponent() {
  const [theme, setTheme] = useState("dark");
  const [meals , setMeals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const fetchMeal = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://api.freeapi.app/api/v1/public/meals?page=${page}&limit=18`);

      const result = await res.json();
      // console.log(result.data);
      setTotalPage(result.data.totalPages)
      setMeals(result.data.data);
    } 
    catch (error) {
      console.error("Error fetching meal:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeal();
  }, [page]);


  return (
  <>
  {/* Navbar */}
  <MealListNav theme={theme} setTheme={setTheme} />
  <div
    className={`min-h-screen w-full relative overflow-hidden transition-all duration-300
    ${
      theme === "dark"
        ? "bg-gray-950 text-white"
        : "bg-gray-50 text-gray-800"
    }`}
  >
    {/* soft glow blobs */}
    <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-indigo-500/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-500/20 blur-3xl rounded-full"></div>

      {/* show mealCardbox */}
      {selectedMeal ? 
      <div className='my-4 z-20'>
        {/* show meal card */}
        <MealCardBox theme={theme} meal={selectedMeal} setSelectedMeal={setSelectedMeal}/>
      </div>
      :
      <div>
        <div className="py-5 flex flex-wrap gap-5 justify-center relative z-10">
          {loading ? 
            // Loader component
            <MealLoader theme={theme} />
          : 
          meals.map((meal) => (
            <div
            onClick={()=> setSelectedMeal(meal)}
            key={meal?.idMeal}
      className={`cursor-pointer w-full max-w-sm rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:scale-[1.02]
      ${
        theme === "dark"
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-gray-800 border-gray-200"
      }`}
    >
      {/* Image */}
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-40 object-cover"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="font-bold text-lg mb-1">{meal.strMeal}</h2>

        <p className="text-xs opacity-70 mb-2">
          {meal.strCategory} • {meal.strArea}
        </p>

        <p className="text-xs opacity-80 line-clamp-3">
          {meal.strInstructions}
        </p>
      </div>
            </div>
          ))
          }
        </div>
        {/* pagination button */}
        <MealPageBtn page={page} setPage={setPage} theme={theme} totalPage={totalPage}/>
      </div>
      }
  </div>
  </>
  );
}
