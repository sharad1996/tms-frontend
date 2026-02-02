import React, { useState } from 'react';

import { classNames } from '../lib/classNames.js';

export function Sidebar({ activeNav, setActiveNav }) {
  const [openHamburger, setOpenHamburger] = useState(true);
  const [openShipmentSubmenu, setOpenShipmentSubmenu] = useState(true);

  if (!openHamburger) {
    return (
      <aside className="sidebar">
        <div className="sidebar-header">
          <span className="sidebar-title">Navigation</span>
          <button
            type="button"
            className="hamburger-btn"
            onClick={() => setOpenHamburger(true)}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-title">Navigation</span>
        <button
          type="button"
          className="hamburger-btn"
          onClick={() => setOpenHamburger(false)}
        >
          <span className="hamburger-line" />
          <span className="hamburger-line" />
          <span className="hamburger-line" />
        </button>
      </div>
      <div className="nav-section">
        <span className="nav-label">Primary</span>
        <div
          className={classNames('nav-item', activeNav === 'overview' ? 'active' : null)}
          onClick={() => setActiveNav('overview')}
          role="button"
          tabIndex={0}
          onKeyDown={() => setActiveNav('overview')}
        >
          <div className="nav-item-main">
            <div className="nav-icon">◎</div>
            <div>
              <div>Overview</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Control tower</div>
            </div>
          </div>
          <span style={{ fontSize: '0.7rem', color: '#6b7280' }}>Live</span>
        </div>
        <div
          className={classNames('nav-item', activeNav === 'shipments' ? 'active' : null)}
          onClick={() => setActiveNav('shipments')}
          role="button"
          tabIndex={0}
          onKeyDown={() => setActiveNav('shipments')}
        >
          <div className="nav-item-main">
            <div className="nav-icon">↔</div>
            <div>
              <div>Shipments</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Grid &amp; tile views
              </div>
            </div>
          </div>
          <span
            style={{ fontSize: '0.7rem', cursor: 'pointer' }}
            onClick={(e) => {
              e.stopPropagation();
              setOpenShipmentSubmenu((v) => !v);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              e.stopPropagation();
              setOpenShipmentSubmenu((v) => !v);
            }}
          >
            {openShipmentSubmenu ? '▾' : '▸'}
          </span>
        </div>
        {openShipmentSubmenu && (
          <div className="nav-submenu">
            <div className="nav-subitem">All shipments</div>
            <div className="nav-subitem">Flagged</div>
            <div className="nav-subitem">Exceptions</div>
          </div>
        )}
        <div
          className={classNames('nav-item', activeNav === 'analytics' ? 'active' : null)}
          onClick={() => setActiveNav('analytics')}
          role="button"
          tabIndex={0}
          onKeyDown={() => setActiveNav('analytics')}
        >
          <div className="nav-item-main">
            <div className="nav-icon">∞</div>
            <div>
              <div>Analytics</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>Service health</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

