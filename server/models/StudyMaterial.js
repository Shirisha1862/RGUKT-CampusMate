// server/models/StudyMaterial.js
import mongoose from 'mongoose';

const studyMaterialSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
      enum: ['CSE', 'ECE', 'EEE', 'ME', 'CE', 'CHE'], // You can add more if needed
    },
    yearSemester: {
      type: String,
      required: true,
    },
    materialType: {
      type: String,
      required: true,
      enum: ['Notes', 'Assignment', 'Question Paper', 'Others'], // Correct final enums
    },
    file: {
      type: String, // saved file path
      required: true,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);

export default StudyMaterial;
