import React from "react";
import Navbar from "../components/Navbar"; // Corrected import

const GoalsPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>My Goals</h1>
        <p>Track and update your goals here!</p>
      </div>
    </div>
  );
};

export default GoalsPage;
