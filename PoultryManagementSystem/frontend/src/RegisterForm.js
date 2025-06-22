import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", isError: false });
    setIsSuccess(false);

    try {
      const res = await axios.post("http://localhost:5000/register", formData);
      setMessage({
        text: `${res.data.message} Redirecting to login...`,
        isError: false,
      });
      setIsSuccess(true);

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage({
        text:
          err.response?.data?.error || "Registration failed. Please try again.",
        isError: true,
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Create Account</h2>

      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            className="form-control"
            placeholder="Enter first name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            className="form-control"
            placeholder="Enter last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <span className="button-loading">
              <span className="spinner"></span>
              Registering...
            </span>
          ) : isSuccess ? (
            <span className="button-success">✓ Success</span>
          ) : (
            "Register"
          )}
        </button>

        {message.text && (
          <div
            className={`message ${
              message.isError ? "message-error" : "message-success"
            }`}
          >
            {isSuccess ? (
              <div className="success-message">
                <span className="success-spinner"></span>
                {message.text}
              </div>
            ) : (
              message.text
            )}
          </div>
        )}
      </form>

      <div className="divider">Already have an account?</div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/login")}
        disabled={isLoading}
      >
        Sign In
      </button>
    </div>
  );
};

export default RegisterForm;
