
import React, { useState } from 'react';
import { Button, Form, Input, Select, Modal } from 'antd';
import {
  PlusOutlined,
} from '@ant-design/icons';

import { createAccount } from '../../ws/BalanceAPI';
import { formItemLayout, openNotificationWithIcon } from '../../utils/constants';

const { Option } = Select;

const AddAccountButton = ({axios, refresh}) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    createAccount(axios, {
      alias: formRef.current.getFieldValue('alias'),
      type: formRef.current.getFieldValue('type'),
    }, result => {
      const { error, data } = result;
      
      if (error) {
        openNotificationWithIcon(
          'error',
          "Failed to add account",
          "There was an error while adding a new account."
        );
      }

      if (data) {
        setIsModalVisible(false);
        openNotificationWithIcon(
          'success',
          "Account added",
          "Your account was added successfuly."
        );
        refresh();
      }
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Button
        shape="round"
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
      >Add account</Button>
      <Modal
        title="New account"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form {...formItemLayout} ref={formRef} name="control-ref" onFinish={onFinish}>
          <Form.Item name="alias" label="Alias" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Account Type" rules={[{ required: true }]}>
            <Select placeholder="Select a option and change input text above" allowClear>
              <Option value="CHECKING">Checking</Option>
              <Option value="SAVINGS">Savings</Option>
              <Option value="INVESTMENTS">Investments</Option>
              <Option value="OTHERS">Others</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default AddAccountButton;
