const express = require("express");
const axios = require("axios");
const router = express.Router();

// Replace with your Eventbrite API Key
const EVENTBRITE_API_KEY = "YOUR_API_KEY";

// Event route to fetch fun events near a location
router.get("/fun-events", async (req, res) => {
  const { location } = req.query; // Location passed as a query parameter

  if (!location) {
    return res.status(400).json({ message: "Location is required" });
  }

  try {
    // Eventbrite API call to fetch events
    const response = await axios.get(
      `https://www.eventbriteapi.com/v3/events/search/`,
      {
        headers: {
          Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
        },
        params: {
          "location.address": location, // Pass location as query parameter
          "location.within": "10km", // Search within a 10km radius
          sort_by: "date", // Sort events by date
          page_size: 5, // Limit results to 5 events
        },
      }
    );

    // Parse and return events
    const events = response.data.events || [];
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error.response?.data || error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

module.exports = router;
