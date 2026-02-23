const express = require("express");
const userRoute = express.Router();
const {
  register,
  getAllUsers,
  getSingleUser,
  deleteUser,
} = require("../controllers/userController");

userRoute.post("/", register);
userRoute.get("/", getAllUsers);
userRoute.put("/:id", getSingleUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
