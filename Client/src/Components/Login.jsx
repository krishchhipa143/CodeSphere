import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { login } from "../Redux/Slices/AuthSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [emailFocus, setEmailFocus] = useState(false);
  const [email, setEmail] = useState("");
  const [passFocus, setPassFocus] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const labelStyle = (focused, filled) => ({
    position: "absolute",
    top: focused || filled ? "-8px" : "10px",
    left: "12px",
    fontSize: focused || filled ? "12px" : "14px",
    color: focused ? "var(--accent)" : "#6B7280",
    backgroundColor: "var(--card-bg)",
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
    border: "1px solid var(--input-border)",
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
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
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "pass") setPassword(value);

    const err = validateRules(name, value);
    setError((prev) => ({ ...prev, [name]: err }));
  };

  const isFormValid =
    email !== "" && password !== "" && !error.email && !error.pass;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      toast.success(res.data.msg);
      sessionStorage.setItem("token", res.data.token);
      navigate("/home");

      if (res.data?.user) {
        dispatch(login(res.data.user)); // <- YEH LINE ZARURI HAI!
      }
    } catch (err) {
      const msg = err.response?.data?.msg || "Login failed";
      toast.error(msg);
      if (
        msg.toLowerCase().includes("email") ||
        msg.toLowerCase().includes("user")
      )
        setError((prev) => ({ ...prev, email: msg }));
      else if (msg.toLowerCase().includes("password"))
        setError((prev) => ({ ...prev, pass: msg }));
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{
        height: "100vh",
        backgroundColor: "var(--bg-color)",
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
        <div className="text-center mb-4">
          <h3 style={{ fontWeight: "600", color: "var(--text-color)" }}>
            Login
          </h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Welcome back! Please log in.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={inputWrapper}>
            <label style={labelStyle(emailFocus, email)}>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              style={inputStyle}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}


            />
            {error.email && (
              <p style={{ color: "red", fontSize: "12px", marginTop: "5px" }}>
                {error.email}
              </p>
            )}
          </div>

          <div style={inputWrapper}>
            <label style={labelStyle(passFocus, password)}>Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              name="pass"
              value={password}
              onChange={handleChange}
              onFocus={() => setPassFocus(true)}
              style={inputStyle}
              onKeyDown={(e) => {
                if (e.key === " ") e.preventDefault();
              }}

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
            {error.pass && (
              <p style={{ color: "red", fontSize: "12px",  }}>
                {error.pass}
              </p>
            )}

          <div className="d-flex mb-3 text-end justify-content-between">
            <Link
              to="/signup"
              style={{
                fontSize: "13px",
                color: "var(--button-blue)",
                textDecoration: "none",
              }}
            >
              Create Account?
            </Link>
            <Link
              to="/forgot-password"
              style={{
                fontSize: "13px",
                color: "var(--button-blue)",
                textDecoration: "none",
              }}
            >
              Forgot password?
            </Link>
          </div>

          <div className="d-grid">
            <button
              disabled={!isFormValid}
              className="btn"
              style={{
                backgroundColor: "var(--accent)",
                color: "white",
                borderRadius: "8px",
                padding: "10px",
                margin: "5px",
                fontWeight: "500",
                fontSize: "15px",
                border: "none",
                transition: "0.3s ease",
                opacity: isFormValid ? 1 : 0.5,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
