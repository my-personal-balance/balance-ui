import { paramsToSnakeCase } from '.';

export function createTransaction(axios, params, callback) {
  axios
    .post(`/transactions`, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

  export function updateTransaction(axios, transactionId, params, callback) {
  axios
    .put(`/transactions/${transactionId}`, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

  export function updateTransactions(axios, params, callback) {
  axios
    .patch(`/transactions`, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function fetchTransactions(axios, filters, callback) {
  axios
    .get(`/transactions`,
      {
        params: paramsToSnakeCase(filters)
      })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function deleteTransaction(axios, transactionId, callback) {
  axios
    .delete(`/transactions/${transactionId}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function uploadTransactions(axios, formData, callback) {
  axios
    .post(`/upload`, formData)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}