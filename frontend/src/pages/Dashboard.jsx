import TaskCard from "@/Components/custom/TaskCard";
import { Button } from "@/Components/ui/button";
import React from "react";

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between">
        <p className="text-2xl">Dashboard</p>
        <Button className="bg-gray-300 text-black ">Add Task</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <TaskCard />
      </div>
    </div>
  );
}

export default Dashboard;
