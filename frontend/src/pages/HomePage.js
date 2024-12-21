import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const HomePage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/activities"); // Fetch activities from backend
        const updatedActivities = response.data.map((activity) => ({
          ...activity,
          image: `http://localhost:5001/${activity.image}`, // Prepend backend URL to images
        }));
        setActivities(updatedActivities);
      } catch (error) {
        console.error("Error fetching activities:", error);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Welcome to the Activity Page</h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "20px",
            padding: "20px",
          }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={activity.image}
                alt={activity.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />
              <h2>{activity.name}</h2>
              <p>{activity.description}</p>
              <a
                href={activity.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  textDecoration: "none",
                  color: "#4285F4",
                  fontWeight: "bold",
                }}
              >
                Learn More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
