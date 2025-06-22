import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            Poultry<span>Pro</span> Manager
          </h1>
          <p className="hero-subtitle">
            Streamline your poultry farm operations and maximize profits
          </p>
          <div className="cta-buttons">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>
        </div>
        <div className="hero-image"></div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Powerful Poultry Management Tools</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🥚</div>
            <h3>Egg Production Tracking</h3>
            <p>
              Record daily egg counts, categorize by size/grade, and monitor
              production trends.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Sales & Revenue Tracking</h3>
            <p>
              Log all egg sales, customer orders, and payment records in one
              centralized system.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Profit Analysis</h3>
            <p>
              Automatically calculate profits by comparing sales against feed,
              labor, and other expenses.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Comprehensive Reporting</h3>
            <p>
              Generate detailed reports on production, sales, expenses, and
              profitability.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Order Management</h3>
            <p>
              Track customer orders, delivery schedules, and recurring
              purchases.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🐔</div>
            <h3>Flock Health Monitoring</h3>
            <p>
              Optional: Record vaccination schedules, mortality rates, and
              health observations.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How PoultryPro Manager Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Record Daily Production</h3>
            <p>Input your daily egg counts and any production notes</p>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Log Sales & Expenses</h3>
            <p>Enter all customer purchases and operational costs</p>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Analyze Your Data</h3>
            <p>View real-time dashboards and generate reports</p>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <h3>Make Informed Decisions</h3>
            <p>Use insights to optimize production and pricing</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Take Control of Your Poultry Business?</h2>
        <p className="cta-subtitle">
          Start tracking, analyzing, and growing your farm's profitability today
        </p>
        <Link to="/register" className="btn btn-primary btn-large">
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
