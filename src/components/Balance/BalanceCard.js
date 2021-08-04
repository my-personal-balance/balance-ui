import { Card, Col, Row, Typography } from 'antd';

import Loader from '../Loader';

const BalanceCard = ({title, value, color, icon}) => (
  <Card>
    <Row>
      <Col>
        <Typography.Title level={5}>{title}</Typography.Title>  
      </Col>
    </Row>
    <Row>
      <Col span={20}>
        <Row>
          <Col>
            <Typography.Title level={2}><BalanceValue value={value} /></Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={4}>
        <div className="icon-wrap icon-view" style={{backgroundColor: color}}>
          {icon}  
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

BalanceCard.BalanceValue = BalanceValue;
export default BalanceCard;