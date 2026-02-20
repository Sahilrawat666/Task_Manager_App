import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import router from "./routes/userRoutes.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use("/api/users", router); //connect route in server

    app.get("/", (req, res) => {
      res.send("API is running...");
    });

    const PORT = process.env.PORT || 4001;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();
