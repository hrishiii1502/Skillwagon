import User from "../models/user-model.js";

export const instructorValidationSchema = {
  userId: {
    exists: {
      errorMessage: "userId field is required",
    },
    notEmpty: {
      errorMessage: "userId cannot be empty",
    },
    isMongoId: {
      errorMessage: "userId must be a valid MongoDB Object ID",
    },
    custom: {
      options: async function (value) {
        try {
          const user = await User.findById(value);
          if (!user) {
            throw new Error("User with the given userId does not exist");
          }
        } catch (err) {
          throw new Error(err.message);
        }
        return true;
      },
    },
  },
  expertise: {
    exists: {
      errorMessage: "expertise field is required",
    },
    notEmpty: {
      errorMessage: "expertise cannot be empty",
    },
    isArray: {
      errorMessage: "expertise must be an array of strings",
    },
    custom: {
      options: (value) => {
        if (
          value.some((item) => typeof item !== "string" || item.trim() === "")
        ) {
          throw new Error("Each expertise must be a non-empty string");
        }
        if (value.some((item) => item.length > 100)) {
          throw new Error("Each expertise must be less than 100 characters");
        }
        return true;
      },
    },
  },
  verificationDocument: {
    exists: {
      errorMessage: "verificationDocument field is required",
    },
    notEmpty: {
      errorMessage: "verificationDocument cannot be empty",
    },
    isString: {
      errorMessage: "verificationDocument must be a valid string",
    },
    trim: true,
  },
  bio: {
    exists: {
      errorMessage: "bio field is required",
    },
    notEmpty: {
      errorMessage: "bio cannot be empty",
    },
    isString: {
      errorMessage: "bio must be a valid string",
    },
    isLength: {
      options: { max: 500 },
      errorMessage: "bio cannot exceed 500 characters",
    },
    trim: true,
  },
  profilePicture: {
    exists: {
      errorMessage: "profilePicture field is required",
    },
    notEmpty: {
      errorMessage: "profilePicture cannot be empty",
    },
    isString: {
      errorMessage: "profilePicture must be a valid string",
    },
    trim: true,
  },
  socialLinks: {
    exists: {
      errorMessage: "socialLinks field is required",
    },
    notEmpty: {
      errorMessage: "socialLinks cannot be empty",
    },
    isObject: {
      errorMessage:
        "socialLinks must be a valid object (e.g., { LinkedIn: url })",
    },
    custom: {
      options: (value) => {
        if (Array.isArray(value)) {
          throw new Error("socialLinks must not be an array");
        }
        if (Object.keys(value).length === 0) {
          throw new Error("socialLinks must contain at least one link");
        }
        return true;
      },
    },
  },
};
