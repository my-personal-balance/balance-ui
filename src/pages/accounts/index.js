import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Col, Card, Row, Typography } from 'antd';
import { Form, Input, Select, Modal } from 'antd';
import {
  EuroCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';

import { withAxios } from '../../container/Authenticated';
import { fetchAccounts, createAccount } from '../../ws/BalanceAPI';

import Balance from '../../components/Balance';
import BalanceCard from '../../components/Balance/BalanceCard';

const { Option } = Select;

class Accounts extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      accounts: []  
    }
  }

  loadAccounts () {
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
  componentDidMount() {
    this.loadAccounts();
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
            <BalanceCard title="Current balance >" value={this.state.balance} color="rgb(33, 150, 243)">
              <EuroCircleOutlined />
            </BalanceCard>
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

  const accs = accounts.map(account => (
    <Col key={account.id} span={6} className="account-col">
      <Account account={account} />
    </Col>
  ));

  return (
    <>
      <Row>
        <Col span={6} className="account-col">
          <Card className="account-card" onClick={showModal}>
            <Row>
              <Col>
                <Typography.Title level={2}>New account</Typography.Title>
              </Col>
            </Row>
            <Row justify="center">
              <Col>
                <Button type="link" style={{fontSize: "20px"}}>
                  <PlusCircleOutlined />
                </Button>
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
        <Form ref={formRef} name="control-ref" onFinish={onFinish}>
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
  <Link to={`/accounts/${account.id}/transactions`}>
    <Card className="account-card">
      <Row>
        <Col>
          <Typography.Title level={3}>{account.alias}</Typography.Title>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography.Title level={5}>
            <BalanceCard.BalanceValue value={account.balance} />
          </Typography.Title>
        </Col>
      </Row>
    </Card>
  </Link>
);

