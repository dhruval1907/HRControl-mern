import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, Plus, Calculator, Download, TrendingUp, Building2, Home } from 'lucide-react';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const upcomingBirthdays = [
    { name: 'John Doe', date: 'Dec 10, 2025', daysLeft: 3 }
  ];

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'employees', label: 'Employees', icon: Users },
    { id: 'salaries', label: 'Salaries', icon: DollarSign },
    { id: 'attendance', label: 'Attendance', icon: Clock },
    { id: 'payroll', label: 'Payroll', icon: TrendingUp },
    { id: 'holidays', label: 'Holidays', icon: Calendar },
    { id: 'sites', label: 'Sites', icon: MapPin },
    { id: 'departments', label: 'Departments', icon: Building2 },
    { id: 'notes', label: 'Notes', icon: StickyNote }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="font-semibold text-gray-800">Welcome, Avin</span>
          </div>
        </div>
        
        <div className="px-4">
          <h2 className="text-xl font-bold text-gray-800 mb-1">HR Dashboard</h2>
          <p className="text-sm text-gray-500 mb-6">Manage Employees & Data</p>
          
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeTab === item.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Email: <span className="font-medium">aadhiavi57@gmail.com</span>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
            Logout
          </button>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          {/* Birthdays Section */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Calendar className="text-pink-500" size={28} />
              <h2 className="text-2xl font-bold text-gray-800">Birthdays</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Upcoming Birthdays */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-pink-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Upcoming Birthdays</h3>
                </div>
                {upcomingBirthdays.map((birthday, idx) => (
                  <div key={idx} className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-gray-800">{birthday.name}</p>
                      <p className="text-sm text-gray-600">{birthday.date}</p>
                    </div>
                    <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      +{birthday.daysLeft} days
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent Birthdays */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="text-orange-500" size={24} />
                  <h3 className="text-lg font-semibold text-gray-800">Recent Birthdays</h3>
                </div>
                <p className="text-gray-500 italic text-center py-8">No recent birthdays</p>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Employees Management */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Users className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Employees Management</h3>
                </div>
                <button className="w-10 h-10 bg-purple-600 hover:bg-purple-700 rounded-full flex items-center justify-center transition-colors">
                  <Plus className="text-white" size={20} />
                </button>
              </div>
              <p className="text-sm text-purple-600 mb-4">Creating new employee record</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-green-800 font-semibold mb-1">Total Sites</p>
                  <p className="text-xs text-green-600">Project locations</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4">
                  <p className="text-sm text-red-800 font-semibold mb-1">Departments</p>
                  <p className="text-xs text-red-600">Active teams</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-blue-800 font-semibold mb-1">All Employees</p>
                  <p className="text-xs text-blue-600">Total active employees</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-yellow-800 font-semibold mb-1">Site Employees</p>
                  <p className="text-xs text-yellow-600">Staff working onsite</p>
                </div>
              </div>
            </div>

            {/* Salary Management */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="text-indigo-600" size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Salary Management</h3>
                </div>
                <button className="w-10 h-10 bg-green-600 hover:bg-green-700 rounded-full flex items-center justify-center transition-colors">
                  <Plus className="text-white" size={20} />
                </button>
              </div>
              <p className="text-sm text-green-600 mb-4">Viewing history, preview payslip model</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-800 font-semibold mb-1">Payroll Overview</p>
                    <p className="text-xs text-purple-600">Smart editable salary computation</p>
                  </div>
                  <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                    <DollarSign className="text-white" size={16} />
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-green-800 font-semibold mb-1">Bulk download Payslips</p>
                    <p className="text-xs text-green-600">Monthly salary slips will be there in History</p>
                  </div>
                  <Download className="text-green-600" size={20} />
                </div>
                <div className="bg-teal-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-teal-800 font-semibold mb-1">Salary Structure</p>
                    <p className="text-xs text-teal-600">Define pay components</p>
                  </div>
                  <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                    <Briefcase className="text-white" size={16} />
                  </div>
                </div>
                <div className="bg-pink-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-pink-800 font-semibold mb-1">Advances & Deductions</p>
                    <p className="text-xs text-pink-600">Will be added soon</p>
                  </div>
                  <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                    <TrendingUp className="text-white" size={16} />
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Management */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Clock className="text-yellow-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Attendance Management</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-yellow-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-yellow-800 font-semibold mb-1">View Attendance</p>
                    <p className="text-xs text-yellow-600">All records overview</p>
                  </div>
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <Clock className="text-white" size={16} />
                  </div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-800 font-semibold mb-1">Holidays Management</p>
                    <p className="text-xs text-blue-600">Adding updating holidays</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                    H
                  </div>
                </div>
              </div>
            </div>

            {/* Other Features */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="text-emerald-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Other features</h3>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4 flex justify-between items-center">
                <div>
                  <p className="text-sm text-yellow-800 font-semibold mb-1">Salary Calculator</p>
                  <p className="text-xs text-yellow-600">Before assigning rough calculation</p>
                </div>
                <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                  <Calculator className="text-white" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}