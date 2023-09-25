import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Team from "../model/teamModel.js";
import Recruit from "../model/recruitModel.js";
import AcceptRecruit from "../model/acceptRecruitModel.js";
import Player from "../model/playerModel.js";
import { saveImage } from "../middlewares/cloudinary.js";
//@desc Get User data
//route

const getUserData = asyncHandler(async (req, res) => {
  const users = await User.find({ role: "fan" });

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
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("Cant block user at this time ");
  }

  console.log(email);
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
const createTeam = asyncHandler(async (req, res) => {
  const { team, strength } = req.body;
  const existingTeam = await Team.findOne({ team });
  if (existingTeam) {
    res.status(404);
    throw new Error(`${team} already exists`);
  }
  let teamPhoto = null;
  if (req.file && req.file.buffer) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await saveImage(dataURI);
    teamPhoto = cldRes.secure_url;
  }
  const newTeam = await Team.create({
    team,
    strength,
    teamPhoto,
  });
  if (newTeam) {
    res.status(201).json({
      message: "New Team Created Successfully",
      data: newTeam,
    });
  } else {
    res.status(500);
    throw new Error("Cant create a team right now");
  }
});
const getTeams = asyncHandler(async (req, res) => {
  const teams = await Team.find();
  if (!teams) {
    res.status(404);
    throw new Error(`server busy`);
  } else {
    res.status(201).json({
      message: "Succes",
      data: teams,
    });
  }
});

const recruitPlayer = asyncHandler(async (req, res) => {
  const { date, team, salary, role } = req.body;
  if (!date && !team && !salary && !role) {
    res.status(500);
    throw new Error("Server busy can't sent right now");
  } else {
    const recruit = await Recruit.create({
      team,
      salary,
      role,
      endDate: date,
      send: true,
    });
    if (recruit) {
      res.status(201).json({
        message: "Recruitment sent successfully",
        data: recruit,
      });
    } else {
      res.status(500);
      throw new Error("Bad connection");
    }
  }
});
const onGoingRecruitment = asyncHandler(async (req, res) => {
  const onGoingRecruitment = await Recruit.find({ send: true }).populate(
    "team"
  );

  if (onGoingRecruitment) {
    res.status(201).json({
      message: "Success",
      data: onGoingRecruitment,
    });
  }
});

const getAcceptedRecruitment = asyncHandler(async (req, res) => {
  const accepptedRecruit = await AcceptRecruit.find()
    .populate("userId")
    .populate("recruitId")
    .populate("teamId");

  if (!accepptedRecruit) {
    res.status(404);
    throw new Error("Server Error");
  }
  res.status(201).json({
    message: "Data fetched succesfully",
    data: accepptedRecruit,
  });
});

const createPlayer = asyncHandler(async (req, res) => {
  try {
    const { userId, role, salary, teamId, AcceptRecruitId } = req.body;

    // Check if the user exists
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update the user's role to "player"
    user.role = "player";
    await user.save();

    // Create a new player
    const newPlayer = await Player.create({
      userId: user._id,
      role,
      salary,
      teamId,
    });

    // Associate the user with the player
    user.playerId = newPlayer._id;
    await user.save();

    // Delete the AcceptRecruit document
    await AcceptRecruit.deleteOne({ _id: AcceptRecruitId });

    res.status(200).json({
      message: "Player created successfully",
      playerId: newPlayer._id,
    });
  } catch (error) {
    console.error("Error creating player:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const filterFans = asyncHandler(async (req, res) => {
  const { filter } = req.body;
  if (!filter) {
    res.status(404);
    throw new Error("Server is busy");
  }
  if (filter === "blocked") {
    const user = await User.find({ block: true, role: "fan" });
    res.status(200).json({ message: "filtered", data: user });
  } else {
    const user = await User.find({ block: false, role: "fan" });
    res.status(200).json({ message: "filtered", data: user });
  }
});
export {
  getUserData,
  blockOrUnblockUser,
  createTeam,
  getTeams,
  recruitPlayer,
  onGoingRecruitment,
  getAcceptedRecruitment,
  createPlayer,
  filterFans,
};
