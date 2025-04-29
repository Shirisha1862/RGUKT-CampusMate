//models/Service.js
import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  price: Number,
  contactInfo: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
  },
  location: {
    type: String,
    enum: [
      'GH1', // Girls Hostel 1
      'GH2', // Girls Hostel 2
      'GD',  // Girls Dormitories
      'BH1', // Boys Hostel 1
      'BH2', // Boys Hostel 2
      'BD'   // Boys Dormitories
    ],
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Service', serviceSchema);
