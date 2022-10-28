import { paramsToSnakeCase } from '.';

export function signin(axios, uri, params, callback) {
  axios
    .post(uri, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}