import React from 'react';

function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

export function TopBar({ activeTab, setActiveTab, auth }) {
  const { user, loginAs, logout } = auth;

  const handleQuickLogin = async (e) => {
    const value = e.target.value;
    if (!value) return;
    await loginAs(value);
    e.target.value = '';
  };

  return (
    <header className="topbar">
      <div className="brand">
        <div className="brand-logo">
          <div className="brand-logo-inner" />
        </div>
        <div className="brand-text">NovaTMS</div>
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
        {!user && (
          <>
            <select defaultValue="" onChange={handleQuickLogin}>
              <option value="">Login as...</option>
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
            <span className="login-hint">admin/admin123, employee/employee123</span>
          </>
        )}
        {user && (
          <div className="user-pill">
            <span>{user.username}</span>
            <span className={classNames('user-role', user.role === 'ADMIN' ? 'role-admin' : 'role-employee')}>
              {user.role}
            </span>
            <button type="button" onClick={() => {
              logout();
              window.location.reload();
            }}>
              Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

