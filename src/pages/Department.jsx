import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Users, Home, DollarSign, Clock, MapPin, Calendar, StickyNote, TrendingUp, Search, Filter, Edit2, Trash2, Eye, X, Plus, Download, UserPlus, UserCheck, BarChart, Settings, Phone, Mail, MapPin as MapPinIcon } from 'lucide-react';

export default function Departments() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    manager: '',
    location: '',
    budget: '',
    employeeCount: '0',
    description: '',
    contactEmail: '',
    contactPhone: ''
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

  // Sample department data
  const [departments, setDepartments] = useState([
    { id: 1, name: 'Human Resources', manager: 'Sarah Johnson', location: 'Floor 3, Building A', budget: '$850,000', employeeCount: 12, contactEmail: 'hr@company.com', contactPhone: '+1 (555) 123-4567', description: 'Manages employee relations, recruitment, and benefits' },
    { id: 2, name: 'Information Technology', manager: 'Michael Chen', location: 'Floor 5, Building B', budget: '$2,100,000', employeeCount: 25, contactEmail: 'it@company.com', contactPhone: '+1 (555) 234-5678', description: 'Manages technology infrastructure and development' },
    { id: 3, name: 'Finance', manager: 'Robert Williams', location: 'Floor 2, Building A', budget: '$1,300,000', employeeCount: 18, contactEmail: 'finance@company.com', contactPhone: '+1 (555) 345-6789', description: 'Handles financial operations and budgeting' },
    { id: 4, name: 'Marketing', manager: 'Emily Davis', location: 'Floor 4, Building C', budget: '$950,000', employeeCount: 15, contactEmail: 'marketing@company.com', contactPhone: '+1 (555) 456-7890', description: 'Responsible for marketing and branding strategies' },
    { id: 5, name: 'Operations', manager: 'David Wilson', location: 'Floor 1, Building A', budget: '$2,800,000', employeeCount: 32, contactEmail: 'operations@company.com', contactPhone: '+1 (555) 567-8901', description: 'Manages day-to-day business operations' },
    { id: 6, name: 'Sales', manager: 'Jennifer Lee', location: 'Floor 6, Building B', budget: '$3,200,000', employeeCount: 28, contactEmail: 'sales@company.com', contactPhone: '+1 (555) 678-9012', description: 'Handles sales and customer acquisition' },
    { id: 7, name: 'Research & Development', manager: 'Alex Turner', location: 'Floor 7, Building C', budget: '$1,800,000', employeeCount: 22, contactEmail: 'rnd@company.com', contactPhone: '+1 (555) 789-0123', description: 'Focuses on product innovation and research' },
    { id: 8, name: 'Customer Support', manager: 'Maria Garcia', location: 'Floor 2, Building C', budget: '$650,000', employeeCount: 20, contactEmail: 'support@company.com', contactPhone: '+1 (555) 890-1234', description: 'Provides customer service and technical support' },
  ]);

  const departmentTypes = ['Operations', 'Support', 'Technical', 'Administrative', 'Creative'];

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         dept.manager.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || dept.description.includes(filterType);
    return matchesSearch && matchesType;
  });

  // Calculate statistics
  const totalEmployees = departments.reduce((sum, dept) => sum + dept.employeeCount, 0);
  const totalBudget = departments.reduce((sum, dept) => sum + parseFloat(dept.budget.replace(/[$,]/g, '')), 0);
  const largestDepartment = departments.reduce((largest, dept) => 
    dept.employeeCount > largest.employeeCount ? dept : largest, departments[0]);
  const avgEmployeesPerDept = Math.round(totalEmployees / departments.length);

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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      name: '',
      manager: '',
      location: '',
      budget: '',
      employeeCount: '0',
      description: '',
      contactEmail: '',
      contactPhone: ''
    });
    setShowModal(true);
  };

  const openEditModal = (dept) => {
    setModalMode('edit');
    setSelectedDepartment(dept);
    setFormData({
      name: dept.name,
      manager: dept.manager,
      location: dept.location,
      budget: dept.budget,
      employeeCount: dept.employeeCount.toString(),
      description: dept.description,
      contactEmail: dept.contactEmail,
      contactPhone: dept.contactPhone
    });
    setShowModal(true);
  };

  const openViewModal = (dept) => {
    setModalMode('view');
    setSelectedDepartment(dept);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newDept = {
        id: departments.length + 1,
        ...formData,
        employeeCount: parseInt(formData.employeeCount) || 0
      };
      setDepartments([...departments, newDept]);
    } else if (modalMode === 'edit') {
      setDepartments(departments.map(dept => 
        dept.id === selectedDepartment.id ? { 
          ...dept, 
          ...formData,
          employeeCount: parseInt(formData.employeeCount) || 0
        } : dept
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      setDepartments(departments.filter(dept => dept.id !== id));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getDepartmentColor = (name) => {
    const colors = {
      'Human Resources': '#3b82f6',
      'Information Technology': '#10b981',
      'Finance': '#8b5cf6',
      'Marketing': '#ef4444',
      'Operations': '#f59e0b',
      'Sales': '#ec4899',
      'Research & Development': '#6366f1',
      'Customer Support': '#06b6d4'
    };
    return colors[name] || '#6b7280';
  };

  const getAvatarInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="flex bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl border-r border-gray-200 flex-shrink-0">
        <div className="border-b border-gray-100" style={{ height: '96px' }}>
          <div className="flex items-center gap-3" style={{ height: '100%', paddingLeft: '24px', paddingRight: '24px' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
              A
            </div>
            <div>
              <div className="font-bold text-gray-800">Welcome, Avin</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
        </div>
        
        <div style={{ height: 'calc(100vh - 96px)', overflowY: 'auto', paddingLeft: '16px', paddingRight: '16px', paddingTop: '24px' }}>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">HR Dashboard</h2>
            <div className="text-sm text-gray-500">Manage Departments & Teams</div>
          </div>
          
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`
                    w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer text-decoration-none
                    ${active ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200' : 'text-gray-600'}
                  `}
                  style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b border-gray-200 flex items-center justify-between sticky top-0 z-10" style={{ height: '72px', paddingLeft: '32px', paddingRight: '32px' }}>
          <div className="text-sm text-gray-600">
            Email: <span className="font-semibold text-gray-800">aadhiavi57@gmail.com</span>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-red-200 transition-all duration-200 hover:shadow-lg hover:shadow-red-300"
            style={{ height: '40px', width: '120px' }}>
            Logout
          </button>
        </div>

        {/* Departments Content */}
        <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '32px' }}>
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Department Management</h1>
                <p className="text-gray-600">Manage and organize company departments and teams</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Exporting department data...')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-purple-200 transition-all duration-200 hover:shadow-lg hover:shadow-purple-300 flex items-center gap-2"
                  style={{ height: '44px', width: '180px', paddingLeft: '20px', paddingRight: '20px' }}>
                  <Download className="w-5 h-5" />
                  Export Report
                </button>
                <button 
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300 flex items-center gap-2"
                  style={{ height: '44px', width: '180px', paddingLeft: '20px', paddingRight: '20px' }}>
                  <Plus className="w-5 h-5" />
                  Add Department
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Total Departments</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Building2 className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800" style={{ padding: '0 24px 24px 24px' }}>{departments.length}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Active departments in organization</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Total Employees</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Users className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600" style={{ padding: '0 24px 24px 24px' }}>{totalEmployees}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Across all departments</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Total Budget</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <DollarSign className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-600" style={{ padding: '0 24px 24px 24px' }}>{formatCurrency(totalBudget)}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Annual budget allocation</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Avg. per Dept</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <BarChart className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1" style={{ padding: '0 24px 0 24px' }}>
                  {avgEmployeesPerDept} employees
                </div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>
                  Largest: {largestDepartment.name} ({largestDepartment.employeeCount})
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex gap-4 items-center" style={{ padding: '24px' }}>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Department</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder="Search by name, manager, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 text-sm pl-10"
                    style={{ height: '40px', paddingLeft: '40px', paddingRight: '16px' }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Type</label>
                <select 
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 text-sm"
                  style={{ height: '40px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <option value="all">All Types</option>
                  {departmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
                <select 
                  className="w-full rounded-xl border border-gray-300 text-sm"
                  style={{ height: '40px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <option value="name">Name (A-Z)</option>
                  <option value="employees">Employees (High-Low)</option>
                  <option value="budget">Budget (High-Low)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Departments Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b-2 border-gray-200">
                    <th className="text-left text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Department</th>
                    <th className="text-center text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Manager</th>
                    <th className="text-center text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Employees</th>
                    <th className="text-center text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Budget</th>
                    <th className="text-center text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Location</th>
                    <th className="text-center text-sm font-semibold text-gray-700" style={{ height: '56px', paddingLeft: '24px', paddingRight: '24px' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDepartments.map((dept) => {
                    const deptColor = getDepartmentColor(dept.name);
                    return (
                    <tr key={dept.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                      <td style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${deptColor}20`, color: deptColor }}>
                            <Building2 className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-800">{dept.name}</div>
                            <div className="text-xs text-gray-500">{dept.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="text-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <div className="flex flex-col items-center justify-center">
                          <div className="font-medium text-gray-700">{dept.manager}</div>
                          <div className="text-xs text-gray-500">{dept.contactEmail}</div>
                        </div>
                      </td>
                      <td className="text-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <div className="flex flex-col items-center justify-center">
                          <span className="font-bold text-gray-800 text-lg">{dept.employeeCount}</span>
                          <span className="text-xs text-gray-500">employees</span>
                        </div>
                      </td>
                      <td className="text-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <span className="font-bold text-gray-800">{dept.budget}</span>
                      </td>
                      <td className="text-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <div className="flex flex-col items-center justify-center">
                          <MapPinIcon className="w-4 h-4 text-gray-400 mb-1" />
                          <span className="text-sm text-gray-600">{dept.location}</span>
                        </div>
                      </td>
                      <td className="text-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
                        <div className="flex gap-2 justify-center">
                          <button 
                            onClick={() => openViewModal(dept)}
                            className="w-8 h-8 rounded-lg border-none cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200 flex items-center justify-center">
                            <Eye className="w-4 h-4 text-blue-600" />
                          </button>
                          <button 
                            onClick={() => openEditModal(dept)}
                            className="w-8 h-8 rounded-lg border-none cursor-pointer bg-green-50 hover:bg-green-100 transition-colors duration-200 flex items-center justify-center">
                            <Edit2 className="w-4 h-4 text-green-600" />
                          </button>
                          <button 
                            onClick={() => handleDelete(dept.id)}
                            className="w-8 h-8 rounded-lg border-none cursor-pointer bg-red-50 hover:bg-red-100 transition-colors duration-200 flex items-center justify-center">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>

            {filteredDepartments.length === 0 && (
              <div className="text-center text-gray-500" style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <p className="text-base">No departments found matching your search criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            {/* Modal Header */}
            <div className="border-b border-gray-200 flex justify-between items-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Add New Department' : modalMode === 'edit' ? 'Edit Department' : 'Department Details'}
              </h2>
              <button 
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-lg border-none cursor-pointer bg-gray-100 hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center">
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              {modalMode === 'view' ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${getDepartmentColor(selectedDepartment.name)}20`, color: getDepartmentColor(selectedDepartment.name) }}>
                      <Building2 className="w-8 h-8" />
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-800">{selectedDepartment.name}</div>
                      <div className="text-gray-600">{selectedDepartment.description}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Manager</div>
                      <div className="font-medium text-gray-800">{selectedDepartment.manager}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Location</div>
                      <div className="font-medium text-gray-800">{selectedDepartment.location}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Budget</div>
                      <div className="font-bold text-gray-800 text-lg">{selectedDepartment.budget}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Employees</div>
                      <div className="font-bold text-gray-800 text-lg">{selectedDepartment.employeeCount} employees</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Contact Email</div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedDepartment.contactEmail}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Contact Phone</div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{selectedDepartment.contactPhone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="e.g., Information Technology"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                      <input
                        type="text"
                        name="manager"
                        value={formData.manager}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="e.g., John Smith"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="e.g., Floor 5, Building B"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Annual Budget</label>
                      <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="e.g., $1,200,000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Employee Count</label>
                      <input
                        type="number"
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Contact Email</label>
                      <input
                        type="email"
                        name="contactEmail"
                        value={formData.contactEmail}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="department@company.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 text-sm"
                      style={{ height: '100px', padding: '16px' }}
                      required
                      placeholder="Brief description of the department's function..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 text-sm"
                      style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex gap-3 justify-end pt-6 border-t border-gray-200">
                    <button 
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="rounded-xl border border-gray-300 bg-white text-gray-700 font-medium cursor-pointer hover:bg-gray-50 transition-colors duration-200"
                      style={{ height: '44px', width: '100px' }}>
                      Cancel
                    </button>
                    <button 
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300"
                      style={{ height: '44px', width: '160px' }}>
                      {modalMode === 'add' ? 'Create Department' : 'Update Department'}
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