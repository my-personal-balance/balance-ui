import React, { Component } from 'react';

import { Col, DatePicker, Row, Typography } from 'antd';
import { render } from '@testing-library/react';

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
        periodType: "current_month",
        startDate: null,
        endDate: null,
      }
    }
  }

  updateTransactionsRange() {

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
      </>
    );
  }
}

export default withAxios(Insights);


