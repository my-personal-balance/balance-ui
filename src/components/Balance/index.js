import { Col, Row } from 'antd';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  BankOutlined,
} from '@ant-design/icons';

import BalanceCard from './BalanceCard';
import "./index.css";

import { withAxios } from '../../container/AuthProvider';
import { useBalance } from '../../hooks/useBalance';

const Balance = (props) => {

  const { filters } = props;

  const { balance, inflow, outflow } = useBalance(props.axios, filters);
  
  return (
    <Row gutter={16} className="balance">
      <Col span={8}>
        <BalanceCard
          title="Balance"
          value={balance}
          color="#2194f2"
          icon={<BankOutlined />}
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Inflow"
          value={inflow}
          color="#51b44f"
          icon={<ArrowUpOutlined />}
          prefix="+"
        />
      </Col>
      <Col span={8}>
        <BalanceCard
          title="Outflow"
          value={outflow}
          color="#e64b30"
          icon={<ArrowDownOutlined />}
          prefix="-"
        />
      </Col>
    </Row>
  );
}

export default withAxios(Balance);