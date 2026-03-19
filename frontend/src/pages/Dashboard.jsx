import React from "react";
import TaskCard from "@/Components/custom/TaskCard";
import DialogComponent from "@/Components/custom/DialogComponent";
import { Button } from "@/Components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [tasks, setTasks] = React.useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/tasks/get-tasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setTasks(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTasks();
  }, []);

  // add task
  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };
  const handleAddClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please login to add tasks and save your progress");
      navigate("/login");
      return;
    }

    setIsOpen(true);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Dashboard</p>

        <Button
          className="bg-linear-to-r from-cyan-300 to-sky-500 active:scale-95 transition-transform duration-150 text-black"
          onClick={handleAddClick}
        >
          Add New Task
        </Button>
      </div>

      {/* Task Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
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
