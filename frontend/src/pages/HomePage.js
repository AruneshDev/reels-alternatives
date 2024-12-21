import React from "react";
import ActivitySelector from "../components/ActivitySelector";

const HomePage = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Choose Your Activity</h1>
      <ActivitySelector />
    </div>
  );
};

export default HomePage;
