//AddService.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddService = () => {
  const { user,token } = useAuth();  // Access user from AuthContext
  const navigate = useNavigate();

  // Log the user after the context is accessed
  useEffect(() => {
    if (user) {
      console.log("User from AuthContext:", user); // Log user when it's available
      console.log("Token:",token); // Log token to ensure it's available
    }
  }, [user]); // Log whenever the user changes

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    contactInfo: '',
    location: 'GD',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user || !token) {
      toast.error("You must be logged in to submit a service.");
      navigate('/login');
      return;
    }
  
    try {
      const res = await axios.post('/api/services', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log("Service added:", res.data);
  
      toast.success("Service submitted successfully!");
  
      // Delay navigation to let the toast show
      setTimeout(() => {
        navigate('/services'); // 👈 go to services page
      }, 5000);
  
    } catch (error) {
      console.error("Error submitting service:", error);
      toast.error("Failed to submit service.");
    }
  };
  

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Add Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="price" className="block text-sm">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="contactInfo" className="block text-sm">Contact Info</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm">Location</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded"
          >
            <option value="GD">GD</option>
            <option value="BD">BD</option>
            <option value="GH1">GH1</option>
            <option value="GH2">GH2</option>
            <option value="BH1">BH1</option>
            <option value="BH2">BH2</option>
          </select>
        </div>

        <div>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">
            Submit Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
