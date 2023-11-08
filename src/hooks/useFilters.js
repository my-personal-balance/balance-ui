import { useState } from 'react';

export const useFilters = (initValue = {}) => {
  const [filters, setFilters] = useState(initValue);

  const addFilters = (addedFilter) => {
    let newFilters = Object.assign({}, filters, addedFilter);
    updateFilters(newFilters);
  }

  const removeFilters = (removedFilter) => {
    delete filters[removedFilter];
    updateFilters(filters);
  }

  const updateFilters = (newFilters) => {
    setFilters({...filters, ...newFilters});
  }

  return {
    filters,
    addFilters,
    removeFilters,
    updateFilters
  }
}
