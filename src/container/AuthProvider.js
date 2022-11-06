import React, { useEffect, useMemo, useState } from 'react';
import { createAxiosClient } from '../utils/axios';

const ACCESS_TOKEN_KEY = 'access-token';

const AuthenticatedContext = React.createContext(null);

const AuthProvider = (props) => {
  
  const axiosClient = createAxiosClient();

  let currentAccessToken = getAccessToken();

  const [accessToken, setAccessToken] = useState(currentAccessToken);
  const [isLoggedIn, setIsLoggedIn] = useState(currentAccessToken ? true : false);

  useEffect(() => {
    console.log("Is loggedId -> %s", isLoggedIn);
  }, [accessToken, isLoggedIn]);
  
  const storeAccessToken = (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }
  
  const removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

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

  const value = useMemo(() => {
    return ({
      accessToken,
      isLoggedIn,
      login,
      logout,
      axios: axiosClient,
    });
  }, [accessToken, isLoggedIn, axiosClient]);

  return <AuthenticatedContext.Provider value={value} {...props} />
}

export default AuthProvider;

export const withAxios = (WrappedComponent) => (props) => (
  <AuthenticatedContext.Consumer>
    {
      ({ axios }) => <WrappedComponent {...props} axios={axios} />
    }
  </AuthenticatedContext.Consumer>
)

export const useAuth = () => {
  const context = React.useContext(AuthenticatedContext);
  if (!context) {
    throw Error("Error while retrieving auth context");
  }
  return context;
}

export const getAccessToken = () => {
  const value = localStorage.getItem(ACCESS_TOKEN_KEY);
  if (value) {
    return JSON.parse(value);
  }
}