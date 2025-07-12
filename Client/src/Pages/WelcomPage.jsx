import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => navigate("/login");
  const handleSignUp = () => navigate("/signup");

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        position: "relative",
        backgroundImage: "url('/bg.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(15, 23, 42, 0.6)",
          zIndex: 1,
        }}
      />

      {/* Glassmorphism Container */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div
          style={{
            padding: "40px",
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.05)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            textAlign: "center",
            boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
            width: "90%",
            maxWidth: "600px",
            color: "#ffffff",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "700",
              marginBottom: "10px",
              animation: "glitchText 1.5s infinite",
            }}
          >
            Welcome to
          </h1>

          <h2
            style={{
              fontSize: "3.5rem",
              fontWeight: "900",
              letterSpacing: "3px",
              marginBottom: "30px",
              color: "#4fc3f7",
              animation: "glitchLoop 2s infinite",
            }}
          >
            CODESPHERE
          </h2>

          <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
            <button
              onClick={handleLogin}
              style={{
                backgroundColor: "#4fc3f7",
                color: "#fff",
                padding: "12px 30px",
                borderRadius: "10px",
                border: "none",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.3s ease",
                boxShadow: "0 0 10px #4fc3f7",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Login
            </button>

            <button
              onClick={handleSignUp}
              style={{
                backgroundColor: "transparent",
                color: "#4fc3f7",
                padding: "12px 30px",
                borderRadius: "10px",
                border: "2px solid #4fc3f7",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "0.3s ease",
                boxShadow: "0 0 10px #4fc3f766",
              }}
              onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Glitch Animations */}
      <style>
        {`
          @keyframes glitchText {
            0% { text-shadow: 2px 0 red; transform: translate(0); }
            20% { text-shadow: -2px 0 cyan; transform: translate(-1px, 0); }
            40% { text-shadow: 2px 2px lime; transform: translate(1px, 1px); }
            60% { text-shadow: -1px -1px yellow; transform: translate(-1px, -1px); }
            80% { text-shadow: 1px 1px magenta; transform: translate(1px, 0); }
            100% { text-shadow: 0 0 white; transform: translate(0); }
          }

          @keyframes glitchLoop {
            0% { text-shadow: 1px 0 red, -1px 0 cyan; }
            50% { text-shadow: -1px 0 red, 1px 0 cyan; }
            100% { text-shadow: 1px 0 red, -1px 0 cyan; }
          }
        `}
      </style>
    </div>
  );
};

export default WelcomePage;
