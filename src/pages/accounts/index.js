import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Row, Typography } from 'antd';
import { Form, Input, Select, Modal } from 'antd';
import {
  EuroCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts, createAccount } from '../../ws/BalanceAPI';

import Balance from '../../components/Balance';

const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

class Accounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accounts: []  
    }
  }

  componentDidMount() {

    fetchAccounts(this.props.axios, (response) => {
      if (response) {
        const { data } = response;
        const { accounts } = data;
        this.setState({ accounts });

        let balance = 0.0;
        accounts.forEach(account => {
          balance += account.balance;
        });

        this.setState({ balance });
      }
    });
  }

  render() {
    return (
      <>
        <Typography.Title>Accounts</Typography.Title>
        <Row>
          <Col span={16}>
            <Row>
              <AccountsView axios={this.props.axios} accounts={this.state.accounts} />
            </Row>
          </Col>
          <Col span={6} offset={2}>
            <Balance title="Current balance >" value={this.state.balance} color="rgb(33, 150, 243)">
              <EuroCircleOutlined />
            </Balance>
          </Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Accounts);

const AccountsView = ({ axios, accounts }) => {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const formRef = React.createRef();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    console.log();
    createAccount(axios, {
      alias: formRef.current.getFieldValue('alias'),
      type: formRef.current.getFieldValue('type'),
    }, result => {
      const { data, error} = result;
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

  const accs = accounts.map(account => (
    <Col span={8}>
      <Account account={account} />
    </Col>
  ));

  return (
    <>
      <Row>
        <Col span={8}>
          <Card className="balance-card">
            <Row justify="center">
              <Col>
                <Link onClick={showModal}>
                  <PlusCircleOutlined style={{fontSize: "40px"}} />
                  <Typography.Title level={2}>New account</Typography.Title>
                </Link>
              </Col>
            </Row>
          </Card>
        </Col>
        {accs}
      </Row>
      
      <Modal
        title="New account"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <Form {...layout} ref={formRef} name="control-ref" onFinish={onFinish}>
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

const Account = ({ account }) => (
  <Card className="account-card">
    <Row>
      <Col>
        <Link to={`/accounts/${account.id}`}>
          <Typography.Title level={2}>{account.alias}</Typography.Title>
        </Link>
      </Col>
    </Row>
    <Row>
      <Col>
        <Link to={`/accounts/${account.id}`}>
          <Typography.Title level={5}>
            <Balance.BalanceValue value={account.balance} />
          </Typography.Title>
        </Link>
      </Col>
    </Row>
  </Card>
);
