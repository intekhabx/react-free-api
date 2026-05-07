import React, { useEffect, useState } from 'react';
import axios from 'axios'

export const GetMyProfile = () => {
  const [user, setUser] = useState({});

  // we use axios
  async function fetchMyProfile(){
    const accessToken = localStorage.getItem("accessToken")
    const response = await axios.get(`https://api.freeapi.app/api/v1/ecommerce/profile`, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    })

    setUser(response.data.data);
  }


  useEffect(() => {
    fetchMyProfile();
  }, [])
  

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">

  <div className="w-96 bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-700">

    <h2 className="text-xl font-bold text-center mb-6 text-white">
      User Profile
    </h2>

    <div className="space-y-4">

      <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400 font-medium">First Name</span>
        <span className="text-white font-semibold">{user.firstName}</span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400 font-medium">Last Name</span>
        <span className="text-white font-semibold">{user.lastName}</span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400 font-medium">Phone</span>
        <span className="text-white font-semibold">{user.phoneNumber}</span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400 font-medium">Country Code</span>
        <span className="text-white font-semibold">{user.code || '+91'}</span>
      </div>

      <div className="flex justify-between border-b border-gray-700 pb-2">
        <span className="text-gray-400 font-medium">Owner ID</span>
        <span className="text-white font-semibold text-xs">
          {user.owner}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-400 font-medium">Updated At</span>
        <span className="text-white font-semibold text-sm">
          {user.updatedAt?.split('T')[0]}
        </span>
      </div>

    </div>

  </div>

</div>
  )
}
