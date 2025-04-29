
//server/controllers/serviceController.js
import Service from '../models/Service.js';

// Create new service
export const createService = async (req, res) => {
  try {
    const service = new Service({
      ...req.body,
      createdBy: req.user._id,
    });
    const createdService = await service.save();
    res.status(201).json(createdService);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Failed to create service' });
  }
};

// Get all services (with service provider info)
// Get all services (with service provider info)
export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate({
        path: 'createdBy',
        select: 'name email location',
        strictPopulate: false // <-- ADD THIS LINE
      });
    res.json(services);
  } catch (error) {
    console.error('Error in getAllServices:', error);
    res.status(500).json({ message: 'Failed to fetch services' });
  }
};

// Get service by ID
export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (service) {
      res.json(service);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch service' });
  }
};

// Function to get services of the logged-in user
export const getMyServices = async (req, res) => {
  try {
    const userId = req.user._id; // Get user ID from the request (set by authMiddleware)
    const services = await Service.find({ createdBy: userId }); // Find services by user ID
    res.json(services);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to update this service' });
      }

      service.title = req.body.title || service.title;
      service.description = req.body.description || service.description;
      service.price = req.body.price || service.price;
      service.location = req.body.location || service.location;
      service.contactInfo = req.body.contactInfo || service.contactInfo;

      const updatedService = await service.save();
      res.json(updatedService);
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update service' });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (service) {
      if (service.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to delete this service' });
      }

      await service.deleteOne();
      res.json({ message: 'Service deleted successfully' });
    } else {
      res.status(404).json({ message: 'Service not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete service' });
  }
};



