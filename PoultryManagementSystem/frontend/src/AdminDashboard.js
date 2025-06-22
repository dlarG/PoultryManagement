import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <h1>Admin Dashboards</h1>
      <p>
        Welcome, {user?.firstname} {user?.lastname} (Role: {user?.role})
      </p>
      <button onClick={handleLogout}>Logout</button>
      <div className="dashboard-content">
        <h2>Admin Actions</h2>
        <ul>
          <li>
            <button onClick={() => navigate("/manage-users")}>
              Manage Usersss
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/view-reports")}>
              View Reports
            </button>
          </li>
          <li>
            <button onClick={() => navigate("/settings")}>Settings</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
