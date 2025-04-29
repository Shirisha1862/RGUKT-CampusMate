import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MaterialList = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('/api/study-materials', {
          params: {
            subjectName: search,
          },
        });
        setMaterials(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching study materials:', error);
      }
    };

    fetchMaterials();
  }, [search]);

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Study Materials List</h1>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          className="p-2 border border-gray-300 rounded w-full"
          placeholder="Search by Subject"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <p>Loading materials...</p>
      ) : (
        <div>
          {materials.length === 0 ? (
            <p>No materials found</p>
          ) : (
            materials.map((material) => (
              <div key={material._id} className="border-b py-4">
                <h2 className="text-xl font-bold">{material.subjectName}</h2>
                <p><strong>Branch:</strong> {material.branch}</p>
                <p><strong>Year/Sem:</strong> {material.yearSemester}</p>
                <p><strong>Material Type:</strong> {material.materialType}</p>
                <a
                  href={`/api/study-materials/download/${material._id}`}
                  className="text-blue-600 hover:underline"
                >
                  Download
                </a>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MaterialList;
