import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebaseConfig";

const TestComponent = () => {
  const testLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user); // Log user details
    } catch (error) {
      console.error("Error during login:", error.message); // Log any errors
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Test Google Login</h1>
      <button
        onClick={testLogin}
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
        Test Google Login
      </button>
    </div>
  );
};

export default TestComponent;
