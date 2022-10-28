import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Row, Typography } from 'antd';
import {
  EuroCircleOutlined,
} from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts } from '../../ws/accounts';

import BalanceCard from '../../components/Balance/BalanceCard';
import AddAccountButton from './AddAcountModal';

const Accounts = (props) => {

  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(0.0);

  useEffect(() => {
    asyncFetchAccounts();
  },[]);

  const asyncFetchAccounts = () => {
    fetchAccounts(props.axios, response => {
      if (response && response.data) {
        const { data } = response;
        const { accounts } = data;
        setAccounts(accounts);

        let accountsBalance = 0.0;
        accounts.forEach(account => {
          accountsBalance += account.balance;
        });
        setBalance(accountsBalance);
      }
    });
  }
  
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
            <AccountsView accounts={accounts} />
          </Row>
        </Col>
        <Col span={6} offset={2}>
          <BalanceCard
            title="Current balance >"
            value={balance}
            color="rgb(33, 150, 243)"
            icon={<EuroCircleOutlined />}
            prefix="+"
          />
        </Col>
      </Row>
    </>
  );

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
  <Link to={`/accounts/${account.id}`}>
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
