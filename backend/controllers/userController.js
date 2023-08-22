import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import generateToken from "../utils/generatToken.js";

// @desc Auth User/set token
// route   POST /api/users/auth
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = User.findOne({ email });
  console.log("entered the function")
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc  Register new user
// route  POST api/users
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.userName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc  Logout user and clear cookie
// route  POST api/users/logout

const logoutUser = (req, res) => {
  // remove the cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logger out" });
};
export { loginUser, registerUser, logoutUser };
