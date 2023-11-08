import { useEffect, useState } from 'react';

import { fetchBalance, } from '../ws/balance';

export const useBalance = (axios, filters) => {

  const [balance, setBalance] = useState(0.0);
  const [inflow, setInflow] = useState(0.0);
  const [outflow, setOutflow] = useState(0.0);

  useEffect(() => {
    fetchBalance(axios, filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses } = data;
        setBalance(balance);
        setInflow(incomes);
        setOutflow(expenses);
      }
    });
  },[filters.periodType, filters.startDate, filters.endDate, filters.tagId]);

  return {
      balance,
      inflow,
      outflow
  }
}