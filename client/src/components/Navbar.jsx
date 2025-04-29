import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";
import RGUKTLogo from "../assets/images/rgukt_logo.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsOpen(false);
    }
  };

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-2">
          <img
            src={RGUKTLogo} // Use the imported RGUKT logo
            alt="RGUKT Logo"
            className="w-12 h-12" />
          
        <Link to="/" className="text-2xl font-bold">CampusMate</Link>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="px-3 py-1 rounded-md text-black"
            />
          </form>

          <Link to="/" className="hover:text-blue-300">Home</Link>
          <Link to="/services" className="hover:text-blue-300">Services</Link>
          <Link to="/study-materials" className="hover:text-blue-300">Study Materials</Link>

          {/* Show Upload Material and Add Service ONLY if logged in */}
          {user && (
            <>
              <Link to="/upload-material" className="hover:text-blue-300">Upload Material</Link>
              <Link to="/add-service" className="hover:text-blue-300">Add Service</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/register" className="hover:text-blue-300">Register</Link>
              <Link to="/login" className="hover:text-blue-300">Login</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" className="hover:text-blue-300 flex items-center gap-2">
                <img
                  src="https://i.pravatar.cc/30"
                  alt="avatar"
                  className="w-7 h-7 rounded-full"
                />
                Profile
              </Link>
              <button onClick={logout} className="hover:text-red-300">Logout</button>
            </>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="bg-blue-500 md:hidden px-4 pb-4 flex flex-col gap-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="w-full px-3 py-1 rounded-md text-black"
            />
          </form>

          <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setIsOpen(false)}>Services</Link>
          <Link to="/study-materials" onClick={() => setIsOpen(false)}>Study Materials</Link>

          {/* Upload Material and Add Service only if logged in */}
          {user && (
            <>
              <Link to="/upload-material" onClick={() => setIsOpen(false)}>Upload Material</Link>
              <Link to="/add-service" onClick={() => setIsOpen(false)}>Add Service</Link>
            </>
          )}

          {!user && (
            <>
              <Link to="/register" onClick={() => setIsOpen(false)}>Register</Link>
              <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </>
          )}

          {user && (
            <>
              <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="text-left"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
