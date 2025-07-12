import React from "react";
import { FiLink2, FiChevronRight } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

const ShareScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const settings = location.state || {};

  const handleOverlayClick = () => {
    navigate("/codeeditor"); // ✅ redirect to codeeditor
  };

  const stopPropagation = (e) => e.stopPropagation();

  const handleAnyoneClick = () => navigate("/sharesetting");
  const handleOwnerClick = () => {};
  const handleEditorClick = () => {};

  const users = [
    {
      name: "Anyone",
      role: settings.permission === "edit" ? "can edit" : "can view",
      icon: "🌐",
      showArrow: true,
      onClick: handleAnyoneClick,
    },
    {
      name: "krish chhipa (you)",
      role: "owner",
      icon: "🟣",
      showArrow: false,
      onClick: handleOwnerClick,
    },
    {
      name: "Pintu Nayak",
      role: "can edit",
      icon: "🟠",
      showArrow: true,
      onClick: handleEditorClick,
    },
  ];

  return (
    <div style={styles.overlay} onClick={handleOverlayClick}>
      <div style={styles.modal} onClick={stopPropagation}>
        <div style={styles.header}>
          <span style={styles.title}>Share this file</span>
          <button style={styles.copyBtn}>
            <FiLink2 size={14} />
            <span>Copy link</span>
          </button>
        </div>

        <div style={styles.inputRow}>
          <input
            type="email"
            placeholder="Emails, comma separated"
            style={styles.input}
          />
          <button style={styles.inviteBtn}>Invite</button>
        </div>

        <div style={styles.sectionTitle}>Who has access</div>

        <ul style={styles.userList}>
          {users.map((user, i) => (
            <li
              key={i}
              style={{ ...styles.userItem, cursor: "pointer" }}
              onClick={user.onClick}
            >
              <span>{user.icon}</span>
              <span style={styles.name}>{user.name}</span>
              <span style={styles.role}>{user.role}</span>
              {user.showArrow && (
                <FiChevronRight size={16} color="var(--text-color)" />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    width: "100%",
    maxWidth: "480px",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "var(--card-bg)",
    boxShadow: "var(--shadow)",
    fontFamily: "var(--font-main)",
    color: "var(--text-color)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
  },
  copyBtn: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "13px",
    color: "var(--accent)",
    background: "transparent",
    border: "none",
    cursor: "pointer",
  },
  inputRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "16px",
  },
  input: {
    flex: 1,
    padding: "8px 12px",
    border: "1px solid var(--input-border)",
    backgroundColor: "var(--input-bg)",
    borderRadius: "8px",
    color: "var(--text-color)",
  },
  inviteBtn: {
    backgroundColor: "var(--button-blue)",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  userList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  userItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid var(--border-color)",
    fontSize: "14px",
  },
  name: {
    flex: 1,
    marginLeft: "12px",
  },
  role: {
    fontStyle: "italic",
    fontSize: "13px",
    color: "var(--text-color)",
  },
};

export default ShareScreen;
