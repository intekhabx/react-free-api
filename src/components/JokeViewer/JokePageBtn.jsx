import React from 'react'

const JokePageBtn = ({page, setPage, totalPage}) => {
  return (
    <div className="flex items-center justify-center gap-5 mt-10">

  {/* PREVIOUS BUTTON */}
  <button
    onClick={()=> setPage(Math.max(1, page - 1))}
    disabled={page === 1}
    className="
      px-6 py-3
      rounded-full
      border-[3px]
      border-zinc-700
      bg-[#f8f6f2]
      text-zinc-800
      font-semibold
      shadow-md
      hover:scale-105
      hover:bg-yellow-100
      active:scale-95
      transition-all
      duration-300
      flex items-center gap-2
    "
    style={{ fontFamily: "cursive" }}
  >
    ← Prev
  </button>

  {/* PAGE INFO */}
  <div
    className="
      px-5 py-2
      rounded-full
      border-2
      border-dashed
      border-zinc-500
      bg-white/60
      text-zinc-700
      text-sm
      shadow-sm
      cursor-pointer
    "
    style={{ fontFamily: "cursive" }}
  >
    Page {page} of {totalPage}
  </div>

  {/* NEXT BUTTON */}
  <button
    onClick={()=> setPage(Math.min(totalPage, page + 1))}
    disabled={page === totalPage}
    className="
      cursor-pointer
      px-6 py-3
      rounded-full
      border-[3px]
      border-zinc-700
      bg-yellow-200
      text-zinc-900
      font-semibold
      shadow-md
      hover:scale-105
      hover:bg-yellow-300
      active:scale-95
      transition-all
      duration-300
      flex items-center gap-2
    "
    style={{ fontFamily: "cursive" }}
  >
    Next →
  </button>

</div>
  )
}

export default JokePageBtn