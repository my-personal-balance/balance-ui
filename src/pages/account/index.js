import React, { Component } from 'react';
import { Button, Col, Row, Typography, Popconfirm } from 'antd';
import {
  DeleteOutlined,
} from '@ant-design/icons';

import TransactionsComponent from '../../components/Transactions';

import { withAxios } from '../../container/Authenticated';
import { fetchAccount, deleteAccount } from '../../ws/BalanceAPI';
import { openNotificationWithIcon } from '../../utils/constants';

class Account extends Component {
  
  constructor(props) {
    super(props);
    const { accountId } = this.props.match.params;
    this.state = {
      account: {
        id: accountId
      },
      title: null,
      filters: {
        accountId: accountId,
        periodType: "current_month",
        startDate: null,
        endDate: null,
      }
    }
  }

  componentDidMount() {
    fetchAccount(this.props.axios, this.state.account.id, resp => {
      if (resp) {
        const account = resp.data;
        this.setState({
          account: account,
          title: account.alias,
        });
      }
    });
  }

  deleteCurrentAccount() {
    deleteAccount(this.props.axios, this.state.account.id, response => {
      const { error } = response;
      if (error) {
        openNotificationWithIcon('error', "Failed to delete account", "There was an error while deleting your account. Please reload the page.");
      } else {
        openNotificationWithIcon('success', "Account deleted", "Your account was deleted successfuly.");
        this.props.history.push('/accounts')
      }
    });
  }

  render() {
    
    return (
      <>
        <Row>
          <Col>
            <Typography.Title>{this.state.title}</Typography.Title>
          </Col>
          <Col>
            <Popconfirm
              title={`Delete the ${this.state.title} account?`}
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.deleteCurrentAccount()}
            >
              <Button type="link" danger>
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TransactionsComponent filters={this.state.filters} />
          </Col>
        </Row>
      </>
    );
  }
}

export default withAxios(Account);

