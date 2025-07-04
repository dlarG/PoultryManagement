import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaEgg,
  FaChartLine,
  FaCalendarAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaBars,
  FaUserCircle,
} from "react-icons/fa";
import "./MemberDashboard.css"; // We'll create this CSS file

const MemberDashboard = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [productionData, setProductionData] = useState([]);
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      }
    };

    // Mock data fetch
    const fetchData = async () => {
      // In a real app, you would fetch this from your API
      setProductionData([
        { date: "2023-06-01", eggs: 1200, feed: 150 },
        { date: "2023-06-02", eggs: 1180, feed: 145 },
        { date: "2023-06-03", eggs: 1250, feed: 155 },
      ]);

      setSchedule([
        { time: "08:00", task: "Morning feeding", completed: true },
        { time: "10:00", task: "Egg collection", completed: true },
        { time: "14:00", task: "Afternoon feeding", completed: false },
        { time: "16:00", task: "Evening egg collection", completed: false },
      ]);
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    fetchData();
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

  const markTaskComplete = (index) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index].completed = !updatedSchedule[index].completed;
    setSchedule(updatedSchedule);
  };

  return (
    <div className="member-container">
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
              <span>My Production</span>
            </li>
            <li
              className={activeTab === "tasks" ? "active" : ""}
              onClick={() => setActiveTab("tasks")}
            >
              <FaClipboardList className="nav-icon" />
              <span>Daily Tasks</span>
            </li>
            <li
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              <FaChartLine className="nav-icon" />
              <span>My Reports</span>
            </li>
            <li
              className={activeTab === "schedule" ? "active" : ""}
              onClick={() => setActiveTab("schedule")}
            >
              <FaCalendarAlt className="nav-icon" />
              <span>My Schedule</span>
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
                <p>Here's your daily overview and tasks.</p>
              </div>

              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Today's Eggs Collected</h3>
                  <p className="stat-value">1,245</p>
                  <p className="stat-change">↑ 5% from yesterday</p>
                </div>
                <div className="stat-card">
                  <h3>Tasks Completed</h3>
                  <p className="stat-value">2/4</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: "50%" }}></div>
                  </div>
                </div>
                <div className="stat-card">
                  <h3>Weekly Average</h3>
                  <p className="stat-value">1,180</p>
                  <p className="stat-change">↑ 8% from last week</p>
                </div>
                <div className="stat-card">
                  <h3>Feed Remaining</h3>
                  <p className="stat-value">150kg</p>
                  <p className="stat-change">~3 days supply</p>
                </div>
              </div>

              <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                  <button className="action-btn">
                    <FaEgg /> Record Production
                  </button>
                  <button className="action-btn">
                    <FaClipboardList /> View Tasks
                  </button>
                  <button className="action-btn">
                    <FaChartLine /> Generate Report
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "production" && (
            <div className="production-section">
              <h2>My Production Records</h2>
              <div className="production-controls">
                <select className="time-filter">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <button className="add-record-btn">+ Add Record</button>
              </div>

              <div className="production-table">
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Eggs Collected</th>
                      <th>Feed Used (kg)</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productionData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.date}</td>
                        <td>{item.eggs}</td>
                        <td>{item.feed}</td>
                        <td>
                          <button className="notes-btn">Add Notes</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="production-chart">
                <h3>Weekly Production Trend</h3>
                <div className="chart-placeholder">
                  {/* In a real app, you would use a charting library here */}
                  <p>Chart visualization would appear here</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tasks" && (
            <div className="tasks-section">
              <h2>Today's Tasks</h2>
              <div className="task-list">
                {schedule.map((task, index) => (
                  <div
                    key={index}
                    className={`task-item ${task.completed ? "completed" : ""}`}
                  >
                    <div className="task-info">
                      <span className="task-time">{task.time}</span>
                      <span className="task-name">{task.task}</span>
                    </div>
                    <button
                      className={`task-status ${
                        task.completed ? "completed" : ""
                      }`}
                      onClick={() => markTaskComplete(index)}
                    >
                      {task.completed ? "✓ Completed" : "Mark Complete"}
                    </button>
                  </div>
                ))}
              </div>

              <div className="task-stats">
                <div className="stat-item">
                  <h3>Completed</h3>
                  <p>
                    {schedule.filter((t) => t.completed).length}/
                    {schedule.length}
                  </p>
                </div>
                <div className="stat-item">
                  <h3>Productivity</h3>
                  <p>
                    {Math.round(
                      (schedule.filter((t) => t.completed).length /
                        schedule.length) *
                        100
                    )}
                    %
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "reports" && (
            <div className="reports-section">
              <h2>My Reports</h2>
              <div className="report-filters">
                <select className="report-type">
                  <option>Daily Reports</option>
                  <option>Weekly Reports</option>
                  <option>Monthly Reports</option>
                </select>
                <input type="date" className="date-picker" />
                <button className="generate-btn">Generate Report</button>
              </div>

              <div className="report-cards">
                <div className="report-card">
                  <h3>Daily Production Report</h3>
                  <p>June 15, 2023</p>
                  <div className="report-actions">
                    <button className="view-btn">View</button>
                    <button className="download-btn">Download</button>
                  </div>
                </div>
                <div className="report-card">
                  <h3>Weekly Summary</h3>
                  <p>June 8-14, 2023</p>
                  <div className="report-actions">
                    <button className="view-btn">View</button>
                    <button className="download-btn">Download</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "schedule" && (
            <div className="schedule-section">
              <h2>My Work Schedule</h2>
              <div className="calendar-view">
                {/* In a real app, you would use a calendar component here */}
                <div className="calendar-placeholder">
                  <p>Calendar view would appear here</p>
                </div>
              </div>

              <div className="upcoming-shifts">
                <h3>Upcoming Shifts</h3>
                <div className="shift-list">
                  <div className="shift-item">
                    <div className="shift-date">Mon, Jun 19</div>
                    <div className="shift-time">08:00 - 16:00</div>
                    <div className="shift-location">Main Coop</div>
                  </div>
                  <div className="shift-item">
                    <div className="shift-date">Wed, Jun 21</div>
                    <div className="shift-time">10:00 - 18:00</div>
                    <div className="shift-location">Hatchery</div>
                  </div>
                  <div className="shift-item">
                    <div className="shift-date">Fri, Jun 23</div>
                    <div className="shift-time">06:00 - 14:00</div>
                    <div className="shift-location">Main Coop</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MemberDashboard;
