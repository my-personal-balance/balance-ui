import { paramsToSnakeCase } from '.';

export function fetchReportTransactions(axios, filters, callback) {
  axios
    .get(`/reports/transactions`, {params: paramsToSnakeCase(filters)})
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function fetchReportTrends(axios, filters, callback) {
  axios
    .get(`/reports/trends`, {params: paramsToSnakeCase(filters)})
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}
