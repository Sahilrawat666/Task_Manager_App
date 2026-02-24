import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";

function TaskCard() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Build Login Page",
      description: "Create UI and connect backend",
      status: "in progress",
      important: false,
    },
    {
      id: 3,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 4,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 5,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 6,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 7,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 8,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 9,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
    {
      id: 10,
      title: "Fix Navbar",
      description: "Add mobile toggle animation",
      status: "completed",
      important: true,
    },
  ]);
  return (
    <>
      {tasks.map((task) => (
        <div key={task.id} className="border rounded-xl p-4 shadow-sm bg-white">
          <h3 className="text-lg font-semibold">{task.title}</h3>

          <p className="text-sm text-gray-600 mt-2">{task.description}</p>

          <div className="flex items-center justify-between mt-4">
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                task.status === "completed"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {task.status}
            </span>

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={task.important}
                onChange={() => toggleImportant(task.id)}
              />
              Important
            </label>
          </div>
        </div>
      ))}
    </>
  );
}
export default TaskCard;
