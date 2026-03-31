import React, { useContext, useState } from "react";
import TaskCard from "@/components/custom/TaskCard";
import DialogComponent from "@/components/custom/DialogComponent";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../context/TaskContext";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const { tasks, addTask, deleteTask, loading } = useContext(TaskContext); // ✅ use context
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) {
    // optionally redirect if not logged in
    // navigate("/login");
  }

  const handleAddClick = () => {
    if (!token) {
      toast.error("Please login to add tasks and save your progress");
      navigate("/login");
      return;
    }
    setIsOpen(true);
  };

  // Pass deleteTask from context directly to TaskCard
  const handleDelete = (id) => {
    deleteTask(id); // updates context, so all pages update
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Dashboard</p>

        <Button
          className="bg-linear-to-r from-cyan-300 to-sky-500 active:scale-95 transition-transform duration-150 text-black cursor-pointer"
          onClick={handleAddClick}
        >
          Add New Task
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} onDelete={handleDelete} />
        ))}
      </div>

      {/* Dialog */}
      <DialogComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addTask={addTask}
      />
    </div>
  );
}

export default Dashboard;
