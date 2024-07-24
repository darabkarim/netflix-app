import React, { useState } from "react";
import Header from "./Header";
import { BG_IMG_URL } from "../utils/constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${BG_IMG_URL})` }}
    >
      <Header />
      <div className="inset-0 flex items-center justify-center py-16">
        <form className="w-full max-w-md p-8 bg-black bg-opacity-80 text-white rounded-lg z-10">
          <h1 className="font-bold text-3xl py-4 text-left">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInForm && (
            <input
              className="p-4 my-2 w-full bg-gray-700 rounded"
              type="text"
              placeholder="Full Name"
            />
          )}
          <input
            className="p-4 my-2 w-full bg-gray-700 rounded"
            type="email"
            placeholder="Email Address"
          />
          <input
            className="p-4 my-2 w-full bg-gray-700 rounded"
            type="password"
            placeholder="Password"
          />
          <button
            className="p-4 my-4 bg-red-700 w-full rounded-lg"
            type="submit"
          >
            {isSignInForm ? "Sign Up" : "Sign In"}
          </button>
          <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
            {isSignInForm
              ? "New to MoviesFlix? Sign Up Now"
              : "Already registred? Sign In now"}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
