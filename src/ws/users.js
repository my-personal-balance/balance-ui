export function fetchUser(axios, callback) {
  axios
    .get(`/users`)
    .then((res) => callback({ data: res.data }))
    .catch((err) => callback({ error: err }));
}