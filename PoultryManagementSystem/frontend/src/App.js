import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import HomePage from "./HomePage";
import AdminDashboard from "./AdminDashboard";
import { AuthProvider } from "./AuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import Unauthorized from "./Unauthorized";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoutes allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoutes>
            }
          />

          {/* <Route
            path="/leader-dashboard"
            element={
              <ProtectedRoutes allowedRoles={["leader", "admin"]}>
                <LeaderDashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/member-dashboard"
            element={
              <ProtectedRoutes allowedRoles={["member", "leader", "admin"]}>
                <MemberDashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/guest-dashboard"
            element={
              <ProtectedRoutes
                allowedRoles={["guest", "member", "leader", "admin"]}
              >
                <GuestDashboard />
              </ProtectedRoutes>
            }
          /> */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
