import React, { Component } from 'react';
import { Col, Row, Typography } from 'antd';

import TransactionsInfo from '../../components/TransactionsInfo';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount } from '../../ws/BalanceAPI';

class Account extends Component {
  
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    this.state = {
      account: {
        id: accountId,
        alias: null,
      },
    }
  }

  componentDidMount() {
    fetchAccount(this.props.axios, this.state.account.id, resp => {
      if (resp) {
        const account = resp.data;
        this.setState({ account: account });
      }
    });
  }

  
  render() {
    return (
      <>
        <Row>
          <Col>
            <Typography.Title>{this.state.account.alias}</Typography.Title>  
          </Col>
        </Row>
        <TransactionsInfo accountId={this.state.account.id} />
      </>
    );
  }
}

export default withAxios(Account);

