export function signin(axios, uri, params, callback) {
  axios
    .post(uri, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

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
    .get(`/accounts`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

/**
 * Retrieve projects data
 */
export function createAccount(axios, data, callback) {
  axios
    .post(`/accounts`, data)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

/**
 * Retrieve projects data
 */
export function fetchAccount(axios, accountId, callback) {
  axios
    .get(`/accounts/${accountId}`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}


/**
 * Transactions
 */
export function createTransaction(axios, params, callback) {
  axios
    .post(`/transactions`, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function fetchTransactions(axios, filters, callback) {
  axios
    .get(`/transactions`, {
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

export function searchAssets(axios, keywords, callback) {
  axios
    .get(`/assets`, {
      params: paramsToSnakeCase(keywords)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}


export function fetchBalance(axios, filters, callback) {
  axios
    .get(`/reports/balance`, {
      params: paramsToSnakeCase(filters)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

