import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMaterial = () => {
  const { id } = useParams(); // To get the study material ID from the URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    subjectName: '',
    branch: '',
    yearSemester: '',
    materialType: '',
    file: null,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMaterial = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/study-materials/study-materials/${id}`);
        setFormData({
          subjectName: response.data.subjectName,
          branch: response.data.branch,
          yearSemester: response.data.yearSemester,
          materialType: response.data.materialType,
          file: null, // We won't pre-fill the file field
        });
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch material data.');
        setLoading(false);
      }
    };

    fetchMaterial();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data for update
    const updatedData = new FormData();
    updatedData.append('subjectName', formData.subjectName);
    updatedData.append('branch', formData.branch);
    updatedData.append('yearSemester', formData.yearSemester);
    updatedData.append('materialType', formData.materialType);
    if (formData.file) {
      updatedData.append('file', formData.file);
    }

    try {
      const response = await axios.put(`/api/study-materials/update/${id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Show success message after successful update
      if (response.status === 200) {
        setSuccessMessage('Study material updated successfully!');
        setTimeout(() => {
          setSuccessMessage(''); // Clear success message after 3 seconds
          navigate('/my-study-materials');
        }, 3000);
      }
    } catch (error) {
      setError('Failed to update material. Please try again.');
      console.error('Update Error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Update Study Material</h1>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>} {/* Display success message */}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-gray-700">Subject Name</label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            value={formData.subjectName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="branch" className="block text-gray-700">Branch</label>
          <select
            id="branch"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select Branch</option>
            <option value="CSE">CSE</option>
            <option value="ECE">ECE</option>
            <option value="EEE">EEE</option>
            <option value="ME">ME</option>
            <option value="CE">CE</option>
            <option value="CHE">CHE</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="yearSemester" className="block text-gray-700">Year/Semester</label>
          <input
            type="text"
            id="yearSemester"
            name="yearSemester"
            value={formData.yearSemester}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="materialType" className="block text-gray-700">Material Type</label>
          <select
            id="materialType"
            name="materialType"
            value={formData.materialType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="">Select Material Type</option>
            <option value="Notes">Notes</option>
            <option value="Assignment">Assignment</option>
            <option value="Question Paper">Question Paper</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="file" className="block text-gray-700">Upload New File (Optional)</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update Material
        </button>
      </form>
    </div>
  );
};

export default UpdateMaterial;
