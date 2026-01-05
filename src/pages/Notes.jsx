import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote, Home, Users, DollarSign, Clock, MapPin, Calendar, Building2, TrendingUp, Search, Filter, Edit2, Trash2, Eye, X, Plus, Download, Pin, Tag, User, Clock as ClockIcon, CalendarDays, Archive, Share, Copy, Check, Star, FileText } from 'lucide-react';

export default function Notes() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedNote, setSelectedNote] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'general',
    priority: 'medium',
    tags: [],
    assignedTo: '',
    dueDate: '',
    isPinned: false,
    isArchived: false
  });
  const [newTag, setNewTag] = useState('');

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

  // Sample notes data
  const [notes, setNotes] = useState([
    { 
      id: 1, 
      title: 'Monthly HR Meeting Notes', 
      content: 'Discussed upcoming recruitment drive, employee engagement activities, and performance review cycle for Q2. Need to follow up with department heads.',
      category: 'meeting',
      priority: 'high',
      tags: ['meeting', 'recruitment', 'performance'],
      assignedTo: 'Sarah Johnson',
      createdBy: 'Avin',
      createdDate: '2024-03-10',
      dueDate: '2024-03-25',
      isPinned: true,
      isArchived: false,
      color: '#fef3c7'
    },
    { 
      id: 2, 
      title: 'Training Program Schedule', 
      content: 'Plan for employee training programs for April-June 2024. Include soft skills, technical training, and leadership development.',
      category: 'planning',
      priority: 'medium',
      tags: ['training', 'development', 'schedule'],
      assignedTo: 'Michael Chen',
      createdBy: 'Avin',
      createdDate: '2024-03-08',
      dueDate: '2024-03-20',
      isPinned: true,
      isArchived: false,
      color: '#dbeafe'
    },
    { 
      id: 3, 
      title: 'Budget Allocation Notes', 
      content: 'HR department budget allocation for fiscal year 2024-2025. Includes salaries, training, events, and equipment.',
      category: 'finance',
      priority: 'high',
      tags: ['budget', 'finance', 'planning'],
      assignedTo: 'Robert Williams',
      createdBy: 'Avin',
      createdDate: '2024-03-05',
      dueDate: '2024-04-15',
      isPinned: false,
      isArchived: false,
      color: '#d1fae5'
    },
    { 
      id: 4, 
      title: 'Team Building Activities', 
      content: 'List of potential team building activities for next quarter. Include cost estimates and preferred dates.',
      category: 'event',
      priority: 'low',
      tags: ['team-building', 'event', 'activities'],
      assignedTo: 'Emily Davis',
      createdBy: 'Avin',
      createdDate: '2024-03-03',
      dueDate: '2024-03-30',
      isPinned: false,
      isArchived: false,
      color: '#f3e8ff'
    },
    { 
      id: 5, 
      title: 'Recruitment Process Update', 
      content: 'Updated steps for recruitment process including screening, interviews, and onboarding procedures.',
      category: 'process',
      priority: 'medium',
      tags: ['recruitment', 'hiring', 'onboarding'],
      assignedTo: 'All HR Team',
      createdBy: 'Avin',
      createdDate: '2024-02-28',
      dueDate: '2024-03-15',
      isPinned: false,
      isArchived: true,
      color: '#fee2e2'
    },
    { 
      id: 6, 
      title: 'Employee Feedback Summary', 
      content: 'Summary of anonymous employee feedback from last quarter. Key areas: work-life balance, compensation, career growth.',
      category: 'feedback',
      priority: 'medium',
      tags: ['feedback', 'survey', 'employee-engagement'],
      assignedTo: 'Avin',
      createdBy: 'Avin',
      createdDate: '2024-02-25',
      dueDate: '2024-03-10',
      isPinned: false,
      isArchived: false,
      color: '#fce7f3'
    },
    { 
      id: 7, 
      title: 'Policy Revision Notes', 
      content: 'Notes on required policy revisions for remote work, leave policies, and code of conduct updates.',
      category: 'policy',
      priority: 'high',
      tags: ['policy', 'remote-work', 'compliance'],
      assignedTo: 'Legal Team',
      createdBy: 'Avin',
      createdDate: '2024-02-20',
      dueDate: '2024-04-01',
      isPinned: false,
      isArchived: false,
      color: '#e0f2fe'
    },
    { 
      id: 8, 
      title: 'Performance Review Timeline', 
      content: 'Detailed timeline for annual performance reviews including self-assessment, manager review, and calibration meetings.',
      category: 'process',
      priority: 'medium',
      tags: ['performance', 'reviews', 'timeline'],
      assignedTo: 'Department Heads',
      createdBy: 'Avin',
      createdDate: '2024-02-15',
      dueDate: '2024-05-31',
      isPinned: false,
      isArchived: false,
      color: '#f0fdf4'
    },
  ]);

  const categories = ['meeting', 'planning', 'finance', 'event', 'process', 'feedback', 'policy', 'general'];
  const priorities = ['low', 'medium', 'high'];

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = filterCategory === 'all' || note.category === filterCategory;
    const matchesPriority = filterPriority === 'all' || note.priority === filterPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  // Calculate statistics
  const totalNotes = notes.length;
  const pinnedNotes = notes.filter(note => note.isPinned).length;
  const archivedNotes = notes.filter(note => note.isArchived).length;
  const highPriorityNotes = notes.filter(note => note.priority === 'high').length;
  const recentNotes = notes.filter(note => {
    const noteDate = new Date(note.createdDate);
    const today = new Date();
    const diffDays = Math.floor((today - noteDate) / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  }).length;

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

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      title: '',
      content: '',
      category: 'general',
      priority: 'medium',
      tags: [],
      assignedTo: '',
      dueDate: '',
      isPinned: false,
      isArchived: false
    });
    setNewTag('');
    setShowModal(true);
  };

  const openEditModal = (note) => {
    setModalMode('edit');
    setSelectedNote(note);
    setFormData({
      title: note.title,
      content: note.content,
      category: note.category,
      priority: note.priority,
      tags: [...note.tags],
      assignedTo: note.assignedTo,
      dueDate: note.dueDate,
      isPinned: note.isPinned,
      isArchived: note.isArchived
    });
    setShowModal(true);
  };

  const openViewModal = (note) => {
    setModalMode('view');
    setSelectedNote(note);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newNote = {
        id: notes.length + 1,
        ...formData,
        createdBy: 'Avin',
        createdDate: new Date().toISOString().split('T')[0],
        color: getCategoryColor(formData.category)
      };
      setNotes([...notes, newNote]);
    } else if (modalMode === 'edit') {
      setNotes(notes.map(note => 
        note.id === selectedNote.id ? { 
          ...note, 
          ...formData,
          color: getCategoryColor(formData.category)
        } : note
      ));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(notes.filter(note => note.id !== id));
    }
  };

  const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isPinned: !note.isPinned } : note
    ));
  };

  const toggleArchive = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isArchived: !note.isArchived } : note
    ));
  };

  const getCategoryColor = (category) => {
    const colors = {
      'meeting': '#fef3c7',
      'planning': '#dbeafe',
      'finance': '#d1fae5',
      'event': '#f3e8ff',
      'process': '#f0fdf4',
      'feedback': '#fce7f3',
      'policy': '#e0f2fe',
      'general': '#f3f4f6'
    };
    return colors[category] || '#f3f4f6';
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'meeting': return <Users className="w-4 h-4" />;
      case 'planning': return <CalendarDays className="w-4 h-4" />;
      case 'finance': return <DollarSign className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      case 'process': return <FileText className="w-4 h-4" />;
      case 'feedback': return <Star className="w-4 h-4" />;
      case 'policy': return <Building2 className="w-4 h-4" />;
      default: return <StickyNote className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const daysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
            <div className="text-sm text-gray-500">Manage Notes & Documentation</div>
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

        {/* Notes Content */}
        <div style={{ paddingLeft: '32px', paddingRight: '32px', paddingTop: '32px' }}>
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">HR Notes & Documentation</h1>
                <p className="text-gray-600">Create, manage and organize important HR notes and documents</p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => alert('Exporting notes...')}
                  className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-purple-200 transition-all duration-200 hover:shadow-lg hover:shadow-purple-300 flex items-center gap-2"
                  style={{ height: '44px', width: '160px', paddingLeft: '20px', paddingRight: '20px' }}>
                  <Download className="w-5 h-5" />
                  Export Notes
                </button>
                <button 
                  onClick={openAddModal}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300 flex items-center gap-2"
                  style={{ height: '44px', width: '160px', paddingLeft: '20px', paddingRight: '20px' }}>
                  <Plus className="w-5 h-5" />
                  New Note
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-5">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Total Notes</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <StickyNote className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800" style={{ padding: '0 24px 24px 24px' }}>{totalNotes}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Active notes in system</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Pinned Notes</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
                    <Pin className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-600" style={{ padding: '0 24px 24px 24px' }}>{pinnedNotes}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Important notes</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">High Priority</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                    <Star className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-600" style={{ padding: '0 24px 24px 24px' }}>{highPriorityNotes}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>Urgent attention needed</div>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-start mb-3" style={{ padding: '24px 24px 0 24px' }}>
                  <div className="text-sm font-medium text-gray-500">Recent Notes</div>
                  <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <ClockIcon className="text-white w-5 h-5" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-600" style={{ padding: '0 24px 24px 24px' }}>{recentNotes}</div>
                <div className="text-xs text-gray-500" style={{ padding: '0 24px 24px 24px' }}>
                  Added in last 7 days
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
            <div className="flex gap-4 items-center" style={{ padding: '24px' }}>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search Notes</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input 
                    type="text"
                    placeholder="Search by title, content or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 text-sm pl-10"
                    style={{ height: '40px', paddingLeft: '40px', paddingRight: '16px' }}
                  />
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Category</label>
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 text-sm"
                  style={{ height: '40px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <option value="all">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filter by Priority</label>
                <select 
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 text-sm"
                  style={{ height: '40px', paddingLeft: '16px', paddingRight: '16px' }}
                >
                  <option value="all">All Priorities</option>
                  {priorities.map(priority => (
                    <option key={priority} value={priority}>
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Notes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => {
              const dueDays = daysUntilDue(note.dueDate);
              const isOverdue = dueDays < 0;
              const isDueSoon = dueDays >= 0 && dueDays <= 3;
              
              return (
                <div 
                  key={note.id} 
                  className="rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200"
                  style={{ backgroundColor: note.color }}
                >
                  <div style={{ padding: '20px' }}>
                    {/* Note Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                          {getCategoryIcon(note.category)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-lg">{note.title}</div>
                          <div className="text-xs text-gray-600 flex items-center gap-1">
                            <User className="w-3 h-3" />
                            Created by {note.createdBy}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => togglePin(note.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${note.isPinned ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-500'}`}>
                          <Pin className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => toggleArchive(note.id)}
                          className={`w-7 h-7 rounded-lg flex items-center justify-center ${note.isArchived ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'}`}>
                          <Archive className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Note Content */}
                    <div className="mb-4">
                      <p className="text-gray-700 text-sm line-clamp-3">{note.content}</p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70 text-gray-700">
                        {note.category}
                      </span>
                      <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70 text-gray-700 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getPriorityColor(note.priority) }}></div>
                        {note.priority}
                      </span>
                      {note.tags.slice(0, 2).map((tag, index) => (
                        <span key={index} className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70 text-gray-700">
                          {tag}
                        </span>
                      ))}
                      {note.tags.length > 2 && (
                        <span className="text-xs px-2 py-1 rounded-full bg-white bg-opacity-70 text-gray-700">
                          +{note.tags.length - 2}
                        </span>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600">
                        <div className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          <span>Assigned to: {note.assignedTo}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <CalendarDays className="w-3 h-3" />
                          <span>Created: {formatDate(note.createdDate)}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button 
                          onClick={() => openViewModal(note)}
                          className="w-7 h-7 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center hover:bg-blue-200">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => openEditModal(note)}
                          className="w-7 h-7 rounded-lg bg-green-100 text-green-600 flex items-center justify-center hover:bg-green-200">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(note.id)}
                          className="w-7 h-7 rounded-lg bg-red-100 text-red-600 flex items-center justify-center hover:bg-red-200">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Due Date Indicator */}
                    {note.dueDate && (
                      <div className={`mt-3 text-xs px-3 py-1 rounded-full ${isOverdue ? 'bg-red-100 text-red-700' : isDueSoon ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                        {isOverdue ? `Overdue by ${Math.abs(dueDays)} days` : 
                         isDueSoon ? `Due in ${dueDays} days` : 
                         `Due: ${formatDate(note.dueDate)}`}
                      </div>
                    )}

                    {/* Archived/Status Badge */}
                    {note.isArchived && (
                      <div className="mt-2 text-xs px-3 py-1 rounded-full bg-purple-100 text-purple-700 inline-block">
                        Archived
                      </div>
                    )}
                    {note.isPinned && !note.isArchived && (
                      <div className="mt-2 text-xs px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 inline-block ml-2">
                        Pinned
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredNotes.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center" style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div>
                <StickyNote className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No notes found matching your search criteria</p>
                <button 
                  onClick={openAddModal}
                  className="mt-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold border-none cursor-pointer shadow-md shadow-blue-200 transition-all duration-200 hover:shadow-lg hover:shadow-blue-300"
                  style={{ height: '44px', width: '160px' }}>
                  Create First Note
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-auto shadow-2xl">
            {/* Modal Header */}
            <div className="border-b border-gray-200 flex justify-between items-center" style={{ height: '72px', paddingLeft: '24px', paddingRight: '24px' }}>
              <h2 className="text-2xl font-bold text-gray-800">
                {modalMode === 'add' ? 'Create New Note' : modalMode === 'edit' ? 'Edit Note' : 'Note Details'}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: selectedNote.color }}>
                        {getCategoryIcon(selectedNote.category)}
                      </div>
                      <div>
                        <div className="text-xl font-bold text-gray-800">{selectedNote.title}</div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span className="px-2 py-1 rounded-full bg-gray-100">{selectedNote.category}</span>
                          <span className="px-2 py-1 rounded-full flex items-center gap-1" style={{ backgroundColor: `${getPriorityColor(selectedNote.priority)}20`, color: getPriorityColor(selectedNote.priority) }}>
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getPriorityColor(selectedNote.priority) }}></div>
                            {selectedNote.priority}
                          </span>
                          {selectedNote.isPinned && (
                            <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 flex items-center gap-1">
                              <Pin className="w-3 h-3" /> Pinned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Content</div>
                    <div className="bg-gray-50 rounded-xl p-4 text-gray-700 whitespace-pre-line">
                      {selectedNote.content}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Created By</div>
                      <div className="font-medium text-gray-800">{selectedNote.createdBy}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Created Date</div>
                      <div className="font-medium text-gray-800">{formatDate(selectedNote.createdDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Assigned To</div>
                      <div className="font-medium text-gray-800">{selectedNote.assignedTo}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Due Date</div>
                      <div className={`font-medium ${daysUntilDue(selectedNote.dueDate) < 0 ? 'text-red-600' : 'text-gray-800'}`}>
                        {formatDate(selectedNote.dueDate)}
                        {daysUntilDue(selectedNote.dueDate) < 0 && ` (Overdue by ${Math.abs(daysUntilDue(selectedNote.dueDate))} days)`}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 mb-2">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedNote.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    {selectedNote.isArchived && (
                      <div className="flex items-center gap-1">
                        <Archive className="w-4 h-4" />
                        <span>Archived</span>
                      </div>
                    )}
                    {selectedNote.isPinned && (
                      <div className="flex items-center gap-1">
                        <Pin className="w-4 h-4" />
                        <span>Pinned</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Note Title</label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                        placeholder="Enter note title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        required
                      >
                        {priorities.map(priority => (
                          <option key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={formData.dueDate}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      name="content"
                      value={formData.content}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 text-sm"
                      style={{ height: '150px', padding: '16px' }}
                      required
                      placeholder="Enter note content..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                    <div className="flex gap-2 mb-3">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 rounded-xl border border-gray-300 text-sm"
                        style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                        placeholder="Add a tag and press Enter"
                      />
                      <button 
                        type="button"
                        onClick={addTag}
                        className="bg-gray-100 text-gray-700 rounded-xl font-medium cursor-pointer hover:bg-gray-200 transition-colors duration-200"
                        style={{ height: '44px', width: '100px' }}>
                        Add Tag
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm flex items-center gap-2">
                          {tag}
                          <button 
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="text-blue-700 hover:text-blue-900">
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Assigned To</label>
                    <input
                      type="text"
                      name="assignedTo"
                      value={formData.assignedTo}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-gray-300 text-sm"
                      style={{ height: '44px', paddingLeft: '16px', paddingRight: '16px' }}
                      placeholder="Assign to team member"
                    />
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isPinned"
                        checked={formData.isPinned}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                        id="pinNote"
                      />
                      <label htmlFor="pinNote" className="text-sm text-gray-700 cursor-pointer">
                        Pin this note (show at the top)
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        name="isArchived"
                        checked={formData.isArchived}
                        onChange={handleInputChange}
                        className="w-5 h-5"
                        id="archiveNote"
                      />
                      <label htmlFor="archiveNote" className="text-sm text-gray-700 cursor-pointer">
                        Archive this note (move to archived section)
                      </label>
                    </div>
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
                      {modalMode === 'add' ? 'Create Note' : 'Update Note'}
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