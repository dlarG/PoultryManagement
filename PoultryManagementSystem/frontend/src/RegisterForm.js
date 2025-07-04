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
      <div className="auth-card">
        <div className="auth-image">
          <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Register" />
        </div>
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join our community today</p>
        </div>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                placeholder="Enter firstname"
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
                placeholder="Enter lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
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
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? "loading" : ""} ${
              isSuccess ? "success" : ""
            }`}
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <>
                <span className="button-spinner"></span>
                Creating Account...
              </>
            ) : isSuccess ? (
              <>
                <span className="button-check">✓</span>
                Account Created!
              </>
            ) : (
              "Create Account"
            )}
          </button>

          {message.text && (
            <div
              className={`auth-message ${
                message.isError ? "error" : "success"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        <div className="auth-footer">
          <p>Already have an account?</p>
          <button
            className="auth-link-button"
            onClick={() => navigate("/login")}
            disabled={isLoading}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
