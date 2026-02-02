import { useCallback, useEffect, useState } from 'react';
import { gqlRequest } from '../lib/graphql.js';

export const VIEW_MODE = {
  GRID: 'GRID',
  TILE: 'TILE',
};

export function useShipments(token) {
  const [state, setState] = useState({
    items: [],
    totalCount: 0,
    page: 1,
    pageSize: 10,
    totalPages: 1,
    loading: false,
    error: '',
  });

  const [filters, setFilters] = useState({
    searchShipper: '',
    searchCarrier: '',
    status: '',
    sortBy: 'pickupDate',
    sortOrder: 'DESC',
    flaggedOnly: false,
  });

  const [selectedShipment, setSelectedShipment] = useState(null);
  const [viewMode, setViewMode] = useState(VIEW_MODE.GRID);

  const fetchPage = useCallback(
    async (page = 1) => {
      setState((s) => ({ ...s, loading: true, error: '' }));

      try {
        const filterInput = {};
        if (filters.searchShipper) filterInput.shipperName = filters.searchShipper;
        if (filters.searchCarrier) filterInput.carrierName = filters.searchCarrier;
        if (filters.status) filterInput.status = filters.status;
        if (filters.flaggedOnly) filterInput.isFlagged = true;

        const data = await gqlRequest(
          `query Shipments(
            $filter: ShipmentFilterInput
            $sortBy: ShipmentSortField
            $sortOrder: SortOrder
            $page: Int
            $pageSize: Int
          ) {
            shipments(
              filter: $filter
              sortBy: $sortBy
              sortOrder: $sortOrder
              page: $page
              pageSize: $pageSize
            ) {
              items {
                id
                reference
                shipperName
                carrierName
                pickupLocation { city state country }
                deliveryLocation { city state country }
                pickupDate
                deliveryDate
                status
                isFlagged
                rate
                currency
                serviceLevel
                trackingEvents {
                  timestamp
                  status
                  location { city state country } 
                }
              }
              totalCount
              page
              pageSize
              totalPages
            }
          }`,
          {
            filter: Object.keys(filterInput).length ? filterInput : null,
            sortBy: filters.sortBy || null,
            sortOrder: filters.sortOrder,
            page,
            pageSize: state.pageSize,
          },
          token
        );

        setState((s) => ({
          ...s,
          ...data.shipments,
          loading: false,
        }));
      } catch (err) {
        setState((s) => ({
          ...s,
          loading: false,
          error: err.message || 'Failed to load shipments',
        }));
      }
    },
    [filters, token, state.pageSize]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  const toggleFlag = async (shipmentId) => {
    try {
      const data = await gqlRequest(
        `mutation ToggleFlag($id: ID!) {
          toggleFlagShipment(id: $id) {
            id
            isFlagged
          }
        }`,
        { id: shipmentId },
        token
      );

      setState((s) => ({
        ...s,
        items: s.items.map((item) =>
          item.id === shipmentId ? { ...item, isFlagged: data.toggleFlagShipment.isFlagged } : item
        ),
      }));
      if (selectedShipment && selectedShipment.id === shipmentId) {
        setSelectedShipment((prev) => ({ ...prev, isFlagged: data.toggleFlagShipment.isFlagged }));
      }
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message || 'Unable to toggle flag (check permissions)');
    }
  };

  const deleteShipment = async (shipmentId) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm('Delete this shipment? This is only demo data but action cannot be undone.')) {
      return;
    }
    try {
      await gqlRequest(
        `mutation Delete($id: ID!) {
          deleteShipment(id: $id)
        }`,
        { id: shipmentId },
        token
      );
      setState((s) => ({
        ...s,
        items: s.items.filter((item) => item.id !== shipmentId),
        totalCount: s.totalCount - 1,
      }));
      if (selectedShipment && selectedShipment.id === shipmentId) {
        setSelectedShipment(null);
      }
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(err.message || 'Unable to delete shipment (admin only)');
    }
  };

  return {
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
  };
}

