import React, { useState } from "react";

const DailyTasks = () => {
  const [activeTab, setActiveTab] = useState("daily");

  const dailyTasks = [
    {
      title: "Roll out project request form",
      date: "Aug 31",
      status: "Achieved",
      percent: "100%",
    },
    {
      title: "Reduce time in meetings",
      date: "Nov 30",
      status: "On track",
      percent: "70%",
    },
  ];

  const weeklyTasks = [
    {
      title: "Complete 2 Collab Codes",
      date: "This Week",
      status: "On track",
      percent: "50%",
    },
    {
      title: "Join 1 Peer Session",
      date: "This Week",
      status: "Achieved",
      percent: "100%",
    },
  ];

  const container = {
    padding: "40px 20px",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    width: "100%",
  };

  const wrapper = {
    maxWidth: "800px",
    margin: "0 auto",
  };

  const title = {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  };

  const tabContainer = {
    display: "flex",
    width: "100%",
    borderBottom: "1px solid var(--border-color)",
    marginBottom: "20px",
  };

  const tab = (isActive) => ({
    flex: 1,
    textAlign: "center",
    paddingBottom: "10px",
    fontWeight: "500",
    fontSize: "15px",
    cursor: "pointer",
    borderBottom: `2px solid ${isActive ? "var(--accent)" : "transparent"}`,
    color: isActive ? "var(--accent)" : "var(--text-color)",
    transition: "all 0.2s ease",
  });

  const taskItem = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--card-bg)",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "15px",
    boxShadow: "var(--shadow)",
  };

  const left = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
    fontWeight: "500",
    color: "var(--text-color)",
  };

  const right = {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  };

  const avatar = {
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  const tag = (status) => ({
    backgroundColor: status === "Achieved" ? "#10b981" : "#a3e635",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 10px",
    borderRadius: "999px",
    fontWeight: "600",
  });

  const showMoreStyle = {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    fontWeight: "500",
    color: "var(--accent)",
    cursor: "pointer",
    textDecoration: "underline",
    transition: "color 0.3s ease",
  };

  const currentTasks = activeTab === "daily" ? dailyTasks : weeklyTasks;

  return (
    <section style={container}>
      <div style={wrapper}>
        <h2 style={title}>📋 Daily Task System</h2>

        {/* Tab Header */}
        <div style={tabContainer}>
          <div
            style={tab(activeTab === "daily")}
            onClick={() => setActiveTab("daily")}
          >
            Daily Tasks
          </div>
          <div
            style={tab(activeTab === "weekly")}
            onClick={() => setActiveTab("weekly")}
          >
            Weekly Tasks
          </div>
        </div>

        {/* Task List */}
        {currentTasks.map((task, i) => (
          <div key={i} style={taskItem}>
            <div style={left}>
              <span style={{ fontSize: "20px" }}>◇</span>
              {task.title}
            </div>
            <div style={right}>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{task.date}</span>
              <img
                src="https://i.pravatar.cc/30?img=1"
                alt="user"
                style={avatar}
              />
              <span style={tag(task.status)}>{task.status}</span>
              <span style={{ fontSize: "13px", color: "#94a3b8" }}>{task.percent}</span>
            </div>
          </div>
        ))}

        <div style={showMoreStyle}>Show All Tasks</div>
      </div>
    </section>
  );
};

export default DailyTasks;
