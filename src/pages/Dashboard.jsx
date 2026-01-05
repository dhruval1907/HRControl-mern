import React, { useState } from 'react';
import { Calendar, Users, DollarSign, Clock, MapPin, Briefcase, StickyNote, Plus, Calculator, Download, TrendingUp, Building2, Home } from 'lucide-react';

export default function HRDashboard() {
  const [activeTab, setActiveTab] = useState('home');

  const upcomingBirthdays = [
    { name: 'John Doe', date: 'Dec 10, 2025', daysLeft: 3 }
  ];

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home,path : "/" },
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
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    transition: 'all 0.2s',
                    background: activeTab === item.id ? 'linear-gradient(to right, #2563eb, #1d4ed8)' : 'transparent',
                    color: activeTab === item.id ? 'white' : '#374151',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: activeTab === item.id ? '0 4px 6px -1px rgba(37, 99, 235, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon size={20} />
                  <span style={{ fontWeight: '500' }}>{item.label}</span>
                </button>
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
          <button style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)', color: 'white', padding: '10px 32px', borderRadius: '12px', fontWeight: '600', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(239, 68, 68, 0.3)', transition: 'all 0.2s' }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(239, 68, 68, 0.4)'}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(239, 68, 68, 0.3)'}>
            Logout
          </button>
        </div>

        {/* Dashboard Content */}
        <div style={{ padding: '20px' }}>
          {/* Birthdays Section */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #ec4899, #9333ea)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                <Calendar style={{ color: 'white' }} size={24} />
              </div>
              <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1f2937' }}>Birthdays</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
              {/* Upcoming Birthdays */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <Calendar style={{ color: '#ec4899' }} size={24} />
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Upcoming Birthdays</h3>
                </div>
                {upcomingBirthdays.map((birthday, idx) => (
                  <div key={idx} style={{ background: 'linear-gradient(to right, #eff6ff, #e0e7ff)', borderRadius: '12px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #dbeafe' }}>
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#1f2937', fontSize: '18px' }}>{birthday.name}</div>
                      <div style={{ fontSize: '14px', color: '#4b5563', marginTop: '4px' }}>{birthday.date}</div>
                    </div>
                    <span style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                      +{birthday.daysLeft} days
                    </span>
                  </div>
                ))}
              </div>

              {/* Recent Birthdays */}
              <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <Calendar style={{ color: '#f97316' }} size={24} />
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Recent Birthdays</h3>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '48px 0' }}>
                  <div style={{ color: '#9ca3af', fontStyle: 'italic' }}>No recent birthdays</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
            {/* Employees Management */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '56px', height: '56px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <Users style={{ color: 'white' }} size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Employees Management</h3>
                    <div style={{ fontSize: '12px', color: '#9333ea', marginTop: '4px' }}>Creating new employee record</div>
                  </div>
                </div>
                <button style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #9333ea, #7e22ce)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(147, 51, 234, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
                  <Plus style={{ color: 'white' }} size={22} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', borderRadius: '12px', padding: '16px', border: '1px solid #bbf7d0' }}>
                  <div style={{ fontSize: '14px', color: '#166534', fontWeight: 'bold', marginBottom: '4px' }}>Total Sites</div>
                  <div style={{ fontSize: '12px', color: '#16a34a' }}>Project locations</div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #fef2f2, #fee2e2)', borderRadius: '12px', padding: '16px', border: '1px solid #fecaca' }}>
                  <div style={{ fontSize: '14px', color: '#991b1b', fontWeight: 'bold', marginBottom: '4px' }}>Departments</div>
                  <div style={{ fontSize: '12px', color: '#dc2626' }}>Active teams</div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)', borderRadius: '12px', padding: '16px', border: '1px solid #bfdbfe' }}>
                  <div style={{ fontSize: '14px', color: '#1e40af', fontWeight: 'bold', marginBottom: '4px' }}>All Employees</div>
                  <div style={{ fontSize: '12px', color: '#2563eb' }}>Total active employees</div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #fefce8, #fef9c3)', borderRadius: '12px', padding: '16px', border: '1px solid #fde047' }}>
                  <div style={{ fontSize: '14px', color: '#854d0e', fontWeight: 'bold', marginBottom: '4px' }}>Site Employees</div>
                  <div style={{ fontSize: '12px', color: '#ca8a04' }}>Staff working onsite</div>
                </div>
              </div>
            </div>

            {/* Salary Management */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '56px', height: '56px', background: 'linear-gradient(to bottom right, #6366f1, #4f46e5)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                    <DollarSign style={{ color: 'white' }} size={26} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Salary Management</h3>
                    <div style={{ fontSize: '12px', color: '#16a34a', marginTop: '4px' }}>Viewing history, preview payslip model</div>
                  </div>
                </div>
                <button style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #16a34a, #15803d)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(22, 163, 74, 0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
                  <Plus style={{ color: 'white' }} size={22} />
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #faf5ff, #f3e8ff)', borderRadius: '12px', padding: '12px', border: '1px solid #e9d5ff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#6b21a8', fontWeight: 'bold', marginBottom: '2px' }}>Payroll Overview</div>
                    <div style={{ fontSize: '11px', color: '#9333ea' }}>Smart editable computation</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #9333ea, #7e22ce)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                    <DollarSign style={{ color: 'white' }} size={18} />
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #f0fdf4, #dcfce7)', borderRadius: '12px', padding: '12px', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#166534', fontWeight: 'bold', marginBottom: '2px' }}>Bulk Payslips</div>
                    <div style={{ fontSize: '11px', color: '#16a34a' }}>Monthly slips in History</div>
                  </div>
                  <Download style={{ color: '#16a34a', flexShrink: 0 }} size={22} />
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #f0fdfa, #ccfbf1)', borderRadius: '12px', padding: '12px', border: '1px solid #99f6e4', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#115e59', fontWeight: 'bold', marginBottom: '2px' }}>Salary Structure</div>
                    <div style={{ fontSize: '11px', color: '#0f766e' }}>Define pay components</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #0d9488, #0f766e)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                    <Briefcase style={{ color: 'white' }} size={18} />
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #fdf2f8, #fce7f3)', borderRadius: '12px', padding: '12px', border: '1px solid #fbcfe8', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#9f1239', fontWeight: 'bold', marginBottom: '2px' }}>Advances & Deductions</div>
                    <div style={{ fontSize: '11px', color: '#e11d48' }}>Will be added soon</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #ec4899, #db2777)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                    <TrendingUp style={{ color: 'white' }} size={18} />
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Management */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: 'linear-gradient(to bottom right, #eab308, #f97316)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <Clock style={{ color: 'white' }} size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Attendance Management</h3>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: 'linear-gradient(to bottom right, #fefce8, #fef9c3)', borderRadius: '12px', padding: '16px', border: '1px solid #fde047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#854d0e', fontWeight: 'bold', marginBottom: '4px' }}>View Attendance</div>
                    <div style={{ fontSize: '12px', color: '#ca8a04' }}>All records overview</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #eab308, #ca8a04)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                    <Clock style={{ color: 'white' }} size={18} />
                  </div>
                </div>
                <div style={{ background: 'linear-gradient(to bottom right, #eff6ff, #dbeafe)', borderRadius: '12px', padding: '16px', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: '#1e40af', fontWeight: 'bold', marginBottom: '4px' }}>Holidays Management</div>
                    <div style={{ fontSize: '12px', color: '#2563eb' }}>Adding updating holidays</div>
                  </div>
                  <div style={{ width: '40px', height: '40px', background: 'linear-gradient(to bottom right, #3b82f6, #2563eb)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', flexShrink: 0 }}>
                    H
                  </div>
                </div>
              </div>
            </div>

            {/* Other Features */}
            <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', padding: '24px', border: '1px solid #f3f4f6', transition: 'box-shadow 0.2s' }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{ width: '56px', height: '56px', background: 'linear-gradient(to bottom right, #10b981, #16a34a)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                  <Briefcase style={{ color: 'white' }} size={26} />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937' }}>Other features</h3>
              </div>
              
              <div style={{ background: 'linear-gradient(to bottom right, #fefce8, #fef9c3)', borderRadius: '12px', padding: '20px', border: '1px solid #fde047', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '14px', color: '#854d0e', fontWeight: 'bold', marginBottom: '4px' }}>Salary Calculator</div>
                  <div style={{ fontSize: '12px', color: '#ca8a04' }}>Before assigning rough calculation</div>
                </div>
                <div style={{ width: '48px', height: '48px', background: 'linear-gradient(to bottom right, #eab308, #f97316)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', flexShrink: 0 }}>
                  <Calculator style={{ color: 'white' }} size={22} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}