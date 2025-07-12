import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setHelpRequests } from "../Redux/Slices/HelpRequestSlice";
import axios from "axios";

const CollabSection = () => {
  const [activeTab, setActiveTab] = useState("help");
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");
  console.log(token)


  useEffect(() => {
    const fetchHelpRequests = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/get-help-requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        dispatch(setHelpRequests(res.data)); // ✅ load data into Redux
      } catch (err) {
        console.error("Error loading requests:", err.response?.data || err.message);
      }
    };

    fetchHelpRequests();
  }, [dispatch, token]);

  const container = {
    backgroundColor: "var(--bg-color)",
    color: "var(--text-color)",
    padding: "50px 20px",
    width: "100%",
    minHeight: "100vh",
  };

  const wrapper = {
    maxWidth: "800px",
    margin: "0 auto",
  };

  const title = {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "24px",
    textAlign: "center",
  };

  const tabWrapper = {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid var(--border-color)",
    marginBottom: "24px",
  };

  const tab = (isActive) => ({
    flex: 1,
    textAlign: "center",
    padding: "12px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "15px",
    borderBottom: isActive
      ? "2px solid var(--accent)"
      : "2px solid transparent",
    color: isActive ? "var(--accent)" : "var(--text-color)",
    transition: "all 0.2s ease",
  });

  const item = {
    backgroundColor: "var(--card-bg)",
    borderRadius: "12px",
    padding: "16px 20px",
    marginBottom: "15px",
    boxShadow: "var(--shadow)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const left = {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  };

  const btn = {
    backgroundColor: "var(--accent)",
    color: "#fff",
    padding: "8px 16px",
    fontSize: "13px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  };

  const footerBtn = {
    display: "block",
    margin: "30px auto 0",
    backgroundColor: "transparent",
    border: "1px solid var(--accent)",
    color: "var(--accent)",
    padding: "10px 20px",
    borderRadius: "999px",
    fontSize: "14px",
    fontWeight: "500",
    cursor: "pointer",
  };

  const CollabInvites = [
    { project: "Portfolio Website", from: "Krishna" },
    { project: "CodeSphere Notes App", from: "Yash" },
  ];

  const Messages = [
    { from: "Ankita", message: "Hey! Can you review my code?" },
    { from: "Manav", message: "Let's connect for tomorrow’s hackathon." },
  ];
  
  const helpRequests = useSelector((state)=> state.helpRequests.requests);

  const renderContent = () => {
    switch (activeTab) {
      case "help":
        return helpRequests.map((req, i) => (
          <div key={i} style={item}>
            <div style={left}>
              <div style={{ fontWeight: "600" }}>{req.topic}</div>
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                by {req.createdBy?.name || "Unknown"}
              </div>
            </div>
            <button style={btn}>Join</button>
          </div>
        ));
      case "invites":
        return CollabInvites.map((invite, i) => (
          <div key={i} style={item}>
            <div style={left}>
              <div style={{ fontWeight: "600" }}>{invite.project}</div>
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                Invited by {invite.from}
              </div>
            </div>
            <button style={btn}>Accept</button>
          </div>
        ));
      case "messages":
        return Messages.map((msg, i) => (
          <div key={i} style={item}>
            <div style={left}>
              <div style={{ fontWeight: "600" }}>{msg.from}</div>
              <div style={{ fontSize: "13px", color: "#94a3b8" }}>
                {msg.message}
              </div>
            </div>
            <button style={btn}>Reply</button>
          </div>
        ));
      default:
        return null;
    }
  };

  const footerButtonText = {
    help: "Show All Help Requests",
    invites: "Show All Collab Invites",
    messages: "Show All Messages",
  };

  return (
    <section style={container}>
      <div style={wrapper}>
        <h2 style={title}>Requests & Messages</h2>

        <div style={tabWrapper}>
          <div
            style={tab(activeTab === "help")}
            onClick={() => setActiveTab("help")}
          >
            Help Requests
          </div>
          <div
            style={tab(activeTab === "invites")}
            onClick={() => setActiveTab("invites")}
          >
            Collab Invites
          </div>
          <div
            style={tab(activeTab === "messages")}
            onClick={() => setActiveTab("messages")}
          >
            Messages
          </div>
        </div>

        {renderContent()}

        <button style={footerBtn}>{footerButtonText[activeTab]}</button>
      </div>
    </section>
  );
};

export default CollabSection;
