import React from 'react';

import { classNames } from '../lib/classNames.js';

export function ShipmentDetail({ shipment, clear, toggleFlag, canDelete, deleteShipment }) {
  return (
    <div className="detail-shell">
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.35rem',
            alignItems: 'flex-end',
          }}
        >
          <button type="button" className="btn-ghost" onClick={clear}>
            Back to list
          </button>
          <div style={{ display: 'flex', gap: '0.3rem' }}>
            <button
              type="button"
              className="btn-ghost"
              onClick={() => toggleFlag(shipment.id)}
              style={{ borderColor: '#f97316', color: '#fed7aa' }}
            >
              {shipment.isFlagged ? 'Unflag' : 'Flag'}
            </button>
            {canDelete && (
              <button
                type="button"
                className="btn-ghost"
                onClick={() => deleteShipment(shipment.id)}
                style={{ borderColor: '#ef4444', color: '#fecaca' }}
              >
                Delete
              </button>
            )}
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

