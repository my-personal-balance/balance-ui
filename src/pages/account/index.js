import React, { Component } from 'react';
import { Layout, Col, Row, Typography } from 'antd';

import Balance from '../../components/Balance';
import TransactionTable from '../../components/TransactionTable';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount, fetchTransactions } from '../../ws/BalanceAPI';

class Account extends Component {
  
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    this.state = {
      accountId: accountId,
      account: {
        alias: null,
        balance: 0.0,
      },
      transactions: null,
    }
  }

  componentDidMount() {

    fetchAccount(this.props.axios, this.state.accountId, resp => {
      if (resp) {
        const account = resp.data;
        this.setState({ account: account });

        const filters = { accountId: account.id, }
        fetchTransactions(this.props.axios, filters, response => {
          if (response) {
            const { data } = response;
            this.setState({ transactions: data.transactions });
          }
        });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>{this.state.account.alias}</Typography.Title>
        <Balance balance={this.state.account.balance} />
        <Layout.Content
          className="site-layout-background"
          style={{
            borderRadius: "25px",
            margin: '24px 16px',
            padding: 24,
          }}
        >
          <Typography.Title level={4}>Transactions</Typography.Title>
          <TransactionTable items={this.state.transactions} />
        </Layout.Content>

      </>
    );
  }
}

export default withAxios(Account);

