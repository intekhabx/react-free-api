import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect } from 'react';
import jokesLoader from '../components/JokeViewer/jokesLoader';
import JokePageBtn from '../components/JokeViewer/JokePageBtn';
import JokeNavBar from '../components/JokeViewer/JokeNavBar';

export const Route = createFileRoute('/jokesViewer')({
  component: RouteComponent,
})

function RouteComponent() {
  const [theme, setTheme] = useState("dark");
  const [jokes, setJokes] = useState([]);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);

  async function fetchJokes(){
    setLoader(true);
    try {
      const response = await fetch(`https://api.freeapi.app/api/v1/public/randomjokes?page=${page}&limit=9`, {
        headers: {
          "Content-Type": "application/json"
        }
      })

      const data = await response.json();
      setTotalPage(data.data.totalPages);
      setJokes(data.data.data);
    } 
    catch (err) {
      console.error(err)
    }
    finally{
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchJokes();
  }, [page])

  return(
    <>
    {/* navbar */}
    <JokeNavBar theme={theme} setTheme={setTheme} />
    <div
  className={`py-4 min-h-screen w-full relative overflow-hidden flex justify-center flex-wrap gap-3 transition-all duration-300 ${
    theme === "dark"
      ? "bg-slate-950 text-white before:absolute before:top-10 before:left-0 before:w-72 before:h-72 before:bg-purple-500/20 before:blur-3xl before:rounded-full after:absolute after:bottom-0 after:right-0 after:w-80 after:h-80 after:bg-blue-500/20 after:blur-3xl after:rounded-full"
      : "bg-[#dbe4f3] text-zinc-900 before:absolute before:top-10 before:left-0 before:w-72 before:h-72 before:bg-white/40 before:blur-3xl before:rounded-full after:absolute after:bottom-0 after:right-0 after:w-80 after:h-80 after:bg-sky-200/40 after:blur-3xl after:rounded-full"
  }`}
>
      {loader ? 
        <jokesLoader />
      :
      jokes.map((joke)=> (
        <div
    className={`relative w-full max-w-sm min-h-[260px] rounded-[35px] border-[3px] p-5 shadow-xl overflow-hidden transition-all duration-300
    ${
      theme === "dark"
        ? "bg-zinc-900 border-zinc-700 text-white"
        : "bg-[#f8f6f2] border-zinc-700 text-zinc-900"
    }`}
  >
    {/* TOP RINGS */}
    <div className="absolute top-0 left-0 w-full flex justify-around -translate-y-1/2 px-6">
      {[1,2,3,4].map((ring)=>(
        <div
          key={ring}
          className={`w-5 h-10 rounded-full border-2 ${
            theme === "dark"
              ? "bg-yellow-300 border-zinc-700"
              : "bg-yellow-200 border-zinc-700"
          }`}
        />
      ))}
    </div>

    {/* LINES BACKGROUND */}
    <div className="absolute inset-0 opacity-20 pointer-events-none flex flex-col gap-8 pt-16 px-4">
      {[1,2,3,4,5].map((line)=>(
        <div
          key={line}
          className={`h-[2px] w-full ${
            theme === "dark"
              ? "bg-zinc-500"
              : "bg-zinc-400"
          }`}
        />
      ))}
    </div>

    {/* CONTENT */}
    <div className="relative z-10 flex flex-col h-full">
      {/* CATEGORY */}
      <div className="flex jokes-center justify-between mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
          ${
            theme === "dark"
              ? "bg-pink-500/20 text-pink-300 border border-pink-400/30"
              : "bg-pink-100 text-pink-700 border border-pink-300"
          }`}
        >
          {joke?.categories?.[0] || "funny"}
        </span>

        <span className="text-xs opacity-60">
          #{joke?.id}
        </span>

      </div>

      {/* JOKE TEXT */}
      <p
        className={`text-[14px] leading-9 font-medium tracking-wide flex-1
        ${
          theme === "dark"
            ? "text-zinc-100"
            : "text-zinc-800"
        }`}
        style={{
          fontFamily: "cursive"
        }}
      >
        {joke?.content}
      </p>

      {/* STARS */}
      <div className="flex jokes-center justify-between mt-6 opacity-70 text-lg">
        <span>✦</span>
        <span>•</span>
        <span>✦</span>
        <span>•</span>
        <span>✦</span>
      </div>

      {/* BOTTOM STRIP */}
      <div
        className={`mt-4 h-6 rounded-md
        ${
          theme === "dark"
            ? "bg-pink-400/30"
            : "bg-pink-200"
        }`}
      />

    </div>
        </div>
      ))}

      {/* pagination buttons */}
      <JokePageBtn page={page} setPage={setPage} totalPage={totalPage} />
    </div>
  </>
  )
}
