import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebaseConfig"; // Ensure Firebase is configured correctly
import { signOut } from "firebase/auth";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      console.log("User logged out successfully");
      navigate("/"); // Redirect to the login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <div>
        <h1>Escape the Matrix</h1>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          to="/home"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Home
        </Link>
        <Link
          to="/fun-events" // Add this route to your App.js
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Events
        </Link>
        <Link
          to="/goals"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
        >
          My Goals
        </Link>
        <Link
          to="/journal"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Journal
        </Link>
        <Link
          to="/deep-work"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
        >
          Deep Work
        </Link>
        <button
          onClick={handleLogout}
          style={{
            margin: "0 10px",
            backgroundColor: "#f9423a",
            color: "white",
            border: "none",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
