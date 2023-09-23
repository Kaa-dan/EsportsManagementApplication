import express from "express";
const router = express.Router();
import { createLive } from "../controllers/playerController.js";
import { upload } from "../middlewares/multer.js";
router.post("/createLive", upload.single("thumbnail"), createLive);

export default router;
