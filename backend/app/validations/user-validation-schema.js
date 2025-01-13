import User from "../models/user-model.js";

export const userRegisterSchema = {
  email: {
    exists: {
      errorMessage: "email field is required",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
    isEmail: {
      errorMessage: "email format should be valid",
    },
    trim: true, // sanitizer: removes whitespaces
    normalizeEmail: true, // sanitizer: converts to lowercase
    custom: {
      options: async function (value) {
        try {
          const user = await User.findOne({ email: value });
          if (user) {
            throw new Error("Email is already taken");
          }
        } catch (err) {
          throw new Error(err.message);
        }
        return true;
      },
    },
  },
  password: {
    exists: {
      errorMessage: "password field is required",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isStrongPassword: {
      options: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumber: 1,
        minSymbol: 1,
      },
      errorMessage:
        "password must contain at least one uppercase, one lowercase, one digit, one special symbol, and must be at least 8 characters long",
    },
    trim: true,
  },
  name: {
    exists: {
      errorMessage: "name field is required",
    },
    notEmpty: {
      errorMessage: "name cannot be empty",
    },
    isLength: {
      options: { min: 3 },
      errorMessage: "name must be at least 3 characters long",
    },
    trim: true,
  },
  role: {
    exists: {
      errorMessage: "role field is required",
    },
    notEmpty: {
      errorMessage: "role cannot be empty",
    },
    isIn: {
      options: [["student", "instructor", "admin"]],
      errorMessage: "role must be either student, instructor, or admin",
    },
  },
};

export const userLoginSchema = {
  email: {
    exists: {
      errorMessage: "email field is required",
    },
    notEmpty: {
      errorMessage: "email cannot be empty",
    },
    isEmail: {
      errorMessage: "email format should be valid",
    },
    trim: true, // sanitizer: removes whitespaces
    normalizeEmail: true, // sanitizer: converts to lowercase
  },
  password: {
    exists: {
      errorMessage: "password field is required",
    },
    notEmpty: {
      errorMessage: "password cannot be empty",
    },
    isLength: {
      options: { min: 8 },
      errorMessage: "password must be at least 8 characters long",
    },
    trim: true,
  },
  role: {
    exists: {
      errorMessage: "role field is required",
    },
    notEmpty: {
      errorMessage: "role cannot be empty",
    },
    isIn: {
      options: [["student", "instructor", "admin"]],
      errorMessage: "role must be either student, instructor, or admin",
    },
  },
};
