export function fetchTags(axios, callback) {
  axios
    .get(`/tags`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}
  