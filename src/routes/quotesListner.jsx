import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios';
import { useEffect, useState } from 'react';
import QuotesNav from '../components/QuotesListner/QuotesNav';
import QuotesPageBtn from '../components/QuotesListner/QuotesPageBtn';
import QuotesLoader from '../components/QuotesListner/QuotesLoader';

export const Route = createFileRoute('/quotesListner')({
  component: RouteComponent,
})

function RouteComponent() {
    const [theme, setTheme] = useState("dark");
    const [quotesArray, setQuotesArray] = useState([]);
    const [loader, setLoader] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);

    async function fetchQuotes() {
      setLoader(true);
      try {
        const response = await axios.get(`https://api.freeapi.app/api/v1/public/quotes?page=${page}&limit=9`);

        console.log(response.data.data)
        setQuotesArray(response.data.data.data)
        setTotalPage(response.data.data.totalPages)
      } 
      catch (err) {
        console.error(err);
      }
      finally{
        setLoader(false);
      }
    }

    useEffect(()=>{
      fetchQuotes()
    }, [page]);


  return (

    <>
    {/* NavBar */}
    <QuotesNav theme={theme} setTheme={setTheme} />
    <div
  className={`relative min-h-screen overflow-hidden px-4 py-10 transition-colors duration-300 ${
    theme === "dark"
      ? "bg-[#020617]"
      : "bg-gradient-to-br from-rose-100 via-amber-50 to-yellow-100"
  }`}
>
  {/* BACKGROUND EFFECTS */}
  <div
    className={`absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 ${
      theme === "dark" ? "bg-blue-500" : "bg-pink-300"
    }`}
  ></div>

  <div
    className={`absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-30 ${
      theme === "dark" ? "bg-purple-500" : "bg-yellow-300"
    }`}
  ></div>

  <div
    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-3xl opacity-20 ${
      theme === "dark" ? "bg-cyan-400" : "bg-orange-200"
    }`}
  ></div>

  {/* OPTIONAL GRID EFFECT */}
  <div
    className={`absolute inset-0 ${
      theme === "dark"
        ? "bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]"
        : "bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)]"
    } bg-[size:40px_40px]`}
  ></div>

  {/* MAIN CONTENT */}
  <div className="relative z-10 flex justify-center flex-wrap gap-3">
    {loader
      ? <QuotesLoader theme={theme} />
      : quotesArray.map((quote) => {
          return (
            <div
              key={quote.id}
              className={`relative w-full max-w-md min-h-[300px] rounded-[40px] p-7 shadow-2xl overflow-hidden transition-all duration-300 border ${
                theme === "dark"
                  ? "bg-[#0b1220] text-white border-slate-700"
                  : "bg-gradient-to-br from-rose-50 via-amber-50 to-yellow-100 text-zinc-900 border-zinc-300"
              }`}
            >
              {/* CARD BLOBS */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400/30 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl"></div>

              {/* QUOTE ICON */}
              <div className="absolute top-4 left-5 text-7xl opacity-10 select-none">
                ❝
              </div>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 w-60%">
                {quote?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-slate-800 text-cyan-300 border border-slate-700"
                        : "bg-white/80 text-orange-600 border border-orange-200 shadow-sm"
                    }`}
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* ID BADGE */}
              <div className="absolute top-5 right-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold tracking-widest ${
                    theme === "dark"
                      ? "bg-slate-800 text-slate-200 border border-slate-600"
                      : "bg-white/70 text-zinc-700 border border-zinc-300"
                  }`}
                >
                  ID #{quote?.id}
                </span>
              </div>

              {/* MAIN CONTENT */}
              <div className="relative z-10 flex flex-col justify-center h-full gap-6">
                <p
                  className="text-xl md:text-xl leading-10 font-semibold italic tracking-wide"
                  style={{ fontFamily: "serif" }}
                >
                  “{quote?.content}”
                </p>

                <div className="flex items-center gap-3">
                  <div className="h-[2px] flex-1 bg-current opacity-20"></div>
                  <span className="text-lg">✦</span>
                  <div className="h-[2px] flex-1 bg-current opacity-20"></div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        theme === "dark"
                          ? "bg-slate-800 text-blue-300"
                          : "bg-white text-orange-600 shadow"
                      }`}
                    >
                      {quote?.author?.charAt(0)}
                    </div>

                    <span
                      className="text-lg font-semibold"
                      style={{ fontFamily: "cursive" }}
                    >
                      {quote?.author}
                    </span>
                  </div>

                  <span className="text-sm opacity-60 italic">
                    {quote?.authorSlug}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
  </div>
  {/* pagination button */}
  <QuotesPageBtn theme={theme} totalPage={totalPage} page={page} setPage={setPage} />
</div>
</>
  )
}
