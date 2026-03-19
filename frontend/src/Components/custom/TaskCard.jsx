import React from "react";

function TaskCard({ task }) {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold">
        {task.title}{" "}
        {task.important && (
          <span className="bg-slate-300 float-end px-2 py-1 rounded-2xl text-xs font-semibold">
            Important
          </span>
        )}
      </h3>

      <p className="text-sm text-gray-600 mt-2">{task.description}</p>

      <p className="mt-2 text-xs">Status: {task.status}</p>
    </div>
  );
}

export default TaskCard;
