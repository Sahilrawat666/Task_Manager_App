// src/pages/InProgressTasks.jsx
import React, { useContext } from "react";
import TaskCard from "@/components/custom/TaskCard";
import { TaskContext } from "../context/TaskContext";

function InProgressTasks() {
  const { tasks, deleteTask, loading } = useContext(TaskContext);

  if (loading) return <p>Loading tasks...</p>;

  // ✅ filter only in-progress tasks
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  if (inProgressTasks.length === 0) return <p>No in-progress tasks found.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-semibold">In-Progress Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {inProgressTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}

export default InProgressTasks;
