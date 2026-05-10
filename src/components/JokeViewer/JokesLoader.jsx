import React from 'react'

const jokesLoader = () => {
  return (
    <div className="flex justify-center items-center w-full h-[70vh]">

  {/* NOTE LOADER */}
  <div className="relative w-[280px] h-[180px] rounded-[30px] border-[3px] border-zinc-700 bg-[#f8f6f2] shadow-2xl overflow-hidden">

    {/* TOP RINGS */}
    <div className="absolute top-0 left-0 w-full flex justify-around -translate-y-1/2 px-6">
      {[1,2,3,4].map((item)=>(
        <div
          key={item}
          className="w-5 h-10 rounded-full border-2 border-zinc-700 bg-yellow-200"
        />
      ))}
    </div>

    {/* LINES */}
    <div className="absolute inset-0 flex flex-col gap-6 pt-10 px-4 opacity-30">
      {[1,2,3,4].map((item)=>(
        <div
          key={item}
          className="w-full h-[2px] bg-zinc-400"
        />
      ))}
    </div>

    {/* CENTER LOADER */}
    <div className="relative z-10 flex flex-col items-center justify-center h-full">

      {/* SPINNER */}
      <div className="relative w-16 h-16">

        <div className="absolute inset-0 rounded-full border-4 border-pink-200"></div>

        <div className="absolute inset-0 rounded-full border-4 border-zinc-800 border-t-transparent animate-spin"></div>

      </div>

      {/* TEXT */}
      <p
        className="mt-5 text-2xl text-zinc-800"
        style={{ fontFamily: "cursive" }}
      >
        Loading Jokes...
      </p>

      {/* STARS */}
      <div className="flex gap-3 mt-3 text-zinc-700 text-lg animate-pulse">
        <span>✦</span>
        <span>•</span>
        <span>✦</span>
      </div>

    </div>

    {/* BOTTOM STRIP */}
    <div className="absolute bottom-4 left-4 right-4 h-5 bg-pink-200 rounded-md"></div>

  </div>

</div>
  )
}

export default jokesLoader