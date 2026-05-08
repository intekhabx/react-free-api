import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { LuSearch } from "react-icons/lu";
import { FiMoon, FiSun } from "react-icons/fi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { GoX } from "react-icons/go";


function useDebounceFn(query, delay){
  const [debounceValue, setDebounceValue] = useState(query);

  useEffect(() => {
    const timeout = setTimeout(()=>{
      setDebounceValue(query);
    }, delay)
  
    return () => {clearTimeout(timeout)}
  }, [query]);

  return debounceValue;
}

export const Route = createFileRoute('/randomUsers')({
  component: RouteComponent,
})

function RouteComponent() {
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);

  const [usersArray, setUsersArray] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [user, setUser] = useState(null);
  const [query, setQuery] = useState("");
  const [filteredUser, setFilteredUser] = useState([]);
  const debounceQuery = useDebounceFn(query, 500); // 500ms



useEffect(() => {
  if(query.trim() === ""){
    setFilteredUser(usersArray);
    return;
  }

  const searched = usersArray.filter((user)=>{
    const fullname = `${user?.name?.title} ${user?.name?.first} ${user?.name?.last}`.toLowerCase();
    return fullname.includes(query.toLowerCase());
  })

  setFilteredUser(searched);
}, [debounceQuery, usersArray])



  async function getRandomUsers() {
    setLoader(true);
    try {
      const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomusers?page=${page}&limit=18`);
  
      setUsersArray(response.data.data.data)
      setFilteredUser(response.data.data.data)
      setTotalPage(response.data.data.totalPages)
      // console.log(response);
      
    } catch (err) {
      console.error(err)
    }
    finally{
      setLoader(false);
    }
  }

  useEffect(() => {
    getRandomUsers();
  }, [page])
  


  return (
    <div className='flex flex-col justify-center'>
  {/* HEADER */}
<header
  className={`w-full flex items-center justify-between px-6 py-4 shadow-md transition-colors ${
    theme === "dark" ? "bg-gray-900" : "bg-white"
  } sticky top-0 z-10`}
>
  
  {/* Logo */}
  <div
    className={`text-xl font-bold ${
      theme === "dark" ? "text-white" : "text-gray-800"
    }`}
  >
    Random User
  </div>

  {/* Search + Toggle */}
  <div className="flex items-center gap-6">
    
    <div className={`flex items-center gap-3 rounded-full w-full ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-gray-200 text-gray-800 border-gray-600"
        }`}>
      <input
        onChange={(e)=> setQuery(e.target.value)}
        type="text"
        placeholder="Search users..."
        className={`px-3 py-2 rounded-full w-[80%] border focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-gray-50 text-gray-800 border-gray-300"
        }`}
      />
      <LuSearch className='text-2xl' />
    </div>

    <button
      onClick={()=> setTheme(theme === 'dark' ? "light": "dark")}
      className={`px-3 py-2 rounded-lg transition hover:opacity-80 cursor-pointer ${
        theme === "dark"
          ? "bg-gray-700 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      {theme === "dark" ? <FiSun className='text-xl' /> : <FiMoon className='text-xl' />}
    </button>

  </div>
</header>

  {/* CONTAINER */}
  <div
    className={`flex justify-center gap-3 flex-wrap pt-3 min-h-screen transition-colors ${
      theme === "dark" ? "bg-gray-950" : "bg-gray-100"
    }`}
  >
    
    {loader ? 
    (<div className="flex justify-center items-center w-full h-[70vh]">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>)
    : filteredUser.map((user, idx) => (
      <div
        onClick={()=> setUser(user)}
        key={idx}
        className={`max-w-sm rounded-2xl shadow-lg p-5 flex gap-4 items-center w-96 h-36 border transition-all hover:scale-[1.02] cursor-pointer
        ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-gray-800 border-gray-200"
        }`}
      >
        
        {/* Avatar */}
        <img
          src={user?.picture?.large}
          alt={`${user?.name.first} ${user?.name.last}`}
          className="w-20 h-20 rounded-full object-cover border"
        />

        {/* Info */}
        <div className="flex flex-col">
          
          <h2 className="text-lg font-semibold">
            {user?.name.title} {user?.name.first} {user?.name.last}
          </h2>

          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
            {user?.email}
          </p>

          <p className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}>
            {user?.phone}
          </p>

          <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {user?.location.city}, {user?.location.state}
          </p>

          <span className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`}>
            Age: {user?.dob.age}
          </span>

        </div>
      </div>
    ))}
  </div>
  {/* Pagination buttons */}
  <div className={`flex items-center justify-center gap-4 py-6  ${
      theme === "dark" ? "bg-gray-950" : "bg-gray-100"
    }`}>
  
  {/* Previous Button */}
  <button
    onClick={()=> setPage(Math.max(1, page - 1))}
    disabled={page === 1}
    className="flex items-center gap-2 p-4 rounded-xl bg-slate-400 text-white hover:bg-slate-500 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
    <FaAngleLeft className='text-xl' />
  </button>

  <span className={`${theme === 'dark' ? "text-white" : "text-black"}`}>
    Page {page} of {totalPage}
  </span>
  {/* Next Button */}
  <button
    onClick={()=> setPage(Math.min(totalPage, page + 1))}
    disabled={page === totalPage}
    className="flex items-center gap-2 p-4 rounded-xl bg-slate-400 text-white hover:bg-slate-500 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
  >
    <FaAngleRight className='text-xl' />
  </button>

  </div>


  {/* user card -- hidden-->show on click*/}
  <div className={`justify-center items-center ${user === null ? "hidden": "flex"} fixed inset-0 backdrop-blur-md w-full h-full z-20`}>
  <div
  className={`w-[95%] md:w-[850px] rounded-2xl shadow-xl p-6 flex flex-col md:flex-row gap-6 transition-colors
  ${
    theme === "dark"
      ? "bg-gray-800 text-white"
      : "bg-white text-gray-800"
  }`}
>
  
  {/* Left Side - Image */}
  <div className="flex justify-center md:justify-start">
    <img
      src={user?.picture?.large}
      alt={`${user?.name?.first} ${user?.name?.last}`}
      className="w-96 h-96 rounded-2xl object-cover border-4 border-gray-300"
    />
  </div>

  {/* Right Side - Details */}
  <div className="flex-1 flex flex-col gap-2 relative">
    
    {/* cross button */}
    <span
    onClick={()=> setUser(null)}
    className={`cursor-pointer absolute right-[-2.5rem] top-[-2.5rem] p-2 rounded-full transition ${
      theme === "dark"
      ? "bg-slate-700 hover:bg-red-600 text-white"
      : "bg-slate-200 hover:bg-slate-300 text-black"
      }`}
    >
      <GoX className="text-3xl font-bold" />
    </span>
    {/* Name */}
    <h2 className="text-2xl font-bold">
      {user?.name?.title} {user?.name?.first} {user?.name?.last}
    </h2>

    {/* Username */}
    <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
      <strong>Username :</strong> {user?.login?.username}
    </p>

    {/* Email */}
    <p className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
      <strong>Email :</strong> {user?.email}
    </p>

    {/* Age + Gender */}
    <div className="flex flex-wrap gap-4">
      <p><strong>Age :</strong> {user?.dob?.age}</p>
      <p><strong>Gender :</strong> {user?.gender}</p>
    </div>

    {/* Country */}
    <p>
      <strong>Country :</strong> {user?.location?.country}
    </p>

    {/* Phone */}
    <div className="flex flex-wrap gap-4">
      <p><strong>Cell :</strong> {user?.cell}</p>
      <p><strong>Phone :</strong> {user?.phone}</p>
    </div>

    {/* Address */}
    <div className="mt-2">
      <p>
        <strong>State :</strong> {user?.location?.state}
      </p>

      <p>
        <strong>City :</strong> {user?.location?.city}
      </p>

      <p>
        <strong>Street :</strong> {user?.location?.street?.number},{" "}
        {user?.location?.street?.name}
      </p>
    </div>

    {/* Timezone */}
    <p className={theme === "dark" ? "text-gray-400" : "text-gray-500"}>
      <strong>Timezone :</strong> {user?.location?.timezone?.description}
    </p>

    {/* Button */}
    <a href={`https://www.google.com/maps?q=${user?.location?.coordinates?.latitude},${user?.location?.coordinates?.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 px-5 py-2 rounded-xl font-medium transition w-fit bg-lime-700 hover:bg-lime-600 text-white cursor-pointer"
    >
      Open in Maps
    </a>

  </div>
</div>
  </div>
</div>
  )
}
