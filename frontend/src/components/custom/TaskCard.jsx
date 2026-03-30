import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function TaskCard({ task, onDelete }) {
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

      const confirmDelete = window.confirm(
        "Are you sure you want to delete this task?",
      );
      if (!confirmDelete) return;

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/delete-task/${task._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // ✅ update UI via parent
      onDelete(task._id);

      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold flex justify-between items-center">
        {task.title}

        <button onClick={handleDelete}>
          <Trash2 className="text-red-500 w-5 h-5" />
        </button>
      </h3>

      <p className="text-sm text-gray-600 mt-2">{task.description}</p>

      <p className="mt-2 text-xs flex justify-between items-center">
        <span>Status: {task.status}</span>

        {task.important && (
          <span className="bg-slate-300 px-2 py-1 rounded-2xl text-xs font-semibold">
            Important
          </span>
        )}
      </p>
    </div>
  );
}

export default TaskCard;
