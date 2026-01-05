import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Employee from "./pages/Employee";
import Notfound from "./pages/Notfound";
import Salaries from "./pages/Salary";
import Payroll from "./pages/Payroll";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="*" element={<Notfound />} />
        <Route path="/salary" element={<Salaries />} />
        <Route path="/payroll" element={<Payroll />} />
      </Routes>
  );
}

export default App;
