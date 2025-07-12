// src/Components/Editor/ShareNavbar.jsx
import React, { useState } from "react";
import { FiShare2 } from "react-icons/fi";
import ShareScreen from "./ShareScreen";

const ShareNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      <div style={styles.wrapper}>
        <div style={styles.left} onClick={handleClick}>
          <FiShare2 size={20} />
          <span style={styles.text}>Share</span>
        </div>
      </div>

      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalBackdrop} onClick={() => setShowModal(false)} />
          <div style={styles.modalContainer}>
            <ShareScreen />
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "8px 16px",
    backgroundColor: "var(--card-bg)",
    borderBottom: "1px solid var(--border-color)",
    color: "var(--text-color)",
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    cursor: "pointer",
  },
  text: {
    fontSize: "14px",
    fontWeight: 500,
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalBackdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    backdropFilter: "blur(2px)",
  },
  modalContainer: {
    position: "relative",
    zIndex: 1001,
    width: "100%",
    maxWidth: "500px",
    margin: "0 auto",
  },
};

export default ShareNavbar;
