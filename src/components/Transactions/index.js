import { Col, Row, Typography } from 'antd';

import TransactionsInfo from './TransactionsInfo';

const TransactionsComponent = (props) => (
  <>
    <Row>
      <Col>
        <Typography.Title>{props.title}</Typography.Title>  
      </Col>
    </Row>
    <Row>
      <Col span={24}>
        <TransactionsInfo accountId={props.accountId} />
      </Col>
    </Row>
  </>
);

export default TransactionsComponent;


