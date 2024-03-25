import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = "Username or Email is required";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };
  const FormValues = React.useMemo(() => {
    const formfields = JSON.parse(localStorage.getItem("formFields"));
    return formfields;
  }, []);
  const isFormvalid = React.useMemo(() => {
    if (FormValues && formData) {
      return (
        FormValues?.email === formData?.usernameOrEmail &&
        FormValues?.password === formData?.password
      );
    }
    return false;
  }, [FormValues, formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setForm(true);

    if (validateForm() && isFormvalid) {
      localStorage.setItem("auth", true);
      navigate("/dashboard");
    }
  };

  return (
    <div className="center-container">
      <div className="form-container">
        {!isFormvalid && form && validateForm && (
          <span style={{ color: "#FF0000" }}>
            Invalid login details. Please try again.
          </span>
        )}
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input
              type="text"
              name="usernameOrEmail"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={errors.usernameOrEmail && "error"}
            />
            {errors.usernameOrEmail && (
              <span className="error-message">{errors.usernameOrEmail}</span>
            )}
          </label>
          <br />
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
          <br />
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        <span className="signin">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    </div>
  );
};

export default SignIn;
