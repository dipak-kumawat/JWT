import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);


  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/signin");
      if (response.status === 200) {
        console.log(response.data);
        setSuccessMessage("Signed in successfully");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setSuccessMessage(
        error.response?.data?.message ||
          "Something went wrong in signing in. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 mt-4 gap-6 px-9">
        {/* Email Input */}
        <input
          type="text"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="Email"
        />
        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {/* Sign Up Button */}
        <Button text="Sign In" onClick={handleSignIn} />

        {successMessage && (
          <p
            className={`${
              isError ? "text-red-500" : "text-green-500"
            } mt-2`}
            aria-live="polite">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
