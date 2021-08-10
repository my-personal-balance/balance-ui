import { useState, useEffect } from 'react';
import { Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import BalanceCard from './BalanceCard';

import { withAxios } from '../../container/Authenticated';
import { fetchBalance, } from '../../ws/BalanceAPI';

import "./index.css";

const Balance = (props) => {

  const { filters } = props;

  const [balance, setBalance] = useState(0.0);
  const [incomes, setIncomes] = useState(0.0);
  const [expenses, setExpenses] = useState(0.0);

  useEffect(() => {
    asyncFetchBalance();
  },[filters.periodType, filters.startDate, filters.endDate]);

  const asyncFetchBalance = () => {
    fetchBalance(props.axios, filters, response => {
      const { data } = response;
      if (data) {
        const { balance, incomes, expenses } = data;
        setBalance(balance);
        setIncomes(incomes);
        setExpenses(expenses);
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
          title="Income"
          value={incomes}
          color="#51b44f"
          icon={<ArrowUpOutlined />}
          sign="+"
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Expense"
          value={expenses}
          color="#e64b30"
          icon={<ArrowUpOutlined />}
          sign="-"
        />
      </Col>
    </Row>
  );
}

export default withAxios(Balance);