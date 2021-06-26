import React, { Component } from 'react';
import { Col, Row, Typography } from 'antd';

import Balance from '../../components/Balance';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';

class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filters: {
        periodType: "current_month",
      }
    }
  }
  componentDidMount() {
    fetchTransactions(this.props.axios, this.state.filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses } = data;
        this.setState({ balance, incomes, expenses,});
      }
    });
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <Typography.Title>Dashboard</Typography.Title>
          </Col>  
        </Row>
        <Row>
          <Col span={24}>
            <Balance balance={this.state.balance} incomes={this.state.incomes} expenses={this.state.expenses} />
          </Col>
        </Row>
      </>
    );
  }

}

export default withAxios(Dashboard);