import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import AcceptRecruit from "../model/acceptRecruitModel.js";
import { saveImage, saveVideo } from "../middlewares/cloudinary.js";
import Recruit from "../model/recruitModel.js";
import Stream from "../model/streamModel.js";
const updateProfile = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (req.file && req.file.buffer) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await saveImage(dataURI);
    user.profilePhoto = cldRes.secure_url || user.profilePhoto;
  }

  if (!user) {
    res.status(404);
    throw new Error("Cant update profile right now");
  } else {
    user.name = name || user.name;
    user.password = password || user.password;
    await user.save();
    res.status(200).json({
      message: "User updated successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profilePhoto,
      },
    });
  }
});

const acceptRecruitment = asyncHandler(async (req, res) => {
  const file = req.file;
  const { recruitMentID, user_id, teamId } = req.body;
  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  if (!/\.(mp4|mov|avi|wmv|flv|mkv)$/i.test(file.originalname)) {
    return res.status(400).json({ message: "Invalid file format" });
  }

  const videoPath = file.path;

  const response = await saveVideo(videoPath);

  if (!response) {
    return res.status(500).json({ message: "Error uploading video " });
  }

  const recruit = await Recruit.findOne({ _id: recruitMentID });

  if (!recruit) {
    return res.status(404).json({ message: "Recruit not found" });
  }

  const acceptedRecruit = await AcceptRecruit.create({
    video: response.secure_url,
    recruitId: recruit._id,
    userId: user_id,
    accept: true,
    teamId: teamId,
  });

  res.status(201).json({
    message: "Recruitment accepted successfully",
    data: acceptedRecruit,
  });
});

const getStream = asyncHandler(async (req, res) => {
  const streams = await Stream.find();

  if (streams) {
    res.status(200).json({
      message: "success",
      data: streams,
    });
  }
});
export { updateProfile, acceptRecruitment, getStream };
