import React, { useState } from 'react';

import { classNames } from '../lib/classNames.js';

export function ShipmentTile({ shipment, onSelect, onEdit, onDeleteClick, onLoginRequired, toggleFlag, canDelete, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const stop = (e) => e.stopPropagation();

  const handleEdit = () => {
    if (!isLoggedIn) {
      onLoginRequired?.();
      setMenuOpen(false);
      return;
    }
    onEdit?.();
    setMenuOpen(false);
  };

  const handleFlag = () => {
    if (!isLoggedIn) {
      onLoginRequired?.();
      setMenuOpen(false);
      return;
    }
    toggleFlag(shipment.id);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (!isLoggedIn) {
      onLoginRequired?.();
      setMenuOpen(false);
      return;
    }
    onDeleteClick?.();
    setMenuOpen(false);
  };

  return (
    <div className="tile" onClick={onSelect}>
      <div className="tile-header">
        <div>
          <div className="tile-title">{shipment.reference}</div>
          <div className="tile-subtitle">
            {shipment.pickupLocation.city} → {shipment.deliveryLocation.city}
          </div>
        </div>
        <div className="tile-actions" onClick={stop}>
          <button
            type="button"
            className="btn-icon"
            onClick={() => setMenuOpen((v) => !v)}
          >
            ⋯
          </button>
          {menuOpen && (
            <div className="action-menu">
              <button
                type="button"
                className="action-menu-item"
                onClick={onSelect}
              >
                View details
              </button>
              {/* Edit option - shown if user has permission */}
              {onEdit && (
                <button
                  type="button"
                  className="action-menu-item"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              )}
              {/* Flag option - available for logged-in users */}
              {isLoggedIn && (
                <button
                  type="button"
                  className="action-menu-item"
                  onClick={handleFlag}
                >
                  {shipment.isFlagged ? 'Unflag' : 'Flag'}
                </button>
              )}
              {/* Delete option - shown only if user has permission */}
              {canDelete && onDeleteClick && (
                <button
                  type="button"
                  className="action-menu-item"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
        <span style={{ fontSize: '0.78rem' }}>{shipment.shipperName}</span>
        <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>{shipment.carrierName}</span>
      </div>
      <div className="tile-footer">
        <span
          className={classNames(
            'status-pill',
            shipment.status === 'Delivered' ? 'status-delivered' : 'status-intransit'
          )}
        >
          {shipment.status}
        </span>
        <span className="pill-soft">
          {shipment.currency} {Math.round(shipment.rate).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

