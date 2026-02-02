import React, { useState } from 'react';

export function DeleteConfirmModal({ shipment, onConfirm, onCancel }) {
  const [deleting, setDeleting] = useState(false);

  const handleConfirm = async () => {
    if (!shipment) return;
    setDeleting(true);
    try {
      await onConfirm(shipment.id);
      onCancel();
    } catch {
      // Error already shown by caller
    } finally {
      setDeleting(false);
    }
  };

  if (!shipment) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content delete-confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Delete shipment</h2>
          <button
            type="button"
            className="modal-close"
            onClick={onCancel}
            aria-label="Close"
            disabled={deleting}
          >
            ×
          </button>
        </div>
        <div className="delete-confirm-body">
          <p className="delete-confirm-message">
            Delete this shipment? This is only demo data but action cannot be undone.
          </p>
          <div className="delete-confirm-ref">
            <span className="meta-label">Shipment</span>
            <span className="meta-value">
              {shipment.reference} · {shipment.shipperName} → {shipment.deliveryLocation?.city}
            </span>
          </div>
        </div>
        <div className="modal-actions">
          <button
            type="button"
            className="btn-ghost"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn-danger"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
