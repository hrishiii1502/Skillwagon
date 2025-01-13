import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const instructorSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to User model
    required: true,
  },
  expertise: {
    type: [String],
    required: true,
  },
  verificationDocument: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String,
    default: "",
  },
  socialLinks: {
    type: [String],
  },
  isVerified: {
    type: Boolean,
    default: false, // Default is false, meaning the instructor is not verified initially
  },
});

const Instructor = new model("Instructor", instructorSchema);
export default Instructor;
