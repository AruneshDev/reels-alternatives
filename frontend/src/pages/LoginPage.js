import React from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import logo from "../assets/logo.webp"; // Use the generated logo

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user; // Retrieve user details
      console.log("User logged in:", user);
      navigate("/home"); // Redirect to HomePage
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f0f2f5",
      }}
    >
      {/* Logo Section */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <img src={logo} alt="Reels Alternative Logo" style={{ width: "150px" }} />
        <h1 style={{ fontSize: "36px", color: "#4267B2" }}>Welcome!</h1>
        <p style={{ fontSize: "18px", color: "#606770" }}>
          Find meaningful alternatives to endless scrolling.
        </p>
      </div>

      {/* Login Section */}
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
          width: "90%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#333" }}>Log in</h2>
        <button
          onClick={handleGoogleLogin}
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#4285F4",
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Sign in with Google
        </button>
      </div>

      {/* Footer Section */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p style={{ fontSize: "14px", color: "#606770" }}>
          © 2024 Reels Alternative. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
