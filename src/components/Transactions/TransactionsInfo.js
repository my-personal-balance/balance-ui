import { Component } from 'react';
import { Col, DatePicker, Layout, Row, } from 'antd';

import TransactionTable from './TransactionTable';
import Loader from '../Loader';
import Balance from '../Balance';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions, } from '../../ws/BalanceAPI';

const { RangePicker } = DatePicker;

class TransactionsInfo extends Component {

  constructor(props) {
    super(props);
    const { filters } = this.props;
    this.state = {
      transactions: null,
      filters: filters,
    }
  }

  updateInfoData() {
    fetchTransactions(this.props.axios, this.state.filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses, transactions } = data;
        this.setState({ balance, incomes, expenses, transactions,});
      }
    });
  }

  componentDidMount() {
    this.updateInfoData();
  }

  handleRangePickerChange(values, stringDates) {
    const filters = this.state.filters;
    filters.periodType = "custom";
    filters.startDate = stringDates[0];
    filters.endDate = stringDates[1];
    this.setState({ filters });
  }

  onOpenChange(isOpen) {
    if (!isOpen) {
      this.updateInfoData();
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
            <Layout.Content className="site-layout-background">
              {this.state.transactions ?
                <TransactionTable
                  items={this.state.transactions}
                  accountId={this.state.filters.accountId}
                  refresh={() => this.updateInfoData()}
                />
              : <Loader /> }
            </Layout.Content>
          </Col>
        </Row>
      </>
    );
  }
  
}

export default withAxios(TransactionsInfo);