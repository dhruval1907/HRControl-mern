import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added Link and useNavigate
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, Plus, Calculator, Download, TrendingUp, Building2, Home, Search, Filter, ChevronDown } from 'lucide-react';

export default function Attendance() {
  const navigate = useNavigate(); // Add this hook
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-01-04');

  // Get current path for active tab
  const currentPath = window.location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
    if (currentPath.includes('/dashboard')) return 'home';
    if (currentPath.includes('/employee')) return 'employees';
    if (currentPath.includes('/salaries')) return 'salaries';
    if (currentPath.includes('/attendance')) return 'attendance';
    if (currentPath.includes('/payroll')) return 'payroll';
    if (currentPath.includes('/holidays')) return 'holidays';
    if (currentPath.includes('/sites')) return 'sites';
    if (currentPath.includes('/departments')) return 'departments';
    if (currentPath.includes('/notes')) return 'notes';
    return 'home';
  };

  const activeTab = getActiveTab();

  // Menu items with proper routing
  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, path: '/dashboard' },
    { id: 'employees', label: 'Employees', icon: Users, path: '/employee' },
    { id: 'salaries', label: 'Salaries', icon: DollarSign, path: '/salary' },
    { id: 'attendance', label: 'Attendance', icon: Clock, path: '/attendance' },
    { id: 'payroll', label: 'Payroll', icon: TrendingUp, path: '/payroll' },
    { id: 'holidays', label: 'Holidays', icon: Calendar, path: '/holidays' },
    { id: 'sites', label: 'Sites', icon: MapPin, path: '/sites' },
    { id: 'departments', label: 'Departments', icon: Building2, path: '/departments' },
    { id: 'notes', label: 'Notes', icon: StickyNote, path: '/notes' }
  ];

  // Sample employee data
  const employees = [
    { id: 1, name: 'John Doe', department: 'Engineering', status: 'present', checkIn: '09:15 AM', checkOut: '06:30 PM', hours: '9h 15m' },
    { id: 2, name: 'Jane Smith', department: 'Marketing', status: 'present', checkIn: '09:00 AM', checkOut: '06:00 PM', hours: '9h 0m' },
    { id: 3, name: 'Mike Johnson', department: 'Sales', status: 'absent', checkIn: '-', checkOut: '-', hours: '-' },
    { id: 4, name: 'Sarah Williams', department: 'HR', status: 'present', checkIn: '08:45 AM', checkOut: '05:45 PM', hours: '9h 0m' },
    { id: 5, name: 'David Brown', department: 'Engineering', status: 'present', checkIn: '09:30 AM', checkOut: '06:45 PM', hours: '9h 15m' },
    { id: 6, name: 'Emily Davis', department: 'Design', status: 'present', checkIn: '10:00 AM', checkOut: '07:00 PM', hours: '9h 0m' },
    { id: 7, name: 'Robert Miller', department: 'Finance', status: 'absent', checkIn: '-', checkOut: '-', hours: '-' },
    { id: 8, name: 'Lisa Anderson', department: 'Operations', status: 'present', checkIn: '08:30 AM', checkOut: '05:30 PM', hours: '9h 0m' },
    { id: 9, name: 'James Wilson', department: 'Engineering', status: 'present', checkIn: '09:15 AM', checkOut: '06:15 PM', hours: '9h 0m' },
    { id: 10, name: 'Maria Garcia', department: 'Marketing', status: 'absent', checkIn: '-', checkOut: '-', hours: '-' },
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || emp.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const presentCount = employees.filter(e => e.status === 'present').length;
  const absentCount = employees.filter(e => e.status === 'absent').length;
  const totalEmployees = employees.length;
  const attendanceRate = ((presentCount / totalEmployees) * 100).toFixed(1);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('hrms_auth');
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_role');
    navigate('/');
  };

  // Function to check if a menu item is active
  const isActive = (path) => {
    if (path === '/dashboard') {
      return currentPath === path || currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}>
      {/* Sidebar */}
      <div style={{ width: '256px', backgroundColor: 'white', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', borderRight: '1px solid #e5e7eb', flexShrink: 0 }}>
        <div style={{ padding: '24px', borderBottom: '1px solid #f3f4f6' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '18px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
              A
            </div>
            <div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>Welcome, Avin</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Admin</div>
            </div>
          </div>
        </div>
        
        <div style={{ padding: '24px 16px' }}>
          <div style={{ marginBottom: '24px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>HR Dashboard</h2>
            <div style={{ fontSize: '14px', color: '#6b7280' }}>Manage Employees & Data</div>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    background: active ? 'linear-gradient(to right, #2563eb, #1d4ed8)' : 'transparent',
                    color: active ? 'white' : '#374151',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: active ? '0 4px 6px -1px rgba(37, 99, 235, 0.3)' : 'none',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {/* Header */}
        <div style={{ backgroundColor: 'white', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', borderBottom: '1px solid #e5e7eb', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div style={{ fontSize: '14px', color: '#4b5563' }}>
            Email: <span style={{ fontWeight: '600', color: '#1f2937' }}>aadhiavi57@gmail.com</span>
          </div>
          <button 
            onClick={handleLogout}
            style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)', color: 'white', padding: '10px 32px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(239, 68, 68, 0.3)'}>
            Logout
          </button>
        </div>

        {/* Attendance Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Attendance Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Track and manage employee attendance records</p>
              </div>
              <button style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                <Download size={20} />
                Export Report
              </button>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Employees</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{totalEmployees}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Present Today</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{presentCount}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Absent Today</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #ef4444, #dc2626)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ef4444' }}>{absentCount}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Attendance Rate</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{attendanceRate}%</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Date Picker */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Select Date</label>
                <input 
                  type="date" 
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937' }}
                />
              </div>

              {/* Search */}
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Employee</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by name or department..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Status Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Filter by Status</label>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Status</option>
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                </select>
              </div>
            </div>
          </div>

          {/* Attendance Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Employee Name</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Department</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Check In</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Check Out</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{employee.name}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{employee.department}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: employee.status === 'present' ? '#d1fae5' : '#fee2e2',
                          color: employee.status === 'present' ? '#065f46' : '#991b1b'
                        }}>
                          {employee.status === 'present' ? 'Present' : 'Absent'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{employee.checkIn}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{employee.checkOut}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{employee.hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEmployees.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#9ca3af' }}>No employees found matching your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}