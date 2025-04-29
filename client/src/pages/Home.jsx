import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
      <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
        Welcome to CampusConnect
      </h1>
      <p className="text-lg md:text-2xl mb-8 max-w-xl">
        A platform to connect students, services, and products for a better college experience!
      </p>
      <div className="space-x-4">
        <Link
          to="/register"
          className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-6 rounded-lg text-lg"
        >
          Get Started
        </Link>
        <Link
          to="/login"
          className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-lg text-lg hover:bg-white hover:text-blue-600 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Home;
