import { Component } from 'react';
import { Col, DatePicker, Layout, Row, } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import Balance from '../Balance';
import TransactionTable from './TransactionTable';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';

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

  componentDidMount() {
    this.updateTransactionsRange();
  }

  handleRangePickerChange(values, stringDates) {
    console.log(stringDates);
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
        <Row gutter={16} className="transactions">
          <Col span={8}>
          <Balance title="Balance" value={this.state.balance} color="#2194f2">
            <BankOutlined />
          </Balance>
          </Col>
          <Col span={8}>
          <Balance title="Income" value={this.state.incomes} color="#4baf4f">
            <ArrowUpOutlined />
          </Balance>
          </Col>
          <Col span={8}>
          <Balance title="Expenses" value={this.state.expenses} color="#f44235">
            <ArrowUpOutlined />
          </Balance>
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
            <TransactionTable items={this.state.transactions} />
          </Layout.Content>
          </Col>
        </Row>
      </>
    );
  }
  
}

export default withAxios(TransactionsInfo);