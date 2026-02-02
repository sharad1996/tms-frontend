import React, { useState, useEffect } from 'react';

export function EditShipmentModal({ shipment, onSave, onCancel }) {
  const [form, setForm] = useState({
    reference: '',
    shipperName: '',
    carrierName: '',
    status: '',
    pickupCity: '',
    pickupState: '',
    pickupCountry: '',
    deliveryCity: '',
    deliveryState: '',
    deliveryCountry: '',
    pickupDate: '',
    deliveryDate: '',
    rate: '',
    currency: 'USD',
    serviceLevel: 'Standard',
    isFlagged: false,
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!shipment) return;
    setForm({
      reference: shipment.reference || '',
      shipperName: shipment.shipperName || '',
      carrierName: shipment.carrierName || '',
      status: shipment.status || 'In Transit',
      pickupCity: shipment.pickupLocation?.city || '',
      pickupState: shipment.pickupLocation?.state || '',
      pickupCountry: shipment.pickupLocation?.country || '',
      deliveryCity: shipment.deliveryLocation?.city || '',
      deliveryState: shipment.deliveryLocation?.state || '',
      deliveryCountry: shipment.deliveryLocation?.country || '',
      pickupDate: shipment.pickupDate || '',
      deliveryDate: shipment.deliveryDate || '',
      rate: String(shipment.rate ?? ''),
      currency: shipment.currency || 'USD',
      serviceLevel: shipment.serviceLevel || 'Standard',
      isFlagged: Boolean(shipment.isFlagged),
    });
  }, [shipment]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!shipment) return;
    setSaving(true);
    try {
      const input = {
        reference: form.reference.trim() || undefined,
        shipperName: form.shipperName.trim() || undefined,
        carrierName: form.carrierName.trim() || undefined,
        status: form.status || undefined,
        pickupLocation: {
          city: form.pickupCity.trim(),
          state: form.pickupState.trim(),
          country: form.pickupCountry.trim(),
        },
        deliveryLocation: {
          city: form.deliveryCity.trim(),
          state: form.deliveryState.trim(),
          country: form.deliveryCountry.trim(),
        },
        pickupDate: form.pickupDate || undefined,
        deliveryDate: form.deliveryDate || undefined,
        rate: form.rate ? parseFloat(form.rate) : undefined,
        currency: form.currency || undefined,
        serviceLevel: form.serviceLevel || undefined,
        isFlagged: form.isFlagged,
      };
      await onSave(shipment.id, input);
      onCancel();
    } catch {
      // error already shown in useShipments
    } finally {
      setSaving(false);
    }
  };

  if (!shipment) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content edit-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Edit shipment</h2>
          <button type="button" className="modal-close" onClick={onCancel} aria-label="Close">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-row">
            <label>
              <span className="form-label">Reference</span>
              <input
                type="text"
                value={form.reference}
                onChange={(e) => handleChange('reference', e.target.value)}
                className="form-input"
              />
            </label>
            <label>
              <span className="form-label">Status</span>
              <select
                value={form.status}
                onChange={(e) => handleChange('status', e.target.value)}
                className="form-input"
              >
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </label>
          </div>
          <div className="form-row">
            <label>
              <span className="form-label">Shipper</span>
              <input
                type="text"
                value={form.shipperName}
                onChange={(e) => handleChange('shipperName', e.target.value)}
                className="form-input"
              />
            </label>
            <label>
              <span className="form-label">Carrier</span>
              <input
                type="text"
                value={form.carrierName}
                onChange={(e) => handleChange('carrierName', e.target.value)}
                className="form-input"
              />
            </label>
          </div>
          <div className="form-section">
            <span className="form-section-title">Pickup location</span>
            <div className="form-row form-row-3">
              <label>
                <span className="form-label">City</span>
                <input
                  type="text"
                  value={form.pickupCity}
                  onChange={(e) => handleChange('pickupCity', e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                <span className="form-label">State</span>
                <input
                  type="text"
                  value={form.pickupState}
                  onChange={(e) => handleChange('pickupState', e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                <span className="form-label">Country</span>
                <input
                  type="text"
                  value={form.pickupCountry}
                  onChange={(e) => handleChange('pickupCountry', e.target.value)}
                  className="form-input"
                />
              </label>
            </div>
          </div>
          <div className="form-section">
            <span className="form-section-title">Delivery location</span>
            <div className="form-row form-row-3">
              <label>
                <span className="form-label">City</span>
                <input
                  type="text"
                  value={form.deliveryCity}
                  onChange={(e) => handleChange('deliveryCity', e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                <span className="form-label">State</span>
                <input
                  type="text"
                  value={form.deliveryState}
                  onChange={(e) => handleChange('deliveryState', e.target.value)}
                  className="form-input"
                />
              </label>
              <label>
                <span className="form-label">Country</span>
                <input
                  type="text"
                  value={form.deliveryCountry}
                  onChange={(e) => handleChange('deliveryCountry', e.target.value)}
                  className="form-input"
                />
              </label>
            </div>
          </div>
          <div className="form-row">
            <label>
              <span className="form-label">Pickup date</span>
              <input
                type="text"
                value={form.pickupDate}
                onChange={(e) => handleChange('pickupDate', e.target.value)}
                placeholder="YYYY-MM-DD"
                className="form-input"
              />
            </label>
            <label>
              <span className="form-label">Delivery date</span>
              <input
                type="text"
                value={form.deliveryDate}
                onChange={(e) => handleChange('deliveryDate', e.target.value)}
                placeholder="YYYY-MM-DD"
                className="form-input"
              />
            </label>
          </div>
          <div className="form-row">
            <label>
              <span className="form-label">Rate</span>
              <input
                type="number"
                step="0.01"
                value={form.rate}
                onChange={(e) => handleChange('rate', e.target.value)}
                className="form-input"
              />
            </label>
            <label>
              <span className="form-label">Currency</span>
              <select
                value={form.currency}
                onChange={(e) => handleChange('currency', e.target.value)}
                className="form-input"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </label>
            <label>
              <span className="form-label">Service level</span>
              <select
                value={form.serviceLevel}
                onChange={(e) => handleChange('serviceLevel', e.target.value)}
                className="form-input"
              >
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
              </select>
            </label>
          </div>
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={form.isFlagged}
              onChange={(e) => handleChange('isFlagged', e.target.checked)}
            />
            <span>Flagged</span>
          </label>
          <div className="modal-actions">
            <button type="button" className="btn-ghost" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
