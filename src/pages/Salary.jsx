import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, TrendingUp, Building2, Home, Search, Filter, Edit2, Trash2, Eye, X, Download, Plus } from 'lucide-react';

export default function Salaries() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [filterMonth, setFilterMonth] = useState('january');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    department: '',
    basicSalary: '',
    allowances: '',
    deductions: '',
    netSalary: '',
    paymentStatus: '',
    paymentDate: ''
  });

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
    { id: 'holidays', label: 'Holidays', icon: Calendar, path: '/holiday' },
    { id: 'sites', label: 'Sites', icon: MapPin, path: '/site' },
    { id: 'departments', label: 'Departments', icon: Building2, path: '/department' },
    { id: 'notes', label: 'Notes', icon: StickyNote, path: '/notes' }
  ];

  // Sample salary data
  const [salaries, setSalaries] = useState([
    { id: 1, employeeName: 'John Doe', department: 'Engineering', basicSalary: '$6,000', allowances: '$1,000', deductions: '$500', netSalary: '$6,500', paymentStatus: 'paid', paymentDate: '2025-01-01' },
    { id: 2, employeeName: 'Jane Smith', department: 'Marketing', basicSalary: '$5,500', allowances: '$800', deductions: '$300', netSalary: '$6,000', paymentStatus: 'paid', paymentDate: '2025-01-01' },
    { id: 3, employeeName: 'Mike Johnson', department: 'Sales', basicSalary: '$5,000', allowances: '$700', deductions: '$200', netSalary: '$5,500', paymentStatus: 'pending', paymentDate: '2025-01-15' },
    { id: 4, employeeName: 'Sarah Williams', department: 'HR', basicSalary: '$5,200', allowances: '$600', deductions: '$250', netSalary: '$5,550', paymentStatus: 'paid', paymentDate: '2025-01-01' },
    { id: 5, employeeName: 'David Brown', department: 'Engineering', basicSalary: '$6,200', allowances: '$1,100', deductions: '$600', netSalary: '$6,700', paymentStatus: 'paid', paymentDate: '2025-01-01' },
    { id: 6, employeeName: 'Emily Davis', department: 'Design', basicSalary: '$5,800', allowances: '$900', deductions: '$400', netSalary: '$6,300', paymentStatus: 'paid', paymentDate: '2025-01-01' },
    { id: 7, employeeName: 'Robert Miller', department: 'Finance', basicSalary: '$5,600', allowances: '$750', deductions: '$350', netSalary: '$6,000', paymentStatus: 'pending', paymentDate: '2025-01-15' },
    { id: 8, employeeName: 'Lisa Anderson', department: 'Operations', basicSalary: '$5,900', allowances: '$950', deductions: '$450', netSalary: '$6,400', paymentStatus: 'paid', paymentDate: '2025-01-01' },
  ]);

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Design', 'Finance', 'Operations'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const paymentStatuses = ['paid', 'pending', 'processing'];

  const filteredSalaries = salaries.filter(salary => {
    const matchesSearch = salary.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         salary.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDeptFilter = filterDepartment === 'all' || salary.department === filterDepartment;
    return matchesSearch && matchesDeptFilter;
  });

  // Calculate statistics
  const totalSalary = salaries.reduce((sum, salary) => {
    const net = parseInt(salary.netSalary.replace('$', '').replace(',', ''));
    return sum + net;
  }, 0);

  const averageSalary = Math.round(totalSalary / salaries.length);
  const paidCount = salaries.filter(s => s.paymentStatus === 'paid').length;
  const pendingCount = salaries.filter(s => s.paymentStatus === 'pending').length;

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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      employeeName: '',
      department: '',
      basicSalary: '',
      allowances: '',
      deductions: '',
      netSalary: '',
      paymentStatus: '',
      paymentDate: ''
    });
    setShowModal(true);
  };

  const openEditModal = (salary) => {
    setModalMode('edit');
    setSelectedSalary(salary);
    setFormData({
      employeeName: salary.employeeName,
      department: salary.department,
      basicSalary: salary.basicSalary.replace('$', '').replace(',', ''),
      allowances: salary.allowances.replace('$', '').replace(',', ''),
      deductions: salary.deductions.replace('$', '').replace(',', ''),
      netSalary: salary.netSalary.replace('$', '').replace(',', ''),
      paymentStatus: salary.paymentStatus,
      paymentDate: salary.paymentDate
    });
    setShowModal(true);
  };

  const openViewModal = (salary) => {
    setModalMode('view');
    setSelectedSalary(salary);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newSalary = {
        id: salaries.length + 1,
        ...formData,
        basicSalary: `$${parseInt(formData.basicSalary).toLocaleString()}`,
        allowances: `$${parseInt(formData.allowances).toLocaleString()}`,
        deductions: `$${parseInt(formData.deductions).toLocaleString()}`,
        netSalary: `$${parseInt(formData.netSalary).toLocaleString()}`
      };
      setSalaries([...salaries, newSalary]);
    } else if (modalMode === 'edit') {
      setSalaries(salaries.map(sal => 
        sal.id === selectedSalary.id ? { 
          ...sal, 
          ...formData,
          basicSalary: `$${parseInt(formData.basicSalary).toLocaleString()}`,
          allowances: `$${parseInt(formData.allowances).toLocaleString()}`,
          deductions: `$${parseInt(formData.deductions).toLocaleString()}`,
          netSalary: `$${parseInt(formData.netSalary).toLocaleString()}`
        } : sal
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      setSalaries(salaries.filter(sal => sal.id !== id));
    }
  };

  const handleDownloadPayslip = (salary) => {
    alert(`Downloading payslip for ${salary.employeeName}`);
    // In a real app, this would trigger a PDF download
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

        {/* Salaries Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Salary Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Manage employee salaries, payments, and records</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => alert('Bulk salary processing')}
                  style={{ background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(16, 185, 129, 0.3)'}>
                  <DollarSign size={20} />
                  Process Bulk Salary
                </button>
                <button 
                  onClick={openAddModal}
                  style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                  <Plus size={20} />
                  Add Salary Record
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Monthly Salary</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>${totalSalary.toLocaleString()}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Average Salary</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>${averageSalary.toLocaleString()}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Paid Salaries</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Users style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{paidCount}</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Pending Payments</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Clock style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{pendingCount}</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Month Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Select Month</label>
                <select 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  {months.map(month => (
                    <option key={month} value={month.toLowerCase()}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Employee</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by employee name or department..."
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

          {/* Salaries Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Employee Name</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Department</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Basic Salary</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Allowances</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Deductions</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Net Salary</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Payment Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Payment Date</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSalaries.map((salary) => (
                    <tr key={salary.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{salary.employeeName}</td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>{salary.department}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{salary.basicSalary}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#10b981' }}>+{salary.allowances}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#ef4444' }}>-{salary.deductions}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{salary.netSalary}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: salary.paymentStatus === 'paid' ? '#d1fae5' : 
                                         salary.paymentStatus === 'pending' ? '#fef3c7' : '#dbeafe',
                          color: salary.paymentStatus === 'paid' ? '#065f46' : 
                                 salary.paymentStatus === 'pending' ? '#92400e' : '#1e40af'
                        }}>
                          {salary.paymentStatus.charAt(0).toUpperCase() + salary.paymentStatus.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{salary.paymentDate}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => openViewModal(salary)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#dbeafe', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}>
                            <Eye size={16} style={{ color: '#2563eb' }} />
                          </button>
                          <button 
                            onClick={() => handleDownloadPayslip(salary)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#f3e8ff', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9d5ff'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3e8ff'}>
                            <Download size={16} style={{ color: '#9333ea' }} />
                          </button>
                          <button 
                            onClick={() => openEditModal(salary)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#d1fae5', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a7f3d0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}>
                            <Edit2 size={16} style={{ color: '#059669' }} />
                          </button>
                          <button 
                            onClick={() => handleDelete(salary.id)}
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

            {filteredSalaries.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#9ca3af' }}>No salary records found matching your search criteria</p>
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
                {modalMode === 'add' ? 'Add Salary Record' : modalMode === 'edit' ? 'Edit Salary Record' : 'Salary Details'}
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
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Employee Name</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSalary.employeeName}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Department</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSalary.department}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Basic Salary</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSalary.basicSalary}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Allowances</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#10b981' }}>+{selectedSalary.allowances}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Deductions</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#ef4444' }}>-{selectedSalary.deductions}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Net Salary</div>
                      <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#1f2937' }}>{selectedSalary.netSalary}</div>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Status</div>
                      <div>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: selectedSalary.paymentStatus === 'paid' ? '#d1fae5' : '#fef3c7',
                          color: selectedSalary.paymentStatus === 'paid' ? '#065f46' : '#92400e'
                        }}>
                          {selectedSalary.paymentStatus.charAt(0).toUpperCase() + selectedSalary.paymentStatus.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Payment Date</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSalary.paymentDate}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Employee Name</label>
                    <input
                      type="text"
                      name="employeeName"
                      value={formData.employeeName}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                    />
                  </div>

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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Basic Salary ($)</label>
                      <input
                        type="number"
                        name="basicSalary"
                        value={formData.basicSalary}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Allowances ($)</label>
                      <input
                        type="number"
                        name="allowances"
                        value={formData.allowances}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Deductions ($)</label>
                      <input
                        type="number"
                        name="deductions"
                        value={formData.deductions}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Net Salary ($)</label>
                      <input
                        type="number"
                        name="netSalary"
                        value={formData.netSalary}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Payment Status</label>
                      <select
                        name="paymentStatus"
                        value={formData.paymentStatus}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        <option value="">Select Status</option>
                        {paymentStatuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Payment Date</label>
                      <input
                        type="date"
                        name="paymentDate"
                        value={formData.paymentDate}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
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
                      {modalMode === 'add' ? 'Add Salary Record' : 'Update Salary Record'}
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