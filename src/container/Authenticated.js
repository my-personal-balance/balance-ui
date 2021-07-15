import React, { Component } from 'react';

import axios from 'axios';
import axiosRetry from 'axios-retry';
import qs from 'qs';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from '../pages/login';
import { LoginRedirect } from '../pages/auth/complete/';

const API_HOST = "http://localhost:5000";
const AUTHORIZATION_ENDPOINT = `${API_HOST}/oauth2/token`;

const ACCESS_TOKEN_KEY = 'access-token';
const STATE_KEY = 'oauth2-state';

const AUTHORIZATION_QUERY_PARAMETERS = {
  redirect_uri: "http://localhost:3000/auth/complete/",
};

const AuthenticatedContext = React.createContext(null);

class AuthenticatedComponent extends Component {
  
  constructor(props) {
    super(props);
    const accessToken = this.getAccessToken();
    const isLoggedIn = accessToken ? true : false;
    const axiosClient = this.createAxiosClient();
    this.state = {
      isLoggedIn: isLoggedIn,
      accessToken: isLoggedIn ? accessToken : null,
      axiosClient: axiosClient,
    }
  }

  login = (accessToken) => {
    this.setAccessToken(accessToken);
    this.setState({
      isLoggedIn: true,
      accessToken: accessToken
    });
  }

  logout = () => {
    this.setState({
      isLoggedIn: false,
      accessToken: null
    });
    this.removeAccessToken();
  }

  setAccessToken = (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify(accessToken));
  }

  getAccessToken = () => {
    const value = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (value) {
      return JSON.parse(value);
    }
  }

  removeAccessToken = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }

  createAxiosClient = () => {
    const instance = axios.create({
      baseURL: API_HOST,
      paramsSerializer: (params) =>
        qs.stringify(params, { arrayFormat: 'repeat', skipNulls: true }),
    });
  
    instance.interceptors.request.use(request => {
      const accessToken = this.getAccessToken();
      request.headers.Authorization = `Bearer ${accessToken}`;
      return request;
    });
  
    instance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          this.logout();
        }
        return Promise.reject(error);
      }
    );
    
    axiosRetry(instance, { retries: 3 });
    return instance;
  };

  createProviderValue = () => {
    return {
      accessToken: this.state.accessToken,
      authenticate: this.logout,
      axios: this.state.axiosClient,
    }
  }

  render() {
    return (
      <AuthenticatedContext.Provider value={this.createProviderValue()}>
        {this.renderBody()}
      </AuthenticatedContext.Provider>
    );
  }

  renderBody() {
    if (this.state.isLoggedIn) {
      return this.props.children;
    } else {
      return (
        <BrowserRouter>
          <Switch>
            <Route path="/login" render={() => <Login axios={this.state.axiosClient} redirectUrl={AUTHORIZATION_QUERY_PARAMETERS.redirect_uri} authorizationEndpoint={getAuthorizationEndpoint} /> } />
            <Route path="/auth/complete" render={() => <LoginRedirect setAccessToken={(() => handleRedirect(this.login))} /> } />
            <Redirect to={{ pathname: "/login" }} />
          </Switch>
        </BrowserRouter>
      );
    }
  }
}

export const Authenticated = AuthenticatedComponent;

export const withAxios = (WrappedComponent) => (props) => (
  <AuthenticatedContext.Consumer>
    {
      ({ axios }) => <WrappedComponent {...props} axios={axios} />
    }
  </AuthenticatedContext.Consumer>
)

function getRandomString(length = 20) {
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

function redirectToAuthorizationEndpoint() {
  const state = getRandomString();
  sessionStorage.setItem(STATE_KEY, state);
  window.location.replace(getAuthorizationUrl(state));
}

function getAuthorizationEndpoint() {
  const state = getRandomString();
  sessionStorage.setItem(STATE_KEY, state);
  return getAuthorizationUrl(state);
}

function getAuthorizationUrl(state) {
  const params = {
    ...AUTHORIZATION_QUERY_PARAMETERS,
    state: state
  };
  const query = Object.entries(params).map(pair => pair.map(encodeURIComponent).join('=')).join('&');
  return `${AUTHORIZATION_ENDPOINT}?${query}`;
}

function handleRedirect(callback) {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const accessToken = params.get('accessToken');
  // const state = params.get('state');
  if (accessToken) {
    // const known_state = sessionStorage.getItem(STATE_KEY);
    // if (state === known_state) {
      sessionStorage.removeItem(STATE_KEY);
      callback(accessToken);
    // } else {
    //   throw new Error('Authentication failed due to state mismatch.');
    // }
  } else {
    throw new Error('Authentication failed due to missing access token.');
  }
}
