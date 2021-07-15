import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

export class LoginRedirect extends Component {
  render() {
    this.props.setAccessToken();
    return <Redirect to={{
      pathname: "/",
      state: { from: this.props.locations }
    }} />
  }
};