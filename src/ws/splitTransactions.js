import { paramsToSnakeCase } from '.';

export function splitTransaction(axios, transactionId, params, callback) {
  axios
    .post(`/transactions/${transactionId}/split`, { transactions: paramsToSnakeCase(params) })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}