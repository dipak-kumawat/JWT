import React, { useState } from "react";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log('Attempting to sign in with:', { email, password });

    try {
      const response = await axios.post("http://localhost:5000/api/login", 
        {
          email,
          password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.status === 200) {
        console.log('Login response:', response.data);
        setSuccessMessage("Signed in successfully");
        localStorage.setItem("token", response.data.token);
        navigate("/weather");
      }
    } catch (error) {
      console.log('Error details:', error);
      setSuccessMessage(
        error.response?.data?.message ||
        "Something went wrong during sign-in. Please try again."
      );
      setIsError(true);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignIn} className="grid grid-cols-1 mt-4 gap-6 px-9">
        {/* Email Input */}
        <input
          type="email"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        {/* Sign In Button */}
        <Button 
          type="submit" 
          text="Sign In" 
          onClick={handleSignIn}
        />

        {successMessage && (
          <p
            className={`${isError ? "text-red-500" : "text-green-500"} mt-2`}
            aria-live="polite">
            {successMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default SignIn;