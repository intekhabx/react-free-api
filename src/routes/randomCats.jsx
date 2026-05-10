import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/randomCats')({
  component: RouteComponent,
})

function RouteComponent() {
  const [cat, setCat] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [loader, setLoader] = useState(false);

  async function fetchRandomCat(){
    setLoader(true);
    try {
      const response = await fetch("https://api.freeapi.app/api/v1/public/cats/cat/random");
      const data = await response.json();

      setCat(data.data);
      console.log(data.data)
    } 
    catch (err) {
      console.error(err);
    }
    finally{
      setLoader(false);
    }
  }

  useEffect(()=>{
    fetchRandomCat();
  }, [])


  return (
  <div
  className={`min-h-screen transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-950 text-white"
      : "bg-slate-100 text-slate-900"
  }`}
>
  <div className="max-w-6xl mx-auto px-4 py-10">

    {/* HEADER */}
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">

      <h1 className="text-3xl md:text-4xl font-bold">
        🐱 Random Cat Generator
      </h1>

      <button
        onClick={()=> {theme === "dark" ? setTheme("light") : setTheme("dark")}}
        className={`px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
          theme === "dark"
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-slate-900 text-white hover:bg-slate-700"
        }`}
      >
        Toggle Theme
      </button>

    </div>

    {/* CARD */}
    {loader ? 
    (<div className="flex justify-center items-center w-full h-[70vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>)
    :
          <div
      className={`grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-900 border-slate-700"
          : "bg-white border-slate-200"
      }`}
    >

      {/* IMAGE */}
      <div className="h-[300px] lg:h-[40rem]">
        <img
          src={cat?.image}
          alt={cat?.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8 flex flex-col gap-5">

        <div className="flex items-center justify-between flex-wrap gap-3">

          <h2 className="text-3xl font-bold">
            {cat?.name}
          </h2>

          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {cat?.origin}
          </span>

        </div>

        <p
          className={`leading-7 ${
            theme === "dark"
              ? "text-slate-300"
              : "text-slate-600"
          }`}
        >
          {cat?.description}
        </p>

        {/* INFO GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <div
            className={`rounded-2xl p-4 border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-1">
              Temperament
            </p>

            <p className="font-semibold">
              {cat?.temperament}
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-1">
              Life Span
            </p>

            <p className="font-semibold">
              {cat?.life_span} Years
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-1">
              Weight
            </p>

            <p className="font-semibold">
              {cat?.weight?.metric} KG
            </p>
          </div>

          <div
            className={`rounded-2xl p-4 border ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700"
                : "bg-slate-50 border-slate-200"
            }`}
          >
            <p className="text-sm opacity-70 mb-1">
              Intelligence
            </p>

            <p className="font-semibold">
              {cat?.intelligence} / 5
            </p>
          </div>

        </div>

        {/* BUTTON */}
        <button
          onClick={()=> fetchRandomCat()}
          className={`mt-4 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
            theme === "dark"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-slate-900 text-white hover:bg-slate-700"
          }`}
        >
          Get Random Cat
        </button>

      </div>

    </div>
    }
  </div>
</div>
  )
}
