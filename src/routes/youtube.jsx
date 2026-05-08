import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { IoNotifications, IoPlaySharp } from "react-icons/io5";
import { WiMoonAltFirstQuarter } from "react-icons/wi";
import { LuSearch } from "react-icons/lu";



export const Route = createFileRoute('/youtube')({
  component: RouteComponent,
})


  function useDebounce(value, delay){
    const [debounceValue, setDebounceValue] = useState(value);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setDebounceValue(value);
      }, delay);
    
      return () => {clearTimeout(timeout)}
    }, [value, delay])
    
    return debounceValue;
  }

function RouteComponent() {

  const [sortBy, setSortBy] = useState("");
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const [theme, setTheme] = useState('dark');
  const  [videoArray, setVideoArray] = useState([]);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 500); //500ms gap
  const [loader, setLoader] = useState(false);

  async function fetchYoutubeVideo(){
    setLoader(true);
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/youtube/videos?page=${page}&limit=12&query=${debounceQuery}&sortBy=${sortBy}`, {
        headers: {
          "Content-Type": "application/json"
        }
      })
  
      setVideoArray(response.data.data.data);
      setTotalPage(response.data.data.totalPages);
      // console.log(response.data.data);
      
    } catch (err) {
      console.error(err)
    }
    finally{
      setLoader(false);
    }
  }

  useEffect(() => {
    fetchYoutubeVideo();
  }, [page, sortBy, debounceQuery])
  


  return (
  <>
  {/* Header */}
  <header
    className={`sticky top-0 h-16 z-50 border-b px-4 py-3 flex items-center justify-between ${
      theme === "dark"
        ? "bg-[#0f0f0f] border-[#272727]"
        : "bg-white border-[#e5e5e5]"
    }`}
  >
    {/* Left */}
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1 cursor-pointer">
        <div className="bg-red-600 w-7 h-5 rounded-sm flex items-center justify-center">
          <span className="text-white text-xs font-bold"><IoPlaySharp /></span>
        </div>

        <h1
          className={`font-semibold text-xl tracking-tight ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          YouTube
        </h1>
      </div>
    </div>

    {/* Search */}
    <div className="hidden md:flex items-center w-[40%]">
      <input
        type="text"
        placeholder="Search"
        className={`w-full px-4 py-2 rounded-l-full outline-none ${
          theme === "dark"
            ? "bg-[#121212] border border-[#303030] text-white placeholder:text-gray-400"
            : "bg-white border border-[#e5e5e5] text-black placeholder:text-gray-500"
        }`}
        onChange={(e)=> setQuery(e.target.value)}
      />

      <button
        className={`px-5 py-2 rounded-r-full border border-l-0 ${
          theme === "dark"
            ? "bg-[#222222] border-[#303030] text-white"
            : "bg-[#f2f2f2] border-[#e5e5e5] text-black"
        }`}
      >
        <div className="text-2xl"><LuSearch /></div>
      </button>
    </div>

    {/* Right */}
    <div
      className={`flex items-center gap-4 text-xl ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <button
        onClick={() =>
          theme === "dark" ? setTheme("light") : setTheme("dark")
        }
      >
        <WiMoonAltFirstQuarter />
      </button>

      <button><IoNotifications /></button>

      <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-sm font-bold text-white">
        U
      </div>
    </div>
  </header>

  {/* Tags Section */}
<div
  className={`sticky top-16 -mt-[1px] z-40 px-4 py-3 flex items-center gap-3 overflow-x-hidden scrollbar-hide ${
    theme === "dark"
      ? "bg-[#0f0f0f]"
      : "bg-white"
  } s`}
>
  {/* Sort Button */}
<div className="relative inline-block">
  <select
    value={sortBy}
    onChange={(e)=> setSortBy(e.target.value)}
    className={`appearance-none px-4 py-2 pr-10 rounded-lg text-sm font-medium cursor-pointer outline-none transition ${
      theme === "dark"
        ? "bg-[#272727] text-white hover:bg-[#3a3a3a] border border-[#3a3a3a]"
        : "bg-[#f2f2f2] text-black hover:bg-[#e5e5e5] border border-[#dcdcdc]"
    }`}
  >
    <option value="latest">Latest</option>
    <option value="oldest">Oldest</option>
    <option value="mostViewed">Most Viewed</option>
    <option value="mostLiked">Most Liked</option>
  </select>

  {/* dropdown arrow */}
  <div
    className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
      theme === "dark" ? "text-white" : "text-black"
    }`}
  >
    ▼
  </div>
</div>

  {/* Tags */}
  {[
    "All",
    "Music",
    "Gaming",
    "React JS",
    "JavaScript",
    "Live",
    "News",
    "Podcasts",
    "Cricket",
    "AI",
    "Comedy",
    "Movies",
    "Coding",
    "Tailwind CSS",
    "Anime",
  ].map((tag, idx) => (
    <button
      key={idx}
      className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm transition ${
        theme === "dark"
          ? "bg-[#272727] hover:bg-[#3a3a3a] text-white"
          : "bg-[#f2f2f2] hover:bg-[#e5e5e5] text-black"
      }`}
    >
      {tag}
    </button>
  ))}
</div>

  {/* Videos Section */}
  <div
    className={`min-h-screen px-4 py-6 ${
      theme === "dark" ? "bg-[#0f0f0f]" : "bg-white"
    }`}
  >
    <div className="flex justify-center flex-wrap gap-5">
      {loader ? 
      (<div className="flex justify-center items-center w-full h-[70vh]">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>)
      : videoArray.map((video, idx) => {
        return (
          <a href={`https://www.youtube.com/watch?v=${video?.items?.id}`}
            key={idx}
            className={`cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-200 w-[22rem] ${
              theme === "dark"
                ? "bg-[#181818] hover:bg-[#202020]"
                : "bg-white hover:bg-[#f9f9f9]"
            }`}
          >
            {/* Thumbnail */}
            <div className="relative">
              <img
                src={video.items?.snippet?.thumbnails?.maxres?.url}
                alt={video?.items?.snippet?.title}
                className="w-full h-48 object-cover"
              />

              <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                {video?.items?.contentDetails?.duration.split("T")[1].toLowerCase()}
              </span>
            </div>

            {/* Info */}
            <div className="p-3">
              <h3
                className={`text-sm font-semibold line-clamp-2 ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
              >
                {video?.items?.snippet?.title}
              </h3>

              <p
                className={`text-xs mt-1 ${
                  theme === "dark"
                    ? "text-gray-400"
                    : "text-gray-600"
                }`}
              >
                {video?.items?.snippet?.channelTitle}
              </p>

              <p
                className={`text-xs ${
                  theme === "dark"
                    ? "text-gray-500"
                    : "text-gray-500"
                }`}
              >
                {video?.items?.statistics?.viewCount} views 
                <span> {video?.items?.snippet?.publishedAt.split("T")[0]}</span>
              </p>
            </div>
          </a>
        );
      })}
    </div>
  </div>
  {/* we can also use tailwind dark */}
  <div className={`flex justify-center items-center gap-4 py-6 ${theme === "dark" ? "dark:bg-[#0f0f0f]": "bg-white"}`}>
    <button
      className="px-5 py-2 rounded-lg bg-[#272727] hover:bg-[#3a3a3a] text-white font-medium transition duration-200 shadow-md"
      onClick={()=> setPage(Math.max(1, page - 1))}
      disabled={page === 1}
    >
      Previous
    </button>
      <span className={`${page === 1 ? "text-red-500" : ""}`}>1</span>
      <span className={`${page === 2 ? "text-red-500" : ""}`}>2</span>
      <span className={`${page === 3 ? "text-red-500" : ""}`}>3</span>
      <span className={`${page >= 4 ? "text-red-500" : ""}`}>...</span>
    <button
      className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition duration-200 shadow-md"
      onClick={()=> setPage(Math.min(totalPage, page + 1))}
      disabled={page === totalPage}
    >
      Next
    </button>
  </div>

</>
  )
}
