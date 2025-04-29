//User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^b\d{6}@rgukt\.ac\.in$/, "Only RGUKT emails allowed"],
  },
  password: { type: String, required: true },
  contactInfo: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Invalid phone number"],
  },
  location: {
    type: String,
    required: true,
    enum: ["GH1", "GH2", "GD", "BH1", "BH2", "BD"],
  },
  academicYear: {
    type: String,
    required: true,
    enum: ["PUC1", "PUC2", "Eng1", "Eng2", "Eng3", "Eng4"],
  },
  gender: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
