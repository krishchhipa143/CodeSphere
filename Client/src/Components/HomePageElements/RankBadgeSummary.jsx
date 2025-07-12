import React from "react";

const RankBadgeSummary = () => {
  const wrapper = {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    color: "var(--text-color)",
  };

  const title = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  };

  const statBox = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--input-bg)",
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
  };

  const badge = {
    fontSize: "0.8rem",
    fontWeight: "bold",
    padding: "4px 10px",
    borderRadius: "999px",
    backgroundColor: "#16a34a20",
    color: "#16a34a",
  };

  return (
    <div style={wrapper}>
      <h3 style={title}>🏅 Rank & Badges</h3>

      <div style={statBox}>
        <span>India Rank</span>
        <span>#137</span>
      </div>

      <div style={statBox}>
        <span>State Rank</span>
        <span>#12</span>
      </div>

      <div style={statBox}>
        <span>District Rank</span>
        <span>#3</span>
      </div>

      <div style={statBox}>
        <span>Badges Earned</span>
        <span style={badge}>5 Badges</span>
      </div>
    </div>
  );
};

export default RankBadgeSummary;
