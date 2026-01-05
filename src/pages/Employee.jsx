import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added Link
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, Plus, Calculator, Download, TrendingUp, Building2, Home, Search, Filter, Edit2, Trash2, Eye, X } from 'lucide-react';

export default function Employee() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    salary: '',
    joinDate: '',
    address: ''
  });

  // Get current path for active tab
  const currentPath = window.location.pathname;
  
  // Determine active tab based on current path
  const getActiveTab = () => {
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('hrms_auth');
    localStorage.removeItem('hrms_user');
    localStorage.removeItem('hrms_role');
    navigate('/');
  };

  // Sample employee data
  const [employees, setEmployees] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', phone: '+1 234 567 8901', department: 'Engineering', position: 'Senior Developer', salary: '$85,000', joinDate: '2022-01-15', address: '123 Main St, New York' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@company.com', phone: '+1 234 567 8902', department: 'Marketing', position: 'Marketing Manager', salary: '$75,000', joinDate: '2021-06-20', address: '456 Oak Ave, Boston' },
    { id: 3, name: 'Mike Johnson', email: 'mike.johnson@company.com', phone: '+1 234 567 8903', department: 'Sales', position: 'Sales Executive', salary: '$65,000', joinDate: '2023-03-10', address: '789 Pine Rd, Chicago' },
    { id: 4, name: 'Sarah Williams', email: 'sarah.w@company.com', phone: '+1 234 567 8904', department: 'HR', position: 'HR Specialist', salary: '$70,000', joinDate: '2020-11-05', address: '321 Elm St, Seattle' },
    { id: 5, name: 'David Brown', email: 'david.brown@company.com', phone: '+1 234 567 8905', department: 'Engineering', position: 'Full Stack Developer', salary: '$80,000', joinDate: '2022-08-22', address: '654 Maple Dr, Austin' },
    { id: 6, name: 'Emily Davis', email: 'emily.davis@company.com', phone: '+1 234 567 8906', department: 'Design', position: 'UI/UX Designer', salary: '$72,000', joinDate: '2021-09-14', address: '987 Cedar Ln, Portland' },
    { id: 7, name: 'Robert Miller', email: 'robert.m@company.com', phone: '+1 234 567 8907', department: 'Finance', position: 'Financial Analyst', salary: '$78,000', joinDate: '2023-01-30', address: '147 Birch Ct, Denver' },
    { id: 8, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', phone: '+1 234 567 8908', department: 'Operations', position: 'Operations Manager', salary: '$82,000', joinDate: '2020-05-18', address: '258 Spruce Way, Miami' }
  ]);

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance', 'Operations'];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterDepartment === 'all' || emp.department === filterDepartment;
    return matchesSearch && matchesFilter;
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({ name: '', email: '', phone: '', department: '', position: '', salary: '', joinDate: '', address: '' });
    setShowModal(true);
  };

  const openEditModal = (employee) => {
    setModalMode('edit');
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name,
      email: employee.email,
      phone: employee.phone,
      department: employee.department,
      position: employee.position,
      salary: employee.salary.replace('$', '').replace(',', ''),
      joinDate: employee.joinDate,
      address: employee.address
    });
    setShowModal(true);
  };

  const openViewModal = (employee) => {
    setModalMode('view');
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newEmployee = {
        id: employees.length + 1,
        ...formData,
        salary: `$${parseInt(formData.salary).toLocaleString()}`
      };
      setEmployees([...employees, newEmployee]);
    } else if (modalMode === 'edit') {
      setEmployees(employees.map(emp => 
        emp.id === selectedEmployee.id ? { 
          ...emp, 
          ...formData,
          salary: `$${parseInt(formData.salary).toLocaleString()}`
        } : emp
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(employees.filter(emp => emp.id !== id));
    }
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

        {/* Employee Management Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Employee Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Manage all employee information and records</p>
              </div>
              <button 
                onClick={openAddModal}
                style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                <Plus size={20} />
                Add New Employee
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
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{employees.length}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Departments</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{departments.length}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>New This Month</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>2</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Active Positions</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Briefcase style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>8</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Search */}
              <div style={{ flex: 3 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Employee</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by name, email, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Department Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Filter by Department</label>
                <select 
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Employee Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Employee Name</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Email</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Department</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Position</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Salary</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map((employee) => (
                    <tr key={employee.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{employee.name}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{employee.email}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{employee.department}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{employee.position}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{employee.salary}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => openViewModal(employee)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#dbeafe', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}>
                            <Eye size={16} style={{ color: '#2563eb' }} />
                          </button>
                          <button 
                            onClick={() => openEditModal(employee)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#d1fae5', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a7f3d0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}>
                            <Edit2 size={16} style={{ color: '#059669' }} />
                          </button>
                          <button 
                            onClick={() => handleDelete(employee.id)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#fee2e2', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}>
                            <Trash2 size={16} style={{ color: '#dc2626' }} />
                          </button>
                        </div>
                      </td>
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

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '600px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            {/* Modal Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {modalMode === 'add' ? 'Add New Employee' : modalMode === 'edit' ? 'Edit Employee' : 'Employee Details'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#f3f4f6', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}>
                <X size={20} style={{ color: '#6b7280' }} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {modalMode === 'view' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Name</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.name}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.email}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.phone}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Department</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.department}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Position</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.position}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Salary</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.salary}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Join Date</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.joinDate}</div>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedEmployee.address}</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        <option value="">Select Department</option>
                        {departments.map(dept => (
                          <option key={dept} value={dept}>{dept}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Position</label>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Salary ($)</label>
                      <input
                        type="number"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Join Date</label>
                      <input
                        type="date"
                        name="joinDate"
                        value={formData.joinDate}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', minHeight: '80px' }}
                      required
                    />
                  </div>

                  {/* Modal Footer */}
                  <div style={{ marginTop: '24px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#374151', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', transition: 'box-shadow 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                      onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                      {modalMode === 'add' ? 'Add Employee' : 'Update Employee'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}