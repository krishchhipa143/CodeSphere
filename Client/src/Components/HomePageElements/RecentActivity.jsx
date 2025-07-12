import React from "react";

const RecentActivity = () => {
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

  const activityBox = {
    backgroundColor: "var(--input-bg)",
    padding: "0.75rem 1rem",
    borderRadius: "12px",
    border: "1px solid var(--border-color)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.9rem",
  };

  const time = {
    color: "#94a3b8",
    fontSize: "0.8rem",
  };

  const data = [
    { msg: "You joined Project: UI Builder", time: "2 min ago" },
    { msg: "Sneha sent you a collab invite", time: "10 min ago" },
    { msg: "New message in SkillShare group", time: "20 min ago" },
    { msg: "You earned 'Fast Solver' badge", time: "30 min ago" },
  ];

  return (
    <div style={wrapper}>
      <h3 style={title}>📢 Recent Activity</h3>
      {data.map((item, i) => (
        <div key={i} style={activityBox}>
          <span>{item.msg}</span>
          <span style={time}>{item.time}</span>
        </div>
      ))}
    </div>
  );
};

export default RecentActivity;

