import express from "express";
const router = express.Router();
import {
  getUserData,
  blockOrUnblockUser,
} from "../controllers/adminController.js";

router.get("/fans", getUserData);
router.patch("/fans", blockOrUnblockUser);

export default router;
