import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    setErrorMessage("");
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        setSuccessMessage("Account created successfully");
        setErrorMessage("");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Something went wrong in signing up. Please try again."
      );
      setSuccessMessage("");
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 mt-4 gap-6 px-9">
        {/* Email Input */}
        <input
          type="text"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="User Name"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="text"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        {/* Password Input with Eye Icon */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
              setErrorMessage("");
            }}
          />

          {/* Eye Icon */}
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Confirm Password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setErrorMessage("");
            }}
          />

          {/* Eye Icon */}
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {/* Sign In Button */}
        <Button text="Sign Up" onClick={handleSignUp} />

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500" aria-live="polite">
            {errorMessage}
          </p>
        )}
        {successMessage && (
          <p className="text-green-500" aria-live="polite">
            {successMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignUp;
