import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Select, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts, createTransaction } from '../../ws/BalanceAPI';

const { Option } = Select;

const AddTransaction = props => {

  const { accounts } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    createTransaction(props.axios, {
      transactionType: formRef.current.getFieldValue('type'),
      description: formRef.current.getFieldValue('description'),
      amount: formRef.current.getFieldValue('amount'),
      date: formRef.current.getFieldValue('date'),
      account: {
        id: formRef.current.getFieldValue('accountId'),
      }
    }, result => {
      const { data } = result;
      if (data) {
        formRef.resetFields();
      }
    })
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };

  return (
    <>
      <Button type="primary" shape="round" icon={<PlusOutlined />} onClick={showModal} >Add Transaction</Button>
      <Modal
        title="New transaction"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout} ref={formRef} name="control-ref" onFinish={onFinish}>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select placeholder="" allowClear>
              <Option value="EXPENSE">Expense</Option>
              <Option value="INCOME">Income</Option>
              {/* <Option value="TRANSFER">Transfer</Option>
              <Option value="REFUND">Refund</Option>
              <Option value="INVESTMENT">Investment</Option> */}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tag" label="Category" >
            <Input />
          </Form.Item>
          <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
            <InputNumber />
          </Form.Item>
          <Form.Item name="date" label="Date" rules={[{ required: true }]}>
            <DatePicker />
          </Form.Item>
          <Form.Item name="accountId" label="Account" rules={[{ required: true }]}>
            <Select placeholder="" allowClear>
              {accounts.map(account => (
                <Option key={account.id}>{account.alias}</Option>
              ))}
            </Select>
          </Form.Item>
          
        </Form>
      </Modal>
    </>
  );
}

export default withAxios(AddTransaction);