import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Editor } from "@tinymce/tinymce-react"; // Import TinyMCE editor

const JournalPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [entries, setEntries] = useState([]);

  // Fetch journal entries from backend
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/journal");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching journal entries:", error);
        alert("Failed to fetch journal entries. Please try again.");
      }
    };

    fetchEntries();
  }, []);

  // Save a new journal entry
  const handleSaveEntry = async () => {
    if (!title || !content) {
      alert("Please fill in both the title and content.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5001/api/journal", {
        title,
        content,
      });
      setEntries([...entries, response.data]);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error saving journal entry:", error);
      alert("Failed to save entry. Please try again.");
    }
  };

  // Delete a journal entry
  const handleDeleteEntry = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/journal/${id}`);
      setEntries(entries.filter((entry) => entry._id !== id));
    } catch (error) {
      console.error("Error deleting journal entry:", error);
      alert("Failed to delete entry. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h1 style={{ textAlign: "center" }}>Journal</h1>

        {/* Input for Title */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Editor for Content */}
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
            }}
          >
            Note
          </label>
          <Editor
          apiKey={process.env.REACT_APP_TINYMCE_API_KEY} // Replace with your TinyMCE API key
            value={content}
            init={{
              height: 300,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | bold italic backcolor | \
                alignleft aligncenter alignright alignjustify | \
                bullist numlist outdent indent | removeformat | help",
            }}
            onEditorChange={(content) => setContent(content)}
          />
        </div>

        {/* Save Button */}
        <button
          onClick={handleSaveEntry}
          style={{
            padding: "10px 20px",
            backgroundColor: "green",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Save
        </button>

        {/* List of Saved Entries */}
        <div style={{ marginTop: "40px" }}>
          <h2>Previous Entries</h2>
          {entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry._id}
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "15px",
                  marginBottom: "10px",
                }}
              >
                <h3>{entry.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: entry.content }}
                  style={{ marginBottom: "10px" }}
                />
                <button
                  onClick={() => handleDeleteEntry(entry._id)}
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
            <p>No journal entries yet. Start by adding one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
