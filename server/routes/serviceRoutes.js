// server/routes/serviceRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createService, getAllServices, getServiceById, updateService, deleteService } from '../controllers/serviceController.js';
import Service from '../models/Service.js'; // Ensure the Service model is imported


const router = express.Router();

// Get services of the logged-in user
router.get('/my-services', protect, async (req, res) => {
  try {
    console.log("Fetching services for user:", req.user._id);
    const services = await Service.find({ createdBy: req.user._id }); // Get services by the logged-in user
    res.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Other routes (getAllServices, getServiceById, updateService, deleteService)
router.route('/')
  .get(getAllServices)
  .post(protect, createService);

router.route('/:id')
  .get(getServiceById)
  .put(protect, updateService)
  .delete(protect, deleteService);

export default router;
