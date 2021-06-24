import { Col, Row, Typography } from 'antd';

import TransactionsInfo from './TransactionsInfo';

const TransactionsComponent = (props) => (
  <>
    <Row>
      <Col>
        <Typography.Title>{props.title}</Typography.Title>  
      </Col>
    </Row>
    <TransactionsInfo />
  </>
);

export default TransactionsComponent;


