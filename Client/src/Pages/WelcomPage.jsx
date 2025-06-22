import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login');
    }
    const handleSignUp= () => {
        navigate('/signup');
    }
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#F9FAFB" }}
    >
      <h1 style={{ fontWeight: "700", marginBottom: "20px", color: "#111827" }}>
        Welcome to CodeSphere
      </h1>

      <div className="d-flex gap-3">
        <button className="btn btn-primary custom-btn" onClick={handleLogin}>Login</button>
        <button className="btn btn-outline-primary custom-btn" onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default WelcomePage;
