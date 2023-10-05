import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema({
  // roomName: {
  //   type: String,
  //   required: true,
  // },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("ChatMessage", chatMessageSchema);

export default ChatMessage;
