import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHelpRequests } from "../../Redux/Slices/HelpRequestSlice";
import axios from "axios";
import { toast } from "react-toastify";
const baseURL = import.meta.env.VITE_BASE_URL;

const HelpRequest = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");

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

  const inputStyle = {
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid var(--border-color)",
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
    fontSize: "0.9rem",
    width: "100%",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "80px",
    resize: "vertical",
  };

  const buttonStyle = {
    backgroundColor: "var(--accent)",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "0.95rem",
    boxShadow: "0 5px 12px rgba(22,163,74,0.2)",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (topic && details) {
      try {
        const res = await axios.post(
          `${baseURL}/create-help-requests`,
          { topic, details },
          {
            headers: {
              Authorization: `Bearer ${token}`,            },
          }
        );
        toast.success(res.data.msg);
        console.log(req.user)
        dispatch(addHelpRequests(res.body.request));
        setTopic("");
        setDetails("");
      } catch (err) {
        toast.error(err.response?.data?.msg);
      }
    }
  };

  return (
    <div style={wrapper}>
      <h3 style={title}>🆘 Need Help?</h3>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          type="text"
          placeholder="Enter topic (e.g., MongoDB Aggregation)"
          style={inputStyle}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
        <textarea
          placeholder="Describe your issue briefly..."
          style={textareaStyle}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          required
        />
        <button type="submit" disabled={!topic || !details} style={buttonStyle}>
          Request Help
        </button>
      </form>
    </div>
  );
};

export default HelpRequest;
