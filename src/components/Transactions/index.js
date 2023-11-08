import { useState, useEffect } from 'react';
import { Col, Layout, Row, } from 'antd';

import Filters from '../Filters';
import Balance from '../Balance';
import TransactionTable from './TransactionTable';
import TagInsights from '../TagInsights';
import TagTrendChart from '../TagTrendChart';

import { withAxios } from '../../container/AuthProvider';
import { fetchTransactions, } from '../../ws/transactions';
import { useFilters } from '../../hooks/useFilters';

const TransactionsComponent = (props) => {

  const { hideTagInsights, } = props;

  const { filters, addFilters, removeFilters, updateFilters } = useFilters(props.filters);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    asyncFetchTransactions();
  },[filters]);

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
      <Row justify="end">
        <Col>
          <Filters filters={filters} addFilters={addFilters} />
        </Col>
      </Row>
      <Balance filters={filters} />
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
            <TransactionTable
              items={transactions}
              accountId={filters.accountId}
              tagId={filters.tagId}
              refresh={() => asyncFetchTransactions()}
            />
          </Layout.Content>
        </Col>
      </Row>
    </>
  )

}

export default withAxios(TransactionsComponent);
