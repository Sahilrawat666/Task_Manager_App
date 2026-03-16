import React from "react";
import TaskCard from "@/Components/custom/TaskCard";
import DialogComponent from "@/Components/custom/DialogComponent";
import { Button } from "@/Components/ui/button";
import axios from "axios";

function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [tasks, setTasks] = React.useState([]);

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

  const addTask = (newTask) => {
    setTasks((prev) => [...prev, newTask]);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">Dashboard</p>

        <Button
          className="bg-gray-300 text-black"
          onClick={() => setIsOpen(true)}
        >
          Add Task
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
