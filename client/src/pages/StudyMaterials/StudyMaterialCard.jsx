import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudyMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState({
    subjectName: '',
    branch: '',
    yearSemester: '',
    materialType: ''
  });
  
  const navigate = useNavigate();

  // Fetch materials based on search query
  const fetchMaterials = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/study-materials', {
        params: searchQuery,
      });
      setMaterials(data);
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, [searchQuery]);

  const handleSearchChange = (e) => {
    setSearchQuery({
      ...searchQuery,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Study Materials</h1>

      {/* Search Form */}
      <div className="mb-4">
        <input
          type="text"
          name="subjectName"
          placeholder="Search by Subject"
          value={searchQuery.subjectName}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded mr-2"
        />
        <input
          type="text"
          name="branch"
          placeholder="Search by Branch"
          value={searchQuery.branch}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded mr-2"
        />
        <input
          type="text"
          name="yearSemester"
          placeholder="Search by Year/Semester"
          value={searchQuery.yearSemester}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded mr-2"
        />
        <select
          name="materialType"
          value={searchQuery.materialType}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded"
        >
          <option value="">Select Material Type</option>
          <option value="Notes">Notes</option>
          <option value="Assignment">Assignment</option>
          <option value="Question Paper">Question Paper</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Displaying Study Materials */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {materials.length === 0 ? (
            <p>No materials found.</p>
          ) : (
            materials.map((material) => (
              <div
                key={material._id}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <h2 className="text-lg font-semibold">{material.subjectName}</h2>
                <p>Branch: {material.branch}</p>
                <p>Year/Semester: {material.yearSemester}</p>
                <p>Material Type: {material.materialType}</p>
                <button
                  onClick={() => navigate(`/study-materials/${material._id}`)}
                  className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Material
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default StudyMaterials;
