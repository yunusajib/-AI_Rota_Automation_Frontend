import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ShiftRequests from "./pages/ShiftRequests";
import HolidayRequests from "./pages/HolidayRequests";
import ShiftCoverage from "./pages/ShiftCoverage";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shift-requests" element={<ShiftRequests />} />
          <Route path="/holiday-requests" element={<HolidayRequests />} />
          <Route path="/shift-coverage" element={<ShiftCoverage />} />
        </Route>

        <Route path="*" element={<Login />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
