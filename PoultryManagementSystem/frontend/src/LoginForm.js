import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { useAuth } from "./AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState({ text: "", isError: false });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", isError: false });
    setIsSuccess(false);

    try {
      const res = await axios.post("http://localhost:5000/login", formData);
      login({
        username: res.data.username,
        role: res.data.role,
      });
      setMessage({ text: res.data.message, isError: false });
      setIsSuccess(true);

      const userData = {
        username: res.data.username,
        role: res.data.role,
        firstname: res.data.firstname,
        lastname: res.data.lastname,
      };

      // Store user data in localStorage or context
      localStorage.setItem("user", JSON.stringify(userData));
      login(userData); // Update context

      // Redirect based on role
      setTimeout(() => {
        switch (res.data.role.toLowerCase()) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "leader":
            navigate("/leader-dashboard");
            break;
          case "member":
            navigate("/member-dashboard");
            break;
          case "guest":
          default:
            navigate("/guest-dashboard");
        }
      }, 1500);
    } catch (err) {
      setMessage({
        text: err.response?.data?.error || "Login failed. Please try again.",
        isError: true,
      });
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-containers">
      <div className="auth-cards">
        <div className="auth-header">
          <h2>Welcome Back</h2>
          <p>Sign in to your account</p>
        </div>

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              name="username"
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
              placeholder="Enter your password"
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
                Signing In...
              </>
            ) : isSuccess ? (
              <>
                <span className="button-check">✓</span>
                Success!
              </>
            ) : (
              "Sign In"
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
          <p>New to our platform?</p>
          <button
            className="auth-link-button"
            onClick={() => navigate("/register")}
            disabled={isLoading}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
