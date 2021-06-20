/**
 * Retrieve projects data
 */
 export function fetchAccounts(axios, callback) {
  axios
    .get(`/users/1/accounts`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}


/**
 * Retrieve projects data
 */
 export function fetchTransactions(axios, callback) {
  axios
    .get(`/users/1/transactions`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}