import { Col, Row, Typography, } from 'antd';

import TransactionsComponent from "../../components/Transactions";

const Insights = (props) => {
  return (
    <>
      <Row>
        <Col>
          <Typography.Title>Insights</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TransactionsComponent
            filters={{ periodType: "current_month",}}
          />
        </Col>
      </Row>
    </>
  );
}

export default Insights;
