import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext'; // ✅ Correct import
import { useNavigate } from 'react-router-dom'; // Added for potential redirects

const MyService = () => {
  const { user, token } = useAuth(); // ✅ Get user and token from context
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state for fetching
  const [error, setError] = useState(null); // Error state for handling API errors
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message
  const navigate = useNavigate(); // To navigate to update page if required

  console.log("Token inside MyServices:", token); // ✅ Debugging

  useEffect(() => {
    const fetchServices = async () => {
      if (!token) {
        console.error("No token found in context.");
        navigate("/login"); // Redirect to login if no token
        return;
      }

      try {
        setLoading(true); // Start loading
        const { data } = await axios.get('/api/services/my-services', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched services:', data); // Log the API response to verify it
        setServices(data || []); // Use empty array if no services returned
      } catch (error) {
        setError('Error fetching services');
        console.error('Error fetching services', error);
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchServices();
  }, [token, navigate]); // Depend on token

  const handleDelete = async (serviceId) => {
    if (!token) {
      console.error("No token found in context.");
      navigate("/login"); // Redirect to login if no token
      return;
    }

    try {
      await axios.delete(`/api/services/${serviceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId)); // Optimistically update state
    } catch (error) {
      setError('Error deleting service');
      setSuccessMessage('Service deleted successfully!'); // Set success message
      setTimeout(() => setSuccessMessage(null), 3000); // Hide message after 3 seconds
      console.error('Error deleting service', error);
    }
  };

  const handleUpdate = (serviceId) => {
    console.log('Update service with ID:', serviceId);
    navigate(`/services/update/${serviceId}`); // Redirect to update page (you should have a route for this)
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">My Services</h1>

      {loading && <p className="text-gray-600">Loading services...</p>} {/* Show loading message */}
      {error && <p className="text-red-600">{error}</p>} {/* Show error message */}

      {services.length === 0 ? (
        <p className="text-gray-600">No services added yet.</p>
      ) : (
        services.map((service) => (
          <div key={service._id} className="border rounded-lg p-6 mb-4 shadow-sm">
            <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
            <p className="text-gray-700 mb-2">{service.description}</p>
            <p className="text-green-700 font-bold mb-4">₹{service.price}</p>

            <div className="flex gap-4">
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                onClick={() => handleUpdate(service._id)}
              >
                Update Service
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                onClick={() => handleDelete(service._id)}
              >
                Delete Service
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyService;
