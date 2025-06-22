import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const labelStyle = (focused, filled) => ({
    position: "absolute",
    top: focused || filled ? "-8px" : "10px",
    left: "12px",
    fontSize: focused || filled ? "12px" : "14px",
    color: focused ? "#6366F1" : "#6B7280",
    backgroundColor: "#FFFFFF",
    padding: "0 4px",
    transition: "0.2s ease",
  });

  const inputWrapper = {
    position: "relative",
    marginBottom: "20px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    border: "1px solid #D1D5DB",
  };

  const handleToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateRules = (name, value) => {
    switch (name) {
      case "email":
        if (value.trim() === "") return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim()))
          return "Invalid email format";
        if ((value.match(/@/g) || []).length !== 1) return "Only one @ allowed";
        if (/\s/.test(value)) return "No spaces allowed";
        if (/[@.]{2,}/.test(value)) return "Invalid special character usage";
        break;

      case "pass":
        if (value.trim() === "") return "Password is required";
        if (value.length < 8) return "Minimum 8 characters required";
        if (!/[A-Z]/.test(value))
          return "At least one uppercase letter required";
        if (!/[a-z]/.test(value))
          return "At least one lowercase letter required";
        if (!/[0-9]/.test(value)) return "At least one number required";
        if (!/[!@#$%^&*]/.test(value))
          return "At least one special character required";
        if (/\s/.test(value)) return "No spaces allowed";
        break;

      default:
        break;
    }

    return null;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateRules(name, value);
    setError((prev) => ({ ...prev, [name]: err }));

    if (err) toast.error(err);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      console.log(res.data.msg);
      toast.success(res.data.msg);
      localStorage.setItem("token", res.data.token);
      navigate("/home");
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.msg || "Login failed");
    }
  };
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "#F9FAFB",
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          padding: "30px",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
        }}
      >
        <div className="text-center mb-4">
          <h3 style={{ fontWeight: "600", color: "#111827" }}>Login</h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Welcome back! Please log in.
          </p>
        </div>

        <div style={inputWrapper}>
          <label style={labelStyle(emailFocus, email)}>Email or Username</label>
          <input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailFocus(true)}
            onBlur={handleBlur}
            style={inputStyle}
          />
        </div>

        <div style={inputWrapper}>
          <label style={labelStyle(passFocus, password)}>Password</label>
          <input
            type={showPassword ? "text" : "password"}
            className="form-control"
            name="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPassFocus(true)}
            onBlur={handleBlur}
            style={inputStyle}
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#9CA3AF",
              fontSize: "18px",
            }}
            onClick={handleToggle}
          ></i>
        </div>

        <div className="d-flex mb-3 text-end justify-content-between">
          <Link
            to="/signup"
            style={{
              fontSize: "13px",
              color: "#3B82F6",
              textDecoration: "none",
            }}
          >
            Create Account?
          </Link>
          <Link
            path="#"
            style={{
              fontSize: "13px",
              color: "#3B82F6",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </div>

        <div className="d-grid">
          <button
            onClick={handleLogin}
            className="btn"
            style={{
              backgroundColor: "#6366F1",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
              margin: "5px",
              fontWeight: "500",
              fontSize: "15px",
              border: "none",
              transition: "0.3s ease",
            }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
