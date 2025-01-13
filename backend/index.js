import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { checkSchema } from "express-validator";
import configureDB from "./config/db.js";
import usersCltr from "./app/controllers/users-cltr.js";
import instructorsCltr from "./app/controllers/instructors-cltr.js";
import {
  userRegisterSchema,
  userLoginSchema,
} from "./app/validations/user-validation-schema.js";

import { instructorValidationSchema } from "./app/validations/instructor-validation-schema.js";
import idValidationSchema from "./app/validations/id-validation-schema.js";
import authenticateUser from "./app/middlewares/authenticate.js";
import authorizeUser from "./app/middlewares/authorize.js";

const app = express();
const port = 4000;
app.use(express.json());
configureDB();

app.get("/home", (req, res) => {
  res.json({
    message: "home page",
  });
});

// user register api
app.post(
  "/api/users/register",
  checkSchema(userRegisterSchema),
  usersCltr.register
);

// user login api
app.post("/api/users/login", checkSchema(userLoginSchema), usersCltr.login);

// instructor profile completion api
app.post(
  "/api/instructors/profile",
  authenticateUser,
  checkSchema(instructorValidationSchema),
  instructorsCltr.createInstructor
);

// get all instructors api
app.get(
  "/api/instructors",
  authenticateUser,
  authorizeUser(["admin"]),
  instructorsCltr.getAllInstructors
);

// get a single instructors profile info api
app.get(
  "/api/instructors/:id",
  authenticateUser,
  instructorsCltr.getInstructorById
);

// update an instructor's profile
app.put(
  "/api/instructors/:id?",
  authenticateUser,
  authorizeUser(["instructor", "admin"]),
  instructorsCltr.updateProfile
);

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
