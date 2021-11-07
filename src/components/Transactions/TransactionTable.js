import React, { useState, useEffect } from 'react';
import {
  Button,
  Col,
  Input,
  Popconfirm,
  Row,
  Space,
  Table,
  Tag,
  Typography
} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  SwapOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import moment from 'moment';

import AddTransaction from './AddTransaction';
import TransactionBuilder from './TransactionBuilder';
import UploadTransactions from './UploadTransactions';
import EditMultipleTransactions from './EditMultipleTransactions';

import { fetchAccounts, deleteTransaction, updateTransaction } from '../../ws/BalanceAPI';
import { withAxios } from '../../container/Authenticated';
import { openNotificationWithIcon } from '../../utils/constants';

const TransactionTable = (props) => {

  const { items, accountId, refresh } = props;

  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    asyncFetchAccounts();
  },[]);

  const asyncFetchAccounts = () => {
    fetchAccounts(props.axios, response => {
      const { error, data } = response;
      if (error) {
        openNotificationWithIcon('error', "Failed to fetch accounts", "There was an error while fetching accounts. Please reload the page.");
      } else if (data) {
        setAccounts(data.accounts);
      }
    });
  }

  const deleteTransactionItem = (transactionId) => {
    deleteTransaction(props.axios, transactionId, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to delete transaction", "There was an error while removing this transaction.");
      } else if (data) {
        openNotificationWithIcon('success', "Transaction deleted", "Your transaction wwas deleted successfuly");
        refresh();
      }
    });
  };

  const updateTransactionItem = (transaction, formRef) => {
    const transactionData = {
      id: transaction.id,
      transactionType: formRef.current.getFieldValue('type'),
      description: formRef.current.getFieldValue('description'),
      amount: formRef.current.getFieldValue('amount'),
      date: formRef.current.getFieldValue('date'),
      tagId: formRef.current.getFieldValue('tagId'),
      accountId: formRef.current.getFieldValue('accountId'),
    }
    
    updateTransaction(props.axios, transaction.id, transactionData, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to update transaction(s)", "There was an error while updating your transaction(s).");
      } else if (data) {
        setViewTrasactionBuilder(false);
        openNotificationWithIcon('success', "Transaction(s) updated", "Your transaction(s) were updated successfuly.");
        refresh();
      }
    });
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex] ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()) : '',
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
  };

  const handleReset = clearFilters => {
    clearFilters();
  };
  
  
  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (d, record) => {
        let currentYear = new Date().getFullYear();
        let transactionYear = new Date(d).getFullYear();
        let format = transactionYear !== currentYear ? "D MMM YYYY": "D MMM";
        return (<span>{moment(d).format(format)} </span>);
      }
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount, record) => {
        const { transaction_type } = record;

        let className = null;
        let signal = null;
        switch(transaction_type) {
          case "INCOME":
            className = "income-value";
            signal = <PlusOutlined style={{ color: "#51b44f", fontSize: "10px" }} />;
            break;
          case "TRANSFER":
            className = "expense-value";
            signal = <SwapOutlined style={{ color: "#e64b30", fontSize: "15px" }} />;
            break;
          default:
            className = "expense-value";
            signal = <MinusOutlined style={{ color: "#e64b30", fontSize: "10px" }} />;
        }
        
        return (
          <div>
            <span>{signal} </span>
            <span className={className}>{amount.toFixed(2)}</span>
          </div>
        );
      }
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ...getColumnSearchProps('description'),
    },
    { 
      title: "Category",
      dataIndex: "tag",
      key: "tag", 
      render: (tag, record) => {
        return tag ? (<Tag key={record.id}>{tag.value}</Tag>) : (<></>);
      },
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
          <Button
            type="link"
            onClick={() => editTransactionItem(record)}
          >
            <EditOutlined />
          </Button>
          <Popconfirm
            title="Delete this transaction?"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteTransactionItem(record.id)}
          >
            <Button type="link"><DeleteOutlined /></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const [viewTrasactionBuilder, setViewTrasactionBuilder] = useState(false);
  const [editTransaction, setEditTransaction] = useState(null);
  const [selectedTransactions, setSelectedTransactions] = useState([]);

  const editTransactionItem = (transaction) => {
    setEditTransaction(transaction);
    setViewTrasactionBuilder(true);
  }

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      if(selectedRowKeys) {
        setSelectedTransactions(selectedRows);
      } else {
        setSelectedTransactions([]);
      }
    },
  };

  return (
    <>
      <Row>
        <Col>
          <Typography.Title level={5}>Transactions</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col span={4}>
          {selectedTransactions.length > 0 ?
            <EditMultipleTransactions
              accounts={accounts}
              refresh={refresh}
              transactions={selectedTransactions}
            /> 
          : <></>}
        </Col>
        <Col offset={18}>
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
      <Row className="secction">
        <Col span={24}>
          <Table
            rowKey="id"
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            dataSource={items}
            columns={columns}
            size="small"
            pagination={{ defaultPageSize:50 }}
          />
        </Col>
      </Row>
      <TransactionBuilder
        title="Edit Transaction"
        visible={viewTrasactionBuilder}
        onOk={updateTransactionItem}
        onCancel={()=> setViewTrasactionBuilder(false)}
        accounts={accounts}
        transaction={editTransaction}
      />
    </>
  );

}

export default withAxios(TransactionTable);
