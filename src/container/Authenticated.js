import React, { useState } from 'react';
import {
  Navigate,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import axios from 'axios';
import axiosRetry from 'axios-retry';
import qs from 'qs';

import Login from '../pages/login';
import { LoginRedirect } from '../pages/auth/complete/';

const AUTHORIZATION_QUERY_PARAMETERS = {
  redirect_uri: window.env.REACT_APP_REDIRECT_URI,
};

const AUTHORIZATION_ENDPOINT = `${window.env.REACT_APP_API_BASE_URL}/oauth2/token`;

const ACCESS_TOKEN_KEY = 'access-token';
const STATE_KEY = 'oauth2-state';

const AuthenticatedContext = React.createContext(null);

const AuthenticatedComponent = ({children}) => {
  
  const axiosClient = createAxiosClient(() => logout());

  let currentAccessToken = getAccessToken();

  const [accessToken, setAccessToken] = useState(currentAccessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(currentAccessToken ? true : false);
  
  const login = (newAccessToken) => {
    storeAccessToken(newAccessToken);
    setAccessToken(newAccessToken);
    setIsLoggedIn(true);
  }

  const logout = () => {
    setIsLoggedIn(false);
    setAccessToken(null);
    removeAccessToken();
  }

  const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  const storeAccessToken = (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }

  const handleRedirect = (accessToken) => {
    login(accessToken);
  }
  
  const router = createBrowserRouter([
    {
      path: "login",
      element: <Login axios={axiosClient} redirectUrl={AUTHORIZATION_QUERY_PARAMETERS.redirect_uri} authorizationEndpoint={getAuthorizationEndpoint} />,
    },
    {
      path: "auth/complete/",
      element: <LoginRedirect setAccessToken={handleRedirect} />,
    },
    {
      path: "*",
      element: <Navigate replace to="/login" />
    }
  ]);
  
  const renderBody = () => {
    if (isLoggedIn) {
      return children;
    } else {
      return (
        <RouterProvider router={router} />
      );
    }
  }

  return (
    <AuthenticatedContext.Provider value={{ accessToken: accessToken, axios: axiosClient }}>
      {renderBody()}
    </AuthenticatedContext.Provider>
  );
}

export const Authenticated = AuthenticatedComponent;

const createAxiosClient = (logout) => {
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
        logout();
      }
      return Promise.reject(error);
    }
  );
  
  axiosRetry(instance, { retries: 3 });
  return instance;
};

export const withAxios = (WrappedComponent) => (props) => (
  <AuthenticatedContext.Consumer>
    {
      ({ axios }) => <WrappedComponent {...props} axios={axios} />
    }
  </AuthenticatedContext.Consumer>
)

const getAccessToken = () => {
  const value = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (value) {
    return JSON.parse(value);
  }
}

const getRandomString = (length = 20) => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const chars = [];
  if (window.crypto) {
    const random_bytes = new Uint8Array(length);
    window.crypto.getRandomValues(random_bytes);
    for (const random_byte of random_bytes) {
      chars.push(alphabet.charAt(random_byte % alphabet.length));
    }
  } else {
    // insecure fallback used when window.crypto is not available e.g. during tests.
    for (let i = 0; i < length; i++) {
      chars.push(alphabet.charAt(Math.floor(Math.random() * Math.floor(alphabet.length))));
    }
  }
  return chars.join('');
}

const getAuthorizationEndpoint = () => {
  const state = getRandomString();
  sessionStorage.setItem(STATE_KEY, state);
  return getAuthorizationUrl(state);
}

const getAuthorizationUrl = (state) => {
  const params = {
    ...AUTHORIZATION_QUERY_PARAMETERS,
    state: state
  };
  const query = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join('&');
  return `${AUTHORIZATION_ENDPOINT}?${query}`;
}
