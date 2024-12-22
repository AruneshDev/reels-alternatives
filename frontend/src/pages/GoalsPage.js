import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const GoalsPage = () => {
  const [goals, setGoals] = useState([]);
  const [completedGoals, setCompletedGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    name: "",
    category: "",
    deadline: "",
    priority: "Low",
  });
  const [filter, setFilter] = useState("All");

  // Fetch goals from backend on page load
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/goals");
        const allGoals = response.data;
        setGoals(allGoals.filter((goal) => !goal.completed));
        setCompletedGoals(allGoals.filter((goal) => goal.completed));
      } catch (error) {
        console.error("Error fetching goals:", error);
        alert("Failed to fetch goals. Please try again later.");
      }
    };

    fetchGoals();
  }, []);

  // Handle form input changes for the new goal
  const handleInputChange = (e) => {
    setNewGoal({ ...newGoal, [e.target.name]: e.target.value });
  };

  // Add a new goal
  const handleAddGoal = async () => {
    if (!newGoal.name || !newGoal.deadline) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/goals", newGoal);
      setGoals([...goals, response.data]);
      setNewGoal({ name: "", category: "", deadline: "", priority: "Low" });
    } catch (error) {
      console.error("Error adding goal:", error);
      alert("Failed to add goal. Please try again.");
    }
  };

  // Mark a goal as complete
  const handleMarkComplete = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5001/api/goals/${id}/complete`);
      setCompletedGoals([...completedGoals, response.data]);
      setGoals(goals.filter((g) => g._id !== id));
    } catch (error) {
      console.error("Error marking goal complete:", error);
      alert("Failed to mark goal as complete. Please try again.");
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/goals/${id}`);
      setGoals(goals.filter((g) => g._id !== id));
      setCompletedGoals(completedGoals.filter((g) => g._id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
      alert("Failed to delete goal. Please try again.");
    }
  };

  // Filter goals by category
  const filteredGoals =
    filter === "All" ? goals : goals.filter((goal) => goal.category === filter);

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center" }}>My Goals</h1>
        <p style={{ textAlign: "center", fontStyle: "italic" }}>
          "What gets measured gets managed."
        </p>

        {/* Progress Summary */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3>
            Progress:{" "}
            {Math.round(
              (completedGoals.length /
                (completedGoals.length + goals.length)) *
                100 || 0
            )}
            %
          </h3>
          <progress
            value={completedGoals.length}
            max={completedGoals.length + goals.length}
            style={{ width: "80%" }}
          />
        </div>

        {/* New Goal Form */}
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "20px", marginBottom: "20px" }}>
          <h3>Add a New Goal</h3>
          <input
            type="text"
            name="name"
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={handleInputChange}
            style={{ padding: "10px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <select
            name="category"
            value={newGoal.category}
            onChange={handleInputChange}
            style={{ padding: "10px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="">Select Category</option>
            <option value="Personal">Personal</option>
            <option value="Career">Career</option>
            <option value="Fitness">Fitness</option>
            <option value="Financial">Financial</option>
          </select>
          <input
            type="date"
            name="deadline"
            value={newGoal.deadline}
            onChange={handleInputChange}
            style={{ padding: "10px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <select
            name="priority"
            value={newGoal.priority}
            onChange={handleInputChange}
            style={{ padding: "10px", marginRight: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleAddGoal}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Add Goal
          </button>
        </div>

        {/* Current Goals */}
        <div>
          <h3>Current Goals</h3>
          {filteredGoals.length > 0 ? (
            filteredGoals.map((goal) => (
              <div
                key={goal._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                }}
              >
                <h4>{goal.name}</h4>
                <p>Category: {goal.category || "None"}</p>
                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                <p>Priority: {goal.priority}</p>
                <button
                  onClick={() => handleMarkComplete(goal._id)}
                  style={{
                    marginRight: "10px",
                    padding: "5px 10px",
                    backgroundColor: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Mark Complete
                </button>
                <button
                  onClick={() => handleDeleteGoal(goal._id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No current goals. Add a goal to get started!</p>
          )}
        </div>

        {/* Completed Goals */}
        <div>
          <h3>Completed Goals</h3>
          {completedGoals.length > 0 ? (
            completedGoals.map((goal) => (
              <div
                key={goal._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  marginBottom: "10px",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <h4>{goal.name}</h4>
                <p>Category: {goal.category || "None"}</p>
                <p>Deadline: {new Date(goal.deadline).toLocaleDateString()}</p>
                <p>Priority: {goal.priority}</p>
              </div>
            ))
          ) : (
            <p>No completed goals yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalsPage;
