import { paramsToSnakeCase } from '.';

export function fetchBalance(axios, params, callback) {
  axios
    .get(`/balance`, {
      params: paramsToSnakeCase(params)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}