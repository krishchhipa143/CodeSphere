// src/Components/EditorElements/BottomBar.jsx
import React from "react";
import { useSelector } from "react-redux";

const BottomBar = () => {
  const installed = useSelector((state) => state.extensions.installed);

  const handleGoLive = () => {
    if (installed["go-live"]) {
      window.open("http://localhost:5500", "_blank");
    }
  };

  return (
    <div
      style={{
        height: 28,
        background: "#23272f",
        color: "#bdbdbd",
        display: "flex",
        alignItems: "center",
        fontSize: 13,
        padding: "0 16px",
        borderTop: "1px solid #23272f",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <span style={{ color: "#4fc3f7", fontWeight: 600 }}>
          &#9679; Live Share
        </span>
        <span>Ln 1, Col 1</span>
        <span>Spaces: 2</span>
        <span>UTF-8</span>
        <span>LF</span>
        <span>Prettier</span>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {installed["go-live"] && (
          <span
            style={{
              cursor: "pointer",
              color: "#4fc3f7",
              fontWeight: 600,
            }}
            onClick={handleGoLive}
          >
            Go Live
          </span>
        )}
      </div>
    </div>
  );
};

export default BottomBar;
