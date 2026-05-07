import { useEffect, useState } from 'react';



const Register = ({isLogin, setIsLogin}) => {
  const [roleOpen, setRoleOpen] = useState(false);
  const [value, setValue] = useState({
    username: "",
    email: "",
    role: "USER",
    password: ""
  })
  const [response, setResponse] = useState(null);
  const [display, setDisplay] = useState(false);


function handleOnChange(fieldName){
  return (e) =>{
    return setValue({...value, [fieldName]: e.target.value});
  }
}


async function handleOnSubmit(e){
  e.preventDefault();

  const response = await fetch(`https://api.freeapi.app/api/v1/users/register`, {method: "POST", headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(value)
  })

  const result = await response.json();
  setResponse(result);
}


useEffect(() => {
  setDisplay(true);
  const timeout = setTimeout(() => {
    setDisplay(false);
  }, 3000);

  return () => {
    clearTimeout(timeout);
  }
}, [response])




  return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950">
  {display && response && <div className={response?.success ? "bg-green-800 rounded-sm p-2 font-bold mb-3" : "bg-red-600 rounded-sm p-2 font-bold mb-3"}>{response?.message}</div>}
  <div className="w-full max-w-md bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-800">

    <h2 className="text-2xl font-bold text-center text-white mb-6">
      Register
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

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          placeholder="john.doe@example.com"
          onChange={handleOnChange("email")}
          className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* CUSTOM ROLE SELECT */}
      <div className="relative">
        <label className="block text-sm font-medium text-gray-300">Role</label>

        {/* Trigger */}
        <button
          type="button"
          onClick={() => setRoleOpen(!roleOpen)}
          className="w-full mt-1 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg 
                     flex justify-between items-center hover:border-blue-500"
        >
          Select Role
          <span>▾</span>
        </button>

        {/* Dropdown */}
        {roleOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            
            <div
              onClick={() => {
                handleOnChange("role")({ target: { value: "USER" } });
                setRoleOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
            >
              USER
            </div>

            <div
              onClick={() => {
                handleOnChange("role")({ target: { value: "ADMIN" } });
                setRoleOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer text-white"
            >
              ADMIN
            </div>

          </div>
        )}
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
        Register
      </button>

    </form>

    {/* Login link */}
    <p className="text-sm text-center text-gray-400 mt-4">
      Already have an account?{" "}
      <button onClick={() => setIsLogin(true)} className="text-blue-400 hover:underline cursor-pointer">
        Login
      </button>
    </p>

  </div>
</div>
  )
}

export default Register