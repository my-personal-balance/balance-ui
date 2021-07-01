
import React, { useState } from 'react';
import { Button, Col, notification, Row, Tooltip, Upload } from 'antd';
import { Form, Select, Modal } from 'antd';
import {
  UploadOutlined,
} from '@ant-design/icons';

import { uploadTransactions } from '../../ws/BalanceAPI';
import { withAxios } from '../../container/Authenticated';

const { Option } = Select;

const UploadTransactions = ({ axios, accounts, refresh }) => {
  
  let fileToBeUploaded = null;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
    const formData = new FormData();
    formData.append("file", fileToBeUploaded);
    formData.append("account_id", formRef.current.getFieldValue('accountId'));

    uploadTransactions(axios, formData, result => {
      const { error, data } = result;
      
      if (error) {
        openNotificationWithIcon(
          'error',
          "Failed to upload transactions",
          "There was an error while uploading you file. Please check your file and try again."
        );
      }

      if (data) {
        setIsModalVisible(false);
        openNotificationWithIcon(
          'success',
          "Upload completed",
          "Your transactions were uploaded successfuly"
        );
        refresh();
      }
    })
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const props = {
    name: 'file',
    multiple: false,
    action: 'https://lalalala',
    beforeUpload: file => {
      fileToBeUploaded = file;
      return false;
    },
  };


  return (
    <>
      <Row>
        <Col offset={23}>
          <Tooltip placement="topLeft" title="Upload transactions">
            <Button
              shape="circle"
              size="large"
              icon={<UploadOutlined />}
              onClick={() => showModal()}
            />
          </Tooltip>
        </Col>
      </Row>
      <Modal
        title="Upload transactions"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form ref={formRef} name="control-ref">
          
          <Form.Item name="accountId" label="Account" rules={[{ required: true }]}>
            <Select placeholder="" allowClear>
              {accounts.map(account => (
                <Option key={account.id}>{account.alias}</Option>
              ))}
            </Select>
          </Form.Item>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Select File</Button>
          </Upload>
        </Form>
      </Modal>
    </>
  )

}

export default withAxios(UploadTransactions);