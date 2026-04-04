import axios from "axios";
import { Trash2, MoreVertical, Loader2 } from "lucide-react";
import React, { useContext, useState } from "react";
import { toast } from "sonner";
import { TaskContext } from "@/context/TaskContext";
import { motion, AnimatePresence } from "framer-motion";

function TaskCard({ task, onDelete }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { updateTaskStatus } = useContext(TaskContext);

  const handleStatus = async (newStatus) => {
    try {
      setShowMenu(false);
      setStatusLoading(true);
      await updateTaskStatus(task._id, newStatus);
      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setStatusLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
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
      toast.error("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl border rounded-xl p-4 sm:p-5 shadow-sm bg-white mx-auto">
      {/* HEADER */}
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-base sm:text-lg font-semibold wrap-break-word flex-1">
          {task.title}
        </h3>

        <div className="relative shrink-0">
          <button
            disabled={statusLoading}
            onClick={() => setShowMenu((prev) => !prev)}
            className="p-1 sm:p-2 cursor-pointer"
          >
            <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-32 sm:w-36 bg-white border rounded-lg shadow-md z-10"
              >
                {["pending", "in-progress", "completed"].map((status) => (
                  <button
                    key={status}
                    disabled={statusLoading}
                    onClick={() => handleStatus(status)}
                    className="block w-full text-left px-3 py-2 hover:bg-gray-100 text-sm disabled:opacity-50 cursor-pointer"
                  >
                    {status.replace("-", " ").toUpperCase()}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex justify-between items-start mt-3 gap-2">
        <p className="text-sm text-gray-600 wrap-break-word flex-1">
          {task.description}
        </p>

        <button onClick={() => setShowConfirm(true)} className="p-1 sm:p-2">
          <Trash2 className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* STATUS + DATE */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-3 gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <p
            className={`text-xs sm:text-sm font-semibold px-2 py-1 rounded-2xl flex items-center gap-1 w-fit ${
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
          </p>

          {task.important && (
            <p className="bg-slate-300 px-2 py-1 rounded-2xl text-xs sm:text-sm font-semibold">
              Important
            </p>
          )}
        </div>

        <p className="text-xs text-gray-400">
          {new Date(task.createdAt).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* DELETE MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-4 sm:p-6 rounded-xl shadow-lg w-[90%] max-w-sm"
            >
              <h2 className="text-lg font-semibold mb-2">Delete Task</h2>

              <p className="text-sm text-gray-600 mb-4">
                Are you sure you want to delete this task?
              </p>

              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 text-sm border rounded-md"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="px-4 py-2 text-sm bg-red-500 text-white rounded-md flex items-center gap-1"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" />
                      Deleting...
                    </>
                  ) : (
                    "Delete"
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default TaskCard;
