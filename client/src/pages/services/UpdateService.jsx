import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const UpdateService = () => {
  const { id } = useParams(); // Get service ID from URL
  const { token } = useAuth(); // Get user token from context
  const navigate = useNavigate();

  const [service, setService] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`/api/services/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setService({
          title: data.title,
          description: data.description,
          price: data.price,
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to load service details');
        setLoading(false);
      }
    };

    fetchService();
  }, [id, token]);

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log('Token being sent:', token);

      await axios.put(`/api/services/${id}`, service, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccessMessage('Service updated successfully!');
      setTimeout(() => {
        navigate('/my-services'); // Redirect back after 2 seconds
      }, 1000);
    } catch (error) {
      setError('Failed to update service');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Update Service</h1>

      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-600">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={service.title}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={service.description}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={service.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Update Service
        </button>
      </form>
    </div>
  );
};

export default UpdateService;
