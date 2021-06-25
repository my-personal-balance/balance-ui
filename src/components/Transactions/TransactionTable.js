import React, { Component } from 'react';
import { Button, Col, Row, Space, Table, Tag, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import AddTransaction from './AddTransaction';

const TransactionTable = (props) => {

  const { items, accounts } = props;
    
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
        <Tag key={record.id}>{tag ? tag.value : ''}</Tag>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => {
        const { transaction_type } = record;

        let className = "expense-value";
        let signal = "-";

        if (transaction_type === "INCOME") {
          className = "income-value";
          signal = "+";
        }
        
        return (
          <span className={className}>{signal} {amount}</span>
        );
      }
    },
    {
      title: "Account",
      dataIndex: "account",
      key: "account",
      render: account => (
        <>{account.alias}</>
      ),
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: () => (
        <Space>
          <Button type="link"><EditOutlined /></Button>
          <Button type="link"><DeleteOutlined /></Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={4}>Transactions</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col offset={21}>
          <AddTransaction accounts={accounts} />
        </Col>
      </Row>
      <Row className="transactions">
        <Col span={24}>
          <Table rowKey="id" dataSource={items} columns={columns} size="small" pagination={{ defaultPageSize:50 }} />
        </Col>
      </Row>
      
    </>
  );

}

export default TransactionTable;