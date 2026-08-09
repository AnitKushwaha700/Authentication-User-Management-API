import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use("/auth", authRouter);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Authentication API Running...");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
