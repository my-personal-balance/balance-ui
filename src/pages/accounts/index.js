import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Layout, Row, Typography } from 'antd';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts } from '../../ws/BalanceAPI';
import Balance from '../../components/Balance';

class Accounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accounts: []  
    }
  }

  componentDidMount() {

    fetchAccounts(this.props.axios, (response) => {
      if (response) {
        const { data } = response;
        const { accounts } = data;
        this.setState({ accounts });

        let balance = 0.0;
        accounts.forEach(account => {
          balance += account.balance;
        });

        this.setState({ balance });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Accounts</Typography.Title>
        <Row>
          <Col span={18}><AccountsView accounts={this.state.accounts} /></Col>
          <Col span={6}><BalanceView balance={this.state.balance} /></Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Accounts);

const AccountsView = ({ accounts }) => {

  const accs = accounts.map((account)=> {
    return (
      <Col
        span={8}
        key={account.id}
      >
        <Account account={account} />
      </Col>
    );
  });

  return (
    <Row gutter={16}>
      {accs}
    </Row>
  );
}

const Account = ({ account }) => (
  <Layout.Content
    className="site-layout-background"
    style={{
      borderRadius: "25px",
      margin: '24px 16px',
      padding: 24,
    }}
  >
    <Row>
      <Col>
        <Link to={`/accounts/${account.id}`}>
          <Typography.Title level={2}>{account.alias}</Typography.Title>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col span={16}>
        <Link to={`/accounts/${account.id}`}>
          Current balance:  
        </Link>
      </Col>
      <Col span={8}>
        <Link to={`/accounts/${account.id}`}>
          <Balance.BalanceValue value={account.balance} />
        </Link>
      </Col>
    </Row>
  </Layout.Content>
);

const BalanceView = ({ balance }) => (
  <Layout.Content
    className="site-layout-background"
    style={{
      borderRadius: "25px",
      margin: '24px 16px',
      padding: 24,
    }}
  >
    <Row>
      <Col>
        <Typography.Title level={5}>Current balance {'>'}</Typography.Title>
      </Col>
    </Row>
    <Row>
      <Col>
        <Typography.Title level={2}><Balance.BalanceValue value={balance} /></Typography.Title>
      </Col>
    </Row>
  </Layout.Content>
);
