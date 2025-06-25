import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Slices/ThemeSlice";

const Navbar = () => {
  const mode = useSelector((state) => state.theme.mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const isLight = mode === "light";
  const transition = "all 0.4s ease-in-out";

  const navStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 24px",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    boxShadow: "var(--shadow)",
    borderBottom: "1px solid var(--border-color)",
    transition,
  };

  const navLinkStyle = {
    marginRight: "16px",
    textDecoration: "none",
    fontSize: "14px",
    color: "var(--text-color)",
    fontWeight: "500",
    padding: "6px 10px",
    borderRadius: "6px",
    transition,
  };

  const inputStyle = {
    padding: "6px 10px",
    borderRadius: "6px",
    border: "1px solid var(--input-border)",
    fontSize: "13px",
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
    transition,
  };

  const iconButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    position: "relative",
    marginLeft: "12px",
    color: "var(--text-color)",
    transition,
  };

  const profileButtonStyle = {
    backgroundColor: "var(--accent)",
    padding: "6px 12px",
    borderRadius: "6px",
    color: "#ffffff",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "12px",
    transition,
  };

  return (
    <nav style={navStyle}>
      <Link
        to="/"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "var(--accent)",
          textDecoration: "none",
          transition,
        }}
      >
        &lt;/&gt; CodeSphere
      </Link>

      {/* Center - Navigation Links (Only when logged in) */}
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {["home", "editor", "collab", "leaderboard", "rank", "projects", "help", "chat"].map((path) => (
            <NavLink key={path} to={`/${path}`} style={navLinkStyle}>
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          ))}
        </div>
      )}

      {/* Right - Theme & User Controls */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {/* Search + Icons (Only when logged in) */}
        {isAuthenticated && (
          <>
            <input type="text" placeholder="Search" style={inputStyle} />

            <button style={iconButtonStyle} title="Notifications">
              <i className="bi bi-bell-fill"></i>
              <span
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-6px",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  padding: "1px 4px",
                  transition,
                }}
              >
                3
              </span>
            </button>

            <button title="Voice Assistant" style={{ ...iconButtonStyle, color: "var(--accent)" }}>
              <i className="bi bi-mic-fill"></i>
            </button>
          </>
        )}

        <button onClick={() => dispatch(toggleTheme())} style={iconButtonStyle} title="Toggle Theme">
          <i className={isLight ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
        </button>

        {isAuthenticated && (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <button style={profileButtonStyle}>
              <i className="bi bi-person-circle"></i>
              Profile
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
