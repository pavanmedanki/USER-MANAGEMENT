import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem("formFields", JSON.stringify(formData));
      navigate("/");
    }
  };
  function handleClear() {
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  }

  return (
    <div className="center-container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              // placeholder=""
              value={formData.name}
              onChange={handleChange}
              className={errors.name && "error"}
            />
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className={errors.username && "error"}
            />
            {errors.username && (
              <span className="error-message">{errors.username}</span>
            )}
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email && "error"}
            />
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password && "error"}
            />
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword && "error"}
            />
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </label>
          <div className="signin" style={{ justifyItems: "" }}>
            <button onClick={handleClear}>Clear</button>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
        <span className="signin">
          Already have an account? <Link to="/">Sign In</Link>
        </span>
      </div>
    </div>
  );
};

export default SignUp;
