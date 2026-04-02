import React from "react";
import Navbar from "./components/custom/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";
import ImportantTasks from "./pages/ImportantTasks";
import CompletedTasks from "./pages/completedTasks";
import InProgressTasks from "./pages/InProgressTasks";

function App() {
  return (
    <div>
      <Navbar />
      <div className="m-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/important" element={<ImportantTasks />} />
          <Route path="/completedTask" element={<CompletedTasks />} />
          <Route path="/inProgressTasks" element={<InProgressTasks />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
