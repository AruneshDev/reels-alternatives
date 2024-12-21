import React from "react";
import Navbar from "../components/Navbar"; // Corrected import

const JournalPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>My Journal</h1>
        <p>Write down your thoughts and experiences here!</p>
      </div>
    </div>
  );
};

export default JournalPage;
