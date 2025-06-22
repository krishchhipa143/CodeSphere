import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const [focus, setFocus] = useState({
    name: false,
    email: false,
    pass: false,
    confirmPass: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState({
    name: "",
    email: "",
    pass: "",
    confirmPass: "",
  });

  const fields = [
    { label: "Full Name", name: "name", type: "text" },
    { label: "Email", name: "email", type: "email" },
    {
      label: "Password",
      name: "pass",
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
        if (value.trim() === "") return "Name is required";
        if (value.trim().length < 3) return "Minimum 3 characters required";
        if (value.trim().length > 25) return "Maximum 25 characters allowed";
        if (!/^[A-Za-z ]+$/.test(value)) return "Only letters and spaces allowed";
        if ((value.match(/ /g) || []).length > 2) return "Too many spaces";
        if (cleaned !== capitalized) return "Each word must be capitalized";
        break;

      case "email":
        if (value.trim() === "") return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value.trim())) return "Invalid email format";
        if ((value.match(/@/g) || []).length !== 1) return "Only one @ allowed";
        if (/\s/.test(value)) return "No spaces allowed";
        if (/[@.]{2,}/.test(value)) return "Invalid special character usage";
        break;

      case "pass":
        if (value.trim() === "") return "Password is required";
        if (value.length < 8) return "Minimum 8 characters required";
        if (!/[A-Z]/.test(value)) return "At least one uppercase letter required";
        if (!/[a-z]/.test(value)) return "At least one lowercase letter required";
        if (!/[0-9]/.test(value)) return "At least one number required";
        if (!/[!@#$%^&*]/.test(value)) return "At least one special character required";
        if (/\s/.test(value)) return "No spaces allowed";
        break;

      case "confirmPass":
        if (value.trim() === "") return "Confirm Password is required";
        if (value !== formData.pass) return "Passwords do not match";
        break;

      default:
        break;
    }

    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const err = validateRules(name, value);
    setError((prev) => ({ ...prev, [name]: err }));

    if (err) toast.error(err);
  };

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

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.confirmPass || !formData.email || !formData.name || !formData.pass){
      toast.error("All Fields are Required");
      return
    }
    console.log("Submit Clicked")
    try{
      const res = await axios.post("http://localhost:5000/api/auth/signup", formData)
      console.log(res.data)
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", backgroundColor: "#F9FAFB" }}
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
          <h3 style={{ fontWeight: "600", color: "#111827" }}>Sign Up</h3>
          <p style={{ color: "#6B7280", fontSize: "14px" }}>
            Create your CodeSphere account
          </p>
        </div>

        {fields.map((field) => (
          <div key={field.name} style={inputWrapper}>
            <label
              style={labelStyle(focus[field.name], formData[field.name])}
            >
              {field.label}
            </label>
            <input
              type={field.type}
              className="form-control"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              onFocus={() =>
                setFocus((prev) => ({ ...prev, [field.name]: true }))
              }
              style={inputStyle}
            />
            {field.showToggle && (
              <i
                className={`bi ${field.toggleState ? "bi-eye-slash" : "bi-eye"}`}
                onClick={() =>
                  field.setToggleState(!field.toggleState)
                }
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                  color: "#9CA3AF",
                  fontSize: "18px",
                }}
              ></i>
            )}
            
          </div>
        ))}

        <div className="mb-3 text-end">
          <Link
            to="/login"
            style={{
              fontSize: "13px",
              color: "#3B82F6",
              textDecoration: "none",
            }}
          >
            Already have an account?
          </Link>
        </div>

        <div className="d-grid">
          <button
            onClick={handleSubmit}
            type="submit"
            className="btn"
            style={{
              backgroundColor: "#6366F1",
              color: "white",
              borderRadius: "8px",
              padding: "10px",
              fontWeight: "500",
              fontSize: "15px",
              border: "none",
              transition: "0.3s ease",
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
