import { Component } from 'react';
import { Col, DatePicker, Layout, Row, } from 'antd';

import TransactionTable from './TransactionTable';
import Loader from '../Loader';
import Balance from '../Balance';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts, fetchTransactions } from '../../ws/BalanceAPI';

const { RangePicker } = DatePicker;

class TransactionsInfo extends Component {

  constructor(props) {
    super(props);
    const { accountId } = this.props;
    this.state = {
      transactions: null,
      filters: {
        accountId: accountId,
        periodType: "current_month",
        startDate: null,
        endDate: null,
      },
    }
  }

  updateTransactionsRange() {
    fetchTransactions(this.props.axios, this.state.filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses, transactions } = data;
        this.setState({ balance, incomes, expenses, transactions,});
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

export default withAxios(TransactionsInfo);