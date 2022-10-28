import { useEffect, useState } from 'react';
import {
  useLocation,
} from "react-router-dom";
import { Col, Row, Typography, } from 'antd';

import TransactionsComponent from "../../components/Transactions";
import { searchParser } from '../../utils/searchParser';


const Insights = (props) => {
  
  const location = useLocation();

  const [filters, setFilters] = useState(null);

  useEffect(() => {
    loadInitialFilters();
  },[location.search]);

  const loadInitialFilters = () => {
    let querySearch = searchParser(location.search);
    querySearch = Object.assign({}, { periodType: "current_month",}, querySearch);
    setFilters(querySearch);
  }

  return (
    <>
      <Row>
        <Col>
          <Typography.Title>Insights</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          { filters ? <TransactionsComponent filters={filters} /> : <></>}
        </Col>
      </Row>
    </>
  );
}

export default Insights;
