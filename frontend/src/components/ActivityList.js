import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivityCard from './ActivityCard';

const ActivityList = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const { data } = await axios.get('/api/activities');
      setActivities(data);
    };
    fetchActivities();
  }, []);

  return (
    <div className="activity-list">
      {activities.map(activity => (
        <ActivityCard key={activity._id} {...activity} />
      ))}
    </div>
  );
};

export default ActivityList;
