import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Typography, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { withAxios } from '../../container/AuthProvider';
import { openNotificationWithIcon } from '../../utils/constants';
import { useTags } from '../../hooks/useTags';
import { splitTransaction } from '../../ws/splitTransactions';

const { Title } = Typography;

const SplitTransactionBuilder = (props) => {
  const { title, visible, onOk, onCancel, transaction, } = props;

  const { tags } = useTags(props.axios);

  const [form] = Form.useForm();
  const [splitTransactionForm] = Form.useForm();

  const { remainingAmount, updateRemainingAmount } = useRemainingAmount(transaction, splitTransactionForm);

  useEffect(() => {
    if (transaction && !(transaction instanceof Array)) {
      form.setFieldsValue({
        "type": transaction.transaction_type,
        "description": transaction.description,
        "tagId": transaction.tag ? transaction.tag.id : null,
        "amount": transaction.amount,
        "date": transaction.date ? moment.utc(transaction.date, "YYYY-MM-DD") : null,
        "accountId": transaction.account_id,
      });

      if(splitTransactionForm) {
        splitTransactionForm.resetFields();
        if (transaction.split_transactions) {
          transaction.split_transactions.forEach(t => {
            t["tagId"] = t.tag_id;
          })
          splitTransactionForm.setFieldValue("splitTransactions", transaction.split_transactions);
        }
      }

      updateRemainingAmount();
    }
  }, [transaction, form, splitTransactionForm])

  const onFinish = () => {
    const splitTransactionValues = splitTransactionForm.getFieldValue("splitTransactions");
    splitTransaction(props.axios, transaction.id, splitTransactionValues, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to update transaction(s)", "There was an error while updating your transaction(s).");
      } else if (data) {
        onOk();
      }
    });
  };

  return (
    <Modal
      title={title}
      open={visible}
      onCancel={onCancel}
      onOk={onFinish}
      width={1000}
    >
      <Title level={5}>Transaction</Title>
      <Row style={{padding: "0 0 4px 0"}}>
          <Col span={3} className="split-transaction-header">Ammount</Col>
          <Col span={16} className="split-transaction-header">Description</Col>
          <Col span={5} className="split-transaction-header">Date</Col>
      </Row>

      <Form
        form={form}
        name="transaction"
        layout='inline'
        autoComplete="off"
      >
        <Form.Item name="amount">
          <Input style={{ width: 80, textAlign: "right" }} disabled />
        </Form.Item>
        <Form.Item name="description">
          <Input style={{ width: 640 }} disabled />
        </Form.Item>
        <Form.Item name="date">
          <DatePicker style={{ width: 160 }} disabled />
        </Form.Item>
      </Form>
      
      <Divider />

      <Title level={5}>Splits</Title>
      <Row style={{padding: "0 0 4px 0"}}>
          <Col span={3} className="split-transaction-header">Ammount</Col>
          <Col span={13} className="split-transaction-header">Description</Col>
          <Col span={8} className="split-transaction-header">Tags</Col>
      </Row>

      <Form form={splitTransactionForm} name="splitTransactionItems" autoComplete="off" onFinish={onFinish}>
        
        <Form.List name="splitTransactions">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "flex" }} align="baseline">
                  <Form.Item {...restField} name={[name, "amount"]}>
                  <Input style={{ width: 80, textAlign: "right" }} onChange={updateRemainingAmount}/>
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "description"]}>
                    <Input style={{ width: 540 }} />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, "tagId"]}>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      style={{ width: 240 }}
                    >
                      {tags}
                    </Select>
                  </Form.Item>
                  <MinusCircleOutlined 
                    className="dynamic-delete-button"
                    onClick={() => remove(name)} 
                  />
                </Space>
              ))}
              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  Add transaction
                </Button>
              </Form.Item>
            </>
          
          )}
        </Form.List>

      </Form>

      <Row style={{padding: "0 0 4px 0"}}>
        <Col span={24} className="split-transaction-header">Remaining Amount</Col>
      </Row>
      <Row style={{padding: "0 0 4px 0"}}>
        <Col span={24}>{remainingAmount}</Col>
      </Row>

    </Modal>
  )
}

export default withAxios(SplitTransactionBuilder);

const useRemainingAmount = (transaction, splitTransactionForm) => {

  const [remainingAmount, setRemainingAmount] = useState(0.0);

  useEffect(() => {
    updateRemainingAmount();
  }, [transaction, splitTransactionForm]);

  const updateRemainingAmount = () => {
debugger;
    let transactionAmount = transaction ? transaction.amount : 0.0;
    const splitTransactionValues = splitTransactionForm.getFieldValue("splitTransactions");
    if (splitTransactionValues) {
      splitTransactionValues.forEach(tv => {
        transactionAmount -= tv.amount;
      })
    }

    setRemainingAmount(transactionAmount.toFixed(2));
  }

  return {
    remainingAmount,
    updateRemainingAmount
  }
}