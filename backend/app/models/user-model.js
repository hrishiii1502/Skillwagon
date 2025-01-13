import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["student", "instructor", "admin"], // Added 'admin' role
    },
  },

  { timestamps: true }
);

const User = new model("User", userSchema);
export default User;
