import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, TrendingUp, Building2, Home, Search, Filter, Edit2, Trash2, Eye, X, Download, Plus, CheckCircle, AlertCircle, RefreshCw, FileText } from 'lucide-react';

export default function Payroll() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('january-2025');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [showProcessModal, setShowProcessModal] = useState(false);

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
    { id: 'departments', label: 'Departments', icon: Building2, path: '/departments' },
    { id: 'notes', label: 'Notes', icon: StickyNote, path: '/notes' }
  ];

  // Sample payroll data
  const [payrolls, setPayrolls] = useState([
    { id: 1, period: 'January 2025', totalEmployees: 45, totalAmount: '$225,000', status: 'processed', processedDate: '2025-01-31', dueDate: '2025-02-05', taxAmount: '$45,000' },
    { id: 2, period: 'December 2024', totalEmployees: 43, totalAmount: '$215,000', status: 'processed', processedDate: '2024-12-31', dueDate: '2025-01-05', taxAmount: '$43,000' },
    { id: 3, period: 'November 2024', totalEmployees: 42, totalAmount: '$210,000', status: 'processed', processedDate: '2024-11-30', dueDate: '2024-12-05', taxAmount: '$42,000' },
    { id: 4, period: 'February 2025', totalEmployees: 46, totalAmount: '$230,000', status: 'pending', processedDate: 'Pending', dueDate: '2025-03-05', taxAmount: '$46,000' },
    { id: 5, period: 'October 2024', totalEmployees: 41, totalAmount: '$205,000', status: 'processed', processedDate: '2024-10-31', dueDate: '2024-11-05', taxAmount: '$41,000' },
    { id: 6, period: 'September 2024', totalEmployees: 40, totalAmount: '$200,000', status: 'processed', processedDate: '2024-09-30', dueDate: '2024-10-05', taxAmount: '$40,000' },
    { id: 7, period: 'August 2024', totalEmployees: 39, totalAmount: '$195,000', status: 'processed', processedDate: '2024-08-31', dueDate: '2024-09-05', taxAmount: '$39,000' },
    { id: 8, period: 'July 2024', totalEmployees: 38, totalAmount: '$190,000', status: 'processed', processedDate: '2024-07-31', dueDate: '2024-08-05', taxAmount: '$38,000' },
  ]);

  const statuses = ['processed', 'pending', 'processing', 'failed'];
  const periods = [
    'January 2025', 'December 2024', 'November 2024', 'October 2024',
    'September 2024', 'August 2024', 'July 2024', 'June 2024',
    'May 2024', 'April 2024', 'March 2024', 'February 2024'
  ];

  const filteredPayrolls = payrolls.filter(payroll => {
    const matchesSearch = payroll.period.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || payroll.status === filterStatus;
    const matchesPeriod = filterPeriod === 'all' || payroll.period.toLowerCase().replace(' ', '-') === filterPeriod;
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  // Calculate statistics
  const totalProcessed = payrolls
    .filter(p => p.status === 'processed')
    .reduce((sum, p) => {
      const amount = parseInt(p.totalAmount.replace('$', '').replace(',', ''));
      return sum + amount;
    }, 0);

  const averagePayroll = Math.round(totalProcessed / payrolls.filter(p => p.status === 'processed').length);
  const pendingCount = payrolls.filter(p => p.status === 'pending').length;
  const processedCount = payrolls.filter(p => p.status === 'processed').length;

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

  const openAddModal = () => {
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (payroll) => {
    setModalMode('edit');
    setSelectedPayroll(payroll);
    setShowModal(true);
  };

  const openViewModal = (payroll) => {
    setModalMode('view');
    setSelectedPayroll(payroll);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this payroll record?')) {
      setPayrolls(payrolls.filter(p => p.id !== id));
    }
  };

  const handleProcessPayroll = () => {
    setShowProcessModal(true);
  };

  const confirmProcessPayroll = () => {
    // In a real app, this would process payroll for the current period
    const newPayroll = {
      id: payrolls.length + 1,
      period: 'February 2025',
      totalEmployees: 46,
      totalAmount: '$230,000',
      status: 'processing',
      processedDate: 'Processing...',
      dueDate: '2025-03-05',
      taxAmount: '$46,000'
    };
    
    setPayrolls([newPayroll, ...payrolls]);
    setShowProcessModal(false);
    alert('Payroll processing started for February 2025. Check back in a few minutes.');
  };

  const handleRunReport = (payroll) => {
    alert(`Generating detailed report for ${payroll.period}`);
    // In a real app, this would generate and download a PDF report
  };

  const handleExportPayroll = (payroll) => {
    alert(`Exporting payroll data for ${payroll.period}`);
    // In a real app, this would export to CSV/Excel
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'processed': return <CheckCircle size={16} style={{ color: '#059669' }} />;
      case 'pending': return <AlertCircle size={16} style={{ color: '#f59e0b' }} />;
      case 'processing': return <RefreshCw size={16} style={{ color: '#2563eb' }} />;
      case 'failed': return <X size={16} style={{ color: '#dc2626' }} />;
      default: return null;
    }
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

        {/* Payroll Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Payroll Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Process, manage, and track employee payroll cycles</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => alert('View payroll reports')}
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #7c3aed)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(139, 92, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(139, 92, 246, 0.3)'}>
                  <FileText size={20} />
                  View Reports
                </button>
                <button 
                  onClick={handleProcessPayroll}
                  style={{ background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(16, 185, 129, 0.3)'}>
                  <RefreshCw size={20} />
                  Process Payroll
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Processed</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <DollarSign style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>${totalProcessed.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>All time payroll processed</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Average Payroll</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <TrendingUp style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>${averagePayroll.toLocaleString()}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Per month average</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Processed Cycles</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{processedCount}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Successfully processed</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Pending Processing</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AlertCircle style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{pendingCount}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Awaiting processing</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Period Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Select Period</label>
                <select 
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Periods</option>
                  {periods.map(period => (
                    <option key={period} value={period.toLowerCase().replace(' ', '-')}>{period}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Payroll</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by payroll period..."
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
                  {statuses.map(status => (
                    <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Payroll Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Payroll Period</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Employees</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Total Amount</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Tax Amount</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Processed Date</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Due Date</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayrolls.map((payroll) => (
                    <tr key={payroll.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{payroll.period}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{payroll.totalEmployees}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: '#1f2937' }}>{payroll.totalAmount}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#ef4444' }}>{payroll.taxAmount}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          {getStatusIcon(payroll.status)}
                          <span style={{ 
                            display: 'inline-block',
                            fontSize: '12px', 
                            fontWeight: '600',
                            color: payroll.status === 'processed' ? '#065f46' : 
                                   payroll.status === 'pending' ? '#92400e' :
                                   payroll.status === 'processing' ? '#1e40af' : '#991b1b'
                          }}>
                            {payroll.status.charAt(0).toUpperCase() + payroll.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{payroll.processedDate}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#6b7280' }}>{payroll.dueDate}</td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => openViewModal(payroll)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#dbeafe', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}>
                            <Eye size={16} style={{ color: '#2563eb' }} />
                          </button>
                          <button 
                            onClick={() => handleRunReport(payroll)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#fef3c7', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fde68a'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fef3c7'}>
                            <FileText size={16} style={{ color: '#d97706' }} />
                          </button>
                          <button 
                            onClick={() => handleExportPayroll(payroll)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#f3e8ff', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e9d5ff'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3e8ff'}>
                            <Download size={16} style={{ color: '#9333ea' }} />
                          </button>
                          {payroll.status === 'pending' && (
                            <button 
                              onClick={() => handleProcessPayroll()}
                              style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#d1fae5', transition: 'background-color 0.2s' }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a7f3d0'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}>
                              <RefreshCw size={16} style={{ color: '#059669' }} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredPayrolls.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#9ca3af' }}>No payroll records found matching your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Process Payroll Confirmation Modal */}
      {showProcessModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '500px', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>Process Payroll</h2>
              <button 
                onClick={() => setShowProcessModal(false)}
                style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#f3f4f6', transition: 'background-color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}>
                <X size={20} style={{ color: '#6b7280' }} />
              </button>
            </div>

            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <RefreshCw style={{ color: 'white' }} size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1f2937' }}>Process Payroll for February 2025</h3>
                  <p style={{ fontSize: '14px', color: '#6b7280' }}>This will calculate salaries for all active employees</p>
                </div>
              </div>

              <div style={{ backgroundColor: '#f9fafb', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>Payroll Summary:</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Employees</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>46</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Estimated Amount</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#1f2937' }}>$230,000</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Tax Deductions</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#ef4444' }}>$46,000</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Net Payable</div>
                    <div style={{ fontSize: '16px', fontWeight: '600', color: '#10b981' }}>$184,000</div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  onClick={() => setShowProcessModal(false)}
                  style={{ padding: '10px 24px', borderRadius: '10px', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#374151', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                  Cancel
                </button>
                <button 
                  onClick={confirmProcessPayroll}
                  style={{ padding: '10px 24px', borderRadius: '10px', border: 'none', background: 'linear-gradient(to right, #10b981, #059669)', color: 'white', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.3)', transition: 'box-shadow 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(16, 185, 129, 0.3)'}>
                  Start Processing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}