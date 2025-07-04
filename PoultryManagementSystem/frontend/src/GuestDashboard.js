import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEgg,
  FaChartLine,
  FaInfoCircle,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import "./GuestDashboard.css"; // We'll create this CSS file

const GuestDashboard = () => {
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
    <div className="guest-container">
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
              <span>Production Stats</span>
            </li>
            <li
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine className="nav-icon" />
              <span>Public Reports</span>
            </li>
            <li
              className={activeTab === "about" ? "active" : ""}
              onClick={() => setActiveTab("about")}
            >
              <FaInfoCircle className="nav-icon" />
              <span>About Our Farm</span>
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
          {activeTab === "dashboard" && (
            <>
              <div className="welcome-banner">
                <h1>Welcome, {user?.firstname}!</h1>
                <p>Here's an overview of our farm's public information.</p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Farm Established</h3>
                  <p className="stat-value">2010</p>
                  <p className="stat-description">Over a decade of quality</p>
                </div>
                <div className="stat-card">
                  <h3>Chicken Breeds</h3>
                  <p className="stat-value">5</p>
                  <p className="stat-description">Specialized breeds</p>
                </div>
                <div className="stat-card">
                  <h3>Organic Certified</h3>
                  <p className="stat-value">Yes</p>
                  <p className="stat-description">100% natural</p>
                </div>
                <div className="stat-card">
                  <h3>Farm Size</h3>
                  <p className="stat-value">20 acres</p>
                  <p className="stat-description">Free-range chickens</p>
                </div>
              </div>

              <div className="announcement-section">
                <h2>Farm Announcements</h2>
                <div className="announcement-card">
                  <h3>Farm Tour Days</h3>
                  <p>
                    Join us every Saturday for guided farm tours from 10AM to
                    2PM. Learn about our sustainable practices!
                  </p>
                  <span className="announcement-date">
                    Posted: June 15, 2023
                  </span>
                </div>
                <div className="announcement-card">
                  <h3>New Product Line</h3>
                  <p>
                    Introducing our new organic free-range eggs available now at
                    local farmers markets.
                  </p>
                  <span className="announcement-date">
                    Posted: May 28, 2023
                  </span>
                </div>
              </div>
            </>
          )}

          {activeTab === "production" && (
            <div className="production-stats">
              <h2>Monthly Production Overview</h2>
              <div className="production-card">
                <h3>Average Daily Egg Production</h3>
                <p className="stat-value">1,200 eggs</p>
                <div className="production-bar">
                  <div className="bar-fill" style={{ width: "75%" }}></div>
                </div>
                <p className="stat-description">
                  Our hens produce an average of 1,200 eggs daily with
                  free-range practices.
                </p>
              </div>
              <div className="production-card">
                <h3>Egg Types Distribution</h3>
                <div className="egg-types">
                  <div className="egg-type">
                    <span className="egg-color brown"></span>
                    <span>Brown: 60%</span>
                  </div>
                  <div className="egg-type">
                    <span className="egg-color white"></span>
                    <span>White: 30%</span>
                  </div>
                  <div className="egg-type">
                    <span className="egg-color blue"></span>
                    <span>Blue: 10%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="public-reports">
              <h2>Public Reports</h2>
              <div className="report-card">
                <h3>Annual Sustainability Report 2022</h3>
                <p>
                  Our commitment to environmentally friendly farming practices
                  and animal welfare.
                </p>
                <button className="view-report-btn">View Report</button>
              </div>
              <div className="report-card">
                <h3>Quality Assurance Certification</h3>
                <p>
                  Details of our latest quality inspection and certification
                  results.
                </p>
                <button className="view-report-btn">View Report</button>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="about-farm">
              <h2>About Our Farm</h2>
              <div className="farm-story">
                <h3>Our Story</h3>
                <p>
                  Founded in 2010, PoultryPro started as a small family farm
                  with just 50 chickens. Today, we maintain our family values
                  while operating a sustainable farm with over 5,000 free-range
                  hens.
                </p>
                <p>
                  We believe in ethical farming practices that prioritize animal
                  welfare and environmental sustainability.
                </p>
              </div>
              <div className="farm-values">
                <h3>Our Values</h3>
                <ul>
                  <li>100% organic feed</li>
                  <li>No antibiotics or hormones</li>
                  <li>Free-range practices</li>
                  <li>Sustainable waste management</li>
                  <li>Community engagement</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuestDashboard;
