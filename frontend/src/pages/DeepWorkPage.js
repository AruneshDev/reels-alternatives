import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const DeepWorkPage = () => {
  const [taskName, setTaskName] = useState("");
  const [duration, setDuration] = useState(15); // Duration in multiples of 15 mins
  const [tasks, setTasks] = useState([]);
  const [currentTimer, setCurrentTimer] = useState(null);

  // Fetch all tasks on page load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/deep-work");
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!taskName || !duration) {
      alert("Task name and duration are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/deep-work/add", {
        taskName,
        duration,
      });
      setTasks((prevTasks) => [...prevTasks, response.data.task]);
      setTaskName("");
      setDuration(15);

      // Start the timer
      setCurrentTimer({
        taskName: response.data.task.taskName,
        timeLeft: duration * 60, // Convert minutes to seconds
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle task completion
  const handleCompleteTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/deep-work/complete/${id}`);
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, completed: true, endTime: response.data.task.endTime } : task
        )
      );

      // Stop the timer if the completed task is the current one
      if (currentTimer && tasks.find((task) => task.id === id).taskName === currentTimer.taskName) {
        setCurrentTimer(null);
      }
    } catch (error) {
      console.error("Error marking task as completed:", error);
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/deep-work/${id}`);
      alert(response.data.message);
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Timer logic
  useEffect(() => {
    let timer;
    if (currentTimer) {
      timer = setInterval(() => {
        setCurrentTimer((prev) => {
          if (prev.timeLeft <= 1) {
            clearInterval(timer);
            alert(`Time's up for: ${prev.taskName}`);
            return null;
          }
          return { ...prev, timeLeft: prev.timeLeft - 1 };
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentTimer]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Deep Work</h1>

        {/* Add Task Form */}
        <form onSubmit={handleAddTask} style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Task Name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              maxWidth: "500px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <select
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              maxWidth: "500px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          >
            {[15, 30, 45, 60].map((time) => (
              <option key={time} value={time}>
                {time} minutes
              </option>
            ))}
          </select>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Add Task
          </button>
        </form>

        {/* Current Timer */}
        {currentTimer && (
          <div style={{ marginBottom: "20px" }}>
            <h2>Current Task: {currentTimer.taskName}</h2>
            <h3>Time Left: {formatTime(currentTimer.timeLeft)}</h3>
          </div>
        )}

        {/* Task List */}
        <h2>Tasks</h2>
        <div>
          {tasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                margin: "10px auto",
                width: "80%",
                maxWidth: "500px",
                textAlign: "left",
                backgroundColor: task.completed ? "#d4edda" : "#fff",
              }}
            >
              <h3>{task.taskName}</h3>
              <p>Duration: {task.duration} minutes</p>
              <p>
                {task.completed
                  ? `Completed at: ${new Date(task.endTime).toLocaleTimeString()}`
                  : "In Progress"}
              </p>
              {!task.completed && (
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    fontSize: "16px",
                    cursor: "pointer",
                  }}
                >
                  Mark as Completed
                </button>
              )}
              <button
                onClick={() => handleDeleteTask(task.id)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#FF4C4C",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeepWorkPage;
