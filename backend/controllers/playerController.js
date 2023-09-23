import asyncHandler from "express-async-handler";
import Stream from "../model/streamModel.js";
import { saveImage } from "../middlewares/cloudinary.js";
const createLive = asyncHandler(async (req, res) => {
  console.log("body", req.body);
  const { playerId, title, description } = req.body;
  let thumbnail = null;
  if (req.file && req.file.buffer) {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
    const cldRes = await saveImage(dataURI);
    thumbnail = cldRes.secure_url;
  }
  const newStream = await Stream.create({
    playerId,
    title,
    description,
    thumbnail,
  });
  res.status(200).json({ message: "started streaming", data: newStream });
});

export { createLive };
