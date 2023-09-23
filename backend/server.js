import express from "express";
import dotenv from "dotenv";
dotenv.config();
import methodOveride from "method-override";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors package
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import playerRoutes from "./routes/playerRoutes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";
const PORT = process.env.PORT || 5000;

// Connecting to MongoDB
connectDB();

const app = express();

const allowedOrigins = ["http://localhost:4000"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);
app.use(methodOveride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// for pasing cookie
app.use(cookieParser());

// configuring user routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/player", playerRoutes);

app.get("/", (req, res) => {
  res.json("server started");
});

// configuring global error handling middleware
// app.use(notFound);
// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running @${PORT}`);
});
