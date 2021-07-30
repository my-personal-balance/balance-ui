import { Col, Row, Typography, } from 'antd';

import TransactionsComponent from "../../components/Transactions";

const Insights = () => (
  <>
    <Row>
      <Col>
        <Typography.Title>Insights</Typography.Title>  
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <TransactionsComponent filters={{
          accountId: null,
          periodType: "current_month",
          startDate: null,
          endDate: null,
        }} />
      </Col>
    </Row>
  </>
);

export default Insights;


