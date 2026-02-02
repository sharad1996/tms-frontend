import React from 'react';

import { VIEW_MODE } from '../hooks/useShipments.js';
import { classNames } from '../lib/classNames.js';
import { ShipmentTile } from './ShipmentTile.jsx';
import { ShipmentDetail } from './ShipmentDetail.jsx';

export function ShipmentsView({ shipmentsHook, user }) {
  const {
    state,
    filters,
    setFilters,
    fetchPage,
    selectedShipment,
    setSelectedShipment,
    viewMode,
    setViewMode,
    toggleFlag,
    deleteShipment,
  } = shipmentsHook;

  const onChangeFilter = (patch) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  };

  const onChangePage = (nextPage) => {
    fetchPage(nextPage);
  };

  const canDelete = user && user.role === 'ADMIN';

  return (
    <>
      <div className="content-header">
        <div className="content-title">
          <h1>Shipment control tower</h1>
          <p className="content-subtitle">
            Monitor live shipments, drill into exceptions, and switch instantly between grid and tile
            layouts.
          </p>
        </div>
        <div className="view-toggle">
          <span className="pill-label">View</span>
          <div className="segmented">
            <button
              type="button"
              className={viewMode === VIEW_MODE.GRID ? 'active' : ''}
              onClick={() => setViewMode(VIEW_MODE.GRID)}
            >
              Grid
            </button>
            <button
              type="button"
              className={viewMode === VIEW_MODE.TILE ? 'active' : ''}
              onClick={() => setViewMode(VIEW_MODE.TILE)}
            >
              Tiles
            </button>
          </div>
        </div>
      </div>
      <div className="filters-container">
        <div className="filters-row">
          <span className="pill-label">Filter</span>
          <input
            placeholder="Shipper"
            value={filters.searchShipper}
            onChange={(e) => onChangeFilter({ searchShipper: e.target.value })}
          />
          <input
            placeholder="Carrier"
            value={filters.searchCarrier}
            onChange={(e) => onChangeFilter({ searchCarrier: e.target.value })}
          />
          <select
            value={filters.status}
            onChange={(e) => onChangeFilter({ status: e.target.value })}
          >
            <option value="">Status: Any</option>
            <option value="In Transit">In Transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <label style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={filters.flaggedOnly}
              onChange={(e) => onChangeFilter({ flaggedOnly: e.target.checked })}
              style={{ marginRight: '0.3rem' }}
            />
            Flagged only
          </label>
        </div>
        <div className="filters-row">
          <span className="pill-label">Sort</span>
          <select
            value={filters.sortBy}
            onChange={(e) => onChangeFilter({ sortBy: e.target.value })}
          >
            <option value="pickupDate">Pickup date</option>
            <option value="deliveryDate">Delivery date</option>
            <option value="shipperName">Shipper</option>
            <option value="carrierName">Carrier</option>
            <option value="rate">Rate</option>
          </select>
          <select
            value={filters.sortOrder}
            onChange={(e) => onChangeFilter({ sortOrder: e.target.value })}
          >
            <option value="ASC">Asc</option>
            <option value="DESC">Desc</option>
          </select>
          <span className="chip">
            <span className="chip-dot" />
            {state.totalCount} shipments
          </span>
        </div>
      </div>
      <div className="content-body">
        <section className="panel">
          <div className="panel-header">
            <div className="panel-title">Shipments</div>
            <div className="panel-meta">
              <span className="chip">
                Page {state.page} of {state.totalPages}
              </span>
            </div>
          </div>
          <div className="panel-body">
            {viewMode === VIEW_MODE.GRID ? (
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Shipper</th>
                      <th>Carrier</th>
                      <th>Pickup</th>
                      <th>Delivery</th>
                      <th>Pickup date</th>
                      <th>Delivery date</th>
                      <th>Status</th>
                      <th>Rate</th>
                      <th>Service</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.items.map((s) => (
                      <tr key={s.id} onClick={() => setSelectedShipment(s)}>
                        <td>{s.reference}</td>
                        <td>{s.shipperName}</td>
                        <td>{s.carrierName}</td>
                        <td>{s.pickupLocation.city}</td>
                        <td>{s.deliveryLocation.city}</td>
                        <td>{s.pickupDate}</td>
                        <td>{s.deliveryDate}</td>
                        <td>
                          <span
                            className={classNames(
                              'status-pill',
                              s.status === 'Delivered'
                                ? 'status-delivered'
                                : 'status-intransit'
                            )}
                          >
                            {s.status}
                          </span>
                        </td>
                        <td>
                          {s.currency} {Math.round(s.rate).toLocaleString()}
                        </td>
                        <td>{s.serviceLevel}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {state.items.length === 0 && !state.loading && (
                  <div className="empty-state">No shipments match this filter.</div>
                )}
              </div>
            ) : (
              <div className="tile-grid">
                {state.items.map((s) => (
                  <ShipmentTile
                    key={s.id}
                    shipment={s}
                    onSelect={() => setSelectedShipment(s)}
                    toggleFlag={toggleFlag}
                    deleteShipment={deleteShipment}
                    canDelete={canDelete}
                  />
                ))}
                {state.items.length === 0 && !state.loading && (
                  <div className="empty-state">No shipments match this filter.</div>
                )}
              </div>
            )}
          </div>
          <div className="pagination-bar">
            <div>
              Showing{' '}
              <strong>
                {state.items.length > 0 ? (state.page - 1) * state.pageSize + 1 : 0}-
                {(state.page - 1) * state.pageSize + state.items.length}
              </strong>{' '}
              of <strong>{state.totalCount}</strong>
            </div>
            <div className="pagination-controls">
              <button
                type="button"
                className="btn-ghost"
                disabled={state.page <= 1 || state.loading}
                onClick={() => onChangePage(state.page - 1)}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn-ghost"
                disabled={state.page >= state.totalPages || state.loading}
                onClick={() => onChangePage(state.page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </section>
        <section className="panel">
          <div className="panel-header">
            <div className="panel-title">Details</div>
          </div>
          <div className="panel-body">
            {selectedShipment ? (
              <ShipmentDetail
                shipment={selectedShipment}
                clear={() => setSelectedShipment(null)}
                toggleFlag={toggleFlag}
                canDelete={canDelete}
                deleteShipment={deleteShipment}
              />
            ) : (
              <div className="empty-state">
                Select a row or tile to see the complete shipment story.
              </div>
            )}
          </div>
        </section>
      </div>
      {state.loading && (
        <div className="empty-state" style={{ paddingTop: '0.4rem' }}>
          Loading latest movement data...
        </div>
      )}
      {state.error && (
        <div className="empty-state" style={{ color: '#f97316' }}>
          {state.error}
        </div>
      )}
    </>
  );
}

