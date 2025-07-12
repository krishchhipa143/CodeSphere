import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const styles = {
    wrapper: {
      position: "relative",
      width: "100%",
      height: "90vh",
      backgroundImage: "url('/hero-bg.jpg')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    overlay: {
      position: "absolute",
      inset: 0,
      backgroundColor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(4px)",
    },
    content: {
      position: "relative",
      zIndex: 10,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100%",
      textAlign: "center",
      color: "white",
      padding: "0 1rem",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
    },
    subheading: {
      fontSize: "1.25rem",
      color: "#cbd5e1",
      marginBottom: "1.5rem",
      maxWidth: "700px",
    },
    button: {
      backgroundColor: "var(--accent)",
      color: "white",
      padding: "0.75rem 1.5rem",
      fontSize: "1rem",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      boxShadow: "0 5px 15px rgba(37, 99, 235, 0.4)",
      transition: "transform 0.2s ease, background-color 0.2s ease",
    },
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.overlay}></div>

      <div style={styles.content}>
        <motion.h1
          style={styles.heading}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Code Together. Grow Together.
        </motion.h1>

        <motion.p
          style={styles.subheading}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Collaborate, Learn & Build Projects in Real Time.
        </motion.p>

        <motion.button
          style={styles.button}
          whileHover={{ scale: 1.05, backgroundColor: "#1d4ed8" }}
          whileTap={{ scale: 0.95 }}
        >
          Start Coding
        </motion.button>
      </div>
    </div>
  );
};

export default HeroSection;
