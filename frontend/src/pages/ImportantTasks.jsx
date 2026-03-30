// src/pages/ImportantTasks.jsx
import React, { useContext } from "react";
import TaskCard from "@/components/custom/TaskCard";
import { TaskContext } from "../context/TaskContext";

function ImportantTasks() {
  const { tasks, deleteTask, loading } = useContext(TaskContext); // ✅ get tasks from context

  if (loading) return <p>Loading tasks...</p>;

  // filter only important tasks
  const importantTasks = tasks.filter((task) => task.important);

  if (importantTasks.length === 0) return <p>No important tasks found.</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <h2 className="text-2xl font-semibold">Important Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {importantTasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={deleteTask} />
        ))}
      </div>
    </div>
  );
}

export default ImportantTasks;
