import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

const updateProfile = asyncHandler(async (req, res) => {
  console.log(req.body);
});

export { updateProfile };
