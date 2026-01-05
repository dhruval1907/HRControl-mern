import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, TrendingUp, Building2, Home, Search, Filter, Edit2, Trash2, Eye, X, Plus, Download, Phone, Mail, Users as UsersIcon, Building, Globe, Navigation } from 'lucide-react';

export default function Sites() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterLocation, setFilterLocation] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedSite, setSelectedSite] = useState(null);
  const [formData, setFormData] = useState({
    siteName: '',
    siteCode: '',
    address: '',
    city: '',
    country: '',
    postalCode: '',
    contactPerson: '',
    contactPhone: '',
    contactEmail: '',
    status: 'active',
    siteManager: '',
    totalEmployees: '',
    siteArea: '',
    establishedDate: ''
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
    { id: 'departments', label: 'Departments', icon: Building2, path: '/departments' },
    { id: 'notes', label: 'Notes', icon: StickyNote, path: '/notes' }
  ];

  // Sample sites data
  const [sites, setSites] = useState([
    { id: 1, siteName: 'Corporate Headquarters', siteCode: 'HQ001', address: '123 Tech Park', city: 'Bangalore', country: 'India', postalCode: '560001', contactPerson: 'Rajesh Kumar', contactPhone: '+91 9876543210', contactEmail: 'rajesh@company.com', status: 'active', siteManager: 'Arjun Singh', totalEmployees: 150, siteArea: '5000 sq ft', establishedDate: '2018-05-15' },
    { id: 2, siteName: 'Development Center', siteCode: 'DC002', address: '456 Innovation Road', city: 'Hyderabad', country: 'India', postalCode: '500032', contactPerson: 'Priya Sharma', contactPhone: '+91 9876543211', contactEmail: 'priya@company.com', status: 'active', siteManager: 'Vikram Patel', totalEmployees: 85, siteArea: '3500 sq ft', establishedDate: '2019-08-20' },
    { id: 3, siteName: 'Client Project Site', siteCode: 'CP003', address: '789 Industrial Area', city: 'Mumbai', country: 'India', postalCode: '400001', contactPerson: 'Amit Joshi', contactPhone: '+91 9876543212', contactEmail: 'amit@company.com', status: 'active', siteManager: 'Neha Gupta', totalEmployees: 45, siteArea: '2000 sq ft', establishedDate: '2020-03-10' },
    { id: 4, siteName: 'Regional Office', siteCode: 'RO004', address: '321 Business Center', city: 'Delhi', country: 'India', postalCode: '110001', contactPerson: 'Sanjay Mehta', contactPhone: '+91 9876543213', contactEmail: 'sanjay@company.com', status: 'active', siteManager: 'Rohit Verma', totalEmployees: 65, siteArea: '2800 sq ft', establishedDate: '2019-11-25' },
    { id: 5, siteName: 'Training Center', siteCode: 'TC005', address: '654 Learning Hub', city: 'Chennai', country: 'India', postalCode: '600001', contactPerson: 'Anjali Reddy', contactPhone: '+91 9876543214', contactEmail: 'anjali@company.com', status: 'inactive', siteManager: 'Karthik Nair', totalEmployees: 0, siteArea: '1800 sq ft', establishedDate: '2021-02-15' },
    { id: 6, siteName: 'Warehouse Facility', siteCode: 'WH006', address: '987 Logistics Park', city: 'Pune', country: 'India', postalCode: '411001', contactPerson: 'Manoj Desai', contactPhone: '+91 9876543215', contactEmail: 'manoj@company.com', status: 'active', siteManager: 'Suresh Iyer', totalEmployees: 30, siteArea: '8000 sq ft', establishedDate: '2020-07-30' },
    { id: 7, siteName: 'R&D Lab', siteCode: 'RD007', address: '147 Science Street', city: 'Bangalore', country: 'India', postalCode: '560066', contactPerson: 'Dr. Ravi Menon', contactPhone: '+91 9876543216', contactEmail: 'ravi@company.com', status: 'active', siteManager: 'Dr. Lakshmi Rao', totalEmployees: 25, siteArea: '3200 sq ft', establishedDate: '2021-09-12' },
    { id: 8, siteName: 'Remote Office', siteCode: 'RO008', address: '258 Digital Avenue', city: 'Kolkata', country: 'India', postalCode: '700001', contactPerson: 'Sunita Das', contactPhone: '+91 9876543217', contactEmail: 'sunita@company.com', status: 'planned', siteManager: 'Bimal Choudhury', totalEmployees: 0, siteArea: '1500 sq ft', establishedDate: '2024-01-01' },
  ]);

  const statuses = ['active', 'inactive', 'planned', 'under_maintenance'];
  const cities = ['Bangalore', 'Hyderabad', 'Mumbai', 'Delhi', 'Chennai', 'Pune', 'Kolkata'];
  const countries = ['India', 'USA', 'UK', 'Singapore', 'UAE', 'Australia'];

  const filteredSites = sites.filter(site => {
    const matchesSearch = site.siteName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         site.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         site.siteCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || site.status === filterStatus;
    const matchesLocation = filterLocation === 'all' || site.city === filterLocation;
    return matchesSearch && matchesStatus && matchesLocation;
  });

  // Calculate statistics
  const activeSites = sites.filter(s => s.status === 'active').length;
  const totalEmployees = sites.reduce((sum, site) => sum + parseInt(site.totalEmployees), 0);
  const totalArea = sites.reduce((sum, site) => {
    const area = parseInt(site.siteArea.replace(' sq ft', ''));
    return sum + area;
  }, 0);
  const sitesInBangalore = sites.filter(s => s.city === 'Bangalore').length;

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
      siteName: '',
      siteCode: '',
      address: '',
      city: '',
      country: '',
      postalCode: '',
      contactPerson: '',
      contactPhone: '',
      contactEmail: '',
      status: 'active',
      siteManager: '',
      totalEmployees: '',
      siteArea: '',
      establishedDate: ''
    });
    setShowModal(true);
  };

  const openEditModal = (site) => {
    setModalMode('edit');
    setSelectedSite(site);
    setFormData({
      siteName: site.siteName,
      siteCode: site.siteCode,
      address: site.address,
      city: site.city,
      country: site.country,
      postalCode: site.postalCode,
      contactPerson: site.contactPerson,
      contactPhone: site.contactPhone,
      contactEmail: site.contactEmail,
      status: site.status,
      siteManager: site.siteManager,
      totalEmployees: site.totalEmployees.toString(),
      siteArea: site.siteArea.replace(' sq ft', ''),
      establishedDate: site.establishedDate
    });
    setShowModal(true);
  };

  const openViewModal = (site) => {
    setModalMode('view');
    setSelectedSite(site);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newSite = {
        id: sites.length + 1,
        ...formData,
        totalEmployees: parseInt(formData.totalEmployees),
        siteArea: `${formData.siteArea} sq ft`
      };
      setSites([...sites, newSite]);
    } else if (modalMode === 'edit') {
      setSites(sites.map(s => 
        s.id === selectedSite.id ? { 
          ...s, 
          ...formData,
          totalEmployees: parseInt(formData.totalEmployees),
          siteArea: `${formData.siteArea} sq ft`
        } : s
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this site?')) {
      setSites(sites.filter(site => site.id !== id));
    }
  };

  const handleExportSites = () => {
    alert('Exporting sites data to CSV');
    // In a real app, this would export to CSV/Excel
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <div style={{ width: '8px', height: '8px', backgroundColor: '#10b981', borderRadius: '50%' }}></div>;
      case 'inactive': return <div style={{ width: '8px', height: '8px', backgroundColor: '#ef4444', borderRadius: '50%' }}></div>;
      case 'planned': return <div style={{ width: '8px', height: '8px', backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>;
      case 'under_maintenance': return <div style={{ width: '8px', height: '8px', backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return '#10b981';
      case 'inactive': return '#ef4444';
      case 'planned': return '#f59e0b';
      case 'under_maintenance': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
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

        {/* Sites Content */}
        <div style={{ padding: '32px' }}>
          {/* Page Header */}
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <div>
                <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937', marginBottom: '8px' }}>Sites Management</h1>
                <p style={{ fontSize: '16px', color: '#6b7280' }}>Manage company sites, locations, and facilities</p>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={handleExportSites}
                  style={{ background: 'linear-gradient(to right, #8b5cf6, #7c3aed)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(139, 92, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(139, 92, 246, 0.3)'}>
                  <Download size={20} />
                  Export Sites
                </button>
                <button 
                  onClick={openAddModal}
                  style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '12px 24px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(59, 130, 246, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(59, 130, 246, 0.3)'}>
                  <Plus size={20} />
                  Add New Site
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Sites</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1f2937' }}>{sites.length}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Company locations</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Active Sites</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #10b981, #059669)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MapPin style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>{activeSites}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Currently operational</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Employees</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #8b5cf6, #7c3aed)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <UsersIcon style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#8b5cf6' }}>{totalEmployees}</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Across all sites</div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <div style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>Total Area</div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #f59e0b, #d97706)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Navigation style={{ color: 'white' }} size={20} />
                  </div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#f59e0b' }}>{totalArea.toLocaleString()} sq ft</div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Combined space</div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', marginBottom: '24px' }}>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
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
                    <option key={status} value={status}>
                      {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div style={{ flex: 2 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Search Site</label>
                <div style={{ position: 'relative' }}>
                  <Search style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} size={20} />
                  <input 
                    type="text"
                    placeholder="Search by site name, city, or code..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ width: '100%', padding: '10px 16px 10px 44px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px' }}
                  />
                </div>
              </div>

              {/* Location Filter */}
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '8px' }}>Filter by City</label>
                <select 
                  value={filterLocation}
                  onChange={(e) => setFilterLocation(e.target.value)}
                  style={{ width: '100%', padding: '10px 16px', borderRadius: '10px', border: '1px solid #d1d5db', fontSize: '14px', color: '#1f2937', cursor: 'pointer' }}
                >
                  <option value="all">All Cities</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Sites Table */}
          <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #f3f4f6', overflow: 'hidden' }}>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Site Name</th>
                    <th style={{ padding: '16px 24px', textAlign: 'left', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Location</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Contact Person</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Employees</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Site Area</th>
                    <th style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '600', color: '#374151' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSites.map((site) => (
                    <tr key={site.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ 
                            width: '40px', 
                            height: '40px', 
                            backgroundColor: '#dbeafe', 
                            borderRadius: '10px', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            color: '#2563eb'
                          }}>
                            <Building size={20} />
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{site.siteName}</div>
                            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>Code: {site.siteCode}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{site.city}, {site.country}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{site.address}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          {getStatusIcon(site.status)}
                          <span style={{ 
                            display: 'inline-block',
                            fontSize: '12px', 
                            fontWeight: '600',
                            color: getStatusColor(site.status)
                          }}>
                            {site.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>{site.contactPerson}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>{site.contactPhone}</div>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <UsersIcon size={16} style={{ color: '#6b7280' }} />
                          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1f2937' }}>{site.totalEmployees}</span>
                        </div>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center', fontSize: '14px', fontWeight: '500', color: '#1f2937' }}>
                        {site.siteArea}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                          <button 
                            onClick={() => openViewModal(site)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#dbeafe', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#bfdbfe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#dbeafe'}>
                            <Eye size={16} style={{ color: '#2563eb' }} />
                          </button>
                          <button 
                            onClick={() => openEditModal(site)}
                            style={{ padding: '8px', borderRadius: '8px', border: 'none', cursor: 'pointer', backgroundColor: '#d1fae5', transition: 'background-color 0.2s' }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a7f3d0'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d1fae5'}>
                            <Edit2 size={16} style={{ color: '#059669' }} />
                          </button>
                          <button 
                            onClick={() => handleDelete(site.id)}
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

            {filteredSites.length === 0 && (
              <div style={{ padding: '48px', textAlign: 'center' }}>
                <p style={{ fontSize: '16px', color: '#9ca3af' }}>No sites found matching your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '16px', width: '700px', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' }}>
            {/* Modal Header */}
            <div style={{ padding: '24px', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1f2937' }}>
                {modalMode === 'add' ? 'Add New Site' : modalMode === 'edit' ? 'Edit Site' : 'Site Details'}
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
                      backgroundColor: '#dbeafe', 
                      borderRadius: '12px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      color: '#2563eb'
                    }}>
                      <Building size={24} />
                    </div>
                    <div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1f2937' }}>{selectedSite.siteName}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>Code: {selectedSite.siteCode}</div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Location</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.city}, {selectedSite.country}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Status</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {getStatusIcon(selectedSite.status)}
                        <span style={{ 
                          fontSize: '14px', 
                          fontWeight: '600',
                          color: getStatusColor(selectedSite.status)
                        }}>
                          {selectedSite.status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Address</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.address}</div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>Postal Code: {selectedSite.postalCode}</div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Contact Person</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.contactPerson}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '2px' }}>{selectedSite.contactPhone}</div>
                      <div style={{ fontSize: '14px', color: '#6b7280' }}>{selectedSite.contactEmail}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Site Manager</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.siteManager}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Total Employees</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.totalEmployees}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Site Area</div>
                      <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{selectedSite.siteArea}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Established Date</div>
                    <div style={{ fontSize: '16px', fontWeight: '500', color: '#1f2937' }}>{formatDate(selectedSite.establishedDate)}</div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Site Name</label>
                      <input
                        type="text"
                        name="siteName"
                        value={formData.siteName}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                        placeholder="e.g., Corporate Headquarters"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Site Code</label>
                      <input
                        type="text"
                        name="siteCode"
                        value={formData.siteCode}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                        placeholder="e.g., HQ001"
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                      required
                      placeholder="Full address"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>City</label>
                      <select
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        <option value="">Select City</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        <option value="">Select Country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Postal Code</label>
                      <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Contact Person</label>
                      <input
                        type="text"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Contact Phone</label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Contact Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Site Manager</label>
                      <input
                        type="text"
                        name="siteManager"
                        value={formData.siteManager}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Total Employees</label>
                      <input
                        type="number"
                        name="totalEmployees"
                        value={formData.totalEmployees}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Site Area (sq ft)</label>
                      <input
                        type="number"
                        name="siteArea"
                        value={formData.siteArea}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Status</label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                        style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '14px' }}
                        required
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '6px' }}>Established Date</label>
                      <input
                        type="date"
                        name="establishedDate"
                        value={formData.establishedDate}
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
                      {modalMode === 'add' ? 'Add Site' : 'Update Site'}
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