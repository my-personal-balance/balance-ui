import { Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import BalanceCard from './BalanceCard';

const Balance = ({ balance, incomes, expenses }) => {
  return (
    <Row gutter={16} className="transactions">
      <Col span={8}>
        <BalanceCard title="Balance" value={balance} color="#2194f2">
          <BankOutlined />
        </BalanceCard>
      </Col>
      <Col span={8}>
        <BalanceCard title="Income" value={incomes} color="#51b44f">
          <ArrowUpOutlined />
        </BalanceCard>
      </Col>
      <Col span={8}>
        <BalanceCard title="Expense" value={expenses} color="#e64b30">
          <ArrowUpOutlined />
        </BalanceCard>
      </Col>
    </Row>
  );
}

export default Balance;