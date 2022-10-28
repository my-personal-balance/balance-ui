export function searchAssets(axios, keywords, callback) {
  axios
    .get(`/assets`, {
      params: paramsToSnakeCase(keywords)
    })
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}
  