import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Row, Typography } from 'antd';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts } from '../../ws/BalanceAPI';

class Accounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accounts: null  
    }
  }

  componentDidMount() {

    fetchAccounts(this.props.axios, (response) => {
      if (response) {
        const { data } = response;
        const accounts = data.items.map((account)=> {
          return (
            <Account account={account} />
          ); 
        });
        this.setState({ accounts });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Accounts</Typography.Title>
        {this.state.accounts}
      </>
    );
  }
}

export default withAxios(Accounts);

const Account = ({account}) => (
  <Row>
    <Col>
      <Link to={`/accounts/${account.id}`}>{account.alias}</Link>
    </Col>
  </Row>
);
