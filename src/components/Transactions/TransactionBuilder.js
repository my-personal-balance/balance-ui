import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DatePicker, Form, Input, InputNumber, Modal, Select } from 'antd';
import { formItemLayout, openNotificationWithIcon } from '../../utils/constants';
import { withAxios } from '../../container/AuthProvider';
import { fetchTags } from '../../ws/tags';

const { Option } = Select;

const TransactionBuilder = (props) => {

  const { title, visible, onOk, onCancel, accounts, accountId, transaction, } = props;
  
  const [tags, setTags] = useState([]);
  const formRef = React.createRef();

  useEffect(() => {
    if (transaction && !(transaction instanceof Array) && formRef.current) {
      formRef.current.setFieldsValue({
        "type": transaction.transaction_type,
        "description": transaction.description,
        "tagId": transaction.tag ? transaction.tag.id : null,
        "amount": transaction.amount,
        "date": transaction.date ? moment.utc(transaction.date, "YYYY-MM-DD") : null,
        "accountId": transaction.account_id,
      });
    }
  },[transaction, formRef]);

  useEffect(() => {
    asyncFetchTags();
  },[]);

  const asyncFetchTags = () => {
    fetchTags(props.axios, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to fetch existing tags.", "There was an error while fetching the existing tags. Please reload the page.");
      } else if (data) {
        const tags = data.tags.map(d => <Option key={d.id} value={d.id}>{d.value}</Option>);
        setTags(tags);
      }
    });
  }

  return (
    <Modal
      title={title}
      open={visible}
      onOk={() => onOk(transaction, formRef)}
      onCancel={onCancel}
    >
      <Form {...formItemLayout} ref={formRef} initialValues={{ accountId: accountId }} name="control-ref">
        <Form.Item name="type" label="Type" rules={[{ required: true }]}>
          <Select>
            <Option value="EXPENSE">Expense</Option>
            <Option value="INCOME">Income</Option>
            <Option value="TRANSFER">Transfer</Option>
            <Option value="REFUND">Refund</Option>
            <Option value="INVESTMENT">Investment</Option>
          </Select>
        </Form.Item>
        <Form.Item name="description" label="Description" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="tagId" label="Tag" >
          <Select
            showSearch
            optionFilterProp="children"
          >
            {tags}
          </Select>
        </Form.Item>
        <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
          <InputNumber />
        </Form.Item>
        <Form.Item name="date" label="Date" rules={[{ required: true }]}>
          <DatePicker />
        </Form.Item>
        <Form.Item name="accountId" label="Account" rules={[{ required: true }]}>
          <Select>
            {accounts.map(a => <Option key={a.id} value={a.id}>{a.alias}</Option>)}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default withAxios(TransactionBuilder);