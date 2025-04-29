import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import axios from 'axios';

const MyStudyMaterials = () => {
  const { token } = useAuth();
  const [studyMaterials, setStudyMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null); // New state for success message

  useEffect(() => {
    const fetchMaterials = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:5000/api/study-materials/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          setError(`Failed to fetch materials: ${errorData.error || 'Unknown error'}`);
          setLoading(false);
          return;
        }

        const data = await response.json();
        setStudyMaterials(data);
      } catch (error) {
        console.error('Error fetching materials:', error);
        setError('An error occurred while fetching the materials.');
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();
  }, [token]);

  const handleDelete = async (id) => {
    try {
      console.log(`Deleting material with ID: ${id}`);
      const response = await axios.delete(`http://localhost:5000/api/study-materials/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        //console.log(response.data);
      });
      console.log(response.data);
      // Log the response to see what is being returned
      console.log("Response Status:", response.status);
      console.log("Response Body:", response.data);  // Log the raw body of the response
  
      if (response.status === 200) {
        setStudyMaterials(prevMaterials => prevMaterials.filter(material => material._id !== id));
        setSuccessMessage('Material deleted successfully!');
        setError(null); // Clear any previous error messages
      } else {
        setError(response.data.error || 'Failed to delete material.');
        setSuccessMessage(null); // Clear success message on failure
      }
    } catch (error) {
      console.error('Error deleting material:', error);
      setError('An error occurred while deleting the material.');
      setSuccessMessage(null); // Clear success message on failure
    }
  };
  
  

  if (loading) {
    return <div className="text-center">Loading your study materials...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">My Study Materials</h2>

      {successMessage && (
        <div className="text-center text-green-500 mb-4">{successMessage}</div> // Display success message
      )}

      {studyMaterials.length === 0 ? (
        <p className="text-center">You have not uploaded any study materials yet.</p>
      ) : (
        <div className="space-y-4">
          {studyMaterials.map(material => (
            <div key={material._id} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
              <div>
                <h3 className="font-semibold text-lg">{material.subjectName}</h3>
                <p className="text-sm text-gray-600">Branch: {material.branch}</p>
                <p className="text-sm text-gray-600">Year/Semester: {material.yearSemester}</p>
                <p className="text-sm text-gray-600">Type: {material.materialType}</p>
                <a 
                  href={`http://localhost:5000/uploads/${material.file.split('\\').pop()}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-500 underline text-sm mt-1 block"
                >
                  View File
                </a>
              </div>
              <div className="space-x-2">
                <Link to={`/update-material/${material._id}`}>
                  <button className="bg-blue-500 text-white p-2 rounded">Update</button>
                </Link>
                <button
                  onClick={() => handleDelete(material._id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyStudyMaterials;
