import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (value) => {
    if (value.length < 6) return "Password must be at least 6 characters";
    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    const err = validatePassword(value);
    setError(err);
  };

  const isFormValid = password.trim() !== "" && error === "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
        password,
      });
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "var(--bg-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--card-bg)",
          padding: "30px",
          border: "1px solid var(--border-color)",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h3 style={{ fontWeight: "600", color: "var(--text-color)" }}>
            Reset Password
          </h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Enter a new password below
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "25px" }}>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "14px 12px",
                borderRadius: "8px",
                fontSize: "14px",
                border: "1px solid var(--input-border)",
                outline: "none",
                backgroundColor: "var(--input-bg)",
                color: "var(--text-color)",
              }}
            />
            {error && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "500",
              fontSize: "15px",
              border: "none",
              width: "100%",
              opacity: !isFormValid ? 0.6 : 1,
              cursor: !isFormValid ? "not-allowed" : "pointer",
            }}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
