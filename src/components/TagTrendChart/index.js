import { useEffect, useState } from 'react';
import { Card, Col, Row, Typography, } from 'antd';
import { BidirectionalBar, Column } from '@ant-design/plots';
import { fetchReportTrends, } from '../../ws/reports';
import { withAxios } from '../../container/AuthProvider';
import { openNotificationWithIcon } from '../../utils/constants';

import './index.css';

const TagTrendChart = (props) => {
  
  const { filters } = props;
  
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, [filters.tagId]);

  const asyncFetch = () => {
    fetchReportTrends(props.axios, filters, response => {
      const { error, data } = response;
      if (error) {
        openNotificationWithIcon('error', "Failed to fetch report trend data", "There was an error while fetching data. Please reload the page.");
      } else if (data) {
        const { items } = data;
        setData(items);
      }
    });
  };

  return (
    <Card>
      <Row>
        <Col span={4}>
          <Typography.Title level={5}>Trend</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TrendChart  filters={filters} data={data} />
        </Col>
      </Row>
    </Card>
  );
}

export default withAxios(TagTrendChart);

const TrendChart = ({filters, data}) => {

  if (data !== undefined) {

    if (filters.tagId) {
      return (<TrendBar data={data} />);
    } else {
      return (<TrendBidirectionalBar data={data} />);
    }
  } else {
    return (<></>);
  }
}

const TrendBidirectionalBar = ({data}) => {

  const config = {
    data,
    layout: 'vertical',
    xField: 'month',
    yField: ['INCOME', 'EXPENSE'],
    xAxis: {
      position: 'top'
    },
    yAxis: {
      'INCOME': {
        nice: true,
      },
      'EXPENSE': {
        nice: true,
      },
    },
    tooltip: {
      shared: true,
      showMarkers: false,
    },
  };

  return <BidirectionalBar {...config} />;
}

const TrendBar = ({data}) => {

  const config = {
    data,
    xField: 'month',
    yField: 'EXPENSE',
    color: "#FF7F78",
    label: {
      position: 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;

}


