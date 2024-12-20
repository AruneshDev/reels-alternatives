import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/activities'); // Ensure this matches your backend route
        setActivities(response.data); // Save activities to state
      } catch (error) {
        console.error('Error fetching activities:', error.message);
        setError(error.message); // Save the error to state
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity.id}>{activity.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityList;
