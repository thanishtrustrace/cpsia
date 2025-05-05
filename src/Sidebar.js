import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const isActivePath = (basePath) => {
    return path.startsWith(basePath);
  };

  return (
    <div className="sidebar">
      <div className="logo">APCD</div>
      <nav className="nav-menu">
        <div className="nav-section">
          <div className="section-title">CPSIA</div>
          <Link 
            to="/" 
            className={`nav-item ${isActivePath('/') && !isActivePath('/tptr') ? 'active' : ''}`}
          >
            <span className="icon">📋</span>
            <span className="label">Certificates</span>
          </Link>
      
        </div>

        <div className="nav-section">
          <div className="section-title">TPTR</div>
          <Link 
            to="/tptr" 
            className={`nav-item ${isActivePath('/tptr') && path !== '/tptr/add' ? 'active' : ''}`}
          >
            <span className="icon">📋</span>
            <span className="label">Test Reports</span>
          </Link>
       
        
          <Link 
            to="/tptr/articles" 
            className={`nav-item ${isActivePath('/tptr/articles') ? 'active' : ''}`}
          >
            <span className="icon">📚</span>
            <span className="label">Articles & Models</span>
          </Link>
          <Link 
            to="/tptr/materials" 
            className={`nav-item ${isActivePath('/tptr/materials') ? 'active' : ''}`}
          >
            <span className="icon">🔧</span>
            <span className="label">Materials & Components</span>
          </Link>
          <Link 
            to="/tptr/colors" 
            className={`nav-item ${isActivePath('/tptr/colors') ? 'active' : ''}`}
          >
            <span className="icon">🎨</span>
            <span className="label">Colorways</span>
          </Link>
          <Link 
            to="/tptr/requests" 
            className={`nav-item ${isActivePath('/tptr/requests') ? 'active' : ''}`}
          >
            <span className="icon">📋</span>
            <span className="label">TPTR Requests</span>
          </Link>
        </div>

        <div className="nav-section">
          <div className="section-title">A01</div>
          <Link 
            to="/a01/appendix1" 
            className={`nav-item ${isActivePath('/a01/appendix1') ? 'active' : ''}`}
          >
            <span className="icon">📄</span>
            <span className="label">Appendix 1</span>
          </Link>
          <Link 
            to="/a01/appendix2" 
            className={`nav-item ${isActivePath('/a01/appendix2') && path !== '/a01/appendix2/add' ? 'active' : ''}`}
          >
            <span className="icon">📄</span>
            <span className="label">Appendix 2</span>
          </Link>
          <Link 
            to="/a01/appendix2/add" 
            className={`nav-item ${path === '/a01/appendix2/add' ? 'active' : ''}`}
          >
            <span className="icon">➕</span>
            <span className="label">Add Appendix 2</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar; 