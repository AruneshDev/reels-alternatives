import React, { useState } from 'react';
import axios from 'axios';

const AddActivityPage = () => {
  const [formData, setFormData] = useState({ title: '', description: '', category: '', imageUrl: '' });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/activities', formData);
    alert('Activity added!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
      <input type="text" name="category" placeholder="Category" onChange={handleChange} />
      <input type="text" name="imageUrl" placeholder="Image URL" onChange={handleChange} />
      <button type="submit">Add Activity</button>
    </form>
  );
};

export default AddActivityPage;
