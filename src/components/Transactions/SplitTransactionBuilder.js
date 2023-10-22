import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Divider, Form, Input, Modal, Select, Typography, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { withAxios } from '../../container/AuthProvider';
import { openNotificationWithIcon } from '../../utils/constants';
import { fetchTags } from '../../ws/tags';
import { splitTransaction } from '../../ws/splitTransactions';

const { Option } = Select;
const { Title } = Typography;

const SplitTransactionBuilder = (props) => {
  const { title, visible, onOk, onCancel, transaction, } = props;

  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchTags(props.axios, result => {
      const { error, data } = result;
      if (error) {
        openNotificationWithIcon('error', "Failed to fetch existing tags.", "There was an error while fetching the existing tags. Please reload the page.");
      } else if (data) {
        const tags = data.tags.map(d => <Option key={d.id} value={d.id}>{d.value}</Option>);
        setTags(tags);
      }
    });
  },[props.axios]);

  const [form] = Form.useForm();
  const [splitTransactionForm] = Form.useForm();

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
      <Typography>
        <Title level={5}>Transaction</Title>
        <Form
          form={form}
          name="transaction"
          layout='inline'
          autoComplete="off"
        >
          <Form.Item name="amount">
            <Input />
          </Form.Item>
          <Form.Item name="description">
            <Input />
          </Form.Item>
          <Form.Item name="date">
            <Input />
          </Form.Item>
        </Form>
        
        <Divider />

        <Title level={5}>Splits</Title>
        
        <Form form={splitTransactionForm} name="splitTransactionItems" autoComplete="off" onFinish={onFinish}>
          
          <Form.List name="splitTransactions">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: "flex" }} align="baseline">
                    <Form.Item {...restField} name={[name, "amount"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "description"]}>
                      <Input />
                    </Form.Item>
                    <Form.Item {...restField} name={[name, "tagId"]}>
                      <Select
                        showSearch
                        optionFilterProp="children"
                      >
                        {tags}
                      </Select>
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
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

      </Typography>

    </Modal>
  )
}

export default withAxios(SplitTransactionBuilder);