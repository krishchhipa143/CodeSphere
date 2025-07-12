import React from "react";

const QuickStart = () => {
  const container = {
    padding: "40px 20px",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
  };

  const title = {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "20px",
    textAlign: "center",
  };

  const cardWrapper = {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
  };

  const card = {
    backgroundColor: "var(--card-bg)",
    border: "1px solid var(--border-color)",
    borderRadius: "12px",
    padding: "20px",
    width: "200px",
    textAlign: "center",
    boxShadow: "var(--shadow)",
    cursor: "pointer",
    transition: "transform 0.2s ease",
  };

  const cardHover = {
    transform: "scale(1.05)",
  };

  const [hovered, setHovered] = React.useState(null);

  const cards = [
    { title: "Start New", emoji: "🚀" },
    { title: "Join Room", emoji: "🤝" },
    { title: "View Projects", emoji: "📁" },
  ];

  return (
    <section style={container}>
      <h2 style={title}>⚡ Quick Start</h2>
      <div style={cardWrapper}>
        {cards.map((cardData, index) => (
          <div
            key={index}
            style={{
              ...card,
              ...(hovered === index ? cardHover : {}),
            }}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ fontSize: "32px", marginBottom: "10px" }}>
              {cardData.emoji}
            </div>
            <div style={{ fontSize: "16px", fontWeight: "500" }}>
              {cardData.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default QuickStart;
