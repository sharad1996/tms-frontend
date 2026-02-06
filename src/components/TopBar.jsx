import React from 'react';
import { useNavigate } from 'react-router-dom';

function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function TopBar({ activeTab, setActiveTab, auth }) {
  const { user, logout } = auth;
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-logo">
          <div className="brand-logo-inner" />
        </div>
        <div className="brand-text">TMS</div>
      </div>
      <nav className="top-menu">
        {['Dashboard', 'Shipments', 'Network', 'Insights'].map((item) => (
          <button
            key={item}
            className={classNames('top-menu-item', activeTab === item ? 'active' : null)}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="login-bar">
        {user && (
          <div className="user-pill">
            <span>{user.username}</span>
            <span className={classNames('user-role', user.role === 'ADMIN' ? 'role-admin' : 'role-employee')}>
              {user.role}
            </span>
            <button type="button" onClick={handleLogout}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

