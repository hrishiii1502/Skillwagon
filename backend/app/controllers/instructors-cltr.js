import Instructor from "../models/instructor-model.js";
import User from "../models/user-model.js";
import { validationResult } from "express-validator";

const instructorsCltr = {};

// creating  a new instructor profile
instructorsCltr.createInstructor = async (req, res) => {
  try {
    const { expertise, verificationDocument, bio, socialLinks } = req.body;
    const userId = req.currentUser.userId; // Assuming `req.user` contains the userId from the token
    console.log(userId);

    const newInstructor = new Instructor({
      user: userId, // Assign userId to user field
      expertise,
      verificationDocument,
      bio,
      socialLinks,
    });

    await newInstructor.save();

    res.status(201).json({
      success: true,
      message: "Instructor profile created successfully.",
      data: newInstructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create instructor profile.",
      error: error.message,
    });
  }
};

// get all instructors profiles
instructorsCltr.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find().populate("user", "name email"); // Populate user details
    res.status(200).json({
      success: true,
      data: instructors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructors.",
      error: error.message,
    });
  }
};

// get a single instructor's profile
instructorsCltr.getInstructorById = async (req, res) => {
  try {
    const instructor = await Instructor.find().populate("user", "name email");

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch instructor.",
      error: error.message,
    });
  }
};

// update an instructor's profile
instructorsCltr.updateProfile = async (req, res) => {
  try {
    const { id } = req.query;
    const userId = req.currentUser.userId;
    const { name, email, bio, socialLinks, profilePicture, expertise } =
      req.body;

    if (id && id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Instructors can only update their own profile.",
      });
    }

    const updates = {};

    if (name || email) {
      const userUpdates = {};
      if (name) userUpdates.name = name;
      if (email) userUpdates.email = email;

      const updatedUser = await User.findByIdAndUpdate(userId, userUpdates, {
        new: true,
        runValidators: true,
        select: "name email", // Explicitly select the fields we want
      });
      updates.user = updatedUser;
    }

    const instructorUpdates = {};
    if (bio) instructorUpdates.bio = bio;
    if (socialLinks) instructorUpdates.socialLinks = socialLinks;
    if (profilePicture) instructorUpdates.profilePicture = profilePicture;
    if (expertise) instructorUpdates.expertise = expertise;

    if (Object.keys(instructorUpdates).length > 0) {
      const updatedInstructor = await Instructor.findOneAndUpdate(
        { user: userId },
        instructorUpdates,
        { new: true, runValidators: true }
      ).populate({
        path: "user",
        select: "name email", // Populate user details
      });
      updates.instructor = updatedInstructor;
    } else {
      // If no instructor updates but user was updated, get the instructor profile with populated user
      const instructor = await Instructor.findOne({ user: userId }).populate({
        path: "user",
        select: "name email",
      });
      updates.instructor = instructor;
    }

    if (!updates.user && !updates.instructor) {
      return res.status(400).json({
        success: false,
        message: "No fields to update.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updates,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update profile.",
      error: error.message,
    });
  }
};
// delete an instructor's profile
instructorsCltr.deleteInstructor = async (req, res) => {
  try {
    const deletedInstructor = await Instructor.findByIdAndDelete(req.params.id);

    if (!deletedInstructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instructor deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete instructor.",
      error: error.message,
    });
  }
};

// admin verifies the instructor's profile
instructorsCltr.verifyInstructor = async (req, res) => {
  try {
    const instructor = await Instructor.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    );

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Instructor has been verified successfully.",
      data: instructor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to verify instructor.",
      error: error.message,
    });
  }
};

export default instructorsCltr;
