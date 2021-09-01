import { Col, Row, Typography, } from 'antd';

import TransactionsComponent from "../../components/Transactions";

const Dashboard = () => (
  <>
    <Row>
      <Col>
        <Typography.Title>Dashboard</Typography.Title>
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <TransactionsComponent
          hideTagInsights={true}
          filters={{}}
        />
      </Col>
    </Row>
  </>
);

export default Dashboard;


