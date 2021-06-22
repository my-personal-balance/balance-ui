import React, { Component } from 'react';
import {Typography } from 'antd';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount, fetchTransactions } from '../../ws/BalanceAPI';
import TransactionsInfo from '../../components/TransactionsInfo';

class Account extends Component {
  
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    this.state = {
      accountId: accountId,
      account: {
        alias: null,
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
    });
  }

  render() {
    return (
      <>
        <Typography.Title>{this.state.account.alias}</Typography.Title>
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

export default withAxios(Account);

