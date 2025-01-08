import mongoose from "mongoose";

const configureDB = async () => {
  const dbUrl = "mongodb://localhost:27017/Skillwagon";
  try {
    const db = await mongoose.connect(dbUrl);
    console.log("Connected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default configureDB;
