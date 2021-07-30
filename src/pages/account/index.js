import React, { Component } from 'react';
import { Col, Row, Typography } from 'antd';

import TransactionsComponent from '../../components/Transactions';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount } from '../../ws/BalanceAPI';

class Account extends Component {
  
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    this.state = {
      account: {
        id: accountId
      },
      title: null,
      filters: {
        accountId: accountId,
        periodType: "current_month",
        startDate: null,
        endDate: null,
      }
    }
  }

  componentDidMount() {
    fetchAccount(this.props.axios, this.state.account.id, resp => {
      if (resp) {
        const account = resp.data;
        this.setState({
          account: account,
          title: account.alias,
        });
      }
    });
  }

  
  render() {
    return (
      <>
        <Row>
          <Col>
            <Typography.Title>{this.state.title}</Typography.Title>  
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TransactionsComponent filters={this.state.filters} />
          </Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Account);

