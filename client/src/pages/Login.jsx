import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";


const Login = () => {
  const [show, setShow] = useState(true); 
  const updateShow = () => {
    setShow(!show);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-slate-500">
      <div className="flex flex-col gap-4 h-2/3 w-3/4 md:w-1/3 rounded-xl	 p-4 bg-white shadow-lg">
        {/* Toggle Buttons */}
        <div className="flex justify-center mt-4 gap-4">
          <button
            className={`px-4 py-2 rounded ${
              show ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShow(true)}>
            Sign In
          </button>
          <button
            className={`px-4 py-2 rounded ${
              !show ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setShow(false)}>
            Sign Up
          </button>
        </div>
        {show ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default Login;
