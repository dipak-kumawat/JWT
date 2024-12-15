import React, { useState } from "react";
import Button from "../components/Button";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrorMessage("");
  };

  const handleClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = async () => {
    // Reset messages
    setErrorMessage("");
    setSuccessMessage("");
    
    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }

    // Validate all fields are filled
    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("All fields are required");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      // Check for successful response (both 200 and 201 are valid)
      if (response.status >= 200 && response.status < 300) {
        setSuccessMessage("Account created successfully");
        
        // Store the token
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
        }
        
        // Use setTimeout to ensure state updates are processed
        setTimeout(() => {
          navigate("/weather");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setErrorMessage(
        error.response?.data?.message ||
        "Something went wrong in signing up. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 mt-4 gap-6 px-9">
        <input
          type="text"
          name="username"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="User Name"
          value={formData.username}
          onChange={handleInputChange}
        />
        
        <input
          type="email"
          name="email"
          className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
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
            name="confirmPassword"
            className="border border-blue-500 focus:outline-purple-400 h-10 rounded-lg px-2 w-full"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <button
            type="button"
            onClick={handleClick}
            className="absolute right-2 top-2/4 transform -translate-y-2/4 text-gray-500">
            {showPassword ? <Eye /> : <EyeOff />}
          </button>
        </div>

        <Button 
          text={isLoading ? "Signing Up..." : "Sign Up"} 
          onClick={handleSignUp}
          disabled={isLoading}
        />

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