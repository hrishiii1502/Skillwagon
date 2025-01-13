import { Schema, model } from "mongoose";

const expertiseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      maxlength: 500, // Optional: Add a short description for each expertise
    },
  },
  { timestamps: true }
);

const Expertise = model("Expertise", expertiseSchema);
export default Expertise;
