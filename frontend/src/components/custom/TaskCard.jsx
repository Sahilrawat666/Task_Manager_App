import axios from "axios";
import { Trash2, MoreVertical, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";

function TaskCard({ task, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);

  const { updateTaskStatus } = useContext(TaskContext);

  // 🔥 Update status
  const handleStatus = async (newStatus) => {
    try {
      setShowMenu(false); // instant feedback
      setStatusLoading(true);

      await updateTaskStatus(task._id, newStatus);

      toast.success("Status updated");
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update");
    } finally {
      setStatusLoading(false);
    }
  };

  // 🗑️ Delete task
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

      onDelete(task._id);
      toast.success("Task deleted");
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">{task.title}</h3>

        <div className="relative">
          <button
            disabled={statusLoading}
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MoreVertical className="w-5 h-5 cursor-pointer" />
          </button>

          {/* Dropdown */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow-md z-10">
              {["pending", "in-progress", "completed"].map((status) => (
                <button
                  key={status}
                  disabled={statusLoading}
                  onClick={() => handleStatus(status)}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm disabled:opacity-50"
                >
                  {status.replace("-", " ").toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-600 mt-2">
        {task.description}

        <button onClick={() => setShowConfirm(true)} className="float-end">
          <Trash2 className="text-red-500 w-5 h-5 cursor-pointer" />
        </button>
      </p>

      {/* STATUS BADGE */}
      <p className="flex items-center justify-between mt-2">
        <span
          className={`text-xs font-semibold px-2  rounded flex items-center gap-1 w-fit ${
            task.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : task.status === "in-progress"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
          }`}
        >
          {statusLoading ? (
            <>
              <Loader2 className="w-3 h-3 animate-spin" />
              Updating...
            </>
          ) : (
            task.status.replace("-", " ").toUpperCase()
          )}
        </span>
        {task.important && (
          <span className="bg-slate-300 px-2 py-1 rounded-2xl text-xs font-semibold float-end">
            Important
          </span>
        )}
      </p>

      {/* DELETE MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-72">
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
                className="px-3 py-1 rounded-md bg-red-500 text-white"
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
