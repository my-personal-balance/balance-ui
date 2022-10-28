import { useState, useEffect } from 'react';
import { Button, Col, Row, Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { withAxios } from '../../container/Authenticated';
import { updateTransactions } from '../../ws/transactions';
import { openNotificationWithIcon } from '../../utils/constants';
import TransactionBuilder from './TransactionBuilder';

const EditMultipleTransactions = (props) => {

  const { accounts, refresh, transactions, } = props;

  const [viewTrasactionBuilder, setViewTrasactionBuilder] = useState(false);
  const [selectedTransactions, setSelectedTransactions] = useState(false);

  useEffect(() => {
    setSelectedTransactions(transactions)
  },[transactions]);

  const updateTransactionItems = (_, formRef) => {
    const editedTransactions = selectedTransactions.map(transaction => (
      {
        id: transaction.id,
        transactionType: formRef.current.getFieldValue('type'),
        description: formRef.current.getFieldValue('description'),
        amount: formRef.current.getFieldValue('amount'),
        date: formRef.current.getFieldValue('date'),
        tagId: formRef.current.getFieldValue('tagId'),
        accountId: formRef.current.getFieldValue('accountId')
      }
    ));

    updateTransactions(props.axios, {transactions: editedTransactions}, result => {
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
          <Tooltip placement="topLeft" title="Edit selected transactions">
            <Button
              shape="circle"
              size="large"
              icon={<EditOutlined />}
              onClick={() => showTrasactionBuilder()}
            />
          </Tooltip>
          <TransactionBuilder
            title="Edit Multiple Transactions"
            visible={viewTrasactionBuilder}
            onOk={updateTransactionItems}
            onCancel={handleCancelTransactionBuilder}
            accounts={accounts}
          />
        </Col>
      </Row>
    </>
  );
}

export default withAxios(EditMultipleTransactions);
