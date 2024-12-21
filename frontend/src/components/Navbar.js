import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      <div>
        <h1>10 things to do when you don't feel like doing anything!</h1>
      </div>
      <div>
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

        <Link
          to="/"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "white",
          }}
          onClick={() => {
            console.log("Logging out");
            // Add signOut logic here if required
          }}
          
        >
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
