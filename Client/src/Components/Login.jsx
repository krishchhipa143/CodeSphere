import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "../Redux/Slices/AuthSlice";

const Login = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const labelStyle = (focused, filled) => ({
    position: "absolute",
    top: focused || filled ? "-10px" : "13px",
    left: "12px",
    fontSize: focused || filled ? "12px" : "14px",
    color: focused ? "var(--accent)" : "var(--text-muted)",
    backgroundColor: "var(--input-bg)",
    padding: "0 4px",
    pointerEvents: "none",
    transition: "0.2s ease",
    zIndex: 2,
  });

  const inputWrapper = {
    position: "relative",
    marginBottom: "18px",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    paddingRight: "36px",
    borderRadius: "8px",
    fontSize: "14px",
    border: "1px solid var(--input-border)",
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
    outline: "none",
    transition: "0.3s ease",
  };

  const handleToggle = () => setShowPassword(!showPassword);

  const validateRules = (name, value) => {
    if (name === "email") {
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value)) return "Invalid email format";
      if ((value.match(/@/g) || []).length !== 1) return "Only one @ allowed";
      if (/\s/.test(value)) return "No spaces allowed";
      if (/[@.]{2,}/.test(value)) return "Invalid characters";
    } else if (name === "pass") {
      if (!value) return "Password is required";
      if (value.length < 8) return "Minimum 8 characters required";
      if (!/[A-Z]/.test(value)) return "At least one uppercase";
      if (!/[a-z]/.test(value)) return "At least one lowercase";
      if (!/[0-9]/.test(value)) return "At least one number";
      if (!/[!@#$%^&*]/.test(value)) return "At least one special char";
      if (/\s/.test(value)) return "No spaces allowed";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "pass") setPassword(value);

    const err = validateRules(name, value);
    setError((prev) => ({ ...prev, [name]: err }));
  };

  const isFormValid = email && password && !error.email && !error.pass;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      toast.success(res.data.msg);
      sessionStorage.setItem("token", res.data.token);
      dispatch(login({ user: res.data.user, token: res.data.token }));
      navigate("/home");
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      toast.error(msg);
      if (msg.toLowerCase().includes("email") || msg.toLowerCase().includes("user")) {
        setError((prev) => ({ ...prev, email: msg }));
      } else if (msg.toLowerCase().includes("password")) {
        setError((prev) => ({ ...prev, pass: msg }));
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: "url('/bg.jpeg')", // 🔁 apni image path de
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* 🔳 Glass Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          backgroundColor: "var(--glass-overlay)",
          backdropFilter: "var(--glass-blur)",
          WebkitBackdropFilter: "var(--glass-blur)",
          zIndex: 1,
        }}
      />

      {/* 🧊 Glass Card */}
      <div
        style={{
          zIndex: 2,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          background: "var(--card-bg)",
          border: "1px solid var(--border-color)",
          padding: "32px",
          borderRadius: "16px",
          width: "360px",
          boxShadow: "var(--shadow)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: "700", color: "var(--text-color)" }}>Login</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Welcome back! Please log in.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={inputWrapper}>
            <label style={labelStyle(emailFocus, email)}>Email</label>
            <input
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
              style={inputStyle}
              placeholder=" "
              autoComplete="off"
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
            />
            {error.email && <p style={{ color: "red", fontSize: "12px" }}>{error.email}</p>}
          </div>

          {/* Password */}
          <div style={inputWrapper}>
            <label style={labelStyle(passFocus, password)}>Password</label>
            <input
              name="pass"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handleChange}
              onFocus={() => setPassFocus(true)}
              onBlur={() => setPassFocus(false)}
              style={inputStyle}
              placeholder=" "
              autoComplete="off"
              onKeyDown={(e) => e.key === " " && e.preventDefault()}
            />
            <i
              className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "var(--text-muted)",
              }}
              onClick={handleToggle}
            ></i>
            {error.pass && <p style={{ color: "red", fontSize: "12px" }}>{error.pass}</p>}
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
            <Link to="/signup" style={{ fontSize: "13px", color: "var(--accent)" }}>
              Create Account?
            </Link>
            <Link to="/forgotPassword" style={{ fontSize: "13px", color: "var(--accent)" }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            style={{
              backgroundColor: "var(--accent)",
              color: "#fff",
              width: "100%",
              padding: "10px",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              fontSize: "15px",
              cursor: isFormValid ? "pointer" : "not-allowed",
              opacity: isFormValid ? 1 : 0.6,
              boxShadow: isFormValid ? "0 0 10px var(--accent)" : "none",
              transition: "0.3s ease",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
