import React, { useState } from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { createTransaction } from '../../ws/BalanceAPI';
import { openNotificationWithIcon } from '../../utils/constants';
import TransactionBuilder from './TransactionBuilder';

const AddTransaction = (props) => {

  const { accountId, accounts, refresh } = props;

  const [viewTrasactionBuilder, setViewTrasactionBuilder] = useState(false);

  const createTransactionItem = (transactionId, formRef) => {
    createTransaction(props.axios, {
      transactionType: formRef.current.getFieldValue('type'),
      description: formRef.current.getFieldValue('description'),
      amount: formRef.current.getFieldValue('amount'),
      date: formRef.current.getFieldValue('date'),
      tagId: formRef.current.getFieldValue('tagId'),
      accountId: formRef.current.getFieldValue('accountId'),
    }, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to add transaction", "There was an error while adding your transaction.");
      } else if (data) {
        setViewTrasactionBuilder(false);
        openNotificationWithIcon('success', "Transaction added", "Your transaction was added successfuly.");
        refresh();
      }
    });
  };

  const showTrasactionBuilder = () => {
    setViewTrasactionBuilder(true);
  };

  const handleCancelTransactionBuilder = () => {
    setViewTrasactionBuilder(false);
  };

  return (
    <>
      <Row>
        <Col>
          <Tooltip placement="topLeft" title="Add single transaction">
            <Button
              shape="circle"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => showTrasactionBuilder()}
            />
          </Tooltip>
          <TransactionBuilder
            title="New Transaction"
            visible={viewTrasactionBuilder}
            onOk={createTransactionItem}
            onCancel={handleCancelTransactionBuilder}
            accounts={accounts}
            accountId={accountId}
          />
        </Col>
      </Row>
    </>
  );
}

export default withAxios(AddTransaction);
