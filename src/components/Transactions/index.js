import { useState, useEffect } from 'react';
import { Col, DatePicker, Layout, Row, } from 'antd';

import Balance from '../Balance';
import Loader from '../Loader';
import TransactionTable from './TransactionTable';
import TagInsights from '../TagInsights';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions, } from '../../ws/BalanceAPI';

const { RangePicker } = DatePicker;

const TransactionsComponent = (props) => {

  const [filters, setFilters] = useState(props.filters);
  
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    asyncFetchTransactions();
  },[]);

  const handleRangePickerChange = (_, stringDates) => {
    const updatedFilters = filters;
    updatedFilters.periodType = "custom";
    updatedFilters.startDate = stringDates[0];
    updatedFilters.endDate = stringDates[1];
    setFilters(updatedFilters);
  }

  const onOpenChange = (isOpen) => {
    if (!isOpen) {
      asyncFetchTransactions();
    }
  }

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
          <RangePicker bordered={false} onChange={(v, s) => handleRangePickerChange(v, s)} onOpenChange={isOpen => onOpenChange(isOpen)} />
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


