import express from "express";
import Task from "../models/taskSchema.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// CREATE TASK
router.post("/create-task", authMiddleware, async (req, res) => {
    try {
        const { title, description, status, important } = req.body;
        // console.log("REQ USER ID:", req.userId); // DEBUG


        const task = new Task({
            title,
            description,
            status,
            important,
            userId: req.userId // ✅ from token, not client
        });

        await task.save();

        res.status(201).json({
            message: "Task created successfully",
            task
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET ALL TASKS OF USER
router.get("/get-tasks", authMiddleware, async (req, res) => {

    try {

        const tasks = await Task.find({
            userId: req.userId
        });

        res.json(tasks);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

// update tasks
router.put("/update-task/:id", async (req, res) => {

    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTask);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});


// DELETE TASK
router.delete("/delete-task/:id", async (req, res) => {

    try {

        await Task.findByIdAndDelete(req.params.id);

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

});

export default router;