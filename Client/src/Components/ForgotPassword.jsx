import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({ email: "" });

  const validateEmail = (value) => {
    if (value.trim() === "") return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim()))
      return "Invalid email format";
    if ((value.match(/@/g) || []).length !== 1) return "Only one @ allowed";
    if (/\s/.test(value)) return "No spaces allowed";
    if (/[@.]{2,}/.test(value)) return "Invalid special character usage";
    return "";
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const err = validateEmail(value);
    setError({ email: err });
  };

  const isFormValid = email.trim() !== "" && error.email === "";
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
     const res = await axios.post("http://localhost:5000/api/auth/forgotPassword", {
      email,
     });

     toast.success(res.data.message)
    } catch(err) {
      const msg = err.response?.data?.message || "Something went wrong";
      toast.error(msg)
    }
  }

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
            Forgot Password
          </h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            We'll send you a reset link
          </p>
        </div>

        <form style={{ position: "relative" }} onSubmit={handleSubmit}>
          <div style={{ position: "relative", marginBottom: "30px" }}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={email}
              required
              placeholder=" "
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
              id="email"
            />
            <label
              htmlFor="email"
              style={{
                position: "absolute",
                left: "12px",
                top: "14px",
                color: "#6B7280",
                fontSize: "14px",
                backgroundColor: "var(--card-bg)",
                padding: "0 4px",
                pointerEvents: "none",
                transition: "0.2s ease all",
              }}
            >
              Email
            </label>
            {error.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {error.email}
              </p>
            )}
          </div>

          <div style={{ display: "grid" }}>
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                backgroundColor: "var(--accent)",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "10px",
                fontWeight: "500",
                fontSize: "15px",
                border: "none",
                transition: "0.3s ease",
                opacity: !isFormValid ? 0.6 : 1,
                cursor: !isFormValid ? "not-allowed" : "pointer",
              }}
            >
              Send Reset Link
            </button>
          </div>
        </form>

        <style>
          {`
            input:focus + label,
            input:not(:placeholder-shown) + label {
              top: -8px !important;
              left: 10px;
              font-size: 12px !important;
              color: var(--accent) !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default ForgotPassword;
