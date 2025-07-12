import React from "react";

const LeaderboardPreview = () => {
  const wrapper = {
    color: "var(--text-color)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  };

  const title = {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "var(--input-bg)",
    borderRadius: "12px",
    overflow: "hidden",
    border: "1px solid var(--border-color)",
  };

  const thtd = {
    padding: "0.75rem 1rem",
    borderBottom: "1px solid var(--border-color)",
    textAlign: "left",
    fontSize: "0.9rem",
  };

  const header = {
    backgroundColor: "var(--card-bg)",
    color: "#60a5fa",
  };

  const topRow = {
    backgroundColor: "#16a34a20",
    fontWeight: "bold",
  };

  const users = [
    { name: "Amit Rao", rank: 1, points: 970 },
    { name: "Sneha Verma", rank: 2, points: 930 },
    { name: "Krish Chhipa", rank: 3, points: 910 },
  ];

  return (
    <div style={wrapper}>
      <h3 style={title}>🏆 Top Performers</h3>
      <table style={table}>
        <thead style={header}>
          <tr>
            <th style={thtd}>Rank</th>
            <th style={thtd}>Name</th>
            <th style={thtd}>Points</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={i} style={i === 0 ? topRow : {}}>
              <td style={thtd}>#{user.rank}</td>
              <td style={thtd}>{user.name}</td>
              <td style={thtd}>{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPreview;
