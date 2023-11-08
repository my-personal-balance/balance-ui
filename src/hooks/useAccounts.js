import { useState, useEffect } from 'react';

import { fetchAccounts, } from '../ws/accounts';

export const useAccounts = (axios) => {

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts(axios, response => {
      const { error, data } = response;
      if (error) {
        // openNotificationWithIcon('error', "Failed to fetch accounts", "There was an error while fetching accounts. Please reload the page.");
      } else if (data) {
        setAccounts(data.accounts);
      }
    });
  },[axios]);

  return {
    accounts
  }
}