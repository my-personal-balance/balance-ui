import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Row, Typography } from 'antd';
import {
  EuroCircleOutlined,
} from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts } from '../../ws/BalanceAPI';

import BalanceCard from '../../components/Balance/BalanceCard';
import AddAccountButton from './AddAcountModal';

class Accounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accounts: []  
    }
  }

  loadAccounts () {
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

  componentDidMount() {
    this.loadAccounts();
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <Typography.Title>Accounts</Typography.Title>
          </Col>  
        </Row>
        <Row>
          <Col>
            <AddAccountButton refresh={() => this.loadAccounts()}/>
          </Col>
        </Row>
        <Row className="secction">
          <Col span={16}>
            <Row>
              <AccountsView accounts={this.state.accounts} />
            </Row>
          </Col>
          <Col span={6} offset={2}>
            <BalanceCard
              title="Current balance >"
              value={this.state.balance}
              color="rgb(33, 150, 243)"
              icon={<EuroCircleOutlined />}
            />
          </Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Accounts);

const AccountsView = ({ accounts }) => (
  <>
    <Row>
      {accounts.map(account => (
        <Col key={account.id} span={16} className="account-col">
          <Account account={account} />
        </Col>
      ))}
    </Row>
  </>
);

const Account = ({ account }) => (
  <Link to={`/accounts/${account.id}/transactions`}>
    <Card className="balance-card">
      <Row>
        <Col span={12}>
          <Typography.Title level={3}>{account.alias}</Typography.Title>
        </Col>
        <Col offset={6}>
          <Typography.Title level={5}>
            <BalanceCard.BalanceValue value={account.balance} />
          </Typography.Title>
        </Col>
      </Row>
    </Card>
  </Link>
);
