import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/Slices/ThemeSlice";

const Navbar = () => {
  const mode = useSelector((state) => state.theme.mode);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  const isLight = mode === "light";
  const transition = "all 0.3s ease-in-out";

  const navLinks = [
    { path: "/home", label: "Home" },
    { path: "/codeeditor", label: "Editor" },
    { path: "/collab-section", label: "Requests" },
    { path: "/leaderboard", label: "Leaderboard" },
    { path: "/rank", label: "Rank" },
    { path: "/projects", label: "Projects" },
    { path: "/chat", label: "Chat" },
    { path: "/contact", label: "Contact Us" },
    { path: "/team", label: "Our Team" },
  ];

  const navStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    height: "60px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 24px",
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    background: "rgba(30, 41, 59, 0.7)", // for dark
    color: "var(--text-color)",
    borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
    transition,
  };

  const navLinkStyle = ({ isActive }) => ({
    marginRight: "12px",
    textDecoration: "none",
    fontSize: "14px",
    color: isActive ? "#4fc3f7" : "var(--text-color)",
    fontWeight: isActive ? "600" : "500",
    padding: "6px 12px",
    borderRadius: "6px",
    background: isActive ? "rgba(79, 195, 247, 0.1)" : "transparent",
    boxShadow: isActive ? "0 0 6px rgba(79, 195, 247, 0.4)" : "none",
    transition,
  });

  const inputStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.1)",
    fontSize: "13px",
    backgroundColor: "rgba(255,255,255,0.05)",
    color: "var(--text-color)",
    outline: "none",
    transition,
  };

  const iconButtonStyle = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "18px",
    color: "var(--text-color)",
    marginLeft: "12px",
    transition,
  };

  const profileButtonStyle = {
    backgroundColor: "#4fc3f7",
    padding: "6px 14px",
    borderRadius: "8px",
    color: "#ffffff",
    fontSize: "13px",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginLeft: "12px",
    boxShadow: "0 0 10px #4fc3f766",
    transition,
  };

  return (
    <nav style={navStyle}>
      {/* Logo */}
      <Link
        to="/home"
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#4fc3f7",
          textDecoration: "none",
          transition,
        }}
      >
        &lt;/&gt; CodeSphere
      </Link>

      {/* Center Nav Links */}
      {isAuthenticated && (
        <div style={{ display: "flex", alignItems: "center" }}>
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} style={navLinkStyle}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* Right Section: Search, Icons, Theme, Profile */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {isAuthenticated && (
          <>
            <input type="text" placeholder="Search" style={inputStyle} />

            <div style={{ position: "relative" }}>
              <button style={iconButtonStyle} title="Notifications">
                <i className="bi bi-bell-fill"></i>
              </button>
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  backgroundColor: "red",
                  color: "white",
                  fontSize: "10px",
                  borderRadius: "50%",
                  padding: "1px 5px",
                  fontWeight: "600",
                }}
              >
                3
              </span>
            </div>

            <button
              title="Voice Assistant"
              style={{ ...iconButtonStyle, color: "#4fc3f7" }}
            >
              <i className="bi bi-mic-fill"></i>
            </button>
          </>
        )}

        {/* Theme Toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          style={iconButtonStyle}
          title="Toggle Theme"
        >
          <i className={isLight ? "bi bi-moon-fill" : "bi bi-sun-fill"}></i>
        </button>

        {/* Profile */}
        {isAuthenticated && (
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <button style={profileButtonStyle}>
              <i className="bi bi-person-circle"></i> Profile
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
