export function signin(axios, uri, params, callback) {
  axios
    .post(uri, paramsToSnakeCase(params))
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

export function fetchUser(axios, callback) {
  axios
    .get(`/users`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

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

export function fetchBalance(axios, params, callback) {
  axios
    .get(`/balance`, {
      params: paramsToSnakeCase(params)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

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

const paramsToSnakeCase = (params) => {
  if (params) {

    if (params instanceof Array) {
      return params.map(p => paramsToSnakeCase(p));
    } else {

      const keyValues = Object.keys(params).map(key => {
        const newKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
        
        let value = params[key];
        if (value && value instanceof Object && !value._isAMomentObject) {
          value = paramsToSnakeCase(params[key]);
        }
  
        return { [newKey]: value };
      });
  
      return Object.assign({}, ...keyValues);
    }
    
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

export function fetchTags(axios, callback) {
  axios
    .get(`/tags`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}

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
