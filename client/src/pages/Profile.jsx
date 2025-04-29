// client/src/pages/Profile.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { Link } from 'react-router-dom'; // Add this import

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="text-center mt-10 text-lg text-red-500">
        You must be logged in to view this page.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">
        Welcome, {user.name} 👋
      </h2>
      <div className="space-y-2 text-gray-800">
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Location:</strong> {user.location || "Not Available"}</p> {/* Display location */}
        <p><strong>Academic Year:</strong> {user.academicYear}</p>
      </div>
      
      {/* My Services Button */}
      <Link to="/my-services">
        <button className="bg-blue-500 text-white p-2 rounded mr-4 mt-4">My Services</button>
      </Link>
      
      {/* My Study Materials Button */}
      <Link to="/my-study-materials">
        <button className="bg-blue-500 text-white p-2 rounded mt-4">My Study Materials</button>
      </Link>
    </div>
  );
};

export default Profile;
