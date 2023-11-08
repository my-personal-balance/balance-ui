import { useState, useEffect } from 'react';

import { fetchTransactions, } from '../ws/transactions';

export const useTransactions = (axios, filters) => {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    refreshTransactions();
  },[filters]);

  const refreshTransactions = () => {
    fetchTransactions(axios, filters, response => {
      const { data } = response;
      if (data) {
        const { transactions } = data;
        setTransactions(transactions);
      }
    });
  }

  return {
    transactions,
    refreshTransactions,
  }

}
