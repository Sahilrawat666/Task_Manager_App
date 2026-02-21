import React from "react";
import Navbar from "./Components/custom/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "sonner";

function App() {
  return (
    <div>
      <Navbar />
      <div className="m-6">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Toaster richColors position="top-center" />
    </div>
  );
}

export default App;
