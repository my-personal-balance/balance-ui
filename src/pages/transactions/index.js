import React, { Component } from 'react';

import { Col, Layout, Row, Typography } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';
import TransactionsInfo from '../../components/TransactionsInfo';

class Transactions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      transactions: null
    }
  }

  componentDidMount() {
    fetchTransactions(this.props.axios, null, (response) => {
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
      <TransactionsInfo
        balance={this.state.balance}
        incomes={this.state.incomes}
        expenses={this.state.expenses}
        transactions={this.state.transactions}
      />
    );
  }
}

export default withAxios(Transactions);


