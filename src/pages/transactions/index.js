import React, { Component } from 'react';
import { Typography } from 'antd';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';
import TransactionsInfo from '../../components/TransactionsInfo';

class Transactions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      transactions: null,
      filters: {
        periodType: "current_month"

      }
    }
  }

  componentDidMount() {
    fetchTransactions(this.props.axios, this.state.filters, (response) => {
      if (response) {
        const { data } = response;
        const { balance, incomes, expenses, transactions } = data;
        
        this.setState({
          balance: balance,
          incomes: incomes,
          expenses: expenses,
          transactions: transactions,
        });
        
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Transactions</Typography.Title>
        <TransactionsInfo
          balance={this.state.balance}
          incomes={this.state.incomes}
          expenses={this.state.expenses}
          transactions={this.state.transactions}
        />
      </>
    );
  }
}

export default withAxios(Transactions);

