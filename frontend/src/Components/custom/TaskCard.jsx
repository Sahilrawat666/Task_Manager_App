import React from "react";

function TaskCard({ task }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">{task.title}</h3>

      <p className="text-sm text-gray-600 mt-2">{task.description}</p>

      <p className="mt-2 text-xs">Status: {task.status}</p>
    </div>
  );
}

export default TaskCard;
