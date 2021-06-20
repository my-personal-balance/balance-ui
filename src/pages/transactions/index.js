import React, { Component } from 'react';

import { Col, Row, Typography, Table, Tag } from 'antd';

import Loader from '../../components/Loader';

import { withAxios } from '../../container/Authenticated';
import { fetchTransactions } from '../../ws/BalanceAPI';

class Transactions extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      transactions: null  
    }
  }

  componentDidMount() {

    fetchTransactions(this.props.axios, (response) => {
      if (response) {
        const { data } = response;
        const { items } = data;
        
        this.setState({ transactions: (<TransactionTable items={items} />) });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Transactions</Typography.Title>
        {this.state.transactions !== null ? this.state.transactions : <Loader />}
      </>
    );
  }
}

export default withAxios(Transactions);

const TransactionTable = ({items}) => {
  
    const columns = [
      {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
      },
      { title: 'Description', dataIndex: 'description', key: 'description', },
      { 
        title: "Category",
        dataIndex: "tag",
        key: "tag", 
        render: (tag, record) => (
          <Tag key={record.id}>{tag.value}</Tag>
        ),
      },
      { title: "Amount", dataIndex: "amount", key: "amount", },
      {
        title: "Account",
        dataIndex: "account",
        key: "account",
        render: account => (
          <>{account.alias}</>
        ),
      },
    ];

    return (
      <Row>
        <Col span={24}>
          <Table dataSource={items} columns={columns} size="small" pagination={{defaultPageSize:50}} />
        </Col>
      </Row>
    )

}
