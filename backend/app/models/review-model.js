import { Schema, model } from "mongoose";
const reviewSchema = new Schema({
  teacher: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  student: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: String,
  createdAt: { type: Date, default: Date.now },
});
const Review = model("Review", reviewSchema);
export default Review;
