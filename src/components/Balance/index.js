import { Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import BalanceCard from './BalanceCard';

import "./index.css";

const Balance = ({ balance, incomes, expenses }) => {
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
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Expense"
          value={expenses}
          color="#e64b30"
          icon={<ArrowUpOutlined />}
        />
      </Col>
    </Row>
  );
}

export default Balance;