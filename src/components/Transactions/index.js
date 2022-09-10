import { useState, useEffect } from 'react';
import {
  useLocation,
  useHistory,
} from "react-router-dom";

import { Col, Layout, Row, } from 'antd';

import Filters from '../Filters';
import Balance from '../Balance';
import Loader from '../Loader';
import TransactionTable from './TransactionTable';
import TagInsights from '../TagInsights';
import TagTrendChart from '../TagTrendChart';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions, } from '../../ws/BalanceAPI';

const TransactionsComponent = (props) => {

  const { hideTagInsights, } = props;

  let initFilters = props.filters;

  const location = useLocation();
  const history = useHistory();

  const [filters, setFilters] = useState(initFilters); 
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    asyncFetchTransactions();
  },[location.search]);

  const asyncFetchTransactions = () => {
    fetchTransactions(props.axios, filters, response => {
      const { data } = response;
      if (data) {
        const { transactions } = data;
        setTransactions(transactions);
      }
    });
  }

  const addFilters = (addedFilter) => {
    let newFilters = Object.assign({}, filters, addedFilter);
    updateFilters(newFilters);
  }

  const removeFilters = (removedFilter) => {
    delete filters[removedFilter];
    updateFilters(filters);
  }

  const updateFilters = (newFilters) => {
    let searchParams = new URLSearchParams();
    Object.keys(newFilters).forEach(k => {
      searchParams.set(k, newFilters[k]);
    });
    history.push({ search: searchParams.toString() });
    setFilters(newFilters);
  }

  return (
    <>
      <Row>
        <Col offset={20}>
          <Filters filters={filters} addFilters={addFilters} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Balance filters={filters} />
        </Col>
      </Row>
      { hideTagInsights ? <></> :
        
        <Row gutter={16} className="balance">
          <Col span={8}>
            <TagInsights
              filters={{
                reportType: "group_by_tag",
                ...filters
              }}
              addFilters={addFilters}
              removeFilters={removeFilters}
            />
          </Col>
          <Col span={16}>
            <TagTrendChart
              filters={{
                reportType: "group_by_tag",
                ...filters
              }}
            />
          </Col>
        </Row>
      }
      <Row className="secction">
        <Col span={24}>
          <Layout.Content className="site-layout-background">
            {transactions ?
              <TransactionTable items={transactions} accountId={filters.accountId} tagId={filters.tagId} refresh={() => asyncFetchTransactions()} />
            : <Loader /> }
          </Layout.Content>
        </Col>
      </Row>
    </>
  )

}

export default withAxios(TransactionsComponent);
