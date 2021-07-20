import React from 'react';
import { Button, Col, Popconfirm, Row, Space, Table, Tag, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import AddTransaction from './AddTransaction';
import UploadTransactions from './UploadTransactions';

import { deleteTransaction } from '../../ws/BalanceAPI';
import { withAxios } from '../../container/Authenticated';
import { openNotificationWithIcon } from '../../utils/constants';

const TransactionTable = (props) => {

  const { items, accountId, accounts, refresh } = props;

  const delTransactionItem = (transactionId) => {
    
    deleteTransaction(props.axios, transactionId, result => {
      const { error, data } = result;
      
      if (error) {
        openNotificationWithIcon(
          'error',
          "Failed to delete transaction",
          "There was an error while removing this transaction."
        );
      }

      if (data) {
        openNotificationWithIcon(
          'success',
          "Transaction deleted",
          "Your transaction wwas deleted successfuly"
        );
        refresh();
      }
    })
    
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount, record) => {
        const { transaction_type } = record;

        let className = "expense-value";
        let signal = "-";

        if (transaction_type === "INCOME") {
          className = "income-value";
          signal = "+";
        }
        
        return (
          <span className={className}>{signal} {amount.toFixed(2)}</span>
        );
      }
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      align: "right",
      render: (balance) => {
        let className = balance >= 0 ? "income-value" : "expense-value";
        let signal = balance >= 0 ? "+" : "-";
        return (
          <span className={className}>{signal} {balance.toFixed(2)}</span>
        );
      }
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
      render: (x, record) => (
        <Space>
          <Button type="link"><EditOutlined /></Button>
          <Popconfirm title="Delete this transaction?" okText="Yes" cancelText="No" onConfirm={() => delTransactionItem(record.id)}>
            <Button type="link"><DeleteOutlined /></Button>
          </Popconfirm>
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
        <Col offset={22}>
          <Space>
            <AddTransaction
              accountId={accountId}
              accounts={accounts}
              refresh={refresh}
            />
            <UploadTransactions
              accountId={accountId}
              accounts={accounts}
              refresh={refresh}
            />
          </Space>
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

export default withAxios(TransactionTable);