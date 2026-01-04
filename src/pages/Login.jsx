// LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  Mail,
  ArrowRight,
  Check,
  Shield,
  AlertCircle
} from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      console.log('Login attempt:', formData);
      
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      if (formData.email && formData.password) {
        localStorage.setItem('hrms_auth', 'true');
        localStorage.setItem('hrms_user', formData.email);
        localStorage.setItem('hrms_role', 'hr_admin');
        
        navigate('/dashboard');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoContainer}>
            <Building2 size={40} color="#2563eb" strokeWidth={2.5} />
            <div style={styles.logoText}>
              <div style={styles.companyName}>HR Flow</div>
              <div style={styles.companyTagline}>Management System</div>
            </div>
          </div>
          
          <div style={styles.welcomeSection}>
            <div style={styles.welcomeIcon}>
              <Shield size={24} color="#2563eb" />
            </div>
            <div style={styles.welcomeTitle}>Secure HR Portal</div>
            <div style={styles.welcomeSubtitle}>Sign in to access employee dashboard</div>
          </div>
        </div>

        {/* Login Form */}
        <form style={styles.loginForm} onSubmit={handleSubmit}>
          {error && (
            <div style={styles.errorMessage}>
              <AlertCircle size={18} />
              <span style={{marginLeft: '10px'}}>{error}</span>
            </div>
          )}
          
          {/* Email Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <Mail size={18} color="#94a3b8" />
            </div>
            <input
              style={styles.input}
              type="email"
              name="email"
              placeholder="Enter your work email"
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="username"
            />
          </div>

          {/* Password Input */}
          <div style={styles.inputGroup}>
            <div style={styles.inputIcon}>
              <Lock size={18} color="#94a3b8" />
            </div>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
            />
            <button 
              type="button"
              style={styles.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 
                <EyeOff size={18} color="#64748b" /> : 
                <Eye size={18} color="#64748b" />
              }
            </button>
          </div>

          {/* Options Row */}
          <div style={styles.formOptions}>
            <div style={styles.rememberOption}>
              <div style={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  style={styles.hiddenCheckbox}
                />
                <div 
                  style={{
                    ...styles.styledCheckbox,
                    backgroundColor: formData.rememberMe ? '#3b82f6' : 'white',
                    borderColor: formData.rememberMe ? '#3b82f6' : '#cbd5e1'
                  }}
                >
                  {formData.rememberMe && <Check size={12} color="white" />}
                </div>
              </div>
              <label htmlFor="rememberMe" style={styles.checkboxLabel}>
                Remember me
              </label>
            </div>
            
            <a href="#forgot" style={styles.forgotLink}>
              Forgot password?
            </a>
          </div>

          {/* Login Button */}
          <button 
            type="submit" 
            style={{
              ...styles.loginButton,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={isLoading}
          >
            <div style={styles.buttonContent}>
              {isLoading ? (
                <>
                  <div style={styles.spinner}></div>
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </div>
          </button>

          {/* Demo Credentials */}
          <div style={styles.demoSection}>
            <div style={styles.demoTitle}>Demo Credentials</div>
            <div style={styles.demoCredentials}>
              <div style={styles.credentialItem}>
                <User size={14} color="#38bdf8" />
                <span style={{marginLeft: '8px', fontFamily: 'monospace'}}>
                  admin@hrcompany.com
                </span>
              </div>
              <div style={styles.credentialItem}>
                <Lock size={14} color="#38bdf8" />
                <span style={{marginLeft: '8px', fontFamily: 'monospace'}}>
                  password123
                </span>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div style={styles.footer}>
          <div style={styles.securityNote}>
            <Shield size={12} color="#22c55e" />
            <span style={{marginLeft: '6px'}}>
              Secured with enterprise-grade encryption
            </span>
          </div>
          <div style={styles.copyright}>
            © 2024 HR Flow System • v2.1.0
          </div>
        </div>
      </div>

      {/* Background Circles */}
      <div style={styles.circle1}></div>
      <div style={styles.circle2}></div>
      <div style={styles.circle3}></div>
    </div>
  );
};

// Styles with fixed dimensions
const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },

  loginCard: {
    width: '600px',
    backgroundColor: 'white',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
    padding: '40px',
    position: 'relative',
    zIndex: 10,
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },

  header: {
    textAlign: 'center',
    marginBottom: '40px'
  },

  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    marginBottom: '30px'
  },

  logoText: {
    textAlign: 'left'
  },

  companyName: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#1e293b',
    margin: '0',
    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    letterSpacing: '-0.5px'
  },

  companyTagline: {
    fontSize: '13px',
    color: '#64748b',
    margin: '4px 0 0 0',
    fontWeight: '500',
    letterSpacing: '0.5px'
  },

  welcomeSection: {
    marginTop: '24px'
  },

  welcomeIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '48px',
    height: '48px',
    background: 'linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%)',
    borderRadius: '12px',
    marginBottom: '16px'
  },

  welcomeTitle: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 8px 0'
  },

  welcomeSubtitle: {
    color: '#64748b',
    fontSize: '15px',
    margin: '0',
    lineHeight: '1.5'
  },

  loginForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },

  errorMessage: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '14px',
    border: '1px solid #fecaca'
  },

  inputGroup: {
    position: 'relative',
    width: '100%'
  },

  inputIcon: {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 2,
    pointerEvents: 'none'
  },

  input: {
    width: '100%',
    padding: '16px 16px 16px 48px',
    border: '1.5px solid #e2e8f0',
    borderRadius: '14px',
    fontSize: '15px',
    backgroundColor: '#f8fafc',
    color: '#1e293b',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.2s ease',
    height: '52px'
  },

  passwordToggle: {
    position: 'absolute',
    right: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  },

  formOptions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8px'
  },

  rememberOption: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  },

  checkboxContainer: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    position: 'relative'
  },

  hiddenCheckbox: {
    position: 'absolute',
    opacity: 0,
    width: '0',
    height: '0'
  },

  styledCheckbox: {
    width: '18px',
    height: '18px',
    borderRadius: '5px',
    border: '2px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease'
  },

  checkboxLabel: {
    color: '#475569',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    userSelect: 'none'
  },

  forgotLink: {
    color: '#3b82f6',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500'
  },

  loginButton: {
    width: '100%',
    height: '52px',
    backgroundColor: '#3b82f6',
    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },

  buttonContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px'
  },

  spinner: {
    width: '18px',
    height: '18px',
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTop: '2px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite'
  },

  demoSection: {
    marginTop: '24px',
    padding: '20px',
    backgroundColor: '#f0f9ff',
    background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
    borderRadius: '14px',
    border: '1px solid #bae6fd'
  },

  demoTitle: {
    color: '#0369a1',
    fontSize: '14px',
    fontWeight: '600',
    margin: '0 0 12px 0'
  },

  demoCredentials: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },

  credentialItem: {
    display: 'flex',
    alignItems: 'center',
    color: '#0c4a6e',
    fontSize: '13px'
  },

  footer: {
    marginTop: '40px',
    paddingTop: '20px',
    borderTop: '1px solid #f1f5f9'
  },

  securityNote: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    color: '#64748b',
    fontSize: '12px',
    fontWeight: '500',
    marginBottom: '8px'
  },

  copyright: {
    color: '#94a3b8',
    fontSize: '11px',
    letterSpacing: '0.3px',
    textAlign: 'center'
  },

  // Background circles
  circle1: {
    position: 'absolute',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
    filter: 'blur(40px)',
    top: '10%',
    left: '5%',
    zIndex: 1
  },

  circle2: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.05) 0%, rgba(59, 130, 246, 0.1) 100%)',
    filter: 'blur(40px)',
    top: '60%',
    right: '8%',
    zIndex: 1
  },

  circle3: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(59, 130, 246, 0.04) 100%)',
    filter: 'blur(40px)',
    bottom: '15%',
    left: '15%',
    zIndex: 1
  }
};

// Add CSS animation for spinner
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

// Add hover effects
styleSheet.insertRule(`
  input:hover {
    border-color: #cbd5e1 !important;
    background-color: #f1f5f9 !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  input:focus {
    border-color: #3b82f6 !important;
    background-color: white !important;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.25) !important;
  }
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
  a:hover {
    color: #2563eb !important;
    text-decoration: underline !important;
  }
`, styleSheet.cssRules.length);

export default LoginPage;