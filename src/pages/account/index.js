import React, { Component } from 'react';

import TransactionsComponent from '../../components/Transactions';

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
        <TransactionsComponent title={this.state.account.alias} accountId={this.state.account.id} />
      </>
    );
  }
}

export default withAxios(Account);

