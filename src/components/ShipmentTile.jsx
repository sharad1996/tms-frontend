import React, { useState } from 'react';

import { classNames } from '../lib/classNames.js';

export function ShipmentTile({ shipment, onSelect, onEdit, onDeleteClick, toggleFlag, canDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const stop = (e) => e.stopPropagation();

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
              {onEdit && (
                <button
                  type="button"
                  className="action-menu-item"
                  onClick={() => {
                    onEdit();
                    setMenuOpen(false);
                  }}
                >
                  Edit
                </button>
              )}
              <button
                type="button"
                className="action-menu-item"
                onClick={() => {
                  toggleFlag(shipment.id);
                  setMenuOpen(false);
                }}
              >
                {shipment.isFlagged ? 'Unflag' : 'Flag'}
              </button>
              {canDelete && onDeleteClick && (
                <button
                  type="button"
                  className="action-menu-item"
                  onClick={() => {
                    onDeleteClick();
                    setMenuOpen(false);
                  }}
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

