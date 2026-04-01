// TaskContext.jsx
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fetch tasks whenever token changes
  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) {
        setTasks([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tasks/get-tasks`,
          { headers: { Authorization: `Bearer ${token}` } },
        );
        setTasks(res.data);
        console.log("taskdata ", res.data);
        console.log(token);
      } catch (err) {
        console.log(err);
        toast.error("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);
  // update task status
  const updateTaskStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/update-status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // ⚠️ IMPORTANT
          },
        },
      );
      // 🔥 UPDATE STATE HERE (THIS IS WHAT YOU MISSED)
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task._id === id ? { ...task, status } : task)),
      );

      return res.data;
    } catch (error) {
      console.error("Update error:", error.response?.data || error.message);
      throw error;
    }
  };

  // Call this after login
  const setUserToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken); // triggers fetching tasks immediately
  };

  //clear tasks when token removes
  const clearTasks = () => {
    setTasks([]);
    setToken(null);
    localStorage.removeItem("token");
  };

  const addTask = (newTask) => setTasks((prev) => [...prev, newTask]);
  const deleteTask = (id) =>
    setTasks((prev) => prev.filter((task) => task._id !== id));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        loading,
        setUserToken,
        clearTasks,
        updateTaskStatus,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
