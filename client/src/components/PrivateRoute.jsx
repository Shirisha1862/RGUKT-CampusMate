//client/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
    const { user, token } = useAuth();
  
    if (user === null && token === "") {
      // Still loading auth
      return <div className="text-center mt-20">Loading...</div>;
    }
  
    if (!user || !token) {
      return <Navigate to="/login" replace />;
    }
  
    return children;
  };
  

export default PrivateRoute;
