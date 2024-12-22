import React, { useState, useEffect } from "react";
import axios from "axios";

const FunEventsCard = () => {
  const [location, setLocation] = useState("");
  const [events, setEvents] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
// Replace with your actual credentials
const EVENTBRITE_APP_KEY = "BXNRW5JDCTRHH7AF25AV"; // Replace with your real App Key
const REDIRECT_URI = "http://localhost:3000"; // Local development URL


  // Check for OAuth token in URL or localStorage
  useEffect(() => {
    const hash = window.location.hash;
    const storedToken = localStorage.getItem("eventbrite_token");

    if (hash.includes("access_token")) {
      const token = new URLSearchParams(hash.substring(1)).get("access_token");
      localStorage.setItem("eventbrite_token", token);
      setIsAuthenticated(true);
      window.location.hash = ""; // Clear the hash to clean up the URL
    } else if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    // Redirect user to Eventbrite OAuth authorization page
    window.location.href = `https://www.eventbrite.com/oauth/authorize?response_type=token&client_id=${EVENTBRITE_APP_KEY}&redirect_uri=${REDIRECT_URI}`;
  };

  const handleSearch = async () => {
    if (!location) {
      alert("Please enter a location");
      return;
    }

    const token = localStorage.getItem("eventbrite_token");
    if (!token) {
      alert("Please log in with Eventbrite to search for events.");
      return;
    }

    try {
      const response = await axios.get("https://www.eventbriteapi.com/v3/events/search/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          q: "fun", // Query for fun events
          "location.address": location,
          "location.within": "50km",
          sort_by: "date",
        },
      });
      setEvents(response.data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to fetch events. Please try again.");
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        margin: "10px auto",
        width: "80%",
        maxWidth: "500px",
        textAlign: "center",
      }}
    >
      <h3>Find Fun Events Near You(Coming Soon!)</h3>
      {!isAuthenticated ? (
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#f9423a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Connect with Eventbrite
        </button>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter your city"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            style={{
              padding: "10px",
              width: "80%",
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: "10px 20px",
              backgroundColor: "#4285F4",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Search Events
          </button>
        </>
      )}

      {/* Display events */}
      {events.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h4>Top 5 Events:</h4>
          {events.slice(0, 5).map((event, index) => (
            <div
              key={index}
              style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                textAlign: "left",
              }}
            >
              <h5>{event.name?.text || "Unnamed Event"}</h5>
              <p>{event.start?.local || "No start date"}</p>
              <a
                href={event.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#4285F4",
                  textDecoration: "none",
                }}
              >
                View Details
              </a>
            </div>
          ))}
        </div>
      )}

      {events.length === 0 && isAuthenticated && <p>No events found. Try searching!</p>}
    </div>
  );
};

export default FunEventsCard;
