import React from 'react';
import { Button, Col, notification, Popconfirm, Row, Space, Table, Tag, Typography } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

import AddTransaction from './AddTransaction';
import UploadTransactions from './UploadTransactions';

import { deleteTransaction } from '../../ws/BalanceAPI';

const TransactionTable = (props) => {

  const { axios, items, accounts, refresh } = props;

  const delTransactionItem = (transactionId) => {
    
    deleteTransaction(axios, transactionId, result => {
      const { error, data } = result;
      
      if (error) {
        openNotificationWithIcon(
          'error',
          "Failed to delete transaction",
          "There was an error while removing this transaction."
        );
      }

      if (data) {
        // setIsModalVisible(false);
        openNotificationWithIcon(
          'success',
          "Transaction deleted",
          "Your transaction wwas deleted successfuly"
        );
        refresh();
      }
    })
    
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: d => new Date(d).toLocaleDateString()
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
        <Col offset={20}>
          <Space>
            <AddTransaction accounts={accounts} refresh={refresh} />
            <UploadTransactions axios={props.axios} accounts={accounts} refresh={refresh} />
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

export default TransactionTable;