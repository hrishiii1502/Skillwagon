import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
  },
  { timestamps: true }
);

const User = new model("User", userSchema);
export default User;
