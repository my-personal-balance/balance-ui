import { Card, Col, Row, Typography } from 'antd';

import Loader from './Loader';

const Balance = ({title, value, children, color}) => (
  <Card className="balance-card">
    <Row>
      <Col span={20}>
        <Row>
          <Col>
            <Typography.Title level={5}>{title}</Typography.Title>  
          </Col>
        </Row>
        <Row>
          <Col>
            <Typography.Title level={2}><BalanceValue value={value} /></Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={4}>
        <div className="icon-wrap" style={{backgroundColor: color }}>
          {children}  
        </div>
      </Col>
    </Row>
  </Card>
)

const BalanceValue = ({value}) => {
  if (value !== undefined) {
    const sign = value >= 0 ? "+" : "";
    const val = new Intl.NumberFormat('en-US').format(value);
    return (<>{sign} {val}</>);
  } else {
    return (<Loader />);
  }
}

Balance.BalanceValue = BalanceValue;
export default Balance;