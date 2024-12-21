import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ActivitySelector.css"; // Add styling for the component

const ActivitySelector = () => {
  const [activities, setActivities] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    // Fetch activities from the backend
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/activities");
        setActivities(response.data);
      } catch (error) {
        console.error("Error fetching activities:", error.message);
      }
    };

    fetchActivities();
  }, []);

  // Get two random activities
  const getTwoRandomActivities = () => {
    if (activities.length < 2) return [];
    const shuffled = [...activities].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const randomActivities = getTwoRandomActivities();

  const handleSelect = (id) => {
    setSelectedId(id); // Set the selected activity
  };

  return (
    <div className="activity-container">
      {randomActivities.map((activity) => (
        <div
          key={activity.id}
          className={`activity-card ${selectedId === activity.id ? "selected" : ""}`}
          onClick={() => handleSelect(activity.id)}
        >
          <img src={`http://localhost:5001/${activity.image}`} alt={activity.name} />
          <h3>{activity.name}</h3>
          <a href={activity.link} target="_blank" rel="noopener noreferrer">
            Learn More
          </a>
        </div>
      ))}
    </div>
  );
};

export default ActivitySelector;
