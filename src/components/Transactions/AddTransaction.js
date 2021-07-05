import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { createTransaction, searchAssets } from '../../ws/BalanceAPI';
import { formItemLayout, openNotificationWithIcon } from '../../utils/constants';

const { Option } = Select;

const AddTransaction = (props) => {

  const { accountId, accounts, refresh } = props;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    debugger;
    createTransaction(props.axios, {
      transactionType: formRef.current.getFieldValue('type'),
      description: formRef.current.getFieldValue('description'),
      amount: formRef.current.getFieldValue('amount'),
      date: formRef.current.getFieldValue('date'),
      account: {
        id: formRef.current.getFieldValue('accountId'),
      },
      asset: {
        isin: formRef.current.getFieldInstance('isin').state.value,
      }
    }, result => {
      const { error, data } = result;
      
      if (error) {
        openNotificationWithIcon(
          'error',
          "Failed to add transaction",
          "There was an error while adding your transaction."
        );
      }

      if (data) {
        setIsModalVisible(false);
        openNotificationWithIcon(
          'success',
          "Transaction added",
          "Your transaction was added successfuly."
        );
        refresh();
      }
      
    })
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
              onClick={() => showModal()}
            />
          </Tooltip>
        </Col>
      </Row>
      <Modal
        title="New transaction"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout} ref={formRef} initialValues={{accountId: accountId}} name="control-ref">
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
            <Select>
              {accounts.map(account => (
                <Option key={account.id}>{account.alias}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="isin" label="Asset">
            <AssetInformation axios={props.axios} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default withAxios(AddTransaction);

class AssetInformation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      assets: []
    }
  }

  handleSearch = (keywords) => {
    if (keywords) {
      searchAssets(this.props.axios, {keywords: keywords}, result => {
        const { error, data } = result;
        if (data) {
          this.setState({assets: data.assets});
        }
      });
    }
  }

  handleChange = value => {
    this.setState({ value });
  };

  render() {
    const options = this.state.assets.map(asset => <Option key={asset.isin}>{asset.description}</Option>);
    return (
      <Select
        showSearch
        placeholder="Type to find an asset"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={this.handleSearch}
        onChange={this.handleChange}
        notFoundContent={null}
      >
        {options}
      </Select>
    )
  }
}