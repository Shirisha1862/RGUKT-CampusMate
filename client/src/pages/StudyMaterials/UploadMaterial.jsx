import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadMaterial = () => {
  const [formData, setFormData] = useState({
    subjectName: '',
    branch: '',
    yearSemester: '',
    materialType: '',
    file: null,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // New state for success message
  const navigate = useNavigate();

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

    // Prepare form data for upload
    const uploadData = new FormData();
    uploadData.append('subjectName', formData.subjectName);
    uploadData.append('branch', formData.branch);
    uploadData.append('yearSemester', formData.yearSemester);
    uploadData.append('materialType', formData.materialType);
    uploadData.append('file', formData.file);

    try {
      const response = await axios.post('/api/study-materials/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Navigate to material list on successful upload
      if (response.status === 201) {
        setSuccessMessage('Study material uploaded successfully!');  // Set success message
        setTimeout(() => {
          navigate('/study-materials');  // Redirect after 2 seconds
        }, 2000);
      }
    } catch (error) {
      setError('Failed to upload material. Please try again.');
      console.error('Upload Error:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-8">
      <h1 className="text-2xl font-semibold text-center mb-6">Upload Study Material</h1>

      {error && <p className="text-red-500">{error}</p>}  {/* Error message */}
      {successMessage && <p className="text-green-500">{successMessage}</p>}  {/* Success message */}

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
          <label htmlFor="file" className="block text-gray-700">Upload File</label>
          <input
            type="file"
            id="file"
            name="file"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Upload Material
        </button>
      </form>
    </div>
  );
};

export default UploadMaterial;
