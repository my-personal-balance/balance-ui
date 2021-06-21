import { Layout, Col, Row, Typography } from 'antd';

import Loader from './Loader';

const Balance = ({balance}) => (
  <Layout.Content
    className="site-layout-background"
    style={{
      borderRadius: "25px",
      margin: '24px 16px',
      padding: 24,
    }}
  >
    <Row>
      <Col>
        <Typography.Title level={4}>Balance</Typography.Title>  
      </Col>
    </Row>
    <Row>
      <Col>
        <Typography.Title level={2}><BalanceValue value={balance} /></Typography.Title>
      </Col>
    </Row>
  </Layout.Content>
)

const BalanceValue = ({value}) => {
  if (value) {
    const sign = value >= 0.0 ? "+" : "-";
    const val = new Intl.NumberFormat('en-US').format(value);
    return (<>{sign} {val}</>);
  } else {
    return (<Loader />);
  }
}

Balance.BalanceValue = BalanceValue;
export default Balance;