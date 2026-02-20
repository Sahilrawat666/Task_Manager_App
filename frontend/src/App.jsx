import React from "react";
import Navbar from "./Components/custom/Navbar";
import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
