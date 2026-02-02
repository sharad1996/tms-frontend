import React from 'react';

import { classNames } from '../lib/classNames.js';

export function ShipmentDetail({ shipment, clear, onEdit, onDeleteClick, onLoginRequired, toggleFlag, isLoggedIn }) {
  const requireLogin = () => {
    if (!isLoggedIn) {
      onLoginRequired();
      return true;
    }
    return false;
  };

  return (
    <div className="detail-shell">
      {!isLoggedIn && (
        <p className="detail-login-hint">
          Log in (top right) to edit, flag, or delete this shipment.
        </p>
      )}
      <div className="detail-header">
        <div className="detail-primary">
          <span className="detail-ref">{shipment.reference}</span>
          <span style={{ fontSize: '0.78rem', color: '#9ca3af' }}>
            {shipment.pickupLocation.city}, {shipment.pickupLocation.state} →
            {` `}
            {shipment.deliveryLocation.city}, {shipment.deliveryLocation.state}
          </span>
          <div className="detail-badge-row">
            <span
              className={classNames(
                'status-pill',
                shipment.status === 'Delivered' ? 'status-delivered' : 'status-intransit'
              )}
            >
              {shipment.status}
            </span>
            {shipment.isFlagged && <span className="flag-pill">Flagged</span>}
            <span className="pill-soft">{shipment.serviceLevel} service</span>
          </div>
        </div>
        <div className="detail-actions-wrap">
          <div className="detail-actions">
            <button
              type="button"
              className="btn-ghost btn-detail-action"
              onClick={clear}
            >
              Back to list
            </button>
            <button
              type="button"
              className="btn-ghost btn-detail-action btn-edit"
              onClick={() => !requireLogin() && onEdit()}
              title="Edit shipment"
            >
              Edit
            </button>
            <button
              type="button"
              className="btn-ghost btn-detail-action btn-flag"
              onClick={() => !requireLogin() && toggleFlag(shipment.id)}
              title={shipment.isFlagged ? 'Remove flag' : 'Flag shipment'}
            >
              {shipment.isFlagged ? 'Unflag' : 'Flag'}
            </button>
            <button
              type="button"
              className="btn-ghost btn-detail-action btn-delete"
              onClick={() => !requireLogin() && onDeleteClick()}
              title="Delete shipment (admin only)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className="detail-meta-grid">
        <div>
          <div className="meta-label">Shipper</div>
          <div className="meta-value">{shipment.shipperName}</div>
        </div>
        <div>
          <div className="meta-label">Carrier</div>
          <div className="meta-value">{shipment.carrierName}</div>
        </div>
        <div>
          <div className="meta-label">Pickup date</div>
          <div className="meta-value">{shipment.pickupDate}</div>
        </div>
        <div>
          <div className="meta-label">Delivery date</div>
          <div className="meta-value">{shipment.deliveryDate}</div>
        </div>
        <div>
          <div className="meta-label">Rate</div>
          <div className="meta-value">
            {shipment.currency} {Math.round(shipment.rate).toLocaleString()}
          </div>
        </div>
        <div>
          <div className="meta-label">Service</div>
          <div className="meta-value">{shipment.serviceLevel}</div>
        </div>
      </div>
      <div className="detail-timeline">
        <div className="meta-label" style={{ marginBottom: '0.35rem' }}>
          Tracking timeline
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            maxHeight: '200px',
            overflow: 'auto',
            paddingRight: '0.25rem',
          }}
        >
          {shipment.trackingEvents.map((ev, idx) => (
            <div key={ev.timestamp ?? idx} className="timeline-item">
              <div className="timeline-marker" />
              <div className="timeline-meta">
                <span className="timeline-title">{ev.status}</span>
                <span className="timeline-sub">
                  {ev.location.city}, {ev.location.state} •{' '}
                  {new Date(ev.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

