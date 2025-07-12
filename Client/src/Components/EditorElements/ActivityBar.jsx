import React from "react";
import {
  FiFileText,
  FiSearch,
  FiGitBranch,
  FiPlay,
  FiSettings,
  FiPackage, // for extensions
} from "react-icons/fi";

const ActivityBar = ({ active, onChange }) => {
  const items = [
    { key: "explorer", icon: <FiFileText size={22} />, label: "Explorer" },
    { key: "search", icon: <FiSearch size={22} />, label: "Search" },
    { key: "source", icon: <FiGitBranch size={22} />, label: "Source Control" },
    { key: "run", icon: <FiPlay size={22} />, label: "Run & Debug" },
    { key: "extensions", icon: <FiPackage size={22} />, label: "Extensions" }, // NEW
    { key: "settings", icon: <FiSettings size={22} />, label: "Settings" },
  ];

  return (
    <div
      style={{
        width: 52,
        background: "#20232a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 0",
        borderRight: "1px solid #23272f",
        height: "100%",
        zIndex: 2,
      }}
    >
      {items.map((item) => (
        <button
          key={item.key}
          title={item.label}
          onClick={() => onChange(item.key)}
          style={{
            background: active === item.key ? "#2c313a" : "none",
            border: "none",
            color: active === item.key ? "#4fc3f7" : "#bdbdbd",
            width: 40,
            height: 40,
            margin: "6px 0",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default ActivityBar;
