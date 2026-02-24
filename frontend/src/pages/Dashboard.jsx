import React from "react";
import TaskCard from "@/Components/custom/TaskCard";
import DialogComponent from "@/Components/custom/DialogComponent";
import { Button } from "@/Components/ui/button";

function Dashboard() {
  const [isOpen, setIsOpen] = React.useState(false);

  const [tasks, setTasks] = React.useState([]);

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
          <TaskCard key={task.id} task={task} />
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
