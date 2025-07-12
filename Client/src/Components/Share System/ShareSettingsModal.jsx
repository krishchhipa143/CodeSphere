import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShareSettingsModal = () => {
  const navigate = useNavigate();
  const [accessType, setAccessType] = useState("anyone");
  const [permission, setPermission] = useState("view");
  const [passwordRequired, setPasswordRequired] = useState(false);
  const [allowCopy, setAllowCopy] = useState(true);

  const handleSaveClick = () => {
    navigate("/share", {
      state: {
        accessType,
        permission,
        passwordRequired,
        allowCopy,
      },
    });
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <div style={styles.header}>
          <span style={styles.title}>Share settings</span>
          <button onClick={() => navigate("/share")} style={styles.close}>✕</button>
        </div>

        <p style={styles.note}>
          These settings won’t apply to the people directly invited, or the members of your org who currently have access.
        </p>

        <div style={styles.section}>
          <label style={styles.label}>Who can access</label>
          <select
            style={styles.select}
            value={accessType}
            onChange={(e) => setAccessType(e.target.value)}
          >
            <option value="anyone">🌐 Anyone</option>
            <option value="restricted">🔒 Invited Only</option>
          </select>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>What can they do</label>
          <div style={styles.radioGroup}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="view"
                checked={permission === "view"}
                onChange={() => setPermission("view")}
              />
              View
            </label>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                value="edit"
                checked={permission === "edit"}
                onChange={() => setPermission("edit")}
              />
              Edit
            </label>
          </div>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Additional security</label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={passwordRequired}
              onChange={() => setPasswordRequired(!passwordRequired)}
            />
            Password required
          </label>
        </div>

        <div style={styles.section}>
          <label style={styles.label}>Advanced</label>
          <label style={styles.checkbox}>
            <input
              type="checkbox"
              checked={allowCopy}
              onChange={() => setAllowCopy(!allowCopy)}
            />
            Viewers can copy, save, and export from this file
          </label>
        </div>

        <div style={styles.footer}>
          <button style={styles.cancel} onClick={() => navigate("/share")}>Cancel</button>
          <button style={styles.save} onClick={handleSaveClick}>Save</button>
        </div>
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
    maxWidth: "500px",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    fontFamily: "var(--font-main)",
    boxShadow: "var(--shadow)",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  },
  title: { fontSize: "16px", fontWeight: 600 },
  close: {
    background: "transparent",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "var(--text-color)",
  },
  note: {
    fontSize: "13px",
    marginBottom: "16px",
  },
  section: {
    marginBottom: "16px",
  },
  label: {
    fontWeight: 500,
    fontSize: "14px",
    display: "block",
    marginBottom: "6px",
  },
  select: {
    width: "100%",
    padding: "8px",
    border: "1px solid var(--input-border)",
    borderRadius: "8px",
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
  },
  radioGroup: {
    display: "flex",
    gap: "20px",
  },
  radioLabel: {
    display: "flex",
    gap: "6px",
    fontSize: "14px",
    alignItems: "center",
  },
  checkbox: {
    display: "flex",
    gap: "8px",
    fontSize: "14px",
    alignItems: "center",
    marginTop: "6px",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
  cancel: {
    backgroundColor: "transparent",
    border: "1px solid var(--input-border)",
    color: "var(--text-color)",
    padding: "8px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  save: {
    backgroundColor: "var(--button-blue)",
    color: "#fff",
    padding: "8px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default ShareSettingsModal;
