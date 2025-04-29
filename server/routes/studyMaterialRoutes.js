// server/routes/studyMaterialRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import StudyMaterial from '../models/StudyMaterial.js';
import upload from '../middleware/upload.js';
import { handleDelete } from '../controllers/studyMaterialController.js';

const router = express.Router();

// Upload Study Material
router.post('/upload', protect, upload.single('file'), async (req, res) => {
  try {
    const { subjectName, branch, yearSemester, materialType } = req.body;
    const fileUrl = req.file?.path;

    if (!fileUrl) {
      return res.status(400).json({ error: 'File upload failed' });
    }

    const newMaterial = new StudyMaterial({
      subjectName,
      branch,
      yearSemester,
      materialType,
      file: fileUrl,
      uploadedBy: req.user.id,
    });

    await newMaterial.save();

    res.status(201).json({ message: 'Study material uploaded successfully', material: newMaterial });
  } catch (error) {
    console.error('Upload error:', error);  // Log the error to the console for debugging
    res.status(500).json({ error: error.message });
  }
});


// Get Study Materials by Search
router.get('/', async (req, res) => {
  try {
    const { subjectName, branch, yearSemester, materialType } = req.query;

    let query = {};

    if (subjectName) {
      query.subjectName = { $regex: subjectName, $options: 'i' };
    }
    if (branch) {
      query.branch = branch;
    }
    if (yearSemester) {
      query.yearSemester = yearSemester;
    }
    if (materialType) {
      query.materialType = materialType;
    }

    const materials = await StudyMaterial.find(query).populate('uploadedBy', 'name email');

    res.status(200).json(materials);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Download Material
router.get('/download/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.download(material.file);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Fetch Study Materials for the logged-in user
router.get('/user', protect, async (req, res) => {
  try {
    const userId = req.user.id; // Use the user ID from the token
    const materials = await StudyMaterial.find({ uploadedBy: userId }).populate('uploadedBy', 'name email');
    res.status(200).json(materials);
  } catch (error) {
    console.error('Error fetching materials for user:', error);
    res.status(500).json({ error: error.message });
  }
});
// Get Study Material by ID
// Get Study Material by ID
router.get('/study-materials/:id', async (req, res) => {
  try {
    const material = await StudyMaterial.findById(req.params.id);
    if (!material) {
      return res.status(404).json({ message: 'Study material not found' });
    }
    res.status(200).json(material);
  } catch (error) {
    console.error('Error fetching study material:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// In your backend routes (studyMaterialRoutes.js)
// DELETE route for deleting study material by ID
router.delete('/:id', protect, handleDelete);



// Update Study Material
router.put('/update/:id', protect, upload.single('file'), async (req, res) => {
  try {
    const { subjectName, branch, yearSemester, materialType } = req.body;
    const materialId = req.params.id;

    // Find the existing material by ID
    const material = await StudyMaterial.findById(materialId);

    if (!material) {
      return res.status(404).json({ message: 'Study material not found' });
    }

    // Update the material fields
    material.subjectName = subjectName || material.subjectName;
    material.branch = branch || material.branch;
    material.yearSemester = yearSemester || material.yearSemester;
    material.materialType = materialType || material.materialType;

    // If a new file is uploaded, update the file path
    if (req.file) {
      material.file = req.file.path;
    }

    // Save the updated material
    await material.save();

    res.status(200).json({ message: 'Study material updated successfully', material });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: error.message });
  }
});


export default router;
