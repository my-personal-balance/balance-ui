import axios from 'axios';
import axiosRetry from 'axios-retry';
import qs from 'qs';
import { getAccessToken,  } from '../container/AuthProvider';

export const createAxiosClient = () => {

  const instance = axios.create({
    baseURL: window.env.REACT_APP_API_BASE_URL,
    paramsSerializer: {
      serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
    }
  });

  instance.interceptors.request.use(request => {
    const accessToken = getAccessToken();
    request.headers.Authorization = `Bearer ${accessToken}`;
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        window.location = '/logout';
      } else {
        return Promise.reject(error);
      }
    }
  );
  
  axiosRetry(instance, { retries: 3 });
  return instance;
};