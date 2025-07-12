import React from "react";

const RecentProjects = () => {
  const containerStyle = {
    backgroundColor: "var(--card-bg)",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "var(--shadow)",
  };

  const titleStyle = {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "1rem",
    color: "var(--text-color)",
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
  };

  const cardStyle = {
    backgroundColor: "var(--input-bg)",
    borderRadius: "10px",
    padding: "1rem",
    boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
    transition: "0.3s ease",
    color: "var(--text-color)",
  };

  const projectData = [
    { title: "Portfolio Website", description: "Personal React portfolio site" },
    { title: "Blog API", description: "Node.js + MongoDB blogging backend" },
    { title: "ToDo App", description: "Fullstack MERN ToDo manager" },
    { title: "Chat App", description: "Real-time chat using Socket.io" },
  ];

  return (
    <div style={containerStyle}>
      <h3 style={titleStyle}>Recent Projects</h3>
      <div style={gridStyle}>
        {projectData.map((proj, index) => (
          <div key={index} style={cardStyle}>
            <h4 style={{ margin: "0 0 0.5rem", fontSize: "16px" }}>{proj.title}</h4>
            <p style={{ fontSize: "13px", color: "#9CA3AF" }}>{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentProjects;
