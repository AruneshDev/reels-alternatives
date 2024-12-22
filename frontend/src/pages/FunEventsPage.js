import React from "react";
import Navbar from "../components/Navbar";
import FunEventsCard from "../components/FunEventsCard";

const FunEventsPage = () => {
  return (
    <div>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Fun Events Near You</h1>
        <FunEventsCard />
      </div>
    </div>
  );
};

export default FunEventsPage;
