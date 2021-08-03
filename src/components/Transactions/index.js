import { useState, useEffect } from 'react';
import { Col, DatePicker, Layout, Row, } from 'antd';

import Balance from '../Balance';
import Loader from '../Loader';
import TransactionTable from './TransactionTable';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions, } from '../../ws/BalanceAPI';

const { RangePicker } = DatePicker;

const TransactionsComponent = (props) => {

  const [filters, setFilters] = useState(props.filters);
  const [balance, setBalance] = useState(0.0);
  const [incomes, setIncomes] = useState(0.0);
  const [expenses, setExpenses] = useState(0.0);
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
        const { balance, incomes, expenses, transactions } = data;
        setBalance(balance);
        setIncomes(incomes);
        setExpenses(expenses);
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
          <Balance balance={balance} incomes={incomes} expenses={expenses} />
        </Col>
      </Row>
      <Row className="transactions">
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


