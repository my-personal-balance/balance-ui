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
 export function fetchAccount(axios, accountId, callback) {
  axios
    .get(`/users/1/accounts/${accountId}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}


/**
 * Retrieve projects data
 */
 export function fetchTransactions(axios, filters, callback) {
  axios
    .get(`/users/1/transactions`, {
      params: paramsToSnakeCase(filters)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

/**
 * Retrieve user info
 */
 export function createTransaction(axios, params, callback) {
  axios
    .post(`/users/1/transactions`, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

const paramsToSnakeCase = (params) => {
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