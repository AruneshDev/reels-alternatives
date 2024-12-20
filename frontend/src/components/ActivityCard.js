import React from 'react';

const ActivityCard = ({ title, description, category, imageUrl }) => {
  return (
    <div className="activity-card">
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      <small>{category}</small>
    </div>
  );
};

export default ActivityCard;
