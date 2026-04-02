// src/pages/CompletedTasks.jsx
import React, { useContext } from "react";
import TaskCard from "@/components/custom/TaskCard";
import { TaskContext } from "../context/TaskContext";

function CompletedTasks() {
  const { tasks, deleteTask, loading } = useContext(TaskContext);

  if (loading) return <p>Loading tasks...</p>;

  // ✅ filter only completed tasks
  const completedTasks = tasks.filter((task) => task.status === "completed");

  if (completedTasks.length === 0) return <p>No completed tasks found.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-semibold">Completed Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {completedTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}

export default CompletedTasks;
