import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BankOutlined,
} from '@ant-design/icons';

import BalanceCard from './BalanceCard';

import { withAxios } from '../../container/Authenticated';
import { fetchBalance, } from '../../ws/balance';

import "./index.css";

const Balance = (props) => {

  const { filters } = props;

  const [balance, setBalance] = useState(0.0);
  const [inflow, setInflow] = useState(0.0);
  const [outflow, setOutflow] = useState(0.0);

  useEffect(() => {
    asyncFetchBalance();
  },[filters.periodType, filters.startDate, filters.endDate, filters.tagId]);

  const asyncFetchBalance = () => {
    fetchBalance(props.axios, filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses } = data;
        setBalance(balance);
        setInflow(incomes);
        setOutflow(expenses);
      }
    });
  }
  
  return (
    <Row gutter={16} className="balance">
      <Col span={8}>
        <BalanceCard
          title="Balance"
          value={balance}
          color="#2194f2"
          icon={<BankOutlined />}
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Inflow"
          value={inflow}
          color="#51b44f"
          icon={<ArrowUpOutlined />}
          prefix="+"
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Outflow"
          value={outflow}
          color="#e64b30"
          icon={<ArrowDownOutlined />}
          prefix="-"
        />
      </Col>
    </Row>
  );
}

export default withAxios(Balance);