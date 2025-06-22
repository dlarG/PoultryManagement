import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaChartLine,
  FaEgg,
  FaDollarSign,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };
  const closeSidebar = () => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <h2>PoultryPro</h2>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              <FaHome className="nav-icon" />
              <span>Dashboard</span>
            </li>
            <li
              className={activeTab === "production" ? "active" : ""}
              onClick={() => setActiveTab("production")}
            >
              <FaEgg className="nav-icon" />
              <span>Egg Production</span>
            </li>
            <li
              className={activeTab === "sales" ? "active" : ""}
              onClick={() => setActiveTab("sales")}
            >
              <FaDollarSign className="nav-icon" />
              <span>Sales & Revenue</span>
            </li>
            <li
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine className="nav-icon" />
              <span>Reports</span>
            </li>
            <li
              className={activeTab === "users" ? "active" : ""}
              onClick={() => setActiveTab("users")}
            >
              <FaUsers className="nav-icon" />
              <span>User Management</span>
            </li>
            <li
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              <FaCog className="nav-icon" />
              <span>Settings</span>
            </li>
          </ul>
        </nav>
      </div>
      {isMobile && sidebarOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar} />
      )}

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation Bar */}
        <nav className="top-nav">
          <div className="nav-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <h3>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
          </div>
          <div className="nav-right">
            <div className="user-profile">
              <div className="user-avatar">
                {user?.firstname?.charAt(0)}
                {user?.lastname?.charAt(0)}
              </div>
              <div className="user-info">
                <span className="user-name">
                  {user?.firstname} {user?.lastname}
                </span>
                <span className="user-role">
                  {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                </span>
              </div>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              <FaSignOutAlt />
            </button>
          </div>
        </nav>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <div className="welcome-banner">
            <h1>Welcome back, {user?.firstname}!</h1>
            <p>Here's what's happening with your poultry farm today.</p>
          </div>

          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <h3>Today's Egg Production</h3>
              <p className="stat-value">1,245</p>
              <p className="stat-change">↑ 5% from yesterday</p>
            </div>
            <div className="stat-card">
              <h3>Daily Sales</h3>
              <p className="stat-value">$1,850</p>
              <p className="stat-change">↑ 12% from yesterday</p>
            </div>
            <div className="stat-card">
              <h3>Monthly Profit</h3>
              <p className="stat-value">$28,400</p>
              <p className="stat-change">↑ 8% from last month</p>
            </div>
            <div className="stat-card">
              <h3>Active Customers</h3>
              <p className="stat-value">42</p>
              <p className="stat-change">↑ 3 new this week</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="recent-activity">
            <h2>Recent Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Egg Type</th>
                  <th>Quantity</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#ORD-1001</td>
                  <td>Fresh Market</td>
                  <td>Large Brown</td>
                  <td>500</td>
                  <td>$250.00</td>
                  <td className="status delivered">Delivered</td>
                </tr>
                <tr>
                  <td>#ORD-1002</td>
                  <td>Local Restaurant</td>
                  <td>Medium White</td>
                  <td>300</td>
                  <td>$135.00</td>
                  <td className="status pending">Pending</td>
                </tr>
                <tr>
                  <td>#ORD-1003</td>
                  <td>Grocery Chain</td>
                  <td>Jumbo Brown</td>
                  <td>1200</td>
                  <td>$720.00</td>
                  <td className="status processing">Processing</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
