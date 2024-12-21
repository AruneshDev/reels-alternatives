import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import "./JournalPage.css"; // Optional CSS for better styling

const JournalPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch all journal entries on page load
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/journal");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
      }
    };

    fetchEntries();
  }, []);

  // Handle form submission to save a journal entry
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert("Both title and content are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/journal/save", {
        title,
        content,
      });
      setEntries((prevEntries) => [response.data.entry, ...prevEntries]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error saving journal entry:", error);
    }
  };

  // Handle delete entry
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5001/api/journal/${id}`);
      alert(response.data.message);
      setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      alert("Failed to delete the journal entry. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>My Journal</h1>
        <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              display: "block",
              margin: "10px auto",
              padding: "10px",
              width: "80%",
              maxWidth: "500px",
              height: "150px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          ></textarea>
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
            Save
          </button>
        </form>

        <h2>Saved Entries</h2>
        <div>
          {entries.map((entry) => (
            <div
              key={entry.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "20px",
                margin: "10px auto",
                width: "80%",
                maxWidth: "500px",
                textAlign: "left",
              }}
            >
              <h3>{entry.title}</h3>
              <p>{entry.content}</p>
              <small style={{ display: "block", marginBottom: "10px" }}>
                {new Date(entry.date).toLocaleString()}
              </small>
              <div style={{ textAlign: "center" }}>
                <button
                  onClick={() => handleDelete(entry.id)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#FF4C4C",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
