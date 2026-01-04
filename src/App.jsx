import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Employee from "./pages/Employee";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employee" element={<Employee />} />
      </Routes>
  );
}

export default App;
