import axios from 'axios';

const API_HOST = "http://localhost:5000";

export let client;

const createClient = (store) => {
  const instance = axios.create({
    baseURL: API_HOST,
  });
  return instance;
};

export const init = () => {
  client = createClient(window.store);
};
