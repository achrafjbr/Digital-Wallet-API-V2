const express = require("express");
const userRoute = express.Router();
const {body} = require('express-validation')
const {
  register,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

userRoute.post(
  "/",
  //body("name").notEmpty().withMessage("Name is required"),
  //body("email").isEmail().withMessage("Invalid email"),
  //body("password").isLength({ min: 8 }).withMessage("Password too short"),
  register,
);
userRoute.get("/", getAllUsers);
userRoute.get("/:id", getSingleUser);
userRoute.put("/:id", updateUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
