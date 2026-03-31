import axios from "axios";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "sonner";

function TaskCard({ task, onDelete }) {
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login first");
        return;
      }

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
  // change task status

  const handleStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");

      const nextStatus =
        task.status === "pending"
          ? "in-progress"
          : task.status === "in-progress"
            ? "completed"
            : "pending";

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/update-status/${task._id}`,
        { status: nextStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      toast.success("Status updated");

      // 🔥 IMPORTANT: update UI instantly
      task.status = nextStatus; // quick hack (not best, but works)
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      <h3 className="text-lg font-semibold flex justify-between items-center">
        {task.title}

        <button onClick={() => setShowConfirm(true)}>
          {" "}
          <Trash2 className="text-red-500 w-5 h-5" />
        </button>
      </h3>

      <p className="text-sm text-gray-600 mt-2">{task.description}</p>

      <p className="mt-2 text-xs flex justify-between items-center">
        <span
          onClick={handleStatusChange}
          className={`cursor-pointer text-xs px-2 py-1 rounded transition active:scale-95 ${
            task.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : task.status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {task.status.replace("-", " ").toUpperCase()}
        </span>

        {task.important && (
          <span className="bg-slate-300 px-2 py-1 rounded-2xl text-xs font-semibold">
            Important
          </span>
        )}
      </p>
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-75">
            <h2 className="text-lg font-semibold mb-2">Delete Task</h2>

            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete this task?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1 rounded-md border"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  setShowConfirm(false);
                  await handleDelete();
                }}
                className="px-3 py-1 rounded-md bg-red-500 text-white cursor-pointer "
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskCard;
