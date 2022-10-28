export function fetchAccounts(axios, callback) {
  axios
    .get(`/accounts`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function createAccount(axios, data, callback) {
  axios
    .post(`/accounts`, data)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function fetchAccount(axios, accountId, callback) {
  axios
    .get(`/accounts/${accountId}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function deleteAccount(axios, accountId, callback) {
  axios
    .delete(`/accounts/${accountId}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}
