import { Layout, Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  BankOutlined,
} from '@ant-design/icons';

import Balance from './Balance';
import TransactionTable from './TransactionTable';

const TransactionsInfo = ({ balance, incomes, expenses, transactions }) => {

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
        <Balance title="Balance" value={balance} color="#2194f2">
          <BankOutlined />
        </Balance>
        </Col>
        <Col span={8}>
        <Balance title="Income" value={incomes} color="#4baf4f">
          <ArrowUpOutlined />
        </Balance>
        </Col>
        <Col span={8}>
        <Balance title="Expenses" value={expenses} color="#f44235">
          <ArrowUpOutlined />
        </Balance>
        </Col>
      </Row>
      <Row className="transactions">
        <Col span={24}>
        <Layout.Content
          className="site-layout-background"
          style={{
          borderRadius: "25px",
          padding: 24,
          }}
        >
          <TransactionTable items={transactions} />
        </Layout.Content>
        </Col>
      </Row>
    </>
  );
  
}

export default TransactionsInfo;