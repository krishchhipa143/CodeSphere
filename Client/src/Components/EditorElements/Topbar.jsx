import React from "react";
import { FaUserFriends, FaColumns, FaWindowRestore, FaTabletAlt } from "react-icons/fa";

const Topbar = () => {
  const menuItems = ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"];

  const baseColor = "#d4d4d4";
  const hoverColor = "#ffffff";
  const bgColor = "#1e1e1e";
  const inputBg = "#23272f";
  const accent = "#4fc3f7";

  return (
    <div
      style={{
        width: "100%",
        height: "32px",
        backgroundColor: bgColor,
        color: baseColor,
        fontSize: "13px",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 8px",
        boxSizing: "border-box",
        userSelect: "none",
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span
          style={{
            color: accent,
            fontWeight: "bold",
            fontSize: "13px",
            fontFamily: "monospace",
            padding: "2px 6px",
          }}
        >
          CodeSphere
        </span>
        <div style={{ display: "flex", gap: "12px" }}>
          {menuItems.map((item) => (
            <span
              key={item}
              style={{
                cursor: "pointer",
                color: baseColor,
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = hoverColor)}
              onMouseLeave={(e) => (e.target.style.color = baseColor)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Center */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: baseColor,
            cursor: "pointer",
            fontSize: "14px",
          }}
          onMouseEnter={(e) => (e.target.style.color = hoverColor)}
          onMouseLeave={(e) => (e.target.style.color = baseColor)}
        >
          ←
        </button>
        <button
          style={{
            background: "transparent",
            border: "none",
            color: baseColor,
            cursor: "pointer",
            fontSize: "14px",
          }}
          onMouseEnter={(e) => (e.target.style.color = hoverColor)}
          onMouseLeave={(e) => (e.target.style.color = baseColor)}
        >
          →
        </button>
        <input
          type="text"
          placeholder="Project codesphere"
          style={{
            backgroundColor: inputBg,
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontSize: "13px",
            padding: "4px 8px",
            borderRadius: "4px",
            width: "250px",
          }}
        />
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {[FaUserFriends, FaColumns, FaWindowRestore, FaTabletAlt].map((Icon, idx) => (
          <Icon
            key={idx}
            size={14}
            style={{
              color: baseColor,
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = hoverColor)}
            onMouseLeave={(e) => (e.target.style.color = baseColor)}
          />
        ))}
      </div>
    </div>
  );
};

export default Topbar;
