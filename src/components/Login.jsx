import React, { useEffect, useState } from 'react'

function Login({isLogin, setIsLogin}) {
  const [value, setValue] = useState({
    username:"",
    password: "",
  })
  const [display, setDisplay] = useState(false);
  const [response, setResponse] = useState(null);
  const [accessToken, setAccessToken] = useState("");


  function handleOnChange(fieldName){
    return (e)=>{
      return setValue({...value, [fieldName]: e.target.value});
    }
  }


  async function handleOnSubmit(e){
    e.preventDefault();

    const response = await fetch(`https://api.freeapi.app/api/v1/users/login`, {method: "POST", headers:{
      "Content-Type": "application/json"
    },
    body: JSON.stringify(value)
    })

    const result = await response.json();
    // console.log(result)
    if(response.ok){
      const data = result?.data;
      setAccessToken(data.accessToken);
      // we are adding accessToken in localstorage for ecommerce
      localStorage.setItem("accessToken", data.accessToken); //just for access token in other component
      localStorage.setItem("refreshToken", data.refreshToken);
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    setResponse(result);
  }

  useEffect(() => {
    setDisplay(true);

    const timeout = setTimeout(() => {
      setDisplay(false);
    }, 3000);

    return () => {
      clearTimeout(timeout)
    }
  }, [response]);
  

  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
  {display && response && <div className={response?.success ? "bg-green-800 rounded-sm p-2 font-bold mb-3" : "bg-red-600 rounded-sm p-2 font-bold mb-3"}>{response?.message}</div>}
  <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

    <h2 className="text-2xl font-bold text-center text-white mb-6">
      Login
    </h2>

    <form onSubmit={handleOnSubmit} className="space-y-4">

      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Username</label>
        <input
          type="text"
          placeholder="John Doe"
          onChange={handleOnChange("username")}
          className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          placeholder="••••••••"
          onChange={handleOnChange("password")}
          className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        Login
      </button>

    </form>

    {/* Login link */}
    <p className="text-sm text-center text-gray-400 mt-4">
      Create new Account?{" "}
      <a onClick={() => setIsLogin(false)} className="text-blue-400 hover:underline cursor-pointer">
        Create Account
      </a>
    </p>

  </div>
</div>
  )
}

export default Login