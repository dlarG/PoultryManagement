import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h1>Welcome to the Farm Management System</h1>
      <p>Please login or register to get started.</p>
      <div style={{ marginTop: "20px" }}>
        <Link to="/login" style={{ marginRight: "15px" }}>
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
