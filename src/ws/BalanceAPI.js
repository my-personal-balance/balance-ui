/**
 * Retrieve user info
 */
 export function fetchUser(axios, callback) {
  axios
    .get(`/users`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

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
 export function createAccount(axios, data, callback) {
  axios
    .post(`/users/1/accounts`, data)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

/**
 * Retrieve projects data
 */
 export function fetchAccount(axios, account_id, callback) {
  axios
    .get(`/users/1/accounts/${account_id}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}


/**
 * Retrieve projects data
 */
 export function fetchTransactions(axios, filters, callback) {
  axios
    .get(`/users/1/transactions`, {
      params: parseParameters(filters)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

/**
 * Retrieve user info
 */
 export function createTransaction(axios, params, callback) {
  axios
    .post(`/users/1/transactions`, parseParameters(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

const parseParameters = (params) => {
  if (params) {
    const keyValues = Object.keys(params).map(key => {
      const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
      return { [newKey]: params[key] };
    });
    return Object.assign({}, ...keyValues);
  } else {
    return null;
  }
}