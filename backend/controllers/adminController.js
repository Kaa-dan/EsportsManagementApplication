import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";

//@desc Get User data
//route

const getUserData = asyncHandler(async (req, res) => {
  const users = await User.find();

  if (!users) {
    res.status(400);
    throw new Error("Couldn't find users right now");
  } else {
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      success: true,
    });
  }
});


//@desc Blocking and Unblocking User
const blockOrUnblockUser = asyncHandler(async (req, res) => {
  console.log("nithin");
  const { email } = req.body;
  console.log(email);
  if (!email) {
    res.status(400);
    throw new Error("Cant block user at this time ");
  }

  const user = await User.findOne({ email });
  if (user) {
    user.block = !user.block;
    await user.save();

    const message = `${user.name} has been blocked`;
    res.status(200).json({ success: user.block, message });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { getUserData, blockOrUnblockUser };
