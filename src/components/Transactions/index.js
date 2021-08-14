import { useState, useEffect } from 'react';
import { Col, Layout, Row, } from 'antd';

import Filters from '../Filters';
import Balance from '../Balance';
import Loader from '../Loader';
import TransactionTable from './TransactionTable';
import TagInsights from '../TagInsights';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions, } from '../../ws/BalanceAPI';

const TransactionsComponent = (props) => {

  const [filters, setFilters] = useState(props.filters);
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    asyncFetchTransactions();
  },[]);

  const asyncFetchTransactions = () => {
    fetchTransactions(props.axios, filters, response => {
      const { data } = response;
      if (data) {
        const { transactions } = data;
        setTransactions(transactions);
      }
    });
  }

  return (
    <>
      <Row>
        <Col offset={20}>
          <Filters filters={filters} setFilters={setFilters} action={asyncFetchTransactions} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Balance filters={filters} />
        </Col>
      </Row>
      <Row className="secction">
        <Col span={8}>
          <TagInsights
            filters={{
              reportType: "group_by_tag",
              ...filters
            }}
          />
        </Col>
      </Row>
      <Row className="secction">
        <Col span={24}>
          <Layout.Content className="site-layout-background">
            {transactions ?
              <TransactionTable items={transactions} accountId={filters.accountId} refresh={() => asyncFetchTransactions()} />
            : <Loader /> }
          </Layout.Content>
        </Col>
      </Row>
    </>
  )

}

export default withAxios(TransactionsComponent);


