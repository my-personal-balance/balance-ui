import React, { Component } from 'react';

import { Col, DatePicker, Layout, Row, Typography } from 'antd';

import TransactionTable from '../../components/Transactions/TransactionTable';
import Loader from '../../components/Loader';
import Balance from '../../components/Balance';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts, fetchTransactions } from '../../ws/BalanceAPI';

const { RangePicker } = DatePicker;

class Insights extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
      filters: {
        accountId: null,
        periodType: null,
        startDate: null,
        endDate: null,
      }
    }
  }

  updateTransactionsRange() {
    fetchTransactions(this.props.axios, this.state.filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses, transactions } = data;
        this.setState({ balance, incomes, expenses, transactions });
      }
    });
  }
  
  componentDidMount() {
    fetchAccounts(this.props.axios, response => {
      const { data } = response;
      if (data) {
        this.setState({ accounts: data.accounts });
        this.updateTransactionsRange();
      }
    });
  }

  handleRangePickerChange(values, stringDates) {
    const filters = this.state.filters;
    filters.periodType = "custom";
    filters.startDate = stringDates[0];
    filters.endDate = stringDates[1];
    this.setState(filters);
  }

  onOpenChange(isOpen) {
    if (!isOpen) {
     this.updateTransactionsRange();
    }
  }

  render() {
    return (
      <>
        <Row>
        <Col>
          <Typography.Title>Insights</Typography.Title>  
        </Col>
        </Row>
        <Row>
          <Col offset={20}>
            <RangePicker bordered={false} onChange={(x, y) => this.handleRangePickerChange(x, y)} onOpenChange={(x) => this.onOpenChange(x)} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Balance balance={this.state.balance} incomes={this.state.incomes} expenses={this.state.expenses} />
          </Col>
        </Row>
        <Row className="transactions">
          <Col span={24}>
            <Layout.Content
              className="site-layout-background"
              style={{
              borderRadius: "25px",
              padding: 24,
              }}
            >
              {this.state.transactions && this.state.accounts ?
                <TransactionTable items={this.state.transactions} accounts={this.state.accounts} />
              : <Loader /> }
            </Layout.Content>
          </Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Insights);


