import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPass: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPass: false,
  });

  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const fields = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    {
      label: "Password",
      name: "password",
      type: showPassword ? "text" : "password",
      showToggle: true,
      toggleState: showPassword,
      setToggleState: setShowPassword,
    },
    {
      label: "Confirm Password",
      name: "confirmPass",
      type: showConfirmPassword ? "text" : "password",
      showToggle: true,
      toggleState: showConfirmPassword,
      setToggleState: setShowConfirmPassword,
    },
  ];

  const validateRules = (name, value) => {
    const cleaned = value.trim().replace(/\s+/g, " ");
    const capitalized = cleaned
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 2) return "Minimum 3 characters required";
        if (value.length > 25) return "Maximum 25 characters allowed";
        if (!/^[A-Za-z][A-Za-z ]*$/.test(value)) return "Only letters and spaces allowed";
        if ((value.match(/ /g) || []).length > 2) return "Too many spaces";
        if (cleaned !== capitalized) return "Each word must be capitalized";
        break;

      case "email":
        if (!value) return "Email is required";
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
          return "Invalid email format";
        if ((value.match(/@/g) || []).length !== 1) return "Only one @ allowed";
        if (/\s/.test(value)) return "No spaces allowed";
        if (/[@.]{2,}/.test(value)) return "Invalid special character usage";
        break;

      case "password":
        if (!value) return "Password is required";
        if (value.length < 8) return "Minimum 8 characters required";
        if (!/[A-Z]/.test(value)) return "At least one uppercase letter required";
        if (!/[a-z]/.test(value)) return "At least one lowercase letter required";
        if (!/[0-9]/.test(value)) return "At least one number required";
        if (!/[!@#$%^&*]/.test(value)) return "At least one special character required";
        if (/\s/.test(value)) return "No spaces allowed";
        break;

      case "confirmPass":
        if (!value) return "Confirm Password is required";
        if (value !== formData.password) return "Passwords do not match";
        break;

      default:
        break;
    }

    return "";
  };

  const handleBlur = (name) => {
  setFocus((prev) => ({ ...prev, [name]: false }));
};

  const handleChange = (e) => {
    const { name, value = "" } = e.target;
    let updatedValue = value;

    if (name === "name") {
      updatedValue = updatedValue.replace(/[^a-zA-Z ]/g, "");
      updatedValue = updatedValue
        .split(" ")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join(" ");
    }

    setFormData((prev) => ({ ...prev, [name]: updatedValue }));
    const err = validateRules(name, updatedValue);
    setError((prev) => ({ ...prev, [name]: err }));
  };

  const handleFocus = (name) => {
    setFocus((prev) => ({ ...prev, [name]: true }));
  };

  const isFormValid = () => {
    return (
      Object.values(formData).every((val) => val.trim() !== "") &&
      Object.values(error).every((err) => err === "")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    Object.keys(formData).forEach((key) => {
      const err = validateRules(key, formData[key]);
      if (err) validationErrors[key] = err;
    });

    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData);
      toast.success("User Registered Successfully");
      navigate("/login");
    } catch (err) {
      const errorMessage = err.response?.data?.msg || "Signup failed";
      toast.error(errorMessage);
    }
  };

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
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundImage: "url('/bg.jpeg')", // ✅ image path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Glass Overlay */}
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

      <div
        style={{
          zIndex: 2,
          backgroundColor: "var(--card-bg)",
          padding: "30px",
          border: "1px solid var(--border-color)",
          borderRadius: "16px",
          width: "380px",
          boxShadow: "var(--shadow)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: "700", color: "var(--text-color)" }}>Sign Up</h3>
          <p style={{ color: "var(--text-muted)", fontSize: "13px" }}>
            Create your CodeSphere account
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} style={{ marginBottom: "20px", position: "relative" }}>
              <label style={labelStyle(focus[field.name], formData[field.name])}>
                {field.label}
              </label>
              <input
                type={field.type}
                name={field.name}
                className="form-control"
                value={formData[field.name]}
                onChange={handleChange}
                onFocus={() => handleFocus(field.name)}
                onBlur={() => handleBlur(field.name)}
                style={inputStyle}
                onKeyDown={(e) => {
                  if (["email", "password", "confirmPass"].includes(field.name)) {
                    if (e.key === " ") e.preventDefault();
                  } else if (field.name === "name") {
                    if (e.key === " " && e.target.selectionStart === 0) e.preventDefault();
                  }
                }}
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData("text");
                  if (
                    ["email", "password", "confirmPass"].includes(field.name) &&
                    pasted.includes(" ")
                  ) {
                    e.preventDefault();
                  } else if (field.name === "name" && pasted.startsWith(" ")) {
                    e.preventDefault();
                  }
                }}
              />
              {field.showToggle && (
                <i
                  className={`bi ${field.toggleState ? "bi-eye-slash" : "bi-eye"}`}
                  onClick={() => field.setToggleState(!field.toggleState)}
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "var(--text-muted)",
                  }}
                ></i>
              )}
              {error[field.name] && (
                <p style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                  {error[field.name]}
                </p>
              )}
            </div>
          ))}

          <div style={{ textAlign: "right", marginBottom: "16px" }}>
            <Link
              to="/login"
              style={{
                fontSize: "13px",
                color: "var(--accent)",
                textDecoration: "none",
              }}
            >
              Already have an account?
            </Link>
          </div>

          <button
            type="submit"
            disabled={!isFormValid()}
            style={{
              backgroundColor: "var(--accent)",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
              width: "100%",
              fontWeight: "600",
              fontSize: "15px",
              border: "none",
              transition: "0.3s ease",
              opacity: isFormValid() ? 1 : 0.5,
              cursor: isFormValid() ? "pointer" : "not-allowed",
            }}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
