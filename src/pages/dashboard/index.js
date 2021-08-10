import { Col, Row, Typography } from 'antd';

import Balance from '../../components/Balance';

const Dashboard = (props) => (
  <>
      <Row>
        <Col>
          <Typography.Title>Dashboard</Typography.Title>
        </Col>  
      </Row>
      <Row>
        <Col span={24}>
          <Balance filters={{ periodType: "current_month", }} />
        </Col>
      </Row>
    </>
)

export default Dashboard;