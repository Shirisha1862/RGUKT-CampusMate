// server/controllers/studyMaterialController.js
import StudyMaterial from '../models/StudyMaterial.js';
import User from '../models/User.js';

// Upload Study Material
export const uploadStudyMaterial = async (req, res) => {
  try {
    const { subjectName, branch, yearSemester, materialType } = req.body;
    const file = req.file; // We'll handle file upload later

    if (!subjectName || !yearSemester || !materialType || !file) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    const newMaterial = new StudyMaterial({
      subjectName,
      branch,
      yearSemester,
      materialType,
      file: file.path, // Save file path
      uploadedBy: req.user._id, // assuming you're using auth middleware
    });

    await newMaterial.save();
    res.status(201).json(newMaterial);
  } catch (error) {
    console.error('Error uploading study material:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get Study Materials (with optional search filters)
export const getStudyMaterials = async (req, res) => {
  try {
    const { subjectName, branch, yearSemester, materialType } = req.query;

    const query = {};

    if (subjectName) query.subjectName = { $regex: subjectName, $options: 'i' };
    if (branch) query.branch = branch;
    if (yearSemester) query.yearSemester = yearSemester;
    if (materialType) query.materialType = materialType;

    const materials = await StudyMaterial.find(query)
      .populate('uploadedBy', 'name department contactInfo') // populate uploader info
      .sort({ createdAt: -1 }); // newest first

    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching study materials:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Update Study Material
export const updateStudyMaterial = async (req, res) => {
  try {
    const materialId = req.params.id;
    const { subjectName, branch, yearSemester, materialType } = req.body;
    const file = req.file; // Optional: only update file if provided

    const material = await StudyMaterial.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: 'Material not found.' });
    }

    // Only allow update if the user is the uploader
    if (material.uploadedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    material.subjectName = subjectName || material.subjectName;
    material.branch = branch || material.branch;
    material.yearSemester = yearSemester || material.yearSemester;
    material.materialType = materialType || material.materialType;
    if (file) material.file = file.path; // Update file if provided

    await material.save();
    res.status(200).json(material);
  } catch (error) {
    console.error('Error updating study material:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Delete Study Material
// controllers/studyMaterialController.js

//import StudyMaterial from '../models/StudyMaterial.js';

export const handleDelete = async (req, res) => {
  const { id } = req.params;
  
  try {
    // Attempt to delete the material
    const material = await StudyMaterial.findByIdAndDelete(id);

    if (!material) {
      return res.status(404).json({ error: 'Study material not found' });
    }

    res.status(200).json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error('Error deleting material:', error);
    res.status(500).json({ error: 'Server error. Could not delete material' });
  }
};

