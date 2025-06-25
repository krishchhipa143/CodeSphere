import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-color)",
        fontFamily: "var(--font-main)",
      }}
    >
      <h1
        style={{
          fontWeight: "700",
          marginBottom: "20px",
          color: "var(--text-color)",
        }}
      >
        Welcome to CodeSphere
      </h1>

      <div className="d-flex gap-3">
        <button
          className="btn btn-primary custom-btn"
          onClick={handleLogin}
          style={{
            backgroundColor: "var(--button-blue)",
            border: "none",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          Login
        </button>

        <button
          className="btn btn-outline-primary custom-btn"
          onClick={handleSignUp}
          style={{
            backgroundColor: "transparent",
            color: "var(--button-blue)",
            border: "1px solid var(--button-blue)",
            padding: "10px 20px",
            borderRadius: "8px",
            fontWeight: "500",
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
