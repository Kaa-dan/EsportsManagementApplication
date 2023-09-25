import express from "express";
const router = express.Router();
import { upload } from "../middlewares/multer.js";
import {
  getUserData,
  blockOrUnblockUser,
  createTeam,
  getTeams,
  recruitPlayer,
  onGoingRecruitment,
  getAcceptedRecruitment,
  createPlayer,
  filterFans,
} from "../controllers/adminController.js";

router.get("/fans", getUserData);
router.patch("/fans", blockOrUnblockUser);
router.patch("/filterFans", filterFans);
router.post("/team", upload.single("teamPhoto"), createTeam);
router.get("/team", getTeams);
router.post("/recruit", recruitPlayer);
router.get("/recruit", onGoingRecruitment);
router.get("/getAcceptedRecruitment", getAcceptedRecruitment);
router.post("/createPlayer", createPlayer);

export default router;
