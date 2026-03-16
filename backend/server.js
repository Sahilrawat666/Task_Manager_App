import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";
import router from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors());
    app.use(express.json());

    //connect route in server
    app.use("/api/users", router);
    app.use("/api/tasks", taskRoutes);

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
