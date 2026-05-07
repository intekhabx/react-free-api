import { createFileRoute } from '@tanstack/react-router'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const Route = createFileRoute('/randomUsers')({
  component: RouteComponent,
})

function RouteComponent() {
  const [totalPage, setTotalPage] = useState(10);
  const [page, setPage] = useState(1);

  const [usersArray, setUsersArray] = useState([]);
  const [theme, setTheme] = useState("dark");


  async function getRandomUsers() {
    const response = await axios.get(`https://api.freeapi.app/api/v1/public/randomusers`);

    setUsersArray(response.data.data.data)
    console.log(response.data.data);
  }

  useEffect(() => {
    getRandomUsers()
  }, [])
  


  return (
    <>
  {/* HEADER */}
<header
  className={`w-full flex items-center justify-between px-6 py-4 shadow-md transition-colors ${
    theme === "dark" ? "bg-gray-900" : "bg-white"
  }`}
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
  <div className="flex items-center gap-4">
    
    <input
      type="text"
      placeholder="Search users..."
      className={`px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
        theme === "dark"
          ? "bg-gray-800 text-white border-gray-700"
          : "bg-gray-50 text-gray-800 border-gray-300"
      }`}
    />

    <button
      className={`px-3 py-2 rounded-lg transition hover:opacity-80 ${
        theme === "dark"
          ? "bg-gray-700 text-white"
          : "bg-gray-200 text-gray-800"
      }`}
    >
      Toggle Theme
    </button>

  </div>
</header>

  {/* CONTAINER */}
  <div
    className={`flex justify-center gap-3 flex-wrap pt-3 min-h-screen transition-colors ${
      theme === "dark" ? "bg-gray-950" : "bg-gray-100"
    }`}
  >
    
    {usersArray.map((user, idx) => (
      <div
        key={idx}
        className={`max-w-sm rounded-2xl shadow-lg p-5 flex gap-4 items-center w-96 border transition-all hover:scale-[1.02]
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
</>
  )
}
