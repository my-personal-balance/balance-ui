import React, { useState, useEffect } from 'react';
import { Col, Row, Typography } from 'antd';
import {
  Line,
} from '@ant-design/charts';
import moment from 'moment';

import { withAxios } from '../../container/Authenticated';
import { fetchBalance } from '../../ws/BalanceAPI';

import './index.css';

const BalanceChart = (props) => {

  const { axios, filters } = props;

  const [data, setData] = useState([]);
  
  useEffect(() => {
    asyncFetch();
  }, [filters.periodType, filters.startDate, filters.endDate]);

  const asyncFetch = () => {
    fetchBalance(axios, filters, response => {
      const { data } = response;
      if(data) {
        const { balances } = data;
        setData(balances);
      }
    });
  }

  const config = {
    data,
    xField: 'date',
    yField: 'amount',
    height: 200,
    tooltip: {
      formatter: (v) => {
        return { name: moment(v.date).format("DD MMM YY"), value: `€ ${v.amount}` };
      },
    },
    meta: {
      formatter: (v) => {
        return "ha"
      }
    }
  };

  return (
    <div className="balance-chart">
      <Row>
        <Col>
          <Typography.Title level={5}>Balance</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Line
            {...config}
          />
        </Col>
      </Row>
    </div>
  )

}

export default withAxios(BalanceChart);
