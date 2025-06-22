import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", isError: false });

    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      setMessage({ text: res.data.message, isError: false });

      // Redirect to home/dashboard after successful login
      setTimeout(() => {
        navigate("/"); // Change this to your desired redirect path
      }, 1500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Login failed. Please try again.",
        isError: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back</h2>

      <form className="auth-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="login-username">Username</label>
          <input
            type="text"
            id="login-username"
            name="username"
            className="form-control"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            name="password"
            className="form-control"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>

        {message.text && (
          <div
            className={`message ${
              message.isError ? "message-error" : "message-success"
            }`}
          >
            {message.text}
          </div>
        )}
      </form>

      <div className="divider">New to us?</div>

      <button
        className="btn btn-secondary"
        onClick={() => navigate("/register")}
      >
        Create an account
      </button>
    </div>
  );
};

export default LoginForm;
