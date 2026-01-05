import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, TrendingUp, Building2, Home, Search, Filter, Edit2, Trash2, Eye, X, Plus, Download, Bell, Gift, PartyPopper, Church } from 'lucide-react';

export default function Holidays() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterMonth, setFilterMonth] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    type: '',
    description: '',
    isRecurring: false,
    applyToAll: true
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
    { id: 'holidays', label: 'Holidays', icon: Calendar, path: '/holidays' },
    { id: 'sites', label: 'Sites', icon: MapPin, path: '/site' },
    { id: 'departments', label: 'Departments', icon: Building2, path: '/department' },
    { id: 'notes', label: 'Notes', icon: StickyNote, path: '/notes' }
  ];

  // Sample holiday data
  const [holidays, setHolidays] = useState([
    { id: 1, name: 'New Year\'s Day', date: '2025-01-01', type: 'public', description: 'Celebration of the new year', isRecurring: true, daysLeft: 28, applyToAll: true },
    { id: 2, name: 'Republic Day', date: '2025-01-26', type: 'national', description: 'Celebration of the Republic of India', isRecurring: true, daysLeft: 53, applyToAll: true },
    { id: 3, name: 'Holi', date: '2025-03-14', type: 'festival', description: 'Festival of colors', isRecurring: true, daysLeft: 100, applyToAll: true },
    { id: 4, name: 'Good Friday', date: '2025-04-18', type: 'religious', description: 'Christian holiday', isRecurring: true, daysLeft: 135, applyToAll: true },
    { id: 5, name: 'Eid al-Fitr', date: '2025-03-30', type: 'religious', description: 'Islamic festival marking the end of Ramadan', isRecurring: true, daysLeft: 116, applyToAll: true },
    { id: 6, name: 'Independence Day', date: '2025-08-15', type: 'national', description: 'Indian Independence Day', isRecurring: true, daysLeft: 254, applyToAll: true },
    { id: 7, name: 'Diwali', date: '2025-10-23', type: 'festival', description: 'Festival of lights', isRecurring: true, daysLeft: 323, applyToAll: true },
    { id: 8, name: 'Christmas Day', date: '2025-12-25', type: 'public', description: 'Christmas celebration', isRecurring: true, daysLeft: 386, applyToAll: true },
    { id: 9, name: 'Company Foundation Day', date: '2025-07-15', type: 'company', description: 'Company anniversary celebration', isRecurring: true, daysLeft: 223, applyToAll: true },
    { id: 10, name: 'Annual Maintenance Day', date: '2025-02-10', type: 'company', description: 'Office maintenance and cleaning day', isRecurring: false, daysLeft: 68, applyToAll: true },
  ]);

  const holidayTypes = ['public', 'national', 'festival', 'religious', 'company', 'other'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const filteredHolidays = holidays.filter(holiday => {
    const matchesSearch = holiday.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         holiday.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || holiday.type === filterType;
    const matchesMonth = filterMonth === 'all' || 
                        new Date(holiday.date).toLocaleString('default', { month: 'long' }).toLowerCase() === filterMonth.toLowerCase();
    return matchesSearch && matchesType && matchesMonth;
  });

  // Calculate statistics
  const upcomingHolidays = holidays.filter(h => new Date(h.date) > new Date()).length;
  const pastHolidays = holidays.filter(h => new Date(h.date) < new Date()).length;
  const recurringCount = holidays.filter(h => h.isRecurring).length;
  const nextHoliday = holidays
    .filter(h => new Date(h.date) > new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

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
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      date: '',
      type: '',
      description: '',
      isRecurring: false,
      applyToAll: true
    });
    setShowModal(true);
  };

  const openEditModal = (holiday) => {
    setModalMode('edit');
    setSelectedHoliday(holiday);
    setFormData({
      name: holiday.name,
      date: holiday.date,
      type: holiday.type,
      description: holiday.description,
      isRecurring: holiday.isRecurring,
      applyToAll: holiday.applyToAll
    });
    setShowModal(true);
  };

  const openViewModal = (holiday) => {
    setModalMode('view');
    setSelectedHoliday(holiday);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const date = new Date(formData.date);
      const today = new Date();
      const timeDiff = date.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      const newHoliday = {
        id: holidays.length + 1,
        ...formData,
        daysLeft: daysLeft > 0 ? daysLeft : 0
      };
      setHolidays([...holidays, newHoliday]);
    } else if (modalMode === 'edit') {
      const date = new Date(formData.date);
      const today = new Date();
      const timeDiff = date.getTime() - today.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setHolidays(holidays.map(hol => 
        hol.id === selectedHoliday.id ? { 
          ...hol, 
          ...formData,
          daysLeft: daysLeft > 0 ? daysLeft : 0
        } : hol
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this holiday?')) {
      setHolidays(holidays.filter(hol => hol.id !== id));
    }
  };

  const handleDownloadCalendar = () => {
    alert('Downloading holiday calendar as ICS file');
    // In a real app, this would generate and download an ICS calendar file
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'public': return <Bell size={16} />;
      case 'national': return <Church size={16} />;
      case 'festival': return <PartyPopper size={16} />;
      case 'religious': return <Church size={16} />;
      case 'company': return <Building2 size={16} />;
      default: return <Gift size={16} />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'public': return '#3b82f6';
      case 'national': return '#ef4444';
      case 'festival': return '#8b5cf6';
      case 'religious': return '#10b981';
      case 'company': return '#f59e0b';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const calculateDaysLeft = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const timeDiff = date.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
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

        {/* Holidays Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Holidays Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Manage and track company holidays and leaves</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleDownloadCalendar}
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #7c3aed)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(139, 92, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(139, 92, 246, 0.3)'}>
                  <Download size={20} />
                  Export Calendar
                </button>
                <button 
                  onClick={openAddModal}
                  style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                  <Plus size={20} />
                  Add New Holiday
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Holidays</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{holidays.length}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>For current year</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Upcoming Holidays</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Bell style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{upcomingHolidays}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Scheduled for this year</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Recurring Holidays</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{recurringCount}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Annual repeating holidays</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Next Holiday</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Gift style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', marginBottom: '4px' }}>
                  {nextHoliday ? nextHoliday.name : 'No upcoming'}
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>
                  {nextHoliday ? `${formatDate(nextHoliday.date)} (${nextHoliday.daysLeft} days)` : 'Holidays'}
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              {/* Month Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Filter by Month</label>
                <select 
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Months</option>
                  {months.map(month => (
                    <option key={month} value={month.toLowerCase()}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Holiday</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by holiday name or description..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Type Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Filter by Type</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Types</option>
                  {holidayTypes.map(type => (
                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Holidays Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Holiday Name</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Date</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Type</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Days Left</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Recurring</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Apply To All</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHolidays.map((holiday) => {
                    const daysLeft = calculateDaysLeft(holiday.date);
                    return (
                    <tr key={holiday.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: `${getTypeColor(holiday.type)}20`, 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: getTypeColor(holiday.type)
                          }}>
                            {getTypeIcon(holiday.type)}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{holiday.name}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{holiday.description}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', color: '#1f2937', fontWeight: '500' }}>
                        {formatDate(holiday.date)}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: `${getTypeColor(holiday.type)}20`,
                          color: getTypeColor(holiday.type)
                        }}>
                          {holiday.type.charAt(0).toUpperCase() + holiday.type.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        {daysLeft > 0 ? (
                          <span style={{ 
                            display: 'inline-block',
                            padding: '6px 16px', 
                            borderRadius: '20px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            backgroundColor: daysLeft <= 30 ? '#fef3c7' : '#d1fae5',
                            color: daysLeft <= 30 ? '#92400e' : '#065f46'
                          }}>
                            {daysLeft} days
                          </span>
                        ) : (
                          <span style={{ 
                            display: 'inline-block',
                            padding: '6px 16px', 
                            borderRadius: '20px', 
                            fontSize: '12px', 
                            fontWeight: '600',
                            backgroundColor: '#e5e7eb',
                            color: '#6b7280'
                          }}>
                            Passed
                          </span>
                        )}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: holiday.isRecurring ? '#d1fae5' : '#e5e7eb',
                          color: holiday.isRecurring ? '#065f46' : '#6b7280'
                        }}>
                          {holiday.isRecurring ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: holiday.applyToAll ? '#dbeafe' : '#fef3c7',
                          color: holiday.applyToAll ? '#1e40af' : '#92400e'
                        }}>
                          {holiday.applyToAll ? 'All Employees' : 'Specific'}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => openViewModal(holiday)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#dbeafe', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}>
                            <Eye size={16} style={{ color: '#2563eb' }} />
                          </button>
                          <button 
                            onClick={() => openEditModal(holiday)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#d1fae5', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a7f3d0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}>
                            <Edit2 size={16} style={{ color: '#059669' }} />
                          </button>
                          <button 
                            onClick={() => handleDelete(holiday.id)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#fee2e2', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}>
                            <Trash2 size={16} style={{ color: '#dc2626' }} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            {filteredHolidays.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#9ca3af' }}>No holidays found matching your search criteria</p>
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
                {modalMode === 'add' ? 'Add New Holiday' : modalMode === 'edit' ? 'Edit Holiday' : 'Holiday Details'}
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <div style={{ 
                      width: '48px', 
                      height: '48px', 
                      backgroundColor: `${getTypeColor(selectedHoliday.type)}20`, 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: getTypeColor(selectedHoliday.type)
                    }}>
                      {getTypeIcon(selectedHoliday.type)}
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{selectedHoliday.name}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{selectedHoliday.description}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Date</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{formatDate(selectedHoliday.date)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Type</div>
                      <div>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: `${getTypeColor(selectedHoliday.type)}20`,
                          color: getTypeColor(selectedHoliday.type)
                        }}>
                          {selectedHoliday.type.charAt(0).toUpperCase() + selectedHoliday.type.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Recurring</div>
                      <div>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: selectedHoliday.isRecurring ? '#d1fae5' : '#e5e7eb',
                          color: selectedHoliday.isRecurring ? '#065f46' : '#6b7280'
                        }}>
                          {selectedHoliday.isRecurring ? 'Yes - Annual' : 'No - One Time'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Applicability</div>
                      <div>
                        <span style={{ 
                          display: 'inline-block',
                          padding: '6px 16px', 
                          borderRadius: '20px', 
                          fontSize: '12px', 
                          fontWeight: '600',
                          backgroundColor: selectedHoliday.applyToAll ? '#dbeafe' : '#fef3c7',
                          color: selectedHoliday.applyToAll ? '#1e40af' : '#92400e'
                        }}>
                          {selectedHoliday.applyToAll ? 'All Employees' : 'Specific Departments'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Days Left</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>
                      {selectedHoliday.daysLeft > 0 ? `${selectedHoliday.daysLeft} days remaining` : 'This holiday has passed'}
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Holiday Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                      placeholder="e.g., New Year's Day"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Date</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Type</label>
                      <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        <option value="">Select Type</option>
                        {holidayTypes.map(type => (
                          <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px', minHeight: '80px' }}
                      required
                      placeholder="Brief description of the holiday"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        name="isRecurring"
                        checked={formData.isRecurring}
                        onChange={handleInputChange}
                        style={{ width: '16px', height: '16px' }}
                        id="recurring"
                      />
                      <label htmlFor="recurring" style={{ fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                        This is a recurring holiday (occurs every year)
                      </label>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="checkbox"
                        name="applyToAll"
                        checked={formData.applyToAll}
                        onChange={handleInputChange}
                        style={{ width: '16px', height: '16px' }}
                        id="applyToAll"
                      />
                      <label htmlFor="applyToAll" style={{ fontSize: '14px', color: '#374151', cursor: 'pointer' }}>
                        Apply this holiday to all employees
                      </label>
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
                      {modalMode === 'add' ? 'Add Holiday' : 'Update Holiday'}
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