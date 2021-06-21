import React, { Component } from 'react';

import { Layout, Typography } from 'antd';

import TransactionTable from '../../components/TransactionTable';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';
import Balance from '../../components/Balance';

class Transactions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      balance: 0.0,
      transactions: null
    }
  }

  componentDidMount() {
    fetchTransactions(this.props.axios, null, (response) => {
      if (response) {
        const { data } = response;
        const { balance, transactions } = data;
        this.setState({ transactions, balance });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Transactions</Typography.Title>
        <Balance balance={this.state.balance} />
        <Layout.Content
          className="site-layout-background"
          style={{
            borderRadius: "25px",
            margin: '24px 16px',
            padding: 24,
          }}
        >
          <TransactionTable items={this.state.transactions} />
        </Layout.Content>
      </>
    );
  }
}

export default withAxios(Transactions);


